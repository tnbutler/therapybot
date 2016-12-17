<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatNode extends Model
{
    public $timestamps = false;
    const SYS_VAR_PREFIX = '[@';
    const SYS_VAR_POSTFIX = '@]';

    public function answerButtons()
    {
        return $this->hasMany('App\Models\AnswerButton');
    }

    public function getTextWithUserVariableValues(BotUser $botUser)
    {
        $userVariableValues = UserVariableValue::where('bot_users_id', $botUser->id)->orderBy('updated_at', 'desc')->get();
        $replaces = array();
        foreach ($userVariableValues as $userVariableValue) {
            $replaces[] = array('user_variable_id' => $userVariableValue->user_variable_id, 'value' => $userVariableValue->value);
        }
        return $this->_performReplaces($replaces);
    }

    public function getTextWithUserVariableSysNames()
    {
        $userVariables = UserVariable::where('chat_version_id', $this->chat_version_id)->get();
        $replaces = array();
        foreach ($userVariables as $userVariable) {
            $replaces[] = array('user_variable_id' => $userVariable->id, 'value' => '@' . $userVariable->name . '@');
        }
        return $this->_performReplaces($replaces);
    }

    private function _performReplaces($replaces)
    {
        $result = $this->question_text;
        foreach ($replaces as $replace) {
            $searchString = self::SYS_VAR_PREFIX . $replace['user_variable_id'] . self::SYS_VAR_POSTFIX;
            $replaceString = $replace['value'];
            $result = str_replace($searchString, $replaceString, $result);
        }
        return $result;
    }
}