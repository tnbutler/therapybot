<?php

namespace App\Http\Controllers\ApiAdapters;

use App\Http\Controllers\Controller;
use App\Modules\Api\ApiRequestProcessor;

class DemoController extends Controller
{
    public function processWebHookCall()
    {
        $user = "5555";
        $message = "Test Message";
        $apiRequestProcessor = new ApiRequestProcessor();
        return $apiRequestProcessor->processRequest($user, $message);
    }
}