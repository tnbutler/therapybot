<?php

Route::get('/', function () {
    return view('welcome');
});

Route::match(['get', 'post'], 'demoApi', 'ApiAdapters\DemoController@processWebHookCall');

// Angular2 application performs OPTION-calls for the cross-origin requests.
// We catch them here, and return nothing.
Route::options('demoApi', function () {
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Content-Type');
    return "";
});

// Admin panel API
Route::get('/admin/v{chatVersion}/questions/{questionId?}', 'AdminPanel\QuestionsController@getQuestion');