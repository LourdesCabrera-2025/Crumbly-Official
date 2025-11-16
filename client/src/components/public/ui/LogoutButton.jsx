import { useState } from "react";
import { auth } from "@firebase-config/auth";

export default function LogoutButton({ onLogout }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      // Logout de Firebase
      await auth.signOut();

      // Logout de sistema local (Aun no implementado)
      /*
        localStorage.removeItem("local_token");
        sessionStorage.removeItem("session_user");
       */

      // Callback
      if (onLogout) onLogout();
    } catch (error) {
      /*
      Notificacion de error al cerrar sesion: Temporal console log
      */
     console.error("Error cerrando sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Cerrando sesión..." : "Logout"}
    </button>
  );
}
