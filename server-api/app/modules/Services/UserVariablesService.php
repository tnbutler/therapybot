<?php

/**
 * The service is responsible for all operations over User Variables.
 *
 * @since      Class available since Release 0.1.0
 * @deprecated Class is not deprecated
 */

namespace App\Modules\Services;

use App\Models\UserVariableValue;
use App\Models\BotUser;
use App\Modules\BotUserProcessing;

class UserVariablesService
{
    private $_botUser;

    const USER_NAME_VARIABLE_ID = 1;

    function __construct(BotUser $botUser)
    {
        $this->_botUser = $botUser;
    }

    public function set($userVariableId, $value)
    {
        // Try to find
        $userVariableValue = UserVariableValue::where([
            ['bot_users_id', '=', $this->_botUser->id],
            ['user_variable_id', '=', $userVariableId]])
            ->orderBy('updated_at', 'desc')
            ->first();

        // Create, if not found
        if (!$userVariableValue) {
            $userVariableValue = new UserVariableValue;
            $userVariableValue->bot_users_id = $this->_botUser->id;
            $userVariableValue->user_variable_id = $userVariableId;
        }

        // Set value & save
        $userVariableValue->value = $value;
        $userVariableValue->save();

        // Custom processing rules for some variables
        $this->performCustomProcessing($userVariableId, $value);
    }

    private function performCustomProcessing($userVariableId, $value)
    {
        if ($userVariableId == self::USER_NAME_VARIABLE_ID) {
            $botUserProcessing = new BotUserProcessing();
            $botUserProcessing->setName($this->_botUser->id, $value);
        }
    }
}