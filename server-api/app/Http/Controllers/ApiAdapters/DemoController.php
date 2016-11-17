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

        // Get user for this connection
        $botUserProcessing = new BotUserProcessing();
        $user = $botUserProcessing->getOrCreate($userId);

        // Process message and receive response
        $apiRequestProcessor = new ApiRequestProcessor($user);
        $response = $apiRequestProcessor->processRequest($message);

        // Format the answer
        $answerButtons = $response->getAnswerButtons();
        $answerButtonsFormatted = [];
        foreach ($answerButtons as $answerButton) {
            $answerButtonsFormatted[] = array(
                'id' => $answerButton->id,
                'text' => $answerButton->text
            );
        }

        $formattedResponse = array(
            'user' => $response->getUser(),
            'message' => $response->getMessage(),
            'buttons' => $answerButtonsFormatted);

        $this->_emulateTypingDelay();

        return json_encode($formattedResponse);
    }

    private function _emulateTypingDelay()
    {
        // TODO: Sleep random time (maybe 0.5 or 1 second) - to emulate delay
    }
}