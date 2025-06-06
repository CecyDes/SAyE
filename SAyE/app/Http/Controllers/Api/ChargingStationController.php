<?php

namespace App\Http\Controllers\Api;

use App\Models\ChargingStation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ChargingStationController extends Controller
{
    public function index()
    {
        return ChargingStation::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:carga,bateria',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        return ChargingStation::create($validated);
    }

    public function destroy($id)
    {
        ChargingStation::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:carga,bateria',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $station = ChargingStation::findOrFail($id);
        $station->update($validated);

        return $station;
    }
}
