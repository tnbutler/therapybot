<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\ChatVersion as ModelClass;

class ChatVersionController extends TableController
{
    protected static function modelClass(){
        return ModelClass::class;
    }
/*
    protected function indexParams($request,$query) {

      if ($request->has('published')) {
          $published = +$request->published;
          if ($published > 0) {
              $query = $query->where('published', '<>', 0);
          }
          else
          {
              $query = $query->where('published', '=', 0)->orWhereNull('published');
          }
      }

      if ($request->has('blog_category_id')) {
          $blog_category_id = +$request->blog_category_id;
          $query = $query->where('blog_category_id', $blog_category_id);
      }

      return $query;
    }
*/
}
