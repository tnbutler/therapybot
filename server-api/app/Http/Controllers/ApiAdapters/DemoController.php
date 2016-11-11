<?php

namespace App\Http\Controllers\ApiAdapters;

use App\Http\Controllers\Controller;
use App\Modules\Api\ApiRequestProcessor;
use Illuminate\Http\Request;
use App\Modules\BotUser;

class DemoController extends Controller
{
    public function processWebHookCall(Request $request)
    {
        $user = $request->input('user');
        $message = $request->input('message');

        $userId = $this->_getUserId($user);
        $apiRequestProcessor = new ApiRequestProcessor($userId);

        $response = $apiRequestProcessor->processRequest($message);

        $formattedResponse = array(
            'user' => $response->getUser(),
            'message' => $response->getMessage());

        return json_encode($formattedResponse);
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