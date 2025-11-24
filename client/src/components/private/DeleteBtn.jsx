import React from "react";
import Swal from "sweetalert2";

export function DeleteBtn({ row, deleteFunction, itemNameKey = "nombre" }) {
  const handleDelete = async () => {
    const itemName = row[itemNameKey] || "este elemento";

    const result = await Swal.fire({
      title: `¿Eliminar ${itemName}?`,
      text: `Esta acción eliminará a ${itemName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteFunction(row);

        Swal.fire({
          title: "Eliminado",
          text: `${itemName} ha sido eliminado.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: `No se pudo eliminar ${itemName}.`,
          icon: "error",
        });
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="!p-3 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
    >
      Eliminar
    </button>
  );
}

export default DeleteBtn;
