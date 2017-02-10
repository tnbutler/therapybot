<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

//use Illuminate\Support\Facades\DB;
//use App\UserIdInterface;
//use App\UserIdTrait;
//use Sentinel;

//use App\Rcategory as RCategory;
//use App\Rstore as RStore;

class GlobalVariable extends Table // implements UserIdInterface
{

    protected $table = 'user_variables';


    protected $casts = [
        'is_system' => 'boolean',
    ];

    static public $quicks = ['name'];  //quick search fields
    protected $orderby = ['name','updated_at'];

    
    public function listFields($query)
    {
        return $query
            ->select('id', 'name','updated_at')
            //->with('chat_version')
            //->with('subscription_type')
            ;
    }

    public function beforeSave()
    {
        $this->chat_version_id = null;
        $this->is_system = true;
    }

    public function onNewModel(Request $request) 
    {
        $this->chat_version_id = null;
        $this->is_system = true;
    }

}
