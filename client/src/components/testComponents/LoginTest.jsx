import { useState } from "react";
import { signInWithGoogle, auth } from "../../firebase/auth";
import axios from "../../api/axios"; 

export default function LoginTest() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState([]);

  const addDebug = (message, data = null) => {
    console.log(`DEBUG: ${message}`, data);
    setDebugInfo(prev => [...prev, { message, data: data ? JSON.stringify(data).substring(0, 100) : null }]);
  };

  const handleLogin = async () => {
    setError(null);
    setResult(null);
    setDebugInfo([]);
    setLoading(true);

    try {
      addDebug("1. Iniciando login con Google...");
      
      // Firebase Login con Google
      const user = await signInWithGoogle();
      addDebug("2. Login con Google exitoso", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      });
      
      // Obtener el token JWT de Firebase
      addDebug("3. Obteniendo token JWT...");
      const token = await user.getIdToken();
      addDebug("4. Token JWT obtenido", {
        tokenLength: token.length,
        tokenPreview: token.substring(0, 50) + '...'
      });

      // Verificar que el token no esté vacío
      if (!token || token.length < 10) {
        throw new Error("Token JWT inválido o vacío");
      }

      // Enviar al backend
      addDebug("5. Enviando token al backend...");
      const response = await axios.post("/api/firebase/login", {
        token: token,
      });

      addDebug("6. Respuesta del backend recibida", response.data);
      setResult(response.data);
      
    } catch (err) {
      addDebug("ERROR: Proceso falló", {
        name: err.name,
        code: err.code,
        message: err.message
      });

      console.error('=== ERROR COMPLETO ===');
      console.error('Name:', err.name);
      console.error('Code:', err.code);
      console.error('Message:', err.message);
      console.error('Stack:', err.stack);
      
      if (err.response) {
        console.error('Response Data:', err.response.data);
        console.error('Response Status:', err.response.status);
        setError(`Backend Error (${err.response.status}): ${err.response.data?.message || 'Unknown error'}`);
      } else if (err.code) {
        // Error de Firebase
        setError(`Firebase Error (${err.code}): ${err.message}`);
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Test Login con Firebase</h1>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 mb-4"
      >
        {loading ? 'Loading...' : 'Login con Google'}
      </button>

      {/* Debug Info */}
      {debugInfo.length > 0 && (
        <div className="mt-4 bg-gray-100 p-3 rounded text-left">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          {debugInfo.map((info, index) => (
            <div key={index} className="text-sm mb-1">
              <span className="font-medium">{info.message}</span>
              {info.data && <pre className="text-xs mt-1">{info.data}</pre>}
            </div>
          ))}
        </div>
      )}

      {result && (
        <div className="mt-4 bg-green-100 p-3 rounded">
          <h3 className="font-bold">Success</h3>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-100 p-3 rounded text-red-700">
          <h3 className="font-bold">Error:</h3>
          {error}
        </div>
      )}
    </div>
  );
}