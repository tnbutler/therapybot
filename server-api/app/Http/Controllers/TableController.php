<?php
/**
 * Created by PhpStorm.
 * User: Alexander Spazhev
 * Date: 18.10.2016
 * Time: 19:06
 */
namespace App\Http\Controllers;

//use Sentinel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Session;

//use App\UserIdInterface;

use App\Table as ModelClass;

const DEFAULT_PER_PAGE = 16;
const MIN_PER_PAGE = 1;
const MAX_PER_PAGE = 100;

//abstract
class TableController extends Controller
{

    protected static function modelClass()
    {
        return ModelClass::class;
    }

    //function ModelName() {
    //    return Str::snake(class_basename($this->modelClass())); // "chart_template_type" == $Model->getTable()
    //}

    protected function baseQuery(){

        $modelClass = $this::modelClass();
        return $modelClass::query();
    }

    public function model() {
        $modelClass = $this::modelClass();
        return new $modelClass;
    }


    protected function fillModel(Request $request,ModelClass $model) {

        //$content = (array) $request->getContent(); // $request->all()
        //$content = json_decode($request->getContent(),true); // $request->all()


        $content = (array) json_decode($request->getContent());

        //$data = array_map(function($object){
        //    return (array) $object;
        //}, $content);
//        $content = get_object_vars($content);
//
//        return $content;

        $input_values = array_filter($content,
            function ($value,$key) {
                return (!str_is('_*',$key)) & (!is_object($value)) ;
            }, ARRAY_FILTER_USE_BOTH );

  //      return $input_values;

        $values = array_diff_key($input_values,array_fill_keys($model->getGuarded(),null),array_fill_keys($model->getAppends(),null));

        if (method_exists($model,'user')) {
            unset($values['user_id']);
        }

        $model->fill($values);
    }

    //---------------------------------------------------------------------------------------------

    public function download(Request $request) {

        $src_filename = realpath(base_path('storage\app\public\test_download.txt'));
        $filename = 'test_download.txt';

        $tempImage = tempnam(sys_get_temp_dir(), $filename);
        copy($src_filename, $tempImage);

        // return response()->json($src_filename);

        return response()->download($tempImage, $filename);

    }


    public function addUserId($model)
    {
/*
        if ($model instanceof UserIdInterface) {

            $user = Sentinel::check();

            if (!$user) {
                throw new AuthenticationException('Undefined user.');
            }
            $model->user_id = $user->id;
        }
*/
    }

    protected function whereUserId($request,$query,$model) {
/*
        if ($model instanceof UserIdInterface) {

            $user_id = $request->user_id;
            if ($user_id) {
                $query = $query->where('user_id','=',$user_id);
            }
            $user = Sentinel::check();
            if (!$user->hasAccess('admin')) {
                if ($user_id != $user->id) {
                    $query = $query->where('user_id', '=', $user->id);
                }
            }
        }
*/
        return $query;

    }


    protected function indexParams($request,$query) {
        return $query;
    }

    public function addFilter(Request $request,$query,$filterColumns)
    {
        $filter = $request->filter;
        if ($filter) {
            $like = trim($filter);
            if (strlen($like) > 0) {
                $like = '%' . $like . '%';
                $query = $query->where(function ($query) use ($like, $filterColumns) {
                    foreach ($filterColumns as $column) {
                        $query = $query->orWhere($column, 'like', $like);
                    }
                });
            };
        };
    }


    public function paginate($request,$query)
    {
        $per_page = (int)$request->per_page;
        if ($per_page == 0) {
            $per_page = DEFAULT_PER_PAGE;
        };
        $per_page = min(max($per_page, MIN_PER_PAGE), MAX_PER_PAGE);

        return $query->paginate($per_page)->toArray();
    }

