<?php

namespace App\Http\Controllers\AdminPanel;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\ChatNode;
use App\Modules\Services\QuestionService;

class QuestionsController extends AdminPanelController
{
    private $questionService = null;

    function __construct()
    {
        $chatVersionId = Route::current()->getParameter('chatVersion');
        $this->questionService = new QuestionService($chatVersionId);
    }

    public function show($questionId = null)
    {
        $chatNodesList = $questionId
            ? $this->questionService->get($questionId)
            : $this->questionService->getList();
        return $chatNodesList->toArray();
    }

    public function create(Request $request)
    {
        return $this->_save(null, $request);
    }

    public function update($questionId, Request $request)
    {
        return $this->_save($questionId, $request);
    }

    public function delete($questionId)
    {
        $this->questionService->delete($questionId);
        return $this->_successResult();
    }

    private function _save($questionId, Request $request)
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

        $chatNode->question_text = $request->input('question_text');
        $chatNode->not_recognized_chat_node_id = $request->input('not_recognized_chat_node_id');
        $chatNode->is_start_node = $request->input('is_start_node');
        $chatNode->user_variable_id = $request->input('user_variable_id') > 0
            ? $request->input('user_variable_id')
            : null;

        $id = $this->questionService->save($chatNode);
        return $this->_successResult($id);
    }
}