<?php

namespace App\Http\Controllers\AdminPanel;

use Illuminate\Http\Request;
use App\Models\ChatNode;
use Illuminate\Support\Facades\DB;

class QuestionsController extends AdminPanelController
{
    public function show($chatVersion, $questionId = null)
    {
        $query = ChatNode::where('chat_version_id', $chatVersion)
            ->orderby('id');

        if ($questionId) {
            $query->where('id', $questionId);
        }

        $chatNodesList = $query->orderBy('id', 'desc')->get();

        // Replace system variable IDs by their names - to make it user-readable
        foreach ($chatNodesList as $chatNode) {
            $chatNode->question_text = $chatNode->getTextWithUserVariableSysNames();
        }

        return $chatNodesList->toArray();
    }

    public function create($chatVersion, Request $request)
    {
        return $this->_save($chatVersion, null, $request);
    }

    public function update($chatVersion, $questionId, Request $request)
    {
        return $this->_save($chatVersion, $questionId, $request);
    }

    public function destroy($chatVersion, $questionId)
    {
        $chatNode = ChatNode::find($questionId);
        $chatNode->delete();
        return $this->_composeResponse(null, null);
    }

    private function _save($chatVersion, $questionId, Request $request)
    {
        // TODO: Add validation layer here!
        $errorText = "";
        $question_text = trim($request->input('question_text'));
        $user_variable_id = $request->input('user_variable_id');

        if (empty($question_text)) {
            $errorText = "'question_text' is empty";
        }

        if ($errorText != "") {
            return $this->_composeResponse(null, $errorText);
        }

        // Save the data
        if ($questionId > 0) {
            $chatNode = ChatNode::find($questionId);
        } else {
            $chatNode = new ChatNode();
        }
        $chatNode->chat_version_id = $chatVersion;
        $chatNode->question_text = $question_text;
        if ($user_variable_id > 0) {
            // TODO: Add entity-relation here
            $chatNode->user_variable_id = $user_variable_id;
        }
        $chatNode->not_recognized_chat_node_id = $request->input('not_recognized_chat_node_id');
        $chatNode->save();

        // Set start node, if equired
        if ($request->input('is_start_node') == 1) {
            $this->_setStartNode($chatNode->id);
        }

        return $this->_composeResponse($chatNode->id, "");
    }

    private function _setStartNode($chatNodeId)
    {
        // Set all other question as NOT Start
        DB::table('chat_nodes')
            ->update(['is_start_node' => 0]);

        // Set this question as Start
        DB::table('chat_nodes')
            ->where('id', $chatNodeId)
            ->update(['is_start_node' => 1]);
    }
}