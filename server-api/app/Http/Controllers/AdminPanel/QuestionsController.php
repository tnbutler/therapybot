<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChatNode;
use Illuminate\Support\Facades\DB;

class QuestionsController extends Controller
{
    public function questions($chatVersion, $questionId = null)
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: Content-Type');

        $query = ChatNode::where('chat_version_id', $chatVersion);

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

    public function add($chatVersion, Request $request)
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: Content-Type');

        $chatNode = new ChatNode();
        $chatNode->chat_version_id = $chatVersion;
        $chatNode->question_text = $request->input('question_text');

        // TODO: Add entity-relation here
        $user_variable_id = $request->input('user_variable_id');
        if($user_variable_id > 0) {
            $chatNode->user_variable_id = $user_variable_id;
        }

        $chatNode->not_recognized_chat_node_id = $request->input('not_recognized_chat_node_id');
        $chatNode->save();

        // If we want this question to be the start question
        if ($request->input('is_start_node')) {
            // Set all other question as NOT Start
            DB::table('chat_nodes')
                ->update(['is_start_node' => 0]);
            // Set this question as Start
            DB::table('chat_nodes')
                ->where('id', $chatNode->id)
                ->update(['is_start_node' => 1]);
        }

        $response = array();
        $response["id"] = $chatNode->id;
        $response["success"] = true;
        $response["error"] = "no error found";

        return $response;
    }
}