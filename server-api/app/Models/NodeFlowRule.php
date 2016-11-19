<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NodeFlowRule extends Model
{
    public $timestamps = false;

    public function getConditionStatement()
    {
        return $this->condition_statement;
    }
}