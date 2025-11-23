import "../../styles/private/tabs.css";
import React from "react";

export function AdminTable({ columns = [], data = [], actions = null }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 bg-white">
      <table className="table text-gray-700 w-full">

        {/* HEAD */}
        <thead className="text-gray-700 border-b border-gray-200">
          <tr className="contenedor-tabla">
            {columns.map((col, index) => (
              <th
                key={index}
                className="font-semibold text-sm !px-5 !py-4 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}

            {/* Columna Acciones */}
            {actions && (
              <th className="font-semibold text-sm !px-5 !py-4 text-center">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="bg-white">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                No hay datos para mostrar
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">

                {/* Columnas dinámicas */}
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="!px-5 !py-4 whitespace-nowrap"
                  >
                    {/* Si la columna tiene render, úsalo */}
                    {col.render
                      ? col.render(row)
                      : row[col.key]}
                  </td>
                ))}

                {/* Acciones por fila */}
                {actions && (
                  <td className="!px-5 !py-4 text-center flex gap-2 justify-center">
                    {actions.map((ActionBtn, i) => (
                      <ActionBtn key={i} row={row} />
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
