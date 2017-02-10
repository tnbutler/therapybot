<?php

namespace App\Modules\Services;

use App\Models\BotUser;

class BotUsersService
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

    public function getOrCreateFbUser($fb_id)
    {
        $user = BotUser::where('fb_id',$fb_id)->first();
        if ($user) {
            return $user;
        }

        $botUser = new BotUser;
        $botUser->fb_id = $fb_id;
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