<?php


namespace App\Repositories;

use App\Interfaces\OffreInterface;
use App\Models\Offer;

class OffreRepository implements OffreInterface
{
    public function addOffer(array $offerData)
    {
        try {
            Offer::create($offerData);
            return true;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getOffers()
    {
        try{
            return Offer::all();
        }catch(\Exception $e){
            throw $e;
        }    }
    public function addApplication(int $postId)
    {
        
    }
}
