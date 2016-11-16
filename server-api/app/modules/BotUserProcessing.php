<?php

namespace App\Modules;

use App\Models\BotUser;

class BotUserProcessing
{
    public function getOrCreate($userId)
    {
        $user = BotUser::find($userId);
        if ($user) {
            return $user;
        }

        $botUser = new BotUser;
        $botUser->save();
        return $botUser;
    }

    public function setName($userId, $name)
    {
        $user = BotUser::find($userId);
        if ($user) {
            $user->name = $name;
            $user->save();
        }
    }
}