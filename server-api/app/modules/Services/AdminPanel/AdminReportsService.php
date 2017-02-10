<?php

namespace App\Modules\Services\AdminPanel;

use App\Models\BotUser;
use App\Modules\Services\UserVariablesService;

class AdminReportsService
{
    public function moodCheckReport()
    {
        $botUsers = BotUser::orderby('created_at', 'desc')->get();

        $result = array();

        foreach($botUsers as $botUser) {
            if(empty($botUser->name)) {
                continue;
            }

            $userVariablesService = new UserVariablesService($botUser);
            $userVariableValues = $userVariablesService->getValues();


            $reportVars = array();
            foreach($userVariableValues as $userVariableValue) {
                if ($userVariableValue->userVariable->id != $userVariablesService::USER_NAME_VARIABLE_ID) {
                    $reportVars[$userVariableValue->userVariable->name] = $userVariableValue->value;
                }
            }

            $reportLine = array(
                'DATE_CREATED' => $botUser->created_at->format('d M Y - H:i:s'),
                'USER_NAME' => $botUser->name,
                'VARS' => $reportVars
                );

            //foreach($userVariableValues as $userVariableValue) {
            //    $reportLine[$userVariableValue->userVariable->name] = $userVariableValue->value;
            //}

            $result[] = $reportLine;
        }

        return $result;
    }
}