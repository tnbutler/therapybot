<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Modules\Services\AdminPanel\AdminReportsService;

class ReportsController extends Controller
{
    private $_adminReportsService = null;

    function __construct()
    {
        $this->_adminReportsService = new AdminReportsService();
    }

    public function moodCheckReport()
    {
        return $this->_adminReportsService->moodCheckReport();
    }
}