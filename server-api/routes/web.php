<?php

// Allow CORS
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

// Browsers perform OPTION-calls before every actual call to check if cross-origin requests are allowed.
// We catch them here, and return nothing.
Route::options('/{any}', function () {
    header('Access-Control-Allow-Methods: PUT, DELETE, GET, POST');
    return "";
})->where('any', '.*');

Route::get('/', function () {
    return view('welcome');
});

// Demo interface API requests
Route::match(['get', 'post'], 'demoApi', 'ApiAdapters\DemoController@processWebHookCall');

// Admin panel API requests
Route::group(['prefix' => 'admin/v{chatVersion}', 'namespace' => 'AdminPanel'], function () {
    Route::group(['prefix' => 'questions'], function () {
        Route::get('{questionId?}', function ($chatVersion, $questionId = null) {
            return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->show($questionId);
        });
        Route::post('', function ($chatVersion) {
            return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->create();
        });
        Route::put('{questionId}', function ($chatVersion, $questionId) {
            return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->update($questionId);
        });
        Route::delete('{questionId}', function ($chatVersion, $questionId = null) {
            return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->delete($questionId);
        });
        Route::group(['prefix' => '{questionId}/rules'], function () {
            Route::get('{ruleId?}', function ($chatVersion, $questionId, $ruleId = null) {
                return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->index($ruleId);
            });
            Route::post('', function ($chatVersion, $questionId) {
                return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->create();
            });
            Route::put('{ruleId}', function ($chatVersion, $questionId, $ruleId) {
                return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->update($ruleId);
            });
            Route::delete('{ruleId}', function ($chatVersion, $questionId, $ruleId) {
                return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->delete($ruleId);
            });
        });
    });
    Route::get('uservars', 'UserVarsController@index');
    Route::get('dictionaries', 'DictionaryGroupsController@index');
});