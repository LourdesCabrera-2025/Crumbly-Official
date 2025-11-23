import { useState, useEffect } from "react";
import { createTipoUsuario, updateTipoUsuario } from "../../../services/nivelesIUsers.service";
import "../../../styles/private/Modal.css";

const ModalTipoUsuario = ({ visible, modo, tipo, onClose, onSuccess }) => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (modo === "editar" && tipo) {
      setNombre(tipo.tipo_usuario);
    } else {
      setNombre("");
    }
  }, [modo, tipo]);

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modo === "crear") {
        await createTipoUsuario({ tipo_usuario: nombre });
      } else {
        await updateTipoUsuario(tipo.id_tipo_usuario, { tipo_usuario: nombre });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <div className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-black/40 " >
      <div className="modal-box w-96 !p-6 relative" id="Modals">
        <h2 className="text-xl font-semibold !mb-4">
          {modo === "crear" ? "Crear Tipo de Usuario" : "Editar Tipo de Usuario"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block !mb-2 font-medium">Nombre del Tipo</label>
          <input
            type="text"
            placeholder="Ingrese nombre"
            className="input input-bordered w-full !mb-4"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <div className="modal-action justify-end gap-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`btn ${modo === "crear" ? "btn-primary" : "btn-success"} w-23`}
            >
              {modo === "crear" ? "Crear" : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTipoUsuario;
