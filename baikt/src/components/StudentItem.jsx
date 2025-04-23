import React, { useState } from 'react';

function StudentItem({ student, onEdit, onDelete, isEditing, onSave, onEditChange }) {
  return (
    <tr key={student.id} className="border-t hover:bg-gray-50">
      {isEditing ? (
        <>
          <td className="p-4">
            <input
              type="text"
              name="ten"
              value={student.ten}
              onChange={onEditChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </td>
          <td className="p-4">
            <input
              type="text"
              name="lop"
              value={student.lop}
              onChange={onEditChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </td>
          <td className="p-4">
            <input
              type="number"
              name="tuoi"
              value={student.tuoi}
              onChange={onEditChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </td>
          <td className="p-4 flex space-x-2">
            <button
              onClick={() => onSave(student.id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Lưu
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="p-4">{student.ten}</td>
          <td className="p-4">{student.lop}</td>
          <td className="p-4">{student.tuoi}</td>
          <td className="p-4 flex space-x-2"  >
            <button
              onClick={() => onEdit(student)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 mr-5"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Xoá
            </button>
          </td>
        </>
      )}
    </tr>
  );
}

export default StudentItem;
