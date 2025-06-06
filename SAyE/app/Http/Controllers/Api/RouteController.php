<?php

namespace App\Http\Controllers\Api;

use App\Models\Route;
use App\Models\RoutePoint;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RouteController extends Controller
{
    public function index()
    {
        return Route::with('points')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'points' => 'required|array|min:2',
            'points.*.latitude' => 'required|numeric',
            'points.*.longitude' => 'required|numeric',
        ]);

        $route = Route::create(['name' => $validated['name']]);

        foreach ($validated['points'] as $index => $point) {
            $route->points()->create([
                'latitude' => $point['latitude'],
                'longitude' => $point['longitude'],
                'order' => $index,
            ]);
        }

        return $route->load('points');
    }
}
