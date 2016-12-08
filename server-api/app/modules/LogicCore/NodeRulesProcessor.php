<?php

namespace App\Modules\LogicCore;

use App\Models\ChatNode;
use App\Models\BotUser;
use App\Models\AnswerButton;
use App\Modules\Api\UserResponse;

class NodeRulesProcessor
{
    private $botUser;
    private $userResponse;
    private $chatNode;

    function __construct(BotUser $botUser, UserResponse $userResponse, ChatNode $chatNode)
    {
        $this->botUser = $botUser;
        $this->userResponse = $userResponse;
        $this->chatNode = $chatNode;
    }

    public function processRules()
    {
        // User clicked the button, the next node is defined in this button
        if ($this->userResponse->isButtonAnswer()) {
            $answerButton = AnswerButton::find($this->userResponse->getButtonId());
            return ChatNode::find($answerButton->child_chat_node_id);
        }

        // It's text answer - try to recognize instruction
        $semanticAnalysis = new SemanticAnalysis;
        foreach ($this->chatNode->answerButtons as $questionButton) {
            if (isset($questionButton->dictionary_group_id)) {
                if ($semanticAnalysis->instructionFind($this->userResponse->getMessage(), $questionButton->dictionary_group_id)) {
                    return ChatNode::find($questionButton->child_chat_node_id);
                }
            }
        }

        // No text recognized - use 'not recognized node'
        return ChatNode::find($this->chatNode->not_recognized_chat_node_id);
    }
}