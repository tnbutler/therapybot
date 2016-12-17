<?php

/**
 * The service is responsible for CRUD operations over AnswerButton objects.
 *
 * @since      Class available since Release 0.1.0
 * @deprecated Class is not deprecated
 */

namespace App\Modules\Services\AdminPanel;

use App\Models\AnswerButton;
use App\Models\ChatNode;

class AnswerButtonService implements AdminPanelServiceInterface
{
    private $_chatNodeId;

    /**
     * Constructor.
     *
     * @param integer $chatNodeId Chat Node entity ID
     */
    function __construct($chatNodeId)
    {
        $this->_chatNodeId = $chatNodeId;
    }

    /**
     * Get by ID single Answer Button entity.
     *
     * @param integer $answerButtonId Answer button id to get
     * @return AnswerButton AnswerButton entity
     */
    public function get($answerButtonId)
    {
        return AnswerButton::find($answerButtonId);
    }

    /**
     * Get list of Answer Buttons for the given Chat Node.
     *
     * @return array  Array of AnswerButton entities
     */
    public function getList()
    {
        $chatNode = ChatNode::find($this->_chatNodeId);
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

    /**
     * Save Answer Button record to Database.
     *
     * @param $answerButton AnswerButton Answer Button entity to save
     * @return integer Id of the saved entity
     */
    public function save($answerButton)
    {
        $answerButton->save();
        return $answerButton->id;
    }

    /**
     * Delete single Answer Button entity by ID.
     *
     * @param integer $answerButtonId Answer Button id to delete
     */
    public function delete($answerButtonId)
    {
        $answerButton = AnswerButton::find($answerButtonId);
        $answerButton->delete();
    }
}