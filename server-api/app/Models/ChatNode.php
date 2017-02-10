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
//        $userVariableValues = UserVariableValue::where('bot_users_id', $botUser->id)->orderBy('updated_at', 'desc')->get();
        $userVariableValues = UserVariableValue::where('bot_users_id', $botUser->id)
            //->orWhere('')
            ->orderBy('updated_at', 'desc')->get();
        $replaces = array();
        foreach ($userVariableValues as $userVariableValue) {
            $key =  self::SYS_VAR_PREFIX . $userVariableValue->user_variable_id . self::SYS_VAR_POSTFIX;
            $replaces[$key] = $userVariableValue->value;
        }
        return $this->_performReplaces($replaces);
    }

    public function getTextWithUserVariableSysNames($reverseReplace)
    {
        $userVariables = UserVariable::where('chat_version_id', $this->chat_version_id)
            ->orWhereNull('chat_version_id')  // global variables s
            ->get();
        $replaces = array();
        foreach ($userVariables as $userVariable) {
            $friendlyValue = '@' . $userVariable->name . '@';
            $key = self::SYS_VAR_PREFIX . $userVariable->id . self::SYS_VAR_POSTFIX;
            if($reverseReplace) {
                $replaces[$friendlyValue] = $key;
            }
        else {
                $replaces[$key] = $friendlyValue;
            }
        }
        return $this->_performReplaces($replaces);
    }

    private function _performReplaces($replaces)
    {
        $result = $this->question_text;
        foreach ($replaces as $key => $value) {
            $result = str_replace($key, $value, $result);
        }
        return $result;
    }
}