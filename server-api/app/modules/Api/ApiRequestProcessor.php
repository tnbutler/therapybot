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
        // TODO: Start here!
        return 555;
    }
}