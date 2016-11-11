<?php

namespace App\Modules;

use App\BotUser;


class BotUserProcessing
{
    public function exists($userId)
    {
        $users = BotUser::find($userId);
        return sizeof($users) > 0;
    }

    public function createNew()
    {
        $botUser = new BotUser;
        $botUser->save();
        return $botUser->id;
    }
}