import React from "react";
import Swal from "sweetalert2";
import { deleteFirebaseUser } from "../../services/firebaseUsers.service";
import button from "daisyui/components/button";
import Button from "daisyui/components/button";

export function DeleteBtn({ row }) {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: `Esta acción eliminará a ${row.display_name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteFirebaseUser(row.id_usuario_firebase);

        Swal.fire({
          title: "Eliminado",
          text: "El usuario ha sido eliminado.",
          icon: "success",
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el usuario",
          icon: "error",
        });
      }
    }
  };


  return (
    <button onClick={handleDelete} 
    className="!p-3 rounded-md bg-red-500 text-white hover:bg-red-600 transition">
        Eliminar
    </button>
  )
}

export default DeleteBtn;