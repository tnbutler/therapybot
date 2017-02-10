<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\LocalVariable as ModelClass;

class LocalVariableController extends TableController
{
    protected static function modelClass(){
        return ModelClass::class;
    }

    protected function indexParams($request,$query) {

        $chat_version_id = +$request->chat_version_id;
        //if ($chat_version_id) {
            $query = $query->where('chat_version_id', $chat_version_id);
        //}

        return $query;
    }

}
