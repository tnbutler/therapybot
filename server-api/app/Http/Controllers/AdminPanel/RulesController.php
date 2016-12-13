<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChatNode;

class RulesController extends Controller
{
    public function rules($chatVersion, $questionId)
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: Content-Type');

        $chatNode = ChatNode::find($questionId);

        $results = array();

        foreach ($chatNode->answerButtons as $answerButton) {
            $nextNodeCaption = ChatNode::find($answerButton->child_chat_node_id)->getTextWithUserVariableSysNames();
            $results[] = array(
                'id' => $answerButton->id,
                'button_caption' => $answerButton->text,
                'target_question_caption' => $nextNodeCaption,
            );
        }

        return $results;
    }
}