<?php

namespace App\Modules\LogicCore;

use App\Models\ChatNode;
use App\Models\BotUser;
use App\Models\NodeFlowRule;
use App\Modules\Api\UserResponse;
use App\Modules\LogicCore\SemanticAnalysis;
use Mockery\CountValidator\Exception;

class NodeRulesProcessor
{
    private $botUser;
    private $userResponse;
    private $chatNode;
    const RULE_CONDITION_GOTO = 'GOTO';
    const RULE_CONDITION_SEMANTIC_FIND = 'INSTRUCTION_FIND';

    function __construct(BotUser $botUser, UserResponse $userResponse, ChatNode $chatNode)
    {
        $this->botUser = $botUser;
        $this->userResponse = $userResponse;
        $this->chatNode = $chatNode;
    }

    public function processRules()
    {
        // Select rules for the text question or for the button clicked, depending on the user's answer
        $condition = $this->userResponse->isButtonAnswer()
            ? ['answer_buttons_id' => $this->userResponse->getButtonId()]
            : ['parent_node_id' => $this->chatNode->id];

        // Get all rules applied - in order of priority
        $nodeFlowRules = NodeFlowRule::where($condition)
            ->orderBy('execution_priority', 'asc')
            ->get();

        if ($nodeFlowRules->isEmpty()) {
            throw new Exception(trans('exceptions.no_rules_found'));
        }

        // Process all the rules in cycle
        foreach ($nodeFlowRules as $nodeFlowRule) {
            $nextChatNode = $this->_processNodeRule($nodeFlowRule);
            if ($nextChatNode != null) {
                return $nextChatNode;
            }
        }

        throw new Exception(trans('exceptions.no_rules_applied_to_answer'));
    }

    private function _processNodeRule(NodeFlowRule $nodeFlowRule)
    {
        $conditionStatement = $nodeFlowRule->getConditionStatement();
        $childNode = ChatNode::find($nodeFlowRule->child_node_id);

        // Rule with none-conditional instruction
        if ($conditionStatement == self::RULE_CONDITION_GOTO) {
            return $childNode;
        }


        // Basic semantic search - only mock-up
        if (strpos($conditionStatement, self::RULE_CONDITION_SEMANTIC_FIND) !== false) {
            $instruction = str_replace(self::RULE_CONDITION_SEMANTIC_FIND . "('", "", $conditionStatement);
            $instruction = str_replace("')", "", $instruction);
            $semanticAnalysis = new SemanticAnalysis;
            if ($semanticAnalysis->instructionFind($this->userResponse->getMessage(), $instruction)) {
                return $childNode;
            }
        }

        return null;
    }
}