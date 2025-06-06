<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shipment;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
    public function index()
    {
        return Shipment::with(['supplier', 'distributor', 'factory', 'assemblyStation'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'distributor_id' => 'required|exists:distributors,id',
            'factory_id' => 'required|exists:factories,id',
            'assembly_station_id' => 'nullable|exists:assembly_stations,id',
            'status' => 'required|string|max:255',
        ]);

        return Shipment::create($request->all());
    }

    public function show(Shipment $shipment)
    {
        return $shipment->load(['supplier', 'distributor', 'factory', 'assemblyStation']);
    }

    public function update(Request $request, Shipment $shipment)
    {
        $shipment->update($request->all());
        return $shipment->load(['supplier', 'distributor', 'factory', 'assemblyStation']);
    }

    public function destroy(Shipment $shipment)
    {
        $shipment->delete();
        return response()->noContent();
    }
}
