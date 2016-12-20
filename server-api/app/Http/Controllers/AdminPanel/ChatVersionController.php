<?php

namespace App\Http\Controllers\AdminPanel;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Modules\Services\AdminPanel\ChatVersionService;

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
}