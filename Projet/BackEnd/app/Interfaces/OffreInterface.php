<?php

namespace App\Interfaces;

interface OffreInterface
{
    public function addOffer(array $offerData);
    public function getOffers();
    public function addApplication(int $postId);
}
