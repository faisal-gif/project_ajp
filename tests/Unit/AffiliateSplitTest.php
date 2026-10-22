<?php

namespace Tests\Unit;

use App\Services\AffiliateCommissionService;
use Tests\TestCase;

/**
 * AJP berjalan SATU TINGKAT: config/affiliate.php menetapkan tier2_bps = 0, jadi pos
 * tier2 tidak pernah terbit. Yang diuji di sini adalah angka yang benar-benar berlaku
 * di AJP, bukan angka dua tingkat milik Kopi TIMES.
 */
class AffiliateSplitTest extends TestCase
{
    public function test_split_of_48000_matches_the_agreed_figures(): void
    {
        $rows = collect(AffiliateCommissionService::split(48_000))->keyBy('role');

        $this->assertCount(2, $rows);
        $this->assertFalse($rows->has('tier2'), 'AJP satu tingkat: pos tier2 tidak boleh terbit.');

        $this->assertSame(9_600, $rows['tier1']['amount']);
        $this->assertSame(8_840, $rows['internal']['amount']);   // 3.840 + flat 5.000

        $this->assertSame(48_000, $rows['tier1']['base_amount']);
        $this->assertSame(38_400, $rows['internal']['base_amount']);
    }

    public function test_office_keeps_the_remainder(): void
    {
        $total = collect(AffiliateCommissionService::split(48_000))->sum('amount');

        $this->assertSame(18_440, $total);
        $this->assertSame(29_560, 48_000 - $total);
    }

    public function test_odd_price_floors_every_position_and_never_overspends(): void
    {
        $rows = AffiliateCommissionService::split(47_777);

        foreach ($rows as $row) {
            $this->assertIsInt($row['amount']);
        }

        $this->assertSame(9_555, $rows[0]['amount']);        // floor(47777 * 20%)
        $this->assertLessThan(47_777, array_sum(array_column($rows, 'amount')));
    }

    public function test_without_a_recruiter_only_the_internal_position_remains(): void
    {
        $rows = AffiliateCommissionService::split(48_000, adaPerekrut: false);

        $this->assertCount(1, $rows);
        $this->assertSame('internal', $rows[0]['role']);
        $this->assertSame(48_000, $rows[0]['base_amount']);   // tidak ada potongan tier1
        $this->assertSame(9_800, $rows[0]['amount']);            // 4.800 + flat 5.000
        $this->assertSame(38_200, 48_000 - $rows[0]['amount']);
    }

    public function test_rates_come_from_config(): void
    {
        config(['affiliate.tier1_bps' => 1000]);

        $rows = collect(AffiliateCommissionService::split(48_000))->keyBy('role');

        $this->assertSame(4_800, $rows['tier1']['amount']);
        $this->assertSame(43_200, $rows['internal']['base_amount']);
    }

    /**
     * Tarif 0 membuang posnya, bukan mencatat baris bernilai nol. Baris nol akan muncul
     * di laporan, menumpuk sebagai `unassigned`, dan minta disetujui admin tanpa isi.
     */
    public function test_zero_rate_drops_the_position_instead_of_writing_an_empty_row(): void
    {
        $peran = collect(AffiliateCommissionService::split(48_000))->pluck('role');

        $this->assertEqualsCanonicalizing(['tier1', 'internal'], $peran->all());
    }

    /** Sakelarnya memang sakelar: mengisi tarifnya memunculkan tingkat kedua kembali. */
    public function test_second_tier_returns_when_its_rate_is_set(): void
    {
        config(['affiliate.tier2_bps' => 500]);

        $rows = collect(AffiliateCommissionService::split(48_000))->keyBy('role');

        $this->assertCount(3, $rows);
        $this->assertSame(1_920, $rows['tier2']['amount']);
        $this->assertSame(38_400, $rows['tier2']['base_amount']);
    }

    /**
     * Komponen tetap tidak boleh membuat kantor membayar lebih dari yang diterima.
     *
     * Selama semua pos berupa persentase hal ini mustahil. Komponen tetap (AJP Rp 5.000)
     * merusak jaminan itu pada harga paket kecil, jadi yang dipangkas hanya komponen
     * tetapnya — persentase milik afiliator tidak pernah dikurangi.
     */
    public function test_flat_component_never_makes_the_office_pay_more_than_it_received(): void
    {
        foreach ([1_000, 2_000, 3_000, 5_000, 10_000] as $harga) {
            $rows = AffiliateCommissionService::split($harga);
            $keluar = array_sum(array_column($rows, 'amount'));

            $this->assertLessThanOrEqual($harga, $keluar, "harga {$harga} membuat net kantor negatif");

            // Persentase perekrut tetap utuh; hanya flat yang boleh dipangkas.
            $tier1 = collect($rows)->firstWhere('role', 'tier1');
            $this->assertSame(intdiv($harga * 2000, 10_000), $tier1['amount']);
        }
    }

    /** Setiap baris harus bisa dihitung ulang dari snapshotnya sendiri. */
    public function test_every_position_can_be_recomputed_from_its_own_snapshot(): void
    {
        foreach ([AffiliateCommissionService::split(48_000), AffiliateCommissionService::split(48_000, adaPerekrut: false)] as $rows) {
            foreach ($rows as $row) {
                $this->assertSame(
                    intdiv($row['base_amount'] * $row['rate_bps'], 10_000) + $row['flat_amount'],
                    $row['amount'],
                    "pos {$row['role']} tidak cocok dengan base x rate + flat",
                );
            }
        }
    }
}
