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

    public function processUserAnswer($message)
    {
        $chatNode = $this->_getNextChatNode($message);
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

    private function _getNextChatNode($message)
    {
        // Find the lst asked question, if any
        $lastChatLogRecord = ChatLogRecord::where('bot_users_id', $this->botUser->id)
            ->orderBy('created_at', 'desc')
            ->take(1)
            ->get();

        // Process user's reply to the question
        if (!$lastChatLogRecord->isEmpty()) {
            $chatNode = ChatNode::find($lastChatLogRecord->first()->chat_nodes_id);
            $answerProcessor = new AnswerProcessor($this->botUser, $message, $chatNode);
            return $answerProcessor->process();
        }

        // Ask the start question
        return ChatNode::where('is_start_node', 1)->first();
    }
}