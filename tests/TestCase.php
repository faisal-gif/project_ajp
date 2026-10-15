<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Schema;
use Tests\Concerns\CreatesLegacySchema;

abstract class TestCase extends BaseTestCase
{
    use CreatesLegacySchema;

    protected function setUp(): void
    {
        parent::setUp();

        // Model User memetakan ke `wartawan`, jadi hampir semua test butuh skema legacy.
        // Dipasang di sini, bukan per-test, supaya tidak ada yang lupa memanggilnya.
        // Test tanpa RefreshDatabase belum punya tabel `payments`, jadi dilewati.
        if (Schema::hasTable('payments') && ! Schema::hasTable('wartawan')) {
            $this->createLegacySchema();
        }
    }
}
