<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\DictionaryGroup;
use Illuminate\Http\Request;

class DictionaryGroupsController extends Controller
{
    public function index()
    {
        $dictionaryGroups = DictionaryGroup::orderby('id')->get();
        return $dictionaryGroups->toArray();
    }
}