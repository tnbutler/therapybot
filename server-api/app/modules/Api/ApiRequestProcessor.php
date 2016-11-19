<?php

namespace App\Modules\Api;

use App\Modules\LogicCore\ChatFlow;
use App\Modules\Api\UserResponse;
use App\Models\BotUser;

class ApiRequestProcessor
{
    private $botUser;

    function __construct(BotUser $botUser)
    {
        $this->botUser = $botUser;
    }

    public function processRequest(UserResponse $userResponse)
    {
        $chatFlow = new ChatFlow($this->botUser);
        $nextChatNode = $chatFlow->processUserAnswer($userResponse);

        $responseMessage = $nextChatNode->getFormattedQuestionText($this->botUser);
        $answerButtons = $nextChatNode->answerButtons;

        return new ApiResponse($this->botUser->id, $responseMessage, $answerButtons);
    }
}