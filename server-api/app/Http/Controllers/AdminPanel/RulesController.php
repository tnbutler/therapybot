<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChatNode;
use App\Models\AnswerButton;

class RulesController extends Controller
{
    public function index($chatVersion, $questionId)
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

    public function show($chatVersion, $questionId, $ruleId)
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: Content-Type');

        $answerButton = AnswerButton::find($ruleId);

        return $answerButton;
    }

    public function destroy($chatVersion, $questionId, $ruleId)
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: Content-Type');

        $answerButton = AnswerButton::find($ruleId);
        $answerButton->delete();

        return $this->_composeResponse(null, null);
    }

    public function update($chatVersion, $questionId, $ruleId, Request $request)
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: Content-Type');
        return $this->_save($chatVersion, $ruleId, $request, $questionId);
    }

    public function create($chatVersion, $questionId, Request $request)
    {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Headers: Content-Type');
        return $this->_save($chatVersion, null, $request, $questionId);
    }

    private function _save($chatVersion, $ruleId, Request $request, $chatNodeId)
    {
        // TODO: Add validation layer here!
        $errorText = "";

        $chat_node_id = $chatNodeId;//trim($request->input('chat_node_id'));
        $text = trim($request->input('text'));
        $child_chat_node_id = trim($request->input('child_chat_node_id'));
        $is_visible = trim($request->input('is_visible'));
        $dictionary_group_id = trim($request->input('dictionary_group_id'));

        if (empty($text)) {
            $errorText = "'text' is empty";
        }

        if ($errorText != "") {
            return $this->_composeResponse(null, $errorText);
        }

        // Save the data
        if ($ruleId > 0) {
            $answerButton = AnswerButton::find($ruleId);
        } else {
            $answerButton = new AnswerButton();
        }

        $answerButton->chat_node_id = $chat_node_id;
        $answerButton->text = $text;
        $answerButton->child_chat_node_id = $child_chat_node_id;
        $answerButton->is_visible = $is_visible;
        $answerButton->dictionary_group_id = $dictionary_group_id;
        $answerButton->save();

        return $this->_composeResponse($answerButton->id, "");
    }

    // TODO: Get rid of copying between controllers
    private function _composeResponse($id, $errorText)
    {
        $response = array();

        if (empty($errorText)) {
            $response["success"] = true;
            if ($id > 0) {
                $response["id"] = $id;
            }
        } else {
            $response["success"] = false;
            $response["error"] = $errorText;
        }

        return $response;
    }
}