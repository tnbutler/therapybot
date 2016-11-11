<?php

namespace App\Modules\LogicCore;

use App\Models\ChatNode;
use App\Models\BotUser;

class SystemVariables
{
    private $botUser;
    private $messageText;
    private $chatNode;

    function __construct(BotUser $botUser, $messageText, ChatNode $chatNode)
    {
        $this->botUser = $botUser;
        $this->messageText = $messageText;
        $this->chatNode = $chatNode;
    }

    public function set()
    {
        // TODO: Implement me!
    }
}