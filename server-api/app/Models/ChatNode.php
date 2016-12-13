<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatNode extends Model
{
    public $timestamps = false;
    protected $hidden = ['chat_version_id'];

    public function answerButtons()
    {
        return $this->hasMany('App\Models\AnswerButton');
    }

    public function getTextWithUserVariableValues(BotUser $botUser)
    {
        $result = $this->question_text;

        $replaces = UserVariableValue::where('bot_users_id', $botUser->id)
            ->orderBy('updated_at', 'desc')
            ->get();

        foreach ($replaces as $replace) {
            $searchString = '[@' . $replace->user_variable_id . '@]';
            $replaceString = $replace->value;
            $result = str_replace($searchString, $replaceString, $result);
        }

        return $result;
    }

    public function getTextWithUserVariableSysNames()
    {
        $result = $this->question_text;

        $replaces = UserVariable::where('chat_version_id', $this->chat_version_id)->get();

        foreach ($replaces as $replace) {
            $searchString = '[@' . $replace->id . '@]';
            $replaceString = '@' . $replace->name . '@';
            $result = str_replace($searchString, $replaceString, $result);
        }

        return $result;
    }
}