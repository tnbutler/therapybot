<?php

namespace App\Modules\LogicCore;

use App\Models\UserVariable;
use App\Models\BotUser;
use App\Modules\BotUserProcessing;

class UserVariables
{
    private $botUser;

    const USER_NAME_VARIABLE = 'USER_NAME';

    function __construct(BotUser $botUser)
    {
        $this->botUser = $botUser;
    }

    public function set($varName, $value)
    {
        // Try to find
        $userVariable = UserVariable::where([
            ['bot_users_id', '=', $this->botUser->id],
            ['variable_name', '=', $varName]])
            ->orderBy('updated_at', 'desc')
            ->first();

        // Create, if not found
        if (!$userVariable) {
            $userVariable = new UserVariable;
            $userVariable->bot_users_id = $this->botUser->id;
            $userVariable->variable_name = $varName;
        }

        // Set value & save
        $userVariable->value = $value;
        $userVariable->save();          // Method save does not exist.

        // Custom processing rules for some variables
        if ($varName == self::USER_NAME_VARIABLE) {
            $botUserProcessing = new BotUserProcessing();
            $botUserProcessing->setName($this->botUser->id, $value);
        }
    }
}