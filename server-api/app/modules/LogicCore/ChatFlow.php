<?php

namespace App\Modules\LogicCore;

use App\Models\ChatLogRecord;
use App\Models\ChatNode;
use App\Models\BotUser;
use App\Modules\Api\UserResponse;

class ChatFlow
{
    private $botUser;
    private $chat_version_id;

    function __construct(BotUser $botUser, $chat_version_id)
    {
        $this->botUser = $botUser;
        $this->chat_version_id = $chat_version_id;
    }

    /**
     * @return ChatNode Next chat node including question to ask.
     */
    public function processUserAnswer(UserResponse $userResponse)
    {
        // Get next chat node, depending on the user's answer
        $chatNode = $this->_getNextChatNode($userResponse);

        // Save the question
        $this->_logChatRecord($chatNode, true);

        return $chatNode;
    }

    private function _getNextChatNode(UserResponse $userResponse)
    {
        // Find the last asked question, if any
        $lastChatLogRecord = ChatLogRecord::where(['bot_users_id' => $this->botUser->id, 'is_bot_question' => '1'])
            ->orderBy('id', 'desc')
            ->first();

        // Process user's reply to the asked question
        if ($lastChatLogRecord) {
            $chatNode = ChatNode::find($lastChatLogRecord->chat_nodes_id);

            // Save the answer
            $this->_logChatRecord($chatNode, false, $userResponse->getMessage(), $userResponse->getButtonId());

            // Set user variables
            $userVariableId = $chatNode->user_variable_id;
            if (isset($userVariableId)) {
                $userVariables = new UserVariables($this->botUser);
                $userVariables->set($userVariableId, $userResponse->getUserVariableValue());
            }

            // Get the next node, by processing the rules
            $nodeRulesProcessor = new NodeRulesProcessor($this->botUser, $userResponse, $chatNode);
            return $nodeRulesProcessor->processRules();
        }

        // Ask the start question
        return ChatNode::where([
            'is_start_node' => 1,
            'chat_version_id' => $this->chat_version_id
        ])->first();
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