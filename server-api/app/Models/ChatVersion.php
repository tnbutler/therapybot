<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatVersion extends Model
{
    public function chatNodes()
    {
        return $this->hasMany('App\Models\ChatNode');
    }
}