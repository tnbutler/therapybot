<?php

namespace App\Modules\LogicCore;

use App\Models\ChatNode;
use App\Models\BotUser;
use App\Models\ChatLogRecord;
use App\Models\NodeFlowRule;
use Mockery\CountValidator\Exception;

class AnswerProcessor
{
    private $botUser;
    private $messageText;
    private $chatNode;

    function __construct(BotUser $botUser, $messageText, ChatNode $chatNode)
    {
        $this->botUser = $botUser;
        $this->messageText = $messageText;
        $this->chatNode = $chatNode;
    }

    public function process()
    {
        $this->_logUserAnswer();
        $this->_setSystemVariable();
        return $this->getNextChatNode();
    }

    private function getNextChatNode()
    {
        // Get all rules applied to this question
        $nodeFlowRules = NodeFlowRule::where('parent_node_id', $this->chatNode->id)->get();

        if ($nodeFlowRules->isEmpty()) {
            throw new Exception('No rules found for the question.');
        }

        // Process all the rules in cycle
        foreach ($nodeFlowRules as $nodeFlowRule) {
            $nextChatNode = $this->_processNodeRule($nodeFlowRule);
            if ($nextChatNode != null) {
                return $nextChatNode;
            }
        }

        throw new Exception('No rules applied to the answer.');
    }

    private function _processNodeRule(NodeFlowRule $nodeFlowRule)
    {
        return null;
    }

    private function _setSystemVariable()
    {
        // TODO: Set system variable, if required.
        // TODO: Design the system variables system: where to store, how to update || load
    }

    private function _logUserAnswer()
    {
        $chatLogRecord = new ChatLogRecord;
        $chatLogRecord->bot_users_id = $this->botUser->id;
        $chatLogRecord->is_bot_question = false;
        $chatLogRecord->chat_nodes_id = $this->chatNode->id;
        $chatLogRecord->message_text = $this->messageText;
        $chatLogRecord->save();
    }
}