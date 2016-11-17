<?php

namespace App\Modules\Api;

class ApiResponse
{
    private $user;
    private $message;
    private $answerButtons;

    function __construct($user, $message, $answerButtons)
    {
        $this->user = $user;
        $this->message = $message;
        $this->answerButtons = $answerButtons;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function getMessage()
    {
        return $this->message;
    }

    public function getAnswerButtons()
    {
        return $this->answerButtons;
    }
}