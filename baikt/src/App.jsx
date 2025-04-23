import { useState } from 'react';

function App() {
  const [students, setStudents] = useState([
    { id: 1, ten: 'Nguyễn Văn A', lop: 'CNTT1', tuoi: 20 },
    { id: 2, ten: 'Trần Thị B', lop: 'KTPM2', tuoi: 21 },
    { id: 3, ten: 'Lê Văn C', lop: 'HTTT3', tuoi: 22 },
  ]);

  const [form, setForm] = useState({ ten: '', lop: '', tuoi: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.ten || !form.lop || !form.tuoi) return;

    const newStudent = {
      id: Date.now(),
      ten: form.ten,
      lop: form.lop,
      tuoi: parseInt(form.tuoi),
    };

    setStudents([...students, newStudent]);
    setForm({ ten: '', lop: '', tuoi: '' });
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg mt-6">
      <h1 className="text-2xl font-bold text-green-500 mb-4">Danh sách sinh viên</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="ten"
          placeholder="Họ tên"
          value={form.ten}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="lop"
          placeholder="Lớp"
          value={form.lop}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="tuoi"
          placeholder="Tuổi"
          value={form.tuoi}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm sinh viên
        </button>
      </div>

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
              <td className="p-3">{student.ten}</td>
              <td className="p-3">{student.lop}</td>
              <td className="p-3">{student.tuoi}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">
                Không có sinh viên nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
