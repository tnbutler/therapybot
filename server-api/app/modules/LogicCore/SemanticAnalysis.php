<?php

namespace App\Modules\LogicCore;

class SemanticAnalysis
{
    public function find($messageText, $patternName)
    {
        // TODO: Add dictionaries and variations
        return $messageText == $patternName;
    }
}