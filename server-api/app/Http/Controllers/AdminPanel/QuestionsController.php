<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChatNode;

class QuestionsController extends Controller
{
    public function getQuestion($chatVersion, $questionId = null)
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
}