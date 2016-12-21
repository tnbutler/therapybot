<?php

/**
 * The service is responsible for CRUD operations over chats of different versions objects.
 *
 * @since      Class available since Release 0.1.0
 * @deprecated Class is not deprecated
 */

namespace App\Modules\Services\AdminPanel;

use App\Models\ChatVersion;

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
        return $chatVersion->id;
    }

    public function delete($chatVersionId)
    {
        $chatVersion = ChatVersion::find($chatVersionId);
        $chatVersion->delete();
    }
}