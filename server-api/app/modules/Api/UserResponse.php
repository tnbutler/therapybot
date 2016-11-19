<?php

namespace App\Modules\Api;

use App\Models\AnswerButton;

class UserResponse
{
    private $message;
    private $buttonId;

    function __construct($message, $buttonId)
    {
        $this->message = $message;
        $this->buttonId = $buttonId;
    }

    public function getMessage()
    {
        return $this->message;
    }

    public function getButtonId()
    {
        return $this->buttonId;
    }

    public function isButtonAnswer()
    {
        return $this->buttonId != null;
    }

    public function getUserVariableValue()
    {
        if ($this->isButtonAnswer()) {
            $answerButton = AnswerButton::find($this->buttonId);
            if ($answerButton) {
                return $answerButton->text;
            }
        }

        return $this->message;
    }
}