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
        $res = "userId = ".$this->userId.", message = ".$message;
        return $res;
    }
}