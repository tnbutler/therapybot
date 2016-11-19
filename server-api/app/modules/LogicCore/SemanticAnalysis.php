<?php

namespace App\Modules\LogicCore;

use App\Models\DictionaryGroup;
use Mockery\CountValidator\Exception;

class SemanticAnalysis
{
    public function instructionFind($messageText, $patternName)
    {
        $dictionaryGroup = DictionaryGroup::where('name', $patternName)->first();

        if (!$dictionaryGroup) {
            $exceptionText = trans('exceptions.cant_find_dictionary_group') . ": " . $patternName;
            throw new Exception($exceptionText);
        }

        $message = $this->_cleanupMessage($messageText);

        foreach ($dictionaryGroup->synonyms as $dictionarySynonym) {
            $text = $dictionarySynonym->text;
            if ($this->_findText($message, $text)) {
                return true;
            }
        }

        return false;
    }

    private function _cleanupMessage($messageText)
    {
        $messageText = strtolower(trim($messageText));

        // Instructions should be short - just cut some amount of chars
        $messageText = substr($messageText, 0, 15);
        $messageText = trim($messageText);

        // Replace punctuation, line returns and tabs with space, but leave '?'
        $toRemove = array("!", ",", ";", '.', '\t', '\r', '\n');
        $messageText = str_replace($toRemove, " ", $messageText);
        $messageText = trim($messageText);

        // Remove multiple spaces
        $messageText = preg_replace('/\s+/', ' ', $messageText);

        return $messageText;
    }

    private function _findText($message, $text)
    {
        return strpos($message, $text) !== false;
    }
}