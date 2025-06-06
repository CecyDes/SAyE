<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AssemblyStation;
use Illuminate\Http\Request;

class AssemblyStationController extends Controller
{
    public function index()
    {
        return AssemblyStation::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        return AssemblyStation::create($request->all());
    }

    public function show(AssemblyStation $assemblyStation)
    {
        return $assemblyStation;
    }

    public function update(Request $request, AssemblyStation $assemblyStation)
    {
        $assemblyStation->update($request->all());
        return $assemblyStation;
    }

    public function destroy(AssemblyStation $assemblyStation)
    {
        $assemblyStation->delete();
        return response()->noContent();
    }
}
