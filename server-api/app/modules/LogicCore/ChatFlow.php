<?php

namespace App\Modules\LogicCore;

class ChatFlow
{
    private $userId;

    function __construct($userId)
    {
        $this->userId = $userId;
    }

    public function getNextQuestion()
    {
        // If there are no last nodes, then start with the first node
        if ($this->_getLastNode() === false) {
            // TODO: Select one with the is_start_node = 1
        }

    }

    private function _getLastNode()
    {
        // TODO: select last node for this user ID

        return false;
    }
}