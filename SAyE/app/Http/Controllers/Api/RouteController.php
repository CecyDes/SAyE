<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Route;
use App\Models\RoutePoint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RouteController extends Controller
{
    public function index()
    {
        return Route::with('points')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'points' => 'required|array|min:2',
            'points.*.latitude' => 'required|numeric|between:-90,90',
            'points.*.longitude' => 'required|numeric|between:-180,180',
        ]);

        return DB::transaction(function () use ($request) {
            $route = Route::create(['name' => $request->name]);

            foreach ($request->points as $point) {
                RoutePoint::create([
                    'route_id' => $route->id,
                    'latitude' => $point['latitude'],
                    'longitude' => $point['longitude'],
                ]);
            }

            return $route->load('points');
        });
    }

    public function show(Route $route)
    {
        return $route->load('points');
    }

    public function destroy(Route $route)
    {
        $route->points()->delete();
        $route->delete();

        return response()->json(null, 204);
    }
}
