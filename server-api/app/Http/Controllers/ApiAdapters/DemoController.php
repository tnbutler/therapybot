<?php

namespace App\Http\Controllers\ApiAdapters;

use App\Http\Controllers\Controller;
use App\Modules\Api\ApiRequestProcessor;
use App\Modules\Api\ApiResponse;
use App\Modules\Api\UserResponse;
use Illuminate\Http\Request;
use App\Modules\BotUserProcessing;

class DemoController extends Controller
{
    const BUTTON_REQUEST_VAR_NAME = '';
    const CHAT_VERSION = 1;                 // Right now, we don't get the chat version from user's response.

    public function processWebHookCall(Request $request)
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: Content-Type');

        $userId = $request->input('user');
        $message = $request->input('message');
        $buttonId = $request->input('buttonId') == '' ? null : intval($request->input('buttonId'));

        // Get user for this connection
        $botUserProcessing = new BotUserProcessing();
        $user = $botUserProcessing->getOrCreate($userId);

        // Create user response
        $userResponse = new UserResponse($message, $buttonId, self::CHAT_VERSION);

        // Process message and receive response
        $apiRequestProcessor = new ApiRequestProcessor($user);
        $response = $apiRequestProcessor->processRequest($userResponse, $buttonId);

        // Send response
        $this->_emulateTypingDelay();
        return $this->_formatResponse($response);
    }

    private function _formatResponse(ApiResponse $apiResponse)
    {
        $answerButtons = $apiResponse->getAnswerButtons();
        $answerButtonsFormatted = [];
        foreach ($answerButtons as $answerButton) {
            $answerButtonsFormatted[] = array(
                'id' => $answerButton->id,
                'text' => $answerButton->text);
        }

        $dataToOutput = array(
            'user' => $apiResponse->getUser(),
            'message' => $apiResponse->getMessage(),
            'buttons' => $answerButtonsFormatted);

        return json_encode($dataToOutput);
    }

    private function _emulateTypingDelay()
    {
        // TODO: Sleep random time (maybe 0.5 or 1 second) - to emulate delay
    }
}