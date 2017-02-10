<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: PUT, DELETE, GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Authorization, X-CSRF-TOKEN , Origin, Accept ' );  //X-CSRF-TOKEN: ��. VerifyCsrfToken


// Browsers perform OPTION-calls before every actual call to check if cross-origin requests are allowed.
// We catch them here, and return nothing.
Route::options('/{any}', function () {
    return "";
})->where('any', '.*');

Route::get('/', function () {
    return view('welcome');
});

// Demo interface API requests
Route::match(['get', 'post'], 'demoApi', 'ApiAdapters\DemoController@processWebHookCall');

// Facebook messenger
Route::match(['get', 'post'], 'fb', 'FbController@messenger');

// Twilio sms client

Route::match(['get', 'post'], 'twilio', 'TwilioController@messenger');


// Admin panel API requests
Route::group(['prefix' => 'admin', 'namespace' => 'AdminPanel'], function () {

    Route::group(['prefix' => 'versions'], function () {
//        Route::get('', 'ChatVersionController@index');
//        Route::get('{chatVersionId}', 'ChatVersionController@index');
//        Route::post('', 'ChatVersionController@create');
        Route::post('copy/{chatVersionId}', 'ChatVersionControllerObj@copy');
//        Route::put('{chatVersionId}', 'ChatVersionController@update');
//        Route::delete('{chatVersionId}', 'ChatVersionController@delete');
    });

    Route::group(['prefix' => 'reports'], function () {
        Route::get('moodCheckReport', 'ReportsController@moodCheckReport');
    });

    Route::group(['prefix' => 'v{chatVersionId}'], function () {
        Route::group(['prefix' => 'questions'], function () {
            Route::get('{chatNodeId?}', function ($chatVersionId, $chatNodeId = null) {
                return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->show($chatNodeId);
            });
            Route::post('', function ($chatVersionId) {
                $request = Request::instance();
                return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->create($request);
            });
            Route::put('{chatNodeId}', function ($chatVersionId, $chatNodeId) {
                $request = Request::instance();
                return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->update($chatNodeId, $request);
            });
            Route::delete('{chatNodeId}', function ($chatVersionId, $chatNodeId = null) {
                return App::make('App\Http\Controllers\AdminPanel\ChatNodeController')->delete($chatNodeId);
            });
            Route::group(['prefix' => '{chatNodeId}/rules'], function () {
                Route::get('{answerButtonId?}', function ($chatVersionId, $chatNodeId, $answerButtonId = null) {
                    return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->index($answerButtonId);
                });
                Route::post('', function ($chatVersionId, $chatNodeId) {
                    $request = Request::instance();
                    return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->create($request);
                });
                Route::put('{answerButtonId}', function ($chatVersionId, $chatNodeId, $answerButtonId) {
                    $request = Request::instance();
                    return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->update($answerButtonId, $request);
                });
                Route::delete('{answerButtonId}', function ($chatVersionId, $chatNodeId, $answerButtonId) {
                    return App::make('App\Http\Controllers\AdminPanel\AnswerButtonController')->delete($answerButtonId);
                });
            });
        });

        Route::get('uservars', 'UserVarsController@index');
        Route::get('dictionaries', 'DictionaryGroupsController@index');
    });
});
