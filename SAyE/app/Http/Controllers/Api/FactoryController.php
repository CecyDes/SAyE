<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Factory;
use Illuminate\Http\Request;

class FactoryController extends Controller
{
    public function index()
    {
        return Factory::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        return Factory::create($request->all());
    }

    public function show(Factory $factory)
    {
        return $factory;
    }

    public function update(Request $request, Factory $factory)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'latitude' => 'sometimes|required|numeric|between:-90,90',
            'longitude' => 'sometimes|required|numeric|between:-180,180',
        ]);

        $factory->update($request->all());

        return $factory;
    }

    public function destroy(Factory $factory)
    {
        $factory->delete();

        return response()->json(null, 204);
    }
}
