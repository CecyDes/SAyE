<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Distributor;
use Illuminate\Http\Request;

class DistributorController extends Controller
{
    public function index()
    {
        return Distributor::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        return Distributor::create($request->all());
    }

    public function show(Distributor $distributor)
    {
        return $distributor;
    }

    public function update(Request $request, Distributor $distributor)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'latitude' => 'sometimes|required|numeric|between:-90,90',
            'longitude' => 'sometimes|required|numeric|between:-180,180',
        ]);

        $distributor->update($request->all());

        return $distributor;
    }

    public function destroy(Distributor $distributor)
    {
        $distributor->delete();

        return response()->json(null, 204);
    }
}
