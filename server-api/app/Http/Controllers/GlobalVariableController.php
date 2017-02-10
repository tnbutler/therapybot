<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\GlobalVariable as ModelClass;

class GlobalVariableController extends TableController
{
    protected static function modelClass(){
        return ModelClass::class;
    }

    protected function indexParams($request,$query) {

      $query = $query
        ->whereNull('chat_version_id');

      return $query;
    }

}
