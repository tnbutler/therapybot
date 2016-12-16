<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\UserVariable;
use Illuminate\Http\Request;

class UserVarsController extends Controller
{
    public function index($chatVersion)
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: Content-Type');

        $userVariables = UserVariable::where('chat_version_id', $chatVersion)
            ->orderby('name')
            ->get();

        return $userVariables->toArray();
    }
}