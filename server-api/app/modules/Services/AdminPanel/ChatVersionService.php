<?php

/**
 * The service is responsible for CRUD operations over chats of different versions objects.
 *
 * @since      Class available since Release 0.1.0
 * @deprecated Class is not deprecated
 */

namespace App\Modules\Services\AdminPanel;

use App\Models\ChatVersion;
use Illuminate\Support\Facades\DB;

class ChatVersionService implements AdminPanelServiceInterface
{

    // TODO: Rework this, as we don't need it here
    function __construct($chatVersionId)
    {
    }

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