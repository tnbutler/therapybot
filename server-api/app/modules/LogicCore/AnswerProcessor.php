<?php

namespace App\Modules\LogicCore;

use App\Models\ChatNode;
use App\Models\BotUser;
use App\Models\ChatLogRecord;

class AnswerProcessor
{
    private $botUser;

    function __construct(BotUser $botUser)
    {
        $this->botUser = $botUser;
    }

    public function process($messageText, ChatNode $chatNode)
    {
        $nextChatNode = null;

        $this->_saveUserAnswer($messageText, $chatNode);
        echo 6666;
        exit;

        return $nextChatNode;
    }

    private function _saveUserAnswer($messageText, ChatNode $chatNode)
    {
        $chatLogRecord = new ChatLogRecord;
        $chatLogRecord->bot_users_id = $this->botUser->id;
        $chatLogRecord->is_bot_question = false;
        $chatLogRecord->chat_nodes_id = $chatNode->id;
        $chatLogRecord->message_text = $messageText;
        $chatLogRecord->save();
    }
}