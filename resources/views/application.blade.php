<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    @vite(['resources/js/main.ts'])
    <link rel="stylesheet" type="text/css" href="/loader.css" />
</head>

<body class="antialiased">
    <div id="app">
        <div id="loading-bg">
            <div class="loading-logo">
                <img src="/logo.png" alt="Logo" />
            </div>
            <div class="loading">
                <div class="effect-1 effects"></div>
                <div class="effect-2 effects"></div>
                <div class="effect-3 effects"></div>
            </div>
        </div>
    </div>
    <script>
        const loaderColor = localStorage.getItem('Materio-initial-loader-bg') || '#FFFFFF'
        const primaryColor = localStorage.getItem('Materio-initial-loader-color') || '#7367F0'

        if (loaderColor)
            document.documentElement.style.setProperty('--initial-loader-bg', loaderColor)
        if (primaryColor)
            document.documentElement.style.setProperty('--initial-loader-color', primaryColor)
    </script>
</body>

</html>
