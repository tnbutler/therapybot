<?php

namespace App\Modules;

use Illuminate\Support\Facades\DB;

class BotUser
{
    const TABLE_NAME = 'users';

    public function exists($userId)
    {
        $users = DB::table(BotUser::TABLE_NAME)->where('id', $userId)->first();
        return sizeof($users) > 0;
    }

    public function createNew()
    {
        return DB::table(BotUser::TABLE_NAME)->insertGetId([]);
    }
}