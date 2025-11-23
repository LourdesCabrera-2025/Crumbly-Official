<?php

namespace App\Services;

use Kreait\Firebase\Auth;
use Kreait\Firebase\Factory;

class FirebaseService
{
    protected Auth $auth;

    public function __construct()
    {
   
        $factory = (new Factory)->withServiceAccount(config_path('../storage/app/Firebase/crumbly-47b84-firebase-adminsdk-fbsvc-2ee334408d.json'));
        $this->auth = $factory->createAuth();
    }

    /**
     * Verifica el ID Token JWT de Firebase.
     * @param string $idToken El token JWT obtenido del cliente.
     * @return \Kreait\Firebase\Auth\SignedInUser
     * @throws \Kreait\Firebase\Exception\Auth\InvalidToken
     */
    public function verifyIdToken(string $idToken)
    {
        return $this->auth->verifyIdToken($idToken);
    }
}