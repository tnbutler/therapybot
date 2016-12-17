<?php

namespace App\Modules\Services;

interface AdminPanelServiceInterface
{
    public function __construct($chatVersionId);
    public function get($itemId);
    public function getList();
    public function save($item);
    public function delete($itemId);
}