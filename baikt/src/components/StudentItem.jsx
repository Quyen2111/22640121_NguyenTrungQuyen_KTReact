import React, { useState } from 'react';

function StudentItem({ student, onEdit, onDelete, isEditing, onSave, onEditChange }) {
  return (
    <tr key={student.id} className="border-t">
      {isEditing ? (
        <>
          <td className="p-2">
            <input
              type="text"
              name="ten"
              value={student.ten}
              onChange={onEditChange}
              className="border p-1 rounded w-full"
            />
          </td>
          <td className="p-2">
            <input
              type="text"
              name="lop"
              value={student.lop}
              onChange={onEditChange}
              className="border p-1 rounded w-full"
            />
          </td>
          <td className="p-2">
            <input
              type="number"
              name="tuoi"
              value={student.tuoi}
              onChange={onEditChange}
              className="border p-1 rounded w-full"
            />
          </td>
          <td className="p-2">
            <button
              onClick={() => onSave(student.id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
            >
              Lưu
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="p-3">{student.ten}</td>
          <td className="p-3">{student.lop}</td>
          <td className="p-3">{student.tuoi}</td>
          <td className="p-3 space-x-2">
            <button
              onClick={() => onEdit(student)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
