<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        DB::table('news_package')->insert([
            'id' => 1, 'name' => 'Mulai Menulis', 'level' => 1, 'type' => (string) config('affiliate.site_type'),
            'status' => 1, 'price' => 48000, 'period' => 1, 'jenis_periode' => 'bulan', 'quota' => 4,
        ]);

        DB::table('kategori_kt')->insert(['id' => 1, 'kategori_id' => 9, 'name' => 'Dosen']);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'prov' => 'Jawa Timur',
            'city' => 'Kota Malang',
            'address' => 'Jl. Besar Ijen No. 90',
            'contact' => '81234567890',
            'plan_id' => 1,
            'profesi' => 9,
            'password' => 'Rahasia#2026',
            'password_confirmation' => 'Rahasia#2026',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}
