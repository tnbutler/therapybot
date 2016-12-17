<?php

/**
 * The service is responsible for CRUD operations over ChatNode objects.
 *
 * @since      Class available since Release 0.1.0
 * @deprecated Class is not deprecated
 */

namespace App\Modules\Services;

use App\Models\ChatNode;
use Illuminate\Support\Facades\DB;

class ChatNodeService implements AdminPanelServiceInterface
{
    private $_chatVersionId;

    function __construct($chatVersionId)
    {
        $this->_chatVersionId = $chatVersionId;
    }

    /**
     * Get by ID single Chat Node entity.
     *
     * @param integer $chatNodeId Chat node id to get
     * @return ChatNode ChatNode entity
     */
    public function get($chatNodeId)
    {
        return $this->_getFromDb($chatNodeId);
    }

    /**
     * Get list of Chat Nodes for the given chat version.
     *
     * @return array  Array of ChatNode entities
     */
    public function getList()
    {
        return $this->_getFromDb(null);
    }

    /**
     * Save Chat Node record to Database.
     *
     * @param ChatNode $chatNode Chat Node entity to save
     * @return integer Id of the saved entity
     */
    public function save($chatNode)
    {
        $chatNode->chat_version_id = $this->_chatVersionId;
        $chatNode->save();

        if ($chatNode->is_start_node) {
            $this->_setStartNode($chatNode->id);
        }

        return $chatNode->id;
    }

    /**
     * Delete single Chat Node entity by ID.
     *
     * @param integer $chatNodeId Chat node id to delete
     */
    public function delete($chatNodeId)
    {
        $chatNode = ChatNode::find($chatNodeId);
        $chatNode->delete();
    }

    /**
     * Set given Chat Node to be the start node.
     *
     * @param integer $chatNodeId Chat node id to become the start node
     */
    private function _setStartNode($chatNodeId)
    {
        // Reset the flag for all the nodes
        DB::table('chat_nodes')
            ->where('chat_version_id', $this->_chatVersionId)
            ->update(['is_start_node' => 0]);

        // Set flag for the given node
        DB::table('chat_nodes')
            ->where('id', $chatNodeId)
            ->update(['is_start_node' => 1]);
    }

    /**
     * Get one or many Chat Node entities from Database.
     *
     * @return integer Id of single Chat Node
     */
    private function _getFromDb($chatNodeId = null)
    {
        $query = ChatNode::where('chat_version_id', $this->_chatVersionId);

        if ($chatNodeId) {
            $query->where('id', $chatNodeId);
        }

        $chatNodesList = $query->orderBy('id', 'asc')->get();

        // Replace system variable IDs with their names - to make it user-readable
        foreach ($chatNodesList as $chatNode) {
            $chatNode->question_text = $chatNode->getTextWithUserVariableSysNames();
        }

        return $chatNodesList;
    }
}