import { auth, googleProvider, signInWithPopup } from "../firebase/config";

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithRedirect(auth, googleProvider);
    const user = result.user;

    return {
      firebase_uid: user.uid,
      display_name: user.displayName,
      email: user.email,
      photo_url: user.photoURL,
      email_verified: user.emailVerified,
    };
  } catch (error) {
    console.error("Error iniciando sesión con Google:", error);
    throw error;
  }
};
