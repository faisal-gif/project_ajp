<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    // 2. Pindahkan aturan validasi ke sini
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'prov' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'contact' => 'required|string|max:20',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'plan_id' => 'required|exists:news_package,id',
        ];
    }

    // 3. Tambahkan fungsi messages untuk pesan custom
    public function messages(): array
    {
        return [
            'name.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Email tidak boleh kosong.',
            'email.unique' => 'Email ini sudah terdaftar.',
            'password.confirmed' => 'Konfirmasi kata sandi tidak sesuai.',
            'plan_id.required' => 'Pilih paket langganan Anda.',
            // Tambahkan pesan lainnya sesuai kebutuhan...
        ];
    }
}
