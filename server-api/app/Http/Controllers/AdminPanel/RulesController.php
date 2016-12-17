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
            return $this->ruleService->get($ruleId);
        }

        return $this->ruleService->getList($questionId);
    }

    public function destroy($chatVersion, $questionId, $ruleId)
    {
        $this->ruleService->delete($ruleId);
        return $this->_composeResponse(null, null);
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
        $answerButton = $ruleId > 0
            ? AnswerButton::find($ruleId)
            : new AnswerButton();

        $answerButton->chat_node_id = $chatNodeId;
        $answerButton->text = $request->input('text');
        $answerButton->child_chat_node_id = $request->input('child_chat_node_id');
        $answerButton->is_visible = $request->input('is_visible');
        $answerButton->dictionary_group_id = $request->input('dictionary_group_id');

        $result = $this->ruleService->save($answerButton);

        if ($result['success']) {
            return $this->_composeResponse($result['id'], "");
        }

        return $this->_composeResponse(null, $result['error_text']);
    }
}