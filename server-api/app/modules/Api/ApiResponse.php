<?php

namespace App\Modules\Api;

class ApiResponse
{
    private $user;
    private $message;

    function __construct($user, $message)
    {
        $this->user = $user;
        $this->message = $message;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function getMessage()
    {
        return $this->message;
    }
}