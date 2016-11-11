<?php

namespace App\Http\Controllers\ApiAdapters;

use App\Http\Controllers\Controller;
use App\Modules\Api\ApiRequestProcessor;
use App\Modules\BotUser;

class DemoController extends Controller
{
    public function processWebHookCall()
    {
        $user = "333";
        $userId = $this->_getUserId($user);
        $message = "Test Message";
        $apiRequestProcessor = new ApiRequestProcessor($userId);
        return $apiRequestProcessor->processRequest($message);
    }

    private function _getUserId($userId)
    {
        $botUser = new BotUser();

        if (isset($userId) && $botUser->exists($userId)) {
            return $userId;
        }

        return $botUser->createNew();
    }
}