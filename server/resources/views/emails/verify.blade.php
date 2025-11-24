<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Verificación de correo</title>
</head>
<body>
    <p>Hola {{ $username }},</p>

    <p>Gracias por registrarte. Para activar tu cuenta, utiliza el siguiente token:</p>
    <h2>{{ $token }}</h2>

    <p>O haz click en el siguiente enlace para verificar tu correo:</p>
    <a href="{{ url('/verify-email/' . $token) }}">Verificar mi cuenta</a>

    <p>Si no realizaste este registro, ignora este correo.</p>
</body>
</html>
