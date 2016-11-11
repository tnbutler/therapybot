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
        $lastChatLogRecord = $this->_getLastChatLogRecord();
        if (sizeof($lastChatLogRecord) > 0) {
            // TODO: Select one with the is_start_node = 1
            echo "AAAA!";
            return null;
        }

        return $this->_getStartChatNode();
    }

    private function _getStartChatNode()
    {
        return ChatNode::where('is_start_node', 1)->first();
    }

    private function _getLastChatLogRecord()
    {
        return ChatLogRecord::where('bot_users_id', $this->botUser->id)
            ->orderBy('created_at', 'desc')
            ->take(1)
            ->get();
    }
}