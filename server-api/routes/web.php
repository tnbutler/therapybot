<?php

Route::get('/', function () {
    return view('welcome');
});

// Browsers perform OPTION-calls before every actual call to check if cross-origin requests are allowed.
// We catch them here, and return nothing.
Route::options('/{any}', function () {
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: PUT, DELETE, GET, POST');
    return "";
})->where('any', '.*');

// Demo interface API requests
Route::match(['get', 'post'], 'demoApi', 'ApiAdapters\DemoController@processWebHookCall');

// Admin panel API requests
Route::group(['prefix' => 'admin/v{chatVersion}', 'namespace' => 'AdminPanel'], function () {

    /*
    Route::resource('photo', 'PhotoController', ['only' => [
        'index', 'show'
    ]]);
    */


    Route::group(['prefix' => 'questions'], function () {
        Route::get('{questionId?}', 'QuestionsController@questions');
        Route::post('add', 'QuestionsController@add');
        Route::put('{questionId}', 'QuestionsController@update');
        Route::delete('{questionId}', 'QuestionsController@delete');
    });

    Route::group(['prefix' => 'rules'], function () {
        Route::get('{questionId}', 'RulesController@rules');
        Route::post('add', 'RulesController@add');
        Route::put('{ruleId}', 'RulesController@update');
        Route::delete('{ruleId}', 'RulesController@delete');
    });

    Route::get('uservars', 'UserVarsController@uservars');
    Route::get('dictionaries', 'DictionaryGroupsController@dictionaries');
});