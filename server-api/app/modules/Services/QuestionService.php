<?php

namespace App\Modules\Services;

use App\Models\ChatNode;
use Illuminate\Support\Facades\DB;

class QuestionService implements AdminPanelServiceInterface
{
    /**
     * Get by ID single question entity.
     *
     * @param integer $chatVersionId Chat version id
     * @param integer $chatNodeId Chat node id to get
     * @return ChatNode ChatNode entity
     */
    public function get($chatVersionId, $chatNodeId)
    {
        return $this->_getFromDb($chatVersionId, $chatNodeId);
    }

    /**
     * Get list of Chat Nodes for the given chat version.
     *
     * @param integer $chatVersionId Chat version id
     * @return array  Array of ChatNode entities
     */
    public function getList($chatVersionId)
    {
        return $this->_getFromDb($chatVersionId, null);
    }

    /**
     * Save Chat Node record to Database.
     *
     * @param ChatNode $chatNode Chat Node entity to save
     * @return integer Id of the saved entity
     */
    public function save($chatNode)
    {
        $chatNode->save();

        if ($chatNode->is_start_node) {
            $this->_setStartNode($chatNode->chat_version_id, $chatNode->id);
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
     * @param integer $chatVersionId Chat version id
     * @param integer $chatNodeId Chat node id to become the start node
     */
    private function _setStartNode($chatVersionId, $chatNodeId)
    {
        // Reset the flag for all the nodes
        DB::table('chat_nodes')
            ->where('chat_version_id', $chatVersionId)
            ->update(['is_start_node' => 0]);

        // Set flag for the given node
        DB::table('chat_nodes')
            ->where('id', $chatNodeId)
            ->update(['is_start_node' => 1]);
    }

    /**
     * Get one or many Chat Node entities from Database.
     *
     * @param integer $chatVersionId Chat version id
     * @return integer Id of single Chat Node
     */
    private function _getFromDb($chatVersionId, $chatNodeId = null)
    {
        $query = ChatNode::where('chat_version_id', $chatVersionId);

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