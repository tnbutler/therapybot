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

    public function processRequest($message)
    {
        $chatFlow = new ChatFlow($this->botUser);
        $nextChatNode = $chatFlow->processUserAnswer($message);
        $responseMessage = "RE: " . $message . ". " . $nextChatNode->getFormattedQuestionText($this->botUser);
        return new ApiResponse($this->botUser->id, $responseMessage);
    }
}