    public function index(Request $request)
    {
        $modelClass = $this::modelClass();
        $model = new $modelClass;

        if (preg_match('/^([0-9]+)/',$request->id)) {

            $result = $this->find($request,$request->id);

            //return response()->json(is_null($result));

            if ($result) {

                // check access .....

                if ($result->isLocked()) {
                    return response()->json(["error" => "Record is locked."]);
                }
                if ($result->isDraft()) {
                    return response()->json(["error" => "Record is draft."]);
                }

            }
            else {
                $result = $model;
                $this->addUserId($result);
                $result->onNewModel($request);
            }

            //var_dump($result);

            $result->afterReadModel($result);

            return response()->json($result);
        }

        if ($request->has('id')) {
            abort(404,'Invalid parameter id: '.$request->id);
        }

        $query = $modelClass::query();
        $path = $request->path();

        if (preg_match('/\/deleted$/',$path)) {
            $query = $query->onlyTrashed(); //->orderBy('deleted_at', 'desc');
        }
        elseif (preg_match('/\/all$/',$path)) {
            $query = $query->withTrashed();
        };

        //$values = $request->all();
        //return response()->json($values);


        $this->addFilter($request,$query,$modelClass::$quicks);


        $query = $this->whereUserId($request,$query,$model);


        $query = $this->indexParams($request,$query);
        //return response()->json($query->toSql());

        $orderby = trim($request->orderby);
        if ($orderby) {
            $names = explode(",", strtolower($orderby));
        }else {
            $names = $model->getOrderby();
        };




        foreach ($names as $name){
            $name =trim($name); // ������������� � url: '+' --> ' '

            if ($name{0}=='-') {
                $name = substr($name, 1);
                $order = 'desc';
            }
            elseif ($name{0}=='+') {
                $name = substr($name, 1);
                $order = 'asc';
            }
            else {
               $order = 'asc';
            };
            $query = $query->orderBy($name, $order);

        }

        $model->listFields($query);

        //return response()->json($query->toSql());


        $per_page = (int) $request->per_page;
        if ($per_page==0) {$per_page=DEFAULT_PER_PAGE;};
        $per_page = min(max($per_page, MIN_PER_PAGE),MAX_PER_PAGE);

        //$result = $query->paginate($per_page)->toArray();


        $result = $model->mixin($query->paginate($per_page)->toArray());

        //var_dump($result);

        return response()->json($result);
    }

    public function stub(){

        $model = $this->baseQuery()->findOrNew(0);
//        $model = new $modelClass;
//        $model->
        return response()->json($model->toArray());
    }

/*
     public function show($id)
    {

        return response()->json($this->baseQuery()->withTrashed()->find($id));
    }
*/


    public function find(Request $request,$id) {

        $modelClass = $this::modelClass();
        $model = new $modelClass;
        $query = $modelClass::query();

        $query = $query->withTrashed();
        $query = $this->whereUserId($request,$query,$model);

        return $query->find($id);
    }

    ////////////////////////////////////////////////////////////////////////////

    public function insert(Request $request)
    {
        $modelClass = $this::modelClass();
        $model = new $modelClass;

        $this->fillModel($request,$model);
        $this->addUserId($model);

        $model->beforeSave();
        $model->save();
        $model->afterSaved();

        $model->afterReadModel($model);

        return response()->json($model);
    }


    public function update(Request $request,$id)
    {
        $model = $this->find($request,$id);

        if ($model) {
            $this->fillModel($request,$model);
            $model->beforeSave();
            $model->save();
            $model->afterSaved();

            $model->afterReadModel($model);

        }
        return response()->json($model);
    }

    public function delete(Request $request,$id)
    {
        $model = $this->find($request,$id);

        if ($model) {
            $modelClass = $this::modelClass();
            $count = $modelClass::destroy($id);
            $model->afterDelete();
        }
        else {
            $count = 0;
        }

        return response()->json(array('Number of deleted objects:' => $count));
    }


    public function is_locked(Request $request,$id) {

        $model = $this->find($request,$id);

        $result = false;
        if ($model) {
            $result = $model->isLocked();
        }
        return response()->json(array('locked' => $result));
    }



}
