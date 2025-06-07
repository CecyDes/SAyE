<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        Schema::disableForeignKeyConstraints();
        DB::table('charging_stations')->truncate();
        DB::table('routes')->truncate();
        DB::table('route_points')->truncate();
        DB::table('suppliers')->truncate();
        DB::table('distributors')->truncate();
        DB::table('factories')->truncate();
        DB::table('assembly_stations')->truncate();
        DB::table('shipments')->truncate();
        Schema::enableForeignKeyConstraints();

        // Datos base
        $ciudades = [
            ['Monterrey', 25.6751, -100.3185],
            ['Guadalajara', 20.6597, -103.3496],
            ['CDMX', 19.4326, -99.1332],
            ['Puebla', 19.0414, -98.2063],
            ['León', 21.0190, -101.2574],
            ['Querétaro', 20.5888, -100.3899],
            ['Toluca', 19.2826, -99.6557],
            ['Chihuahua', 28.6320, -106.0691],
            ['Mérida', 20.9674, -89.5926],
            ['Tijuana', 32.5149, -117.0382],
            ['Hermosillo', 29.0729, -110.9559],
            ['Aguascalientes', 21.8853, -102.2916],
            ['Morelia', 19.7008, -101.1844],
            ['San Luis Potosí', 22.1565, -100.9855],
            ['Saltillo', 25.4389, -100.9737],
        ];

        // 1. Proveedores
        foreach (range(1, 30) as $i) {
            DB::table('suppliers')->insert([
                'name' => "Proveedor $i",
                'component_type' => ['batería', 'motor', 'carcasa', 'pcb'][rand(0, 3)],
                'latitude' => $ciudades[$i % count($ciudades)][1] + rand(-100, 100) / 1000,
                'longitude' => $ciudades[$i % count($ciudades)][2] + rand(-100, 100) / 1000,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 2. Distribuidores
        foreach (range(1, 30) as $i) {
            DB::table('distributors')->insert([
                'name' => "Distribuidor $i",
                'latitude' => $ciudades[$i % count($ciudades)][1] + rand(-50, 50) / 1000,
                'longitude' => $ciudades[$i % count($ciudades)][2] + rand(-50, 50) / 1000,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 3. Fábricas
        foreach (range(1, 30) as $i) {
            DB::table('factories')->insert([
                'name' => "Fábrica Olina $i",
                'latitude' => $ciudades[$i % count($ciudades)][1] + rand(-30, 30) / 1000,
                'longitude' => $ciudades[$i % count($ciudades)][2] + rand(-30, 30) / 1000,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 4. Estaciones de Ensamble
        foreach (range(1, 30) as $i) {
            DB::table('assembly_stations')->insert([
                'name' => "Estación Ensamble $i",
                'latitude' => $ciudades[$i % count($ciudades)][1] + rand(-30, 30) / 1000,
                'longitude' => $ciudades[$i % count($ciudades)][2] + rand(-30, 30) / 1000,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 5. Estaciones de Carga (solo CDMX, más densidad)
        foreach (range(1, 30) as $i) {
            DB::table('charging_stations')->insert([
                'name' => "Carga CDMX $i",
                'type' => ['carga', 'bateria'][rand(0, 1)],
                'latitude' => 19.3 + rand(0, 300) / 1000.0,
                'longitude' => -99.2 + rand(0, 300) / 1000.0,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 6. Rutas
        foreach (range(1, 30) as $i) {
            $from = $ciudades[rand(0, count($ciudades) - 1)];
            $to = $ciudades[rand(0, count($ciudades) - 1)];
            DB::table('routes')->insert([
                'origin_latitude' => $from[1],
                'origin_longitude' => $from[2],
                'destination_latitude' => $to[1],
                'destination_longitude' => $to[2],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // 7. Envíos
        foreach (range(1, 30) as $i) {
            DB::table('shipments')->insert([
                'supplier_id' => rand(1, 30),
                'distributor_id' => rand(1, 30),
                'assembly_station_id' => rand(1, 30),
                'component_type' => ['batería', 'motor', 'carcasa', 'pcb'][rand(0, 3)],
                'quantity' => rand(50, 200),
                'shipped_at' => $now->copy()->subDays(rand(1, 10)),
                'delivered_at' => $now->copy()->subDays(rand(0, 5)),
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}
