import "../../styles/public/sign.css";
import Shop from "../../assets/public/SignIn/Shop_dessert.jpg";
import { KeyFill, BoxArrowInRight } from "react-bootstrap-icons";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UsuariosService } from "../../services/usuariosLocals.js";

export function TokenAccount() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const fromLogin = location.state?.fromLogin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return Swal.fire('Error', 'Ingresa el token de verificación', 'error');

    setLoading(true);
    try {
      await UsuariosService.verifyLoginToken(email, token);
      Swal.fire('Éxito', 'Email verificado correctamente', 'success');
      navigate(fromLogin ? '/private/dashboard' : '/private/login');
    } catch (err) {
      Swal.fire('Error', err.message || 'Token inválido o expirado', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return Swal.fire('Error', 'No se encontró el email.', 'error');
    try {
      await UsuariosService.resendVerification(email);
      Swal.fire('Éxito', 'Se ha enviado un nuevo token a tu correo.', 'success');
    } catch (err) {
      Swal.fire('Error', err.message || 'Error al reenviar token.', 'error');
    }
  };
  return (
    <div className="container-logs">
      <div className="container-format-right"><img src={Shop} alt="shoping" /></div>
      <div className="container-format-left ">
        <h1 className="type-logs">CRUMBLY</h1>
        <form className="relative w-3/4 !mt-7 mx-auto" onSubmit={handleSubmit}>
          <input id="token" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)}  className="peer w-[325px] border border-gray-400 rounded-lg !py-3 !pl-10 !pr-2 text-gray-900 placeholder-transparent outline-none focus:border-[#333333] focus:shadow-[0_0_8px_1px_rgba(51,51,51,0.2)]"/>
                     <label
              htmlFor="token"
              className="absolute   left-3 sm:left-5 md:left-10 text-gray-500
                        pointer-events-none transition-all
                        bg-[#A5682A] px-1
                        top-1/2 -translate-y-1/2
                        
             peer-placeholder-shown:text-base
             peer-placeholder-shown:top-1/2
             peer-placeholder-shown:-translate-y-1/2

             peer-focus:top-0
             peer-focus:-translate-y-1/2
             peer-focus:text-sm
             peer-focus:text-[#333333]

             peer-valid:top-0
             peer-valid:-translate-y-1/2
             peer-valid:text-sm
             peer-valid:text-[#333333]
                        "
              id="label-username"
            >
              Confirm your token{" "}
            </label>
          <div className="flex flex-col items-center gap-3 !mt-7">
            <Button id="btn-login" className="!mt-7 w-[325px] flex items-center justify-center gap-2" type="submit" disabled={loading}><BoxArrowInRight /> {loading ? 'Verificando...' : 'Verificar Token'}</Button>
            <Button id="btn-login" className="!mt-7 w-[325px] flex items-center justify-center gap-2" type="button" onClick={handleResend} >Reenviar Token</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TokenAccount;
