<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wartawan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class WartawanController extends Controller
{
    public function convert_pswd($id){
        
        $user = User::find($id);
        $user->password = Hash::make($user->passwd);
        $user->save();
        
        return 'berhasil di udpdate';
    }
}
