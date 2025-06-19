<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChargingStation;
use Illuminate\Http\Request;

class ChargingStationController extends Controller
{
    public function index()
    {
        $stations = ChargingStation::all();
        return response()->json($stations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:carga,bateria',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        return ChargingStation::create($request->all());
    }

    public function show(ChargingStation $station)
    {
        return $station;
    }

    public function update(Request $request, ChargingStation $station)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|in:carga,bateria',
            'latitude' => 'sometimes|required|numeric|between:-90,90',
            'longitude' => 'sometimes|required|numeric|between:-180,180',
        ]);

        $station->update($request->all());

        return $station;
    }

    public function destroy(ChargingStation $station)
    {
        $station->delete();

        return response()->json(null, 204);
    }
}
