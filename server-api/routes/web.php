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
Route::match(['get', 'options'], '/admin/v{chatVersion}/questions/{questionId?}', 'AdminPanel\QuestionsController@questions');
Route::post('/admin/v{chatVersion}/questions/add', 'AdminPanel\QuestionsController@add');
Route::put('/admin/v{chatVersion}/questions/{questionId}', 'AdminPanel\QuestionsController@update');
Route::delete('/admin/v{chatVersion}/questions/{questionId}', 'AdminPanel\QuestionsController@delete');



Route::match(['get', 'options'], '/admin/v{chatVersion}/rules/{questionId}', 'AdminPanel\RulesController@rules');
Route::match(['get', 'options'], '/admin/v{chatVersion}/uservars', 'AdminPanel\UserVarsController@uservars');
Route::match(['get', 'options'], '/admin/dictionaries', 'AdminPanel\DictionaryGroupsController@dictionaries');
