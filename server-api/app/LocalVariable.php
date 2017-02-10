<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class LocalVariable extends Table // implements UserIdInterface
{

    protected $table = 'user_variables';


    protected $casts = [
        'is_system' => 'boolean',
    ];

    static public $quicks = ['name'];  //quick search fields
    protected $orderby = ['name','updated_at'];


    public function chat_version()
    {
        return $this->belongsTo('App\ChatVersion')->withTrashed()->select( 'id','name');
    }


    public function listFields($query)
    {
        return $query
            ->select('id', 'name','chat_version_id','updated_at')
            ->with('chat_version')
            ;
    }

    public function beforeSave()
    {
        //$this->chat_version_id = null;
        $this->is_system = false;
    }

    public function onNewModel(Request $request) 
    {
        $this->chat_version_id = $request->chat_version_id;  // requiered ?
        $this->is_system = false;
    }

}
