<?php

namespace App\Http\Controllers\AdminPanel;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\AnswerButton;
use App\Modules\Services\AdminPanel\AnswerButtonService;

class AnswerButtonController extends AdminPanelController
{
    private $_answerButtonService = null;
    private $_chatNodeId = null;

    function __construct()
    {
        $this->_chatNodeId = Route::current()->getParameter('chatNodeId');
        $this->_answerButtonService = new AnswerButtonService($this->_chatNodeId);
    }

    public function index($answerButtonId = null)
    {
        if ($answerButtonId > 0) {
            return $this->_answerButtonService->get($answerButtonId);
        }

        return $this->_answerButtonService->getList();
    }

    public function delete($answerButtonId)
    {
        $this->_answerButtonService->delete($answerButtonId);
        return $this->_successResult();
    }

    public function update($answerButtonId, Request $request)
    {
        return $this->_save($answerButtonId, $request);
    }

    public function create(Request $request)
    {
        return $this->_save(null, $request);
    }

    private function _save($answerButtonId, Request $request)
    {
        $errors = $this->_validate($request, [
            'text' => 'string|required',
            'child_chat_node_id' => 'integer|required',
            'dictionary_group_id' => 'integer',
            'is_visible' => 'boolean|required',
        ]);

        if ($errors) {
            return $errors;
        }

        $answerButton = $answerButtonId > 0
            ? AnswerButton::find($answerButtonId)
            : new AnswerButton();

        $answerButton->chat_node_id = $this->_chatNodeId;
        $answerButton->text = $request->input('text');
        $answerButton->child_chat_node_id = $request->input('child_chat_node_id');
        $answerButton->is_visible = $request->input('is_visible');
        $answerButton->dictionary_group_id = $request->input('dictionary_group_id') > 0
            ? $request->input('dictionary_group_id')
            : null;

        $id = $this->_answerButtonService->save($answerButton);

        return $this->_successResult($id);
    }
}