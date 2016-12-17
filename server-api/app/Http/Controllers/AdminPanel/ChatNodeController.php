<?php

namespace App\Http\Controllers\AdminPanel;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\ChatNode;
use App\Modules\Services\ChatNodeService;

class ChatNodeController extends AdminPanelController
{
    private $_chatNodeService = null;

    function __construct()
    {
        $chatVersionId = Route::current()->getParameter('_chatVersionId');
        $this->_chatNodeService = new ChatNodeService($chatVersionId);
    }

    public function show($chatNodeId = null)
    {
        $chatNodesList = $chatNodeId
            ? $this->_chatNodeService->get($chatNodeId)
            : $this->_chatNodeService->getList();
        $result = $chatNodesList->toArray();

        if($chatNodeId) {
            return $result[0];
        }

        return $result;
    }

    public function create(Request $request)
    {
        return $this->_save(null, $request);
    }

    public function update($chatNodeId, Request $request)
    {
        return $this->_save($chatNodeId, $request);
    }

    public function delete($chatNodeId)
    {
        $this->_chatNodeService->delete($chatNodeId);
        return $this->_successResult();
    }

    private function _save($chatNodeId, Request $request)
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

        $chatNode = $chatNodeId > 0
            ? ChatNode::find($chatNodeId)
            : new ChatNode();

        $chatNode->question_text = $request->input('question_text');
        $chatNode->not_recognized_chat_node_id = $request->input('not_recognized_chat_node_id');
        $chatNode->is_start_node = $request->input('is_start_node');
        $chatNode->user_variable_id = $request->input('user_variable_id') > 0
            ? $request->input('user_variable_id')
            : null;

        $id = $this->_chatNodeService->save($chatNode);
        return $this->_successResult($id);
    }
}