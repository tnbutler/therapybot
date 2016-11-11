<?php

namespace App\Modules\LogicCore;

use App\Models\ChatLogRecord;
use App\Models\ChatNode;
use App\Models\BotUser;

class ChatFlow
{
    private $botUser;

    function __construct(BotUser $botUser)
    {
        $this->botUser = $botUser;
    }

    public function getNextChatNode()
    {
        $chatNode = $this->_getNextChatNode();

        $this->_logAskedQuestion($chatNode);

        return $chatNode;
    }

    private function _logAskedQuestion(ChatNode $chatNode)
    {
        $chatLogRecord = new ChatLogRecord;
        $chatLogRecord->bot_users_id = $this->botUser->id;
        $chatLogRecord->is_bot_question = true;
        $chatLogRecord->chat_nodes_id = $chatNode->id;
        $chatLogRecord->save();
    }

    private function _getNextChatNode()
    {
        $lastChatLogRecord = ChatLogRecord::where('bot_users_id', $this->botUser->id)
            ->orderBy('created_at', 'desc')
            ->take(1)
            ->get();

        if (sizeof($lastChatLogRecord) > 0) {
            // TODO: process answer somehow
            echo "AAAA!";
            return null;
        }

        return ChatNode::where('is_start_node', 1)->first();
    }
}