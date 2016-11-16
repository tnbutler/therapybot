<?php

namespace App\Modules\LogicCore;

use App\Models\ChatNode;
use App\Models\BotUser;
use App\Models\NodeFlowRule;
use Mockery\CountValidator\Exception;

class NodeRulesProcessor
{
    private $botUser;
    private $messageText;
    private $chatNode;
    const RULE_CONDITION_GOTO = 'GOTO';

    function __construct(BotUser $botUser, $messageText, ChatNode $chatNode)
    {
        $this->botUser = $botUser;
        $this->messageText = $messageText;
        $this->chatNode = $chatNode;
    }

    public function processRules()
    {
        // Get all rules applied to this question
        $nodeFlowRules = NodeFlowRule::where('parent_node_id', $this->chatNode->id)->get();

        if ($nodeFlowRules->isEmpty()) {
            throw new Exception(trans('exceptions.no_rules_found_for_node'));
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
        // Rule with none-conditional instruction
        if ($nodeFlowRule->condition_statement == self::RULE_CONDITION_GOTO) {
            return ChatNode::find($nodeFlowRule->child_node_id);
        }

        return null;
    }
}