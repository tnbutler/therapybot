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
        $userId = $request->input('user');
        $message = $request->input('message');

        $botUserProcessing = new BotUserProcessing();
        $user = $botUserProcessing->getOrCreate($userId);

        $apiRequestProcessor = new ApiRequestProcessor($user);

        $response = $apiRequestProcessor->processRequest($message);

        $formattedResponse = array(
            'user' => $response->getUser(),
            'message' => $response->getMessage());

        $this->_emulateTypingDelay();

        return json_encode($formattedResponse);
    }

    private function _emulateTypingDelay()
    {
        // TODO: Sleep random time (maybe 0.5 or 1 second) - to emulate delay
    }
}