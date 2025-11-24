import React from "react";

export function EditBtn({ row, setTipoSeleccionado, setModalModo, setModalVisible }) {
  const handleEditar = () => {
    setTipoSeleccionado(row);
    setModalModo("editar");
    setModalVisible(true);
  };

  return (
    <button
      onClick={handleEditar}
      className="!p-2 rounded-md bg-gray-600 text-white hover:bg-gray-800 transition cursor-pointer"
    >
      Editar
    </button>
  );
}

export default EditBtn;
