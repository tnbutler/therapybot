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
Route::group(['prefix' => 'admin/v{_chatVersionId}', 'namespace' => 'AdminPanel'], function () {
    Route::group(['prefix' => 'questions'], function () {
        Route::get('{_chatNodeId?}', function ($chatVersionId, $chatNodeId = null) {
            return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->show($chatNodeId);
        });
        Route::post('', function ($chatVersionId) {
            return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->create();
        });
        Route::put('{_chatNodeId}', function ($chatVersionId, $chatNodeId) {
            return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->update($chatNodeId);
        });
        Route::delete('{_chatNodeId}', function ($chatVersionId, $chatNodeId = null) {
            return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->delete($chatNodeId);
        });
        Route::group(['prefix' => '{_chatNodeId}/rules'], function () {
            Route::get('{answerButtonId?}', function ($chatVersionId, $chatNodeId, $answerButtonId = null) {
                return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->index($answerButtonId);
            });
            Route::post('', function ($chatVersionId, $chatNodeId) {
                return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->create();
            });
            Route::put('{answerButtonId}', function ($chatVersionId, $chatNodeId, $answerButtonId) {
                return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->update($answerButtonId);
            });
            Route::delete('{answerButtonId}', function ($chatVersionId, $chatNodeId, $answerButtonId) {
                return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->delete($answerButtonId);
            });
        });
    });
    Route::get('uservars', 'UserVarsController@index');
    Route::get('dictionaries', 'DictionaryGroupsController@index');
});