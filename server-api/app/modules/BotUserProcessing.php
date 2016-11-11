<?php

namespace App\Modules;

use App\Models\BotUser;

class BotUserProcessing
{
    public function getOrCreate($userId)
    {
        // Try to find
        $user = BotUser::find($userId);
        if ($user) {
            return $user;
        }

        // Or create new
        $botUser = new BotUser;
        $botUser->save();
        return $botUser;
    }
}