<?php

namespace App\Modules\Services;

use App\Models\ChatVersion;
use App\Models\ChatNode;
use App\Modules\Services\AdminPanel\ChatNodeService;
use Illuminate\Support\Facades\DB;

class ChatVersionService
{
    const COPY_SUFFIX = ' (Copy)';

    public function get($chatVersionId)
    {
        return ChatVersion::find($chatVersionId);
    }

    public function getList()
    {
        return ChatVersion::all()->toArray();
    }

    public function save($chatVersion)
    {
        $isNew = !isset($chatVersion->id);

        $chatVersion->save();

        if($isNew) {
            $chatNodeService = new ChatNodeService($chatVersion->id);
            $chatNodeService->addFirstQuestion();
        }

        if ($chatVersion->is_active) {
            $this->_setActive($chatVersion->id);
        }

        return $chatVersion->id;
    }

    public function delete($chatVersionId)
    {
        $chatVersion = ChatVersion::find($chatVersionId);
        $chatVersion->delete();
    }

    public function copy($chatVersionId)
    {
        // Copy the chat version record
        $chatVersion = ChatVersion::find($chatVersionId);
        $newChatVersion = $chatVersion->replicate();
        $newChatVersion->name = $newChatVersion->name.self::COPY_SUFFIX;
        $newChatVersion->is_active = false;
        $newChatVersion->push();

        // TODO: Set up relationships to replicate the whole thing

        // Copy questions

        // Copy rules
    }

    public function getActive()
    {
        return ChatVersion::where('is_active', 1)->first();
    }

    private function _setActive($chatVersionId)
    {
        // Reset the flag for all the versions
        DB::table('chat_versions')->update(['is_active' => 0]);

        // Set flag for the given version
        DB::table('chat_versions')
            ->where('id', $chatVersionId)
            ->update(['is_active' => 1]);
    }
}