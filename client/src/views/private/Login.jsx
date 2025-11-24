import "../../styles/public/sign.css";
import Shop from "../../assets/public/SignIn/Shop_dessert.jpg";
import { PersonFill, KeyFill, BoxArrowInRight, EnvelopeAtFill } from "react-bootstrap-icons";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UsuariosService } from "../../services/usuariosLocals.js";

export function LoginAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return Swal.fire('Error', 'Ingresa email y contraseña', 'error');
    }

    setLoading(true);
    try {
      const result = await UsuariosService.loginWithCheck(email, password);

      // Si requiere verificación por token
      if (result.needsVerification) {
        navigate('/token', { state: { email, fromLogin: true } });
        return;
      }

      Swal.fire('Éxito', 'Bienvenido!', 'success');
      navigate('/private/dashboard');
    } catch (err) {
      Swal.fire('Error', err.message || 'Email o contraseña incorrectos', 'error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container-logs">
      <div className="container-format-right">
        <img src={Shop} alt="shoping" />
      </div>
      <div className="container-format-left">
        <h1 className="type-logs">CRUMBLY</h1>
        <form className="relative w-3/4 !mt-7 mx-auto" onSubmit={handleSubmit }>
         <div className="relative !mt-5">
            <span className="absolute  !left-3 sm:!left-5 md:!left-3 top-1/2 -translate-y-1/2 text-white text-lg pointer-events-none ">
              <EnvelopeAtFill />
            </span>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-[325px] border border-gray-400 rounded-lg !py-3 !pl-10 !pr-2 text-gray-900  outline-none focus:border-[#333333] focus:shadow-[0_0_8px_1px_rgba(51,51,51,0.2)]"
            />

          </div>

          <div className="relative !mt-5">
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

              required
              className="
                        peer w-[325px]
                        border border-gray-400
                        rounded-lg
                        !py-3 !pl-10 !pr-2
                        text-gray-900
                        outline-none
                        transition-all
                        focus:border-[#333333]
                        focus:shadow-[0_0_8px_1px_rgba(51,51,51,0.2)]"
            />

          </div>

          <div className="flex justify-center !mt-7">
            <Button id="btn-login" type="submit" disabled={loading} className="!mt-7 w-[325px] flex items-center justify-center gap-2">
              <BoxArrowInRight /> {loading ? 'Iniciando...' : 'LOGIN'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginAccount;
