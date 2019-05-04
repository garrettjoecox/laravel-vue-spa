<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VueController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return view('vue');
    }
}
