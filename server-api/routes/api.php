<?php


$router->pattern('id', '[0-9]+');

function registerTableController($controller){

    Route::get('/',        $controller.'@index'); //->middleware('cors');
    Route::get('/deleted', $controller.'@index'); //->middleware('cors');
    Route::get('/all',     $controller.'@index'); //->middleware('cors');
    Route::get('/{id}',    $controller.'@index');

    Route::delete('/{id}', $controller.'@delete')->where('id', '[0-9]+');//->middleware('cors');
    Route::post('/',       $controller.'@insert')->where('id', '[0-9]+');//->middleware('cors');
    Route::post('/{id}',   $controller.'@update')->where('id', '[0-9]+');//->middleware('cors');
}


Route::get('/version', function () {
    return '0.03';
});

Route::get('image/{fileId}','FileController@image');
Route::post('upload','FileController@upload');


Route::group(['prefix' => 'chat_version'], function () {
    registerTableController('ChatVersionController');
});

Route::group(['prefix' => 'user_variable'], function () {
    registerTableController('UserVariableController');
});

Route::group(['prefix' => 'global_variable'], function () {
    registerTableController('GlobalVariableController');
});

Route::group(['prefix' => 'local_variable'], function () {
    registerTableController('LocalVariableController');
});
