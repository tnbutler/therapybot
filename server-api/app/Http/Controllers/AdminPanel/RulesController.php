<?php

namespace App\Http\Controllers\AdminPanel;

use Illuminate\Http\Request;
use App\Models\AnswerButton;
use App\Modules\Services\RuleService;

class RulesController extends AdminPanelController
{
    private $ruleService = null;

    function __construct()
    {
        $this->ruleService = new RuleService();
    }

    public function index($chatVersion, $questionId, $ruleId = null)
    {
        if ($ruleId > 0) {
            return $this->ruleService->get($chatVersion, $ruleId);
        }

        return $this->ruleService->getList($questionId);
    }

    public function destroy($chatVersion, $questionId, $ruleId)
    {
        $this->ruleService->delete($ruleId);
        return $this->_successResult();
    }

    public function update($chatVersion, $questionId, $ruleId, Request $request)
    {
        return $this->_save($chatVersion, $ruleId, $request, $questionId);
    }

    public function create($chatVersion, $questionId, Request $request)
    {
        return $this->_save($chatVersion, null, $request, $questionId);
    }

    private function _save($chatVersion, $ruleId, Request $request, $chatNodeId)
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

        $answerButton->chat_node_id = $chatNodeId;
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