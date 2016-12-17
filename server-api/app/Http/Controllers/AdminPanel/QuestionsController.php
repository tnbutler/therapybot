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
        return $this->_successResult();
    }

    private function _save($chatVersion, $questionId, Request $request)
    {
        $errors = $this->_validate($request, [
            'question_text' => 'string|required',
            'user_variable_id' => 'integer',
            'not_recognized_chat_node_id' => 'integer|required',
            'is_start_node' => 'boolean|required',
        ]);

        if ($errors) {
            return $errors;
        }

        $chatNode = $questionId > 0
            ? ChatNode::find($questionId)
            : new ChatNode();

        $chatNode->chat_version_id = $chatVersion;
        $chatNode->question_text = $request->input('question_text');
        $chatNode->user_variable_id = $request->input('user_variable_id') > 0
            ? $request->input('user_variable_id')
            : null;
        $chatNode->not_recognized_chat_node_id = $request->input('not_recognized_chat_node_id');
        $chatNode->is_start_node = $request->input('is_start_node');

        $id = $this->questionService->save($chatNode);
        return $this->_successResult($id);
    }
}