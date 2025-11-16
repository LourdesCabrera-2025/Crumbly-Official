/*
Esta vista es una demo para dar una idea de como integrar el acceso de los usuarios de firebase, dentro de esta se encuentra el botón logout
*/

import { useEffect, useState } from "react";
import { auth } from "@firebase-config/auth";
import LogoutButton from "@components/public/ui/LogoutButton";
import "@styles/public/Navbar.css";

export default function AuthStatusView() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Escuchar el estado de Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
   <div className="p-6 max-w-lg mx-auto border rounded-lg text-center">
  {!firebaseUser ? (
    <>
      <h2 className="text-xl font-bold mb-4 text-red-600">No logueado</h2>
      <div className="flex justify-center">
        <img src="https://cdn.displate.com/artwork/270x380/2024-04-22/d61a32eaf4eeaf3ab6c14f247323b460_28dc02a7a86b7fa5ba8879e3539a11c2.jpg"/>
      </div>
    </>
  ) : (
    <>
      <h2 className="text-xl font-bold mb-4 text-green-600">Logueado</h2>
      <div className="flex justify-center">
        <img src="https://media.tenor.com/_4L5hJR_kDMAAAAM/mmm-mmmm.gif"/>
      </div>
      <div className="mb-4 text-center">
        <p><strong>Email:</strong> {firebaseUser.email}</p>
        <p><strong>UID:</strong> {firebaseUser.uid}</p>
      </div>
      <div className="flex justify-center">
        <button className="btn-login">
          <LogoutButton/>
        </button>
      </div>
    </>
  )}
</div>
  );
}
