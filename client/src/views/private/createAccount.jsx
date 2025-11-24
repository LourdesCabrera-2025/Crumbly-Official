import "../../styles/public/sign.css";
import Shop from "../../assets/public/SignIn/Shop.jpeg";
import {
  PersonFill,
  EnvelopeAtFill,
  KeyFill,
  BoxArrowInRight,
} from "react-bootstrap-icons";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UsuariosService } from "../../services/usuariosLocals.js";

export function CreateAccount() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    setLoading(true);
    try {
      await UsuariosService.register({
        username: form.username,
        email: form.email,
        password: form.password,
        id_tipo_usuario: 1,
        nombre: form.username,
        apellido: "N/A",
      });
      Swal.fire(
        "Éxito",
        "Usuario registrado. Revisa tu correo para el token.",
        "success"
      );
      navigate("/token", { state: { email: form.email }, fromLogin: false });
    } catch (err) {
  if (err.response && err.response.data) {
    const data = err.response.data;
    let detalle = data.error || JSON.stringify(data.errors) || "";
    Swal.fire(
      "Error",
      `Mensaje: ${data.message}\nDetalle: ${detalle}`,
      "error"
    );
  } else {
    Swal.fire("Error", err.message || "Error desconocido", "error");
  }
}
  };
  return (
    <div className="container-log">
      <div className="container-format-right">
        <img src={Shop} alt="shoping" />
      </div>
      <div className="container-format-left ">
        <h1 className="type-logs">CRUMBLY</h1>
        <div className="container-format mx-auto">
          <h3 className="title-log">CREATE YOUR ACCOUNT</h3>
          <p className="subtitle">
            Create your account to enjoy all the benefits as a customer
          </p>
        </div>

        <form className="relative w-3/4 !mt-7 mx-auto" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="relative">
            <span className="absolute left-3 sm:left-5 md:left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none ">
              <PersonFill />
            </span>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required={true}
              className="peer w-[325px] border border-gray-400 rounded-lg !py-3 !pl-10 !pr-2 text-gray-900 placeholder-transparent outline-none focus:border-[#333333] focus:shadow-[0_0_8px_1px_rgba(51,51,51,0.2)]"
            />
            <label
              htmlFor="username"
              className="absolute left-3 sm:left-5 md:left-10 text-gray-500
             pointer-events-none transition-all bg-[#D9D9D9] px-1
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
             peer-valid:text-[#333333]"
              id="label-username"
            >
              Enter your username{" "}
            </label>
          </div>

          {/* Email */}
          <div className="relative !mt-5">
            <span className="absolute  !left-3 sm:!left-5 md:!left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none ">
              <EnvelopeAtFill />
            </span>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="peer w-[325px] border border-gray-400 rounded-lg !py-3 !pl-10 !pr-2 text-gray-900 placeholder-transparent outline-none focus:border-[#333333] focus:shadow-[0_0_8px_1px_rgba(51,51,51,0.2)]"
            />
            <label
              htmlFor="email"
              className={`absolute left-3 sm:left-5 md:left-10 text-gray-500
              pointer-events-none transition-all bg-[#D9D9D9] px-1
              ${
                form.email
                  ? "top-0 -translate-y-1/2 text-sm text-[#333333]"
                  : "top-1/2 -translate-y-1/2 text-base"
              }`}
            >
              Enter your email
            </label>
          </div>

          {/* Password */}
          <div className="relative !mt-5">
            <span className="absolute  !left-3 sm:!left-5 md:!left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none ">
              <KeyFill />
            </span>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="
                        peer w-[325px]
                        border border-gray-400
                        rounded-lg
                        !py-3 !pl-10 !pr-2
                        text-gray-900
                        placeholder-transparent
                        outline-none
                        transition-all
                        focus:border-[#333333]
                        focus:shadow-[0_0_8px_1px_rgba(51,51,51,0.2)]"
            />
            <label
              htmlFor="password"
              className="absolute left-3 sm:left-5 md:left-10 text-gray-500
             pointer-events-none transition-all bg-[#D9D9D9] px-1
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
             peer-valid:text-[#333333]"
            >
              Enter your password
            </label>
          </div>

          {/* Confirm Password */}
          <div className="relative !mt-5">
            <span className="absolute  1left-3 sm:1left-5 md:!left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none ">
              <KeyFill />
            </span>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="peer w-[325px] border border-gray-400 rounded-lg !py-3 !pl-10 !pr-2 text-gray-900 placeholder-transparent outline-none focus:border-[#333333] focus:shadow-[0_0_8px_1px_rgba(51,51,51,0.2)]"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute   left-3 sm:left-5 md:left-10 text-gray-500
                        pointer-events-none transition-all
                        bg-[#D9D9D9] px-1
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
              Confirm your password{" "}
            </label>
          </div>

          <div className="flex justify-center !mt-7">
            <Button
              id="btn-sign"
              className="!mt-7 w-[325px] flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              <BoxArrowInRight />{" "}
              {loading ? "Registrando..." : "SIGN UP ACCOUNT"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
