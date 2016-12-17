<?php

namespace App\Http\Controllers\AdminPanel;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\AnswerButton;
use App\Modules\Services\AnswerButtonService;

class AnswerButtonController extends AdminPanelController
{
    private $answerButtonService = null;
    private $chatNodeId = null;

    function __construct()
    {
        $this->chatNodeId = Route::current()->getParameter('chatNodeId');
        $this->answerButtonService = new AnswerButtonService($this->chatNodeId);
    }

    public function index($answerButtonId = null)
    {
        if ($answerButtonId > 0) {
            return $this->answerButtonService->get($answerButtonId);
        }

        return $this->answerButtonService->getList();
    }

    public function delete($answerButtonId)
    {
        $this->answerButtonService->delete($answerButtonId);
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

        $answerButton->chat_node_id = $this->chatNodeId;
        $answerButton->text = $request->input('text');
        $answerButton->child_chat_node_id = $request->input('child_chat_node_id');
        $answerButton->is_visible = $request->input('is_visible');
        $answerButton->dictionary_group_id = $request->input('dictionary_group_id') > 0
            ? $request->input('dictionary_group_id')
            : null;

        $id = $this->answerButtonService->save($answerButton);

        return $this->_successResult($id);
    }
}