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

class UserVariablesService
{
    private $_botUser;
    private $_botUsersService;

    const USER_NAME_VARIABLE_ID = 1;

    /**
     * Constructor.
     *
     * @param BotUser $botUser Dependency injection: need bot user entity.
     */
    function __construct(BotUser $botUser)
    {
        $this->_botUser = $botUser;
        $this->_botUsersService = new BotUsersService();
    }

    /**
     * Get list of user variable's values set for the user.
     *
     * @return array List of key/value pairs
     */
    public function getValues()
    {
        $userVariableValues = $this->_getVariable();
        return $userVariableValues;
    }

    /**
     * Set value of the given variable.
     *
     * @param integer $userVariableId User variable ID
     * @return string $value Value to set
     */
    public function set($userVariableId, $value)
    {
        // Try to find
        $userVariableValue = $this->_getVariable($userVariableId);

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
        $this->_performCustomProcessing($userVariableId, $value);
    }

    private function _getVariable($userVariableId = null)
    {
        $query = UserVariableValue::where('bot_users_id', $this->_botUser->id);

        if ($userVariableId) {
            $query->where('user_variable_id', $userVariableId);
        }

        return $query->orderBy('updated_at', 'desc')->get();
    }

    private function _performCustomProcessing($userVariableId, $value)
    {
        if ($userVariableId == self::USER_NAME_VARIABLE_ID) {
            $this->_botUsersService->setName($this->_botUser->id, $value);
        }
    }
}