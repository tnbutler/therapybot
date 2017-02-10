<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatVersion extends Model
{
    public function chatNodes()
    {
        return $this->hasMany('App\Models\ChatNode');
    }

    public function localVariables()
    {
        return $this->hasMany('App\LocalVariable');
    }

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($chatNode) {
            // Before Chat Version is deleted, we delete all the related Chat Nodes.
            foreach ($chatNode->chatNodes as $chatNode) {
                $chatNode->delete();
            }
        });
    }
}