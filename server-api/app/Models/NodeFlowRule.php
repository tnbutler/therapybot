<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NodeFlowRule extends Model
{
    public $timestamps = false;

   /* public $id;
    public $parent_node_id;
    public $child_node_id;
    public $condition_statement;*/

    public function getConditionStatement()
    {
        return $this->condition_statement;
    }
}
