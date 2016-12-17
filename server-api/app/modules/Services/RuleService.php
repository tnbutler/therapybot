<?php

namespace App\Modules\Services;

use App\Models\AnswerButton;
use App\Models\ChatNode;

class RuleService implements AdminPanelServiceInterface
{
    public function get($chatVersionId, $answerButtonId)
    {
        return AnswerButton::find($answerButtonId);
    }

    public function getList($chatNodeId)
    {
        $chatNode = ChatNode::find($chatNodeId);
        $results = array();
        foreach ($chatNode->answerButtons as $answerButton) {
            $nextNodeCaption = ChatNode::find($answerButton->child_chat_node_id)->getTextWithUserVariableSysNames();
            $results[] = array(
                'id' => $answerButton->id,
                'button_caption' => $answerButton->text,
                'target_question_caption' => $nextNodeCaption,
            );
        }
        return $results;
    }

    public function delete($answerButtonId)
    {
        $answerButton = AnswerButton::find($answerButtonId);
        $answerButton->delete();
    }

    /**
     * @param AnswerButton $answerButton
     * @return array
     */
    public function save($answerButton)
    {
        $errorText = $this->_validate($answerButton);

        if ($errorText != "") {
            return array('success' => 'false', 'error_text' => $errorText);
        }

        $answerButton->save();

        return array('success' => 'true', 'id' => $answerButton->id);
    }

    private function _validate(AnswerButton $answerButton)
    {
        $errorText = "";

        if (empty($answerButton->text)) {
            $errorText = "'text' is empty";
        }

        return $errorText;
    }
}