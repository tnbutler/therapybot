<?php

interface AdminPanelServiceInterface
{
    public function get($chatVersionId, $id);

    public function getList($chatVersionId);

    //public function save(ChatNode $chatNode);

    public function delete($chatNodeId);
}