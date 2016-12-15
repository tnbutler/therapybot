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
        $replaces = UserVariableValue::where('bot_users_id', $botUser->id)->orderBy('updated_at', 'desc')->get();
        return $this->_performReplaces1($replaces);
    }

    public function getTextWithUserVariableSysNames()
    {
        $replaces = UserVariable::where('chat_version_id', $this->chat_version_id)->get();
        return $this->_performReplaces2($replaces);
    }

    private function _performReplaces1($replaces)
    {
        $result = $this->question_text;

        foreach ($replaces as $replace) {
            $searchString = self::SYS_VAR_PREFIX . $replace->user_variable_id . self::SYS_VAR_POSTFIX;
            $replaceString = $replace->value;
            $result = str_replace($searchString, $replaceString, $result);
        }

        return $result;
    }

    // TODO: remove function duplicate
    private function _performReplaces2($replaces)
    {
        $result = $this->question_text;

        foreach ($replaces as $replace) {
            $searchString = self::SYS_VAR_PREFIX . $replace->id . self::SYS_VAR_POSTFIX;
            $replaceString = $replace->name;
            $replaceString = '@' . $replaceString . '@';
            $result = str_replace($searchString, $replaceString, $result);
        }

        return $result;
    }
}