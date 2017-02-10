<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use App\Modules\Services\ChatVersionService;

class ChatVersion extends Table // implements UserIdInterface
{
//    use UserIdTrait;


    protected $casts = [
        'is_active' => 'boolean',
    ];


    static public $quicks = ['name'];  //quick search fields
    protected $orderby = ['name','updated_at'];

/*
    protected $appends = ['safe_photo']; // virtual field name

    public function blog_category()
    {
        return $this->belongsTo('App\BlogCategory')->withTrashed()->select( 'id','name');
    }

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
            ->select('id', 'name','is_active','updated_at')
            //->with('user')
            //->with('subscription_type')
            ;
    }

    public function onNewModel(Request $request)
    {
        $this->name = 'New chat'; // $request->input('name');
        $this->is_active = true; // $request->input('is_active');

        $chatVersionService = new ChatVersionService();

        $this->id = $chatVersionService->save($this);
    }

    public function afterSaved() {
        if ($this->is_active) {
            $chatVersionService = new ChatVersionService();
            $chatVersionService->setActiveVersion($this);
        }
    }

    public function afterDelete() {

        $wasActive = $this->is_active;
        // If we just deleted the active chat, set any other chat to be active.
        if ($wasActive) {
            $anyOtherChatId = ChatVersion::first();
            if ($anyOtherChatId) {

                $anyOtherChatId->is_active = true;
                $chatVersionService = new ChatVersionService();
                $chatVersionService->save($anyOtherChatId);

            }
        }

    }



}
