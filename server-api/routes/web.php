<?php

Route::get('/', function () {
    return view('welcome');
});

Route::match(['get', 'post', 'options'], 'demoApi', 'ApiAdapters\DemoController@processWebHookCall');