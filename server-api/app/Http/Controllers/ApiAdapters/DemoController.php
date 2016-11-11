<?php

namespace App\Http\Controllers\ApiAdapters;

use App\Http\Controllers\Controller;
use App\Modules\Api\ApiRequestProcessor;
use Illuminate\Http\Request;
use App\Modules\BotUserProcessing;

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

        $this->_emulateTypingDelay();

        return json_encode($formattedResponse);
    }

    private function _getUserId($userId)
    {
        $botUserProcessing = new BotUserProcessing();

        if (isset($userId) && $botUserProcessing->exists($userId)) {
            return $userId;
        }

        return $botUserProcessing->createNew();
    }

    private function _emulateTypingDelay()
    {
        // TODO: Sleep random time (maybe 0.5 or 1 second) - to emulate delay
    }
}