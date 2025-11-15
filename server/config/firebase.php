<?php

return [
    'default' => 'app',

    'projects' => [
        'app' => [
            'credentials' => [
                'file' => env('FIREBASE_CREDENTIALS', base_path('firebase_credentials.json')),
            ],

            'auth' => [
                'tenant_id' => env('FIREBASE_AUTH_TENANT_ID'),
            ],

            'database' => [
                'url' => env('FIREBASE_DATABASE_URL'),
            ],

            'storage' => [
                'default_bucket' => env('FIREBASE_STORAGE_DEFAULT_BUCKET'),
            ],

            'cache_store' => 'file',
        ],
    ],
];