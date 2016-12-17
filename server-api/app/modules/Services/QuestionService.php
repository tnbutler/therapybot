<?php

namespace App\Modules\Services;

use App\Models\ChatNode;
use Illuminate\Support\Facades\DB;

class QuestionService implements AdminPanelServiceInterface
{
    public function get($chatVersionId, $chatNodeId)
    {
        return $this->_getFromDb($chatVersionId, $chatNodeId);
    }

    public function getList($chatVersionId)
    {
        return $this->_getFromDb($chatVersionId, null);
    }
    
    /**
     * @param ChatNode $chatNode
     * @return array
     */
    public function save($chatNode)
    {
        $errorText = $this->_validate($chatNode);

        if ($errorText != "") {
            return array('success' => 'false', 'error_text' => $errorText);
        }

        $chatNode->save();

        if ($chatNode->is_start_node) {
            $this->_setStartNode($chatNode->id);
        }

        return array('success' => 'true', 'id' => $chatNode->id);
    }

    public function delete($chatNodeId)
    {
        $chatNode = ChatNode::find($chatNodeId);
        $chatNode->delete();
    }

    private function _setStartNode($chatNodeId)
    {
        // Set all questions as NOT Start
        DB::table('chat_nodes')
            ->update(['is_start_node' => 0]);

        // Set this question as Start
        DB::table('chat_nodes')
            ->where('id', $chatNodeId)
            ->update(['is_start_node' => 1]);
    }

    private function _validate(ChatNode $chatNode)
    {
        $errorText = "";

        if (empty($chatNode->question_text)) {
            $errorText = "'question_text' is empty";
        }

        return $errorText;
    }

    private function _getFromDb($chatVersionId, $chatNodeId)
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