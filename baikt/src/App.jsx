import { useState, useEffect } from 'react';
import StudentItem from './components/StudentItem';

function App() {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ ten: '', lop: '', tuoi: '' });
  const [editingId, setEditingId] = useState(null);
  const [newStudent, setNewStudent] = useState({ ten: '', lop: '', tuoi: '' });

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    } else {
      setStudents([]);
    }
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students]);

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

  const classes = Array.from(new Set(students.map(s => s.lop)));

  const filteredStudents = students.filter(student =>
    student.ten.toLowerCase().includes(search.toLowerCase()) &&
    (selectedClass === '' || student.lop === selectedClass)
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Danh sách sinh viên</h1>

      <div className="flex flex-wrap justify-between mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md mb-4 md:mb-0"
        />

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md mb-4 md:mb-0"
        >
          <option value="">Tất cả lớp</option>
          {classes.map(lop => (
            <option key={lop} value={lop}>{lop}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="ten"
          placeholder="Họ tên"
          value={newStudent.ten}
          onChange={handleChangeNew}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="lop"
          placeholder="Lớp"
          value={newStudent.lop}
          onChange={handleChangeNew}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="tuoi"
          placeholder="Tuổi"
          value={newStudent.tuoi}
          onChange={handleChangeNew}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAdd}
          className="w-full md:w-auto bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Thêm sinh viên
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">

        <table className="min-w-full table-auto">
          <thead>
            <tr className="px-4 py-2 text-left">
              <th className="p-3">Tên</th>
              <th className="p-3">Lớp</th>
              <th className="p-3">Tuổi</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <StudentItem
                key={student.id}
                student={student}
                onEdit={startEdit}
                onDelete={handleDelete}
                isEditing={editingId === student.id}
                onSave={saveEdit}
                onEditChange={handleEditChange}
              />
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
  );
}

export default App;
