import axios from "axios";

// --- Configuración base ---
const API_BASE_URL = "http://localhost:8000/api";
const TOKEN_KEY = "authTokenCrumbly";

// Para que Sanctum acepte cookies y sesión
axios.defaults.withCredentials = true;

export class UsuariosService {
  // --- Token ---
  static getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  static setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  static getHeaders(requireAuth = false) {
    const headers = { "Content-Type": "application/json" };
    if (requireAuth) {
      const token = this.getToken();
      if (!token) throw new Error("No autenticado. Token no encontrado.");
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  // --- Registro ---
  static async register(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData, {
        headers: this.getHeaders(false),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || "Error desconocido");
    }
  }

  // --- Login inicial: retorna needsVerification si requiere token ---
  static async loginWithCheck(email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/private/login`, { email, password });

      if (response.data.needsVerification) {
        return { needsVerification: true, email };
      }

      if (response.data.access_token) {
        this.setToken(response.data.access_token);
      }

      return response.data;
    } catch (error) {
      if (error.response?.data?.needsVerification) {
        return { needsVerification: true, email };
      }
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  // --- Verificar token de login enviado por correo ---
  static async verifyLoginToken(email, token) {
    try {
      const response = await axios.post(`${API_BASE_URL}/private/verify-login`, { email, token });
      if (response.data.access_token) {
        this.setToken(response.data.access_token);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || "Token inválido o expirado");
    }
  }

  // --- Logout ---
  static async logout() {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { headers: this.getHeaders(true) });
    } catch (err) {
      console.warn("Logout falló:", err.message);
    }
    this.removeToken();
  }

  // --- Obtener usuario autenticado ---
  static async getAuthenticatedUser() {
    const token = this.getToken();
    if (!token) throw new Error("No autenticado");

    try {
      const response = await axios.get(`${API_BASE_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      this.removeToken();
      throw new Error(err.response?.data?.message || err.message || "No autorizado");
    }
  }

  // --- Obtener todos los usuarios locales ---
  static async getAllUsuarios() {
    const token = this.getToken();
    if (!token) throw new Error("Usuario no autenticado");

    try {
      const response = await axios.get(`${API_BASE_URL}/usuario-local`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      if (err.response?.status === 401) this.removeToken();
      throw new Error(err.response?.data?.message || err.message || "Error al obtener usuarios");
    }
  }

  // --- Verificar email con token (registro o reenvío) ---
  static async verifyEmail(token) {
    try {
      const response = await axios.get(`${API_BASE_URL}/email/verify/${token}`, {
        headers: this.getHeaders(false),
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || "Token inválido o expirado");
    }
  }

  static async resendVerification(email) {
    try {
      const response = await axios.post(`${API_BASE_URL}/email/resend`, { email }, { headers: this.getHeaders(false) });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || "Error al reenviar token");
    }
  }
}

export default UsuariosService;
