<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Iconify\IconsJSON\Finder;
use Iconify\JSONTools\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class IconsController extends Controller
{
    public function index(Request $request)
    {
        $collection = Http::get('https://api.iconify.design/search?query=test');
        return $collection;
    }
}
