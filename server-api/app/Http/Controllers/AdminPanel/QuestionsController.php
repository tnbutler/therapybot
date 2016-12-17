<?php

namespace App\Http\Controllers\AdminPanel;

use Illuminate\Http\Request;
use App\Models\ChatNode;
use App\Modules\Services\QuestionService;

class QuestionsController extends AdminPanelController
{
    private $questionService = null;

    function __construct()
    {
        $this->questionService = new QuestionService();
    }

    public function show($chatVersion, $questionId = null)
    {
        $chatNodesList = $questionId
            ? $this->questionService->get($chatVersion, $questionId)
            : $this->questionService->getList($chatVersion);
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
        $this->questionService->delete($questionId);
        return $this->_composeResponse(null, null);
    }

    private function _save($chatVersion, $questionId, Request $request)
    {
        $chatNode = $questionId > 0
            ? ChatNode::find($questionId)
            : new ChatNode();

        $chatNode->chat_version_id = $chatVersion;
        $chatNode->question_text = $request->input('question_text');
        $chatNode->user_variable_id = $request->input('user_variable_id');
        $chatNode->not_recognized_chat_node_id = $request->input('not_recognized_chat_node_id');
        $chatNode->is_start_node = $request->input('is_start_node');

        $result = $this->questionService->save($chatNode);

        if ($result['success']) {
            return $this->_composeResponse($result['id'], "");
        }

        return $this->_composeResponse(null, $result['error_text']);
    }
}