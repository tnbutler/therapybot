<?php

namespace App\Modules\Services;

interface AdminPanelServiceInterface
{
    public function get($chatVersionId, $itemId);
    public function getList($chatVersionId);
    public function save($item);
    public function delete($itemId);
}