<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatNode extends Model
{
    public $timestamps = false;
    protected $hidden = ['chat_version_id'];
    const SYS_VAR_PREFIX = '[@';
    const SYS_VAR_POSTFIX = '@]';

    public function answerButtons()
    {
        return $this->hasMany('App\Models\AnswerButton');
    }

    public function getTextWithUserVariableValues(BotUser $botUser)
    {
        $replaces = UserVariableValue::where('bot_users_id', $botUser->id)->orderBy('updated_at', 'desc')->get();
        return $this->_performReplaces($replaces);
    }

    public function getTextWithUserVariableSysNames()
    {
        $replaces = UserVariable::where('chat_version_id', $this->chat_version_id)->get();
        return $this->_performReplaces($replaces, '@');
    }

    private function _performReplaces($replaces, $prefixAndPostfix = null)
    {
        $result = $this->question_text;

        foreach ($replaces as $replace) {
            $searchString = self::SYS_VAR_PREFIX . $replace->id . self::SYS_VAR_POSTFIX;
            $replaceString = $replace->name;
            if ($prefixAndPostfix) {
                $replaceString = $prefixAndPostfix . $replaceString . $prefixAndPostfix;
            }
            $result = str_replace($searchString, $replaceString, $result);
        }

        return $result;
    }
}