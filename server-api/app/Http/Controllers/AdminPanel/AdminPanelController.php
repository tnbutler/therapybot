<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;

class AdminPanelController extends Controller
{
    protected function _composeResponse($id, $errorText)
    {
        $response = array();

        if (empty($errorText)) {
            $response["success"] = true;
            if ($id > 0) {
                $response["id"] = $id;
            }
        } else {
            $response["success"] = false;
            $response["error"] = $errorText;
        }

        return $response;
    }
}
