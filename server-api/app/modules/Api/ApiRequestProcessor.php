<?php

namespace App\Modules\Api;

class ApiRequestProcessor
{
    private $userId;

    function __construct($userId)
    {
        $this->userId = $userId;
    }

    public function processRequest($message)
    {
        $responseMessage = "Sample Response text, RE: " . $message;
        return new ApiResponse($this->userId, $responseMessage);
    }
}