<?php

namespace App\Modules\Api;

use App\Models\AnswerButton;
use App\Models\ChatVersion;

class UserResponse
{
    private $_message;
    private $_buttonId;
    private $_chatVersionId;

    function __construct($message, $buttonId, ChatVersion $activeChatVersion)
    {
        $this->_message = $message;
        $this->_buttonId = $buttonId;
        $this->_chatVersionId = $activeChatVersion->id;
    }

    public function getChatVersionId()
    {
        return $this->_chatVersionId;
    }

    public function getMessage()
    {
        return $this->_message;
    }

    public function getButtonId()
    {
        return $this->_buttonId;
    }

    public function isButtonAnswer()
    {
        return $this->_buttonId != null;
    }

    public function getUserVariableValue()
    {
        if ($this->isButtonAnswer()) {
            $answerButton = AnswerButton::find($this->_buttonId);
            if ($answerButton) {
                return $answerButton->text;
            }
        }
        return $this->_message;
    }
}