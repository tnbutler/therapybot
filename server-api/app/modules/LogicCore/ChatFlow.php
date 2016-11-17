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

    /**
     * @return ChatNode Next chat node including question to ask.
     * @param string $message User's text response.
     * @param integer $buttonId User's button response.
     */
    public function processUserAnswer($message, $buttonId)
    {
        // Get next chat node, depending on the user's answer
        $chatNode = $this->_getNextChatNode($message, $buttonId);

        // Save the question
        $this->_logChatRecord($chatNode, true);

        return $chatNode;
    }

    private function _getNextChatNode($messageText, $buttonId)
    {
        // Find the last asked question, if any
        $lastChatLogRecord = ChatLogRecord::where('bot_users_id', $this->botUser->id)
            ->orderBy('created_at', 'desc')
            ->first();

        // Process user's reply to the question
        if ($lastChatLogRecord) {
            $chatNode = ChatNode::find($lastChatLogRecord->chat_nodes_id)->first();

            // Save the answer
            $this->_logChatRecord($chatNode, false, $messageText, $buttonId);

            // Set user variables
            $userVariableName = $chatNode->user_variable_name;
            if (isset($userVariableName)) {
                $userVariables = new UserVariables($this->botUser);
                $userVariables->set($userVariableName, $messageText);
            }

            // Get the next node, by processing the rules
            $nodeRulesProcessor = new NodeRulesProcessor($this->botUser, $messageText, $chatNode);
            return $nodeRulesProcessor->processRules();
        }

        // Ask the start question
        return ChatNode::where('is_start_node', 1)->first();
    }

    private function _logChatRecord(ChatNode $chatNode, $is_bot_question, $messageText = '', $buttonId = null)
    {
        $chatLogRecord = new ChatLogRecord;
        $chatLogRecord->bot_users_id = $this->botUser->id;
        $chatLogRecord->chat_nodes_id = $chatNode->id;
        $chatLogRecord->is_bot_question = $is_bot_question;
        $chatLogRecord->message_text = $is_bot_question ? null : $messageText;
        $chatLogRecord->answer_buttons_id = $is_bot_question ? null : $buttonId;
        $chatLogRecord->save();
    }
}