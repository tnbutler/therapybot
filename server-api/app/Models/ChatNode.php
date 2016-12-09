<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatNode extends Model
{
    public $timestamps = false;

    public function answerButtons()
    {
        return $this->hasMany('App\Models\AnswerButton');
    }

    public function getFormattedQuestionText(BotUser $botUser)
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
}