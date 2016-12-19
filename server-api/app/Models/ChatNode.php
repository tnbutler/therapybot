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

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($chatNode) {
            // Before Chat Node is deleted, we delete all the related Answer Buttons.
            foreach ($chatNode->answerButtons as $answerButton) {
                $answerButton->delete();
            }
        });
    }

    public function getTextWithUserVariableValues(BotUser $botUser)
    {
        $userVariableValues = UserVariableValue::where('bot_users_id', $botUser->id)->orderBy('updated_at', 'desc')->get();
        $replaces = array();
        foreach ($userVariableValues as $userVariableValue) {
            $replaces[$userVariableValue->user_variable_id] = $userVariableValue->value;
        }
        return $this->_performReplaces($replaces);
    }

    public function getTextWithUserVariableSysNames()
    {
        $userVariables = UserVariable::where('chat_version_id', $this->chat_version_id)->get();
        $replaces = array();
        foreach ($userVariables as $userVariable) {
            $replaces[$userVariable->id] = '@' . $userVariable->name . '@';
        }
        return $this->_performReplaces($replaces);
    }

    private function _performReplaces($replaces)
    {
        $result = $this->question_text;
        foreach ($replaces as $key => $value) {
            $searchString = self::SYS_VAR_PREFIX . $key . self::SYS_VAR_POSTFIX;
            $result = str_replace($searchString, $value, $result);
        }
        return $result;
    }
}