<?php

Route::get('/', function () {
    return view('welcome');
});

Route::match(['get', 'post'], 'demoApi', 'ApiAdapters\DemoController@processWebHookCall');