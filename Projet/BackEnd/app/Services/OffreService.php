<?php

namespace App\Services;

use App\Interfaces\OffreInterface;

class OffreService{

    protected $offreRepository;

    public function __construct(OffreInterface $offreRepository) { $this->offreRepository = $offreRepository; }

    public function addOffer($offerData){ return $this->offreRepository->addOffer($offerData); }
    public function getOffers(){ return $this->offreRepository->getOffers(); }
    public function addApplication($postId){ return $this->offreRepository->addApplication($postId); }

}