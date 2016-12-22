<?php

namespace App\Modules\Services;

use App\Models\ChatVersion;
use Illuminate\Support\Facades\DB;

class ChatVersionService 
{
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
        $chatVersion->save();

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