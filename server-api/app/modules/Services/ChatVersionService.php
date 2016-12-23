<?php

namespace App\Modules\Services;

use App\Models\ChatVersion;
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

        if ($isNew) {
            $chatNodeService = new ChatNodeService($chatVersion->id);
            $chatNodeService->addFirstQuestion();
        }

        if ($chatVersion->is_active) {
            $this->_setActive($chatVersion);
        }

        return $chatVersion->id;
    }

    public function delete($chatVersionId)
    {
        $chatVersion = ChatVersion::find($chatVersionId);
        $wasActive = $chatVersion->is_active;
        $chatVersion->delete();

        // If we just deleted the active chat, set any other chat to be active.
        if($wasActive) {
            $anyOtherChatId = ChatVersion::first();
            if($anyOtherChatId) {
                $this->_setActive($anyOtherChatId);
            }
        }
    }

    public function copy($chatVersionId)
    {
        $chatVersion = ChatVersion::find($chatVersionId);
        $newChatVersion = $chatVersion->replicate();
        $newChatVersion->name = $newChatVersion->name . self::COPY_SUFFIX;
        $newChatVersion->is_active = false;
        $newChatVersion->save();

        foreach ($chatVersion->chatNodes as $chatNode) {
            $newChatNode = $chatNode->replicate();
            $newChatNode->chat_version_id = $newChatVersion->id;
            $newChatNode->save();
            foreach ($chatNode->answerButtons as $answerButton) {
                $newAnswerButton = $answerButton->replicate();
                $newAnswerButton->chat_node_id = $newChatNode->id;
                $newAnswerButton->save();
            }
        }
    }

    public function getActive()
    {
        return ChatVersion::where('is_active', 1)->first();
    }

    private function _setActive(ChatVersion $chatVersion)
    {
        // Reset the flag for all the versions
        DB::table('chat_versions')->update(['is_active' => 0]);

        // Set flag for the given version
        DB::table('chat_versions')
            ->where('id', $chatVersion->id)
            ->update(['is_active' => 1]);
    }
}