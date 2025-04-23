import { useState } from 'react';

function App() {
  const [students, setStudents] = useState([
    { id: 1, ten: 'Nguyễn Văn A', lop: 'CNTT1', tuoi: 20 },
    { id: 2, ten: 'Trần Thị B', lop: 'KTPM2', tuoi: 21 },
  ]);

  const [form, setForm] = useState({ ten: '', lop: '', tuoi: '' });
  const [editingId, setEditingId] = useState(null);
  const [newStudent, setNewStudent] = useState({ ten: '', lop: '', tuoi: '' });

  const handleChangeNew = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newStudent.ten || !newStudent.lop || !newStudent.tuoi) return;
    const newId = Date.now();
    setStudents([...students, { ...newStudent, id: newId, tuoi: parseInt(newStudent.tuoi) }]);
    setNewStudent({ ten: '', lop: '', tuoi: '' });
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setForm({ ten: student.ten, lop: student.lop, tuoi: student.tuoi });
  };

  const handleEditChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEdit = (id) => {
    const updated = students.map(s =>
      s.id === id ? { ...s, ten: form.ten, lop: form.lop, tuoi: parseInt(form.tuoi) } : s
    );
    setStudents(updated);
    setEditingId(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg mt-6">
      <h1 className="text-2xl font-bold text-green-500 mb-4">Danh sách sinh viên</h1>

      {/* Form thêm */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="ten"
          placeholder="Họ tên"
          value={newStudent.ten}
          onChange={handleChangeNew}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="lop"
          placeholder="Lớp"
          value={newStudent.lop}
          onChange={handleChangeNew}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="tuoi"
          placeholder="Tuổi"
          value={newStudent.tuoi}
          onChange={handleChangeNew}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm sinh viên
        </button>
      </div>

      {/* Bảng danh sách */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Tên</th>
            <th className="p-3">Lớp</th>
            <th className="p-3">Tuổi</th>
            <th className="p-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="border-t">
              {editingId === student.id ? (
                <>
                  <td className="p-2">
                    <input
                      type="text"
                      name="ten"
                      value={form.ten}
                      onChange={handleEditChange}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      name="lop"
                      value={form.lop}
                      onChange={handleEditChange}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      name="tuoi"
                      value={form.tuoi}
                      onChange={handleEditChange}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => saveEdit(student.id)}
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
                      onClick={() => startEdit(student)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Xoá
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
