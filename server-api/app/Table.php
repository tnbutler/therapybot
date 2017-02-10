<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\DB;

class Table extends Model
{
    use SoftDeletes;

    static public $quicks = []; //quick search fields

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    protected $guarded = ['id','created_at', 'updated_at', 'deleted_at','per_page','page'];
    protected $orderby = []; // default order by field names

//    protected $indexColumns = [];
//    protected $dateFormat = 'M d,Y h:i:s';


    public function getAppends()
    {
        return $this->appends;
    }


    public function getOrderby()
    {
        return $this->orderby;
    }

    public function sqlUserName()
    {
        return "concat(last_name,', ',first_name) as name";
    }

    //-- references ----------------------------------------------------------------------------

/*
    public function indexChartTemplateType()
    {
        return DB::select('select id,name from chart_template_types order by name', []);
    }

    public function indexSubscriptionType()
    {
        return DB::select("select id,name from subscription_types order by name", []);
    }

    public function indexUser()
    {
        return DB::select("select id, member_id,".$this->sqlUserName()." from users order by name", []);
    }

    public function indexOccupation()
    {
        return DB::select("select id,name from occupations order by name", []);
    }

    public function indexRole()
    {
        return DB::select("select id,name from roles order by name", []);
    }

    public function indexProvince()
    {
        return DB::select("select id,name from provinces order by name", []);
    }

    public function indexRcategory()
    {
         return DB::select("select id,name from rcategories order by name", []);
    }

    public function indexBlogCategory()
    {
        return DB::select("select id,name from blog_categories order by name", []);
    }
*/
    //-------------------------------------------------------------------------------------------

    public function mixin($result) {
        return $result;
    }

    public function listFields($query){ return $query; }

    public function itemFields($query){ return $query; }

    public function afterReadModel($result) {}

    public function beforeSave() {}
    public function afterSaved() {}

    public function onNewModel(Request $request) {}

    public function isLocked() {
        return false;
    }

    public function isDraft() {
        return false;
    }

    
    public function afterDelete() {
        
    }
    

}
