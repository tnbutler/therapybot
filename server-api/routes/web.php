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

    Route::group(['prefix' => 'questions'], function () {
        Route::get('{questionId?}', 'QuestionsController@show');
        Route::post('', 'QuestionsController@create');
        Route::put('{questionId}', 'QuestionsController@update');
        Route::delete('{questionId}', 'QuestionsController@destroy');


        Route::group(['prefix' => '{questionId}/rules'], function () {
            Route::get('', 'RulesController@index');
            Route::post('', 'RulesController@create');
            Route::put('{ruleId}', 'RulesController@update');
            Route::delete('{ruleId}', 'RulesController@destroy');
        });
    });

    Route::get('uservars', 'UserVarsController@index');
    Route::get('dictionaries', 'DictionaryGroupsController@index');
});