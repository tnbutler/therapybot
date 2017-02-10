<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

class AdminPanelController extends Controller
{
    protected function _validate(Request $request, $validationRules)
    {
        $validator = Validator::make($request->all(), $validationRules);

        if ($validator->fails()) {
            $errorText = '';
            foreach ($validator->errors()->all() as $key => $value) {
                $errorText .= $value . ' ';
            }
            return $this->_composeResponse(null, $errorText);
        }

        return null;
    }

    protected function _successResult($id = null)
    {
        return $this->_composeResponse($id, null);
    }

    private function _composeResponse($id, $errorText)
    {
        $response = array();

        if (empty($errorText)) {
            $response['success'] = true;
            if ($id > 0) {
                $response['id'] = $id;
            }
        } else {
            $response['success'] = false;
            $response['error'] = $errorText;
        }

        return $response;
    }
}
