<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    /**
     * Display the landing page.
     */
    public function index(): Response
    {
        return Inertia::render('Landing/Landing');
    }

    /**
     * Display the about page.
     */
    public function about(): Response
    {
        return Inertia::render('Landing/About');
    }

    /**
     * Display the features page.
     */
    public function features(): Response
    {
        return Inertia::render('Landing/Features');
    }

    /**
     * Display the pricing page.
     */
    public function pricing(): Response
    {
        return Inertia::render('Landing/Pricing');
    }

    /**
     * Display the contact page.
     */
    public function contact(): Response
    {
        return Inertia::render('Landing/Contact');
    }

    /**
     * Display the privacy page.
     */
    public function privacy(): Response
    {
        return Inertia::render('Landing/Privacy');
    }
}
