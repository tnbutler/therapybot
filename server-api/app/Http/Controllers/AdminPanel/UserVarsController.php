<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\UserVariable;
use Illuminate\Http\Request;
use App\Models\ChatNode;

class UserVarsController extends Controller
{
    public function uservars($chatVersion)
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: Content-Type');

        $userVariables = UserVariable::where('chat_version_id', $chatVersion)
            ->orderby('name')
            ->get();

        /*$results = array();

        foreach ($chatNode->answerButtons as $answerButton) {
            $nextNodeCaption = ChatNode::find($answerButton->child_chat_node_id)->getTextWithUserVariableSysNames();
            $results[] = array(
                'id' => $answerButton->id,
                'button_caption' => $answerButton->text,
                'target_question_caption' => $nextNodeCaption,
            );
        }*/

        return $userVariables->toArray();
    }
}