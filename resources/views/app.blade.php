<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="times">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600|big-shoulders-display:700,900|alfa-slab-one:400|old-standard-tt:400,700|courier-prime:400,700&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <!--
        THESIS: AJP as a Merz assemblage: an institution's story is torn from TIMES Indonesia, e-koran, Instagram and WA Channel and glued down as proof; packages are tickets. Refuses the centered SaaS hero, icon-card grids and floating price cards.
        OWN-WORLD: ticket-stock tan and newsprint gray ground, AJP dull red #7b0f1f, logo yellow #f0a51c reserved for the primary action, ink black; Big Shoulders wood type, Alfa Slab numerals, Old Standard newsprint, Courier fine print; perforated stubs, torn edges, printer's fists.
        STORY: a humas officer sees their news pasted as published proof, understands one naskah reaches four channels via the newsroom, picks a ticket, registers.
        FIRST VIEWPORT: left, fist-pointed wood-type headline + red "Daftarkan Instansi" ticket and "Lihat Paket"; right, collage of four channel scraps with a TERBIT stamp; proof strip beneath.
        FORM: design-canon-merz-collage-page (user-adopted challenger; grounded list pos. 5 was papan bunga); seed 12a499bd.
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
        -->
        @inertia
    </body>
</html>
