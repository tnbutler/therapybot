<?php

namespace App\Http\Controllers\AdminPanel;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Modules\Services\AdminPanel\ChatVersionService;
use App\Models\ChatVersion;

class ChatVersionController extends AdminPanelController
{
    private $_chatVersionService;

    function __construct()
    {
        $this->_chatVersionService = new ChatVersionService(-1);
    }

    public function index($chatVersionId = null)
    {
        if ($chatVersionId > 0) {
            return $this->_chatVersionService->get($chatVersionId);
        }

        return $this->_chatVersionService->getList();
    }

    public function create(Request $request)
    {
        return $this->_save(null, $request);
    }

    public function update($chatVersionId, Request $request)
    {
        return $this->_save($chatVersionId, $request);
    }

    public function delete($chatVersionId)
    {
        $this->_chatVersionService->delete($chatVersionId);
        return $this->_successResult();
    }

    private function _save($chatVersionId, Request $request)
    {
        $errors = $this->_validate($request, [
            'name' => 'string|required',
            'is_active' => 'boolean|required',
        ]);

        if ($errors) {
            return $errors;
        }

        $chatVersion = $chatVersionId > 0
            ? ChatVersion::find($chatVersionId)
            : new ChatVersion();

        $chatVersion->name = $request->input('name');
        $chatVersion->is_active = $request->input('is_active');
        $id = $this->_chatVersionService->save($chatVersion);

        return $this->_successResult($id);
    }
}