<?php

namespace App\Modules\Api;

use App\Modules\LogicCore\ChatFlow;
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
        $chatFlow = new ChatFlow($this->botUser, $userResponse->getChatVersionId());
        $nextChatNode = $chatFlow->processUserAnswer($userResponse);

        $responseMessage = $nextChatNode->getTextWithUserVariableValues($this->botUser);
        $answerButtons = $nextChatNode->answerButtons->where("is_visible", "1");

        return new ApiResponse($this->botUser->id, $responseMessage, $answerButtons);
    }
}