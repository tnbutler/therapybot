<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserVariableValue extends Model
{
    public function userVariable()
    {
        return $this->belongsTo('App\Models\UserVariable');
    }
}