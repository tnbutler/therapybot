<?php

namespace App\Modules\LogicCore;

use App\Models\ChatNode;
use App\Models\BotUser;
use App\Models\AnswerButton;
use App\Modules\Api\UserResponse;
use Mockery\CountValidator\Exception;

class NodeRulesProcessor
{
    private $_botUser;
    private $_userResponse;
    private $_chatNode;

    function __construct(BotUser $botUser, UserResponse $userResponse, ChatNode $chatNode)
    {
        $this->_botUser = $botUser;
        $this->_userResponse = $userResponse;
        $this->_chatNode = $chatNode;
    }

    public function processRules()
    {
        // User clicked the button, the next node is defined in this button
        if ($this->_userResponse->isButtonAnswer()) {
            $answerButton = AnswerButton::find($this->_userResponse->getButtonId());
            //echo "AAA";
            return $this->_getChatNodeById($answerButton->child_chat_node_id);
        }

        // It's text answer - try to recognize instruction
        $semanticAnalysis = new SemanticAnalysis;
        foreach ($this->_chatNode->answerButtons as $questionButton) {
            if (isset($questionButton->dictionary_group_id)) {
                if ($semanticAnalysis->instructionFind($this->_userResponse->getMessage(), $questionButton->dictionary_group_id)) {
                    return $this->_getChatNodeById($questionButton->child_chat_node_id);
                }
            }
        }

        // No text recognized - use 'not recognized node'
        return $this->_getChatNodeById($this->_chatNode->not_recognized_chat_node_id);
    }

    private function _getChatNodeById($chat_node_id)
    {
        $chatNode = ChatNode::find($chat_node_id);
        if (!$chatNode) {
            $exceptionText = trans('exceptions.cant_find_chat_node') . ": " . $chat_node_id;
            throw new Exception($exceptionText);
        }
        return $chatNode;
    }
}