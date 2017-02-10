<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DictionaryGroup extends Model
{
    public $timestamps = false;

    public function synonyms()
    {
        return $this->hasMany('App\Models\DictionarySynonym');
    }
}
