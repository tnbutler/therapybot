<?php

namespace App\Http\Controllers\AdminPanel;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\AnswerButton;
use App\Modules\Services\RuleService;

class RulesController extends AdminPanelController
{
    private $ruleService = null;
    private $chatNodeId = null;

    function __construct()
    {
        $this->chatNodeId = Route::current()->getParameter('questionId');
        $this->ruleService = new RuleService($this->chatNodeId);
    }

    public function index($ruleId = null)
    {
        if ($ruleId > 0) {
            return $this->ruleService->get($ruleId);
        }

        return $this->ruleService->getList();
    }

    public function delete($ruleId)
    {
        $this->ruleService->delete($ruleId);
        return $this->_successResult();
    }

    public function update($ruleId, Request $request)
    {
        return $this->_save($ruleId, $request);
    }

    public function create(Request $request)
    {
        return $this->_save(null, $request);
    }

    private function _save($ruleId, Request $request)
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

        $answerButton = $ruleId > 0
            ? AnswerButton::find($ruleId)
            : new AnswerButton();

        $answerButton->chat_node_id = $this->chatNodeId;
        $answerButton->text = $request->input('text');
        $answerButton->child_chat_node_id = $request->input('child_chat_node_id');
        $answerButton->is_visible = $request->input('is_visible');
        $answerButton->dictionary_group_id = $request->input('dictionary_group_id') > 0
            ? $request->input('dictionary_group_id')
            : null;

        $id = $this->ruleService->save($answerButton);

        return $this->_successResult($id);
    }
}