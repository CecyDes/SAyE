<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChargingStation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'latitude',
        'longitude',
    ];
}
