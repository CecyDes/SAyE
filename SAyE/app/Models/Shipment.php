<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'factory_id',
        'distributor_id',
        'assembly_station_id',
        'status',
        'shipped_at',
        'delivered_at',
    ];

    public function factory()
    {
        return $this->belongsTo(Factory::class);
    }

    public function distributor()
    {
        return $this->belongsTo(Distributor::class);
    }

    public function assemblyStation()
    {
        return $this->belongsTo(AssemblyStation::class);
    }
}
