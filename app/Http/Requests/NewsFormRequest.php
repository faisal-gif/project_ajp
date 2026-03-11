<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewsFormRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'city' => 'required|string|max:100',
            'narsum' => 'required|string|max:255',
            'profesi' => 'required|string|max:255',
            'contact' => 'required|string|max:100',

            // Tambahkan mimes dan dimensions
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:4096|dimensions:max_width=4000,max_height=4000',
            'image_2' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096|dimensions:max_width=4000,max_height=4000',
            'image_3' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096|dimensions:max_width=4000,max_height=4000',

            'caption' => 'nullable|string|max:255',
        ];
    }

    // Opsional: Tambahkan pesan error kustom agar user paham
    public function messages(): array
    {
        return [
            'image.dimensions' => 'Dimensi gambar terlalu besar. Maksimal 4000x4000 piksel.',
            'image.mimes' => 'Format gambar harus berupa jpeg, png, jpg, atau webp.',
        ];
    }
}
