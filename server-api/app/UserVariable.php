<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
//use Illuminate\Support\Facades\DB;
//use App\UserIdInterface;
//use App\UserIdTrait;
//use Sentinel;

//use App\Rcategory as RCategory;
//use App\Rstore as RStore;

class UserVariable extends Table // implements UserIdInterface
{
//    use UserIdTrait;


    protected $casts = [
        'is_system' => 'boolean',
    ];


    static public $quicks = ['name'];  //quick search fields
    protected $orderby = ['name','updated_at'];

/*
    protected $appends = ['safe_photo']; // virtual field name
*/

    public function chat_version()
    {
        return $this->belongsTo('App\ChatVersion')->withTrashed()->select( 'id','name');
    }
/*
    public function getSafePhotoAttribute()  // virtual field value
    {
        $pattern = '/image/';

        $photo = $this->photo;
        $pos = +strpos($photo,$pattern);
        if ($pos > 0) {

            $photo = config('app.url').'/pwb'.substr($photo,$pos);
        }

        return $photo;
    }

    public function listFields($query)
    {
        $user= Sentinel::check();
        $user_id = $user->id;
        return $query

            ->select('id','name', 'user_id','blog_category_id', 'updated_at','published','public_access')
            ->with('user')
            ->with('blog_category')
            ;
    }

    public function mixin($result) {
        $result['_blog_category'] =   $this->indexBlogCategory();
        return $result;
    }

    public function afterReadModel($result) {
        $result['_users'] = $this->indexUser();
        $result['_blog_category'] = $this->indexBlogCategory();
    }
*/

    public function listFields($query)
    {
        return $query
            ->select('id', 'name','is_system','chat_version_id','updated_at')
            ->with('chat_version')
            //->with('subscription_type')
            ;
    }


}
