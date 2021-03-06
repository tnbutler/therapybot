<?php

namespace App\Modules\LogicCore;

use App\Models\ChatLogRecord;
use App\Models\ChatNode;
use App\Models\BotUser;
use App\Modules\Api\UserResponse;
use App\Modules\Services\UserVariablesService;
use Mockery\CountValidator\Exception;

class ChatFlow
{
    private $_botUser;
    private $_chatVersionId;
    private $_userVariablesService;

    function __construct(BotUser $botUser, $chat_version_id)
    {
        $this->_botUser = $botUser;
        $this->_chatVersionId = $chat_version_id;
        $this->_userVariablesService = new UserVariablesService($this->_botUser);
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
        $lastChatLogRecord = ChatLogRecord::where(['bot_users_id' => $this->_botUser->id, 'is_bot_question' => '1'])
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
                $this->_userVariablesService->set($userVariableId, $userResponse->getUserVariableValue());
            }

            // Get the next node, by processing the rules
            $nodeRulesProcessor = new NodeRulesProcessor($this->_botUser, $userResponse, $chatNode);
            return $nodeRulesProcessor->processRules();
        }

        // Ask the start question
        $chatNode = ChatNode::where([
            'is_start_node' => 1,
            'chat_version_id' => $this->_chatVersionId
        ])->first();

        if($chatNode) {
            return $chatNode;
        }

        throw new Exception('Can\'t find start node for the chat.');
    }

    private function _logChatRecord(ChatNode $chatNode, $is_bot_question, $messageText = '', $buttonId = null)
    {
        $chatLogRecord = new ChatLogRecord;
        $chatLogRecord->bot_users_id = $this->_botUser->id;
        $chatLogRecord->chat_nodes_id = $chatNode->id;
        $chatLogRecord->is_bot_question = $is_bot_question;
        $chatLogRecord->message_text = $is_bot_question ? null : $messageText;
        $chatLogRecord->answer_buttons_id = $is_bot_question ? null : $buttonId;
        $chatLogRecord->save();
    }
}