import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaRandom } from "react-icons/fa";
import user_logo from "../../assets/User-logo.png";
import { useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../API/studentAPI";
import Swal from "sweetalert2";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editStudentModal, setEditStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const {id} = useParams();

  // get students from API
    useEffect(() => {
        const fetchStudent = async () => {
          if (!id) return;

          setLoading(true); // start loading
          setError(null);   // reset error

          try {
            const student = await getStudentById(id); // fetch single student
            if (student) {
              setSelectedStudent(student);
              setStudents(student); // wrap in array for table
            } else {
              setStudents([]); // no student found
            }
          } catch (err) {
            console.error("❌ Error fetching student:", err);
            setError("Failed to fetch student.");
            setStudents([]);
          } finally {
            setLoading(false); // stop loading
          }
        };

        fetchStudent();
      }, [id]);

  // Handle modal input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Edit submit (optional: call API to save)
  const handleEditSubmit = async (e) => {
    console.log(selectedStudent);
    
    e.preventDefault();
    if (!selectedStudent?.id) return;

    try {
      setLoading(true); // optional: show spinner/loading
      const updated = await updateStudent(selectedStudent.id, selectedStudent); // API call

      // Update local state after successful API update
      setStudents((prev) =>
        prev.map((s) => (s.id === selectedStudent.id ? updated.student : s))
      );

      Swal.fire({
        icon: "success",
        title: "Student Updated!",
        text: "The student info has been successfully updated.",
        timer: 2000,
        showConfirmButton: false,
      });

      setEditStudentModal(false); // close modal
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update student.",
      });
    } finally {
      setLoading(false);
    }
  };

  let [count ,setCount] = useState(1);

  if (loading) return <div className="w-[89%] min-h-screen flex items-center justify-center
   text-3xl bg-gray-100 text-pink-700 fixed">
    Loading Students...</div>;
  // if (error) return <div>{error}</div>;

  if (error) return <div className="w-[89%] min-h-screen flex items-center justify-center
   text-3xl bg-gray-100 text-pink-700 fixed">{error}</div>;


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-4 p-5 shadow rounded-lg mb-6">
        <div className="flex items-center w-[30%] gap-3 border-2 border-dashed border-indigo-700 p-4 rounded-xl bg-white shadow">
          <div>
            <h3 className="text-xl font-bold text-indigo-800">Web-Design/React</h3>
            <p className="text-lg text-gray-600">React</p>
          </div>
        </div>
        <div className="flex items-center w-[30%] gap-3 border-2 border-dashed border-indigo-700 p-4 rounded-xl bg-white shadow">
          <div>
            <h3 className="text-xl font-bold text-indigo-800">Building A (A-101)</h3>
            <p className="text-lg text-gray-600">Physical</p>
          </div>
        </div>
        <div className="flex items-center w-[30%] gap-3 border-2 border-dashed border-indigo-700 p-4 rounded-xl bg-white shadow">
          <div>
            <h3 className="text-xl font-bold text-indigo-800">Sat-Sun</h3>
            <p className="text-lg text-gray-600">14:00 - 17:00</p>
          </div>
        </div>
      </div>

      {/* Title and Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-900">In Progressing</h2>
        <div className="flex gap-3">
          <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Save-Score
          </button>
          <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Attendent
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-blue-100 text-blue-900 font-semibold">
            <tr>
              <th className="p-3 text-xl text-left">ID</th>
              <th className="p-3 text-xl text-left">Name</th>
              <th className="p-3 text-xl text-left">Student ID</th>
              <th className="p-3 text-xl text-left">Gender</th>
              <th className="p-3 text-xl text-left">Phone</th>
              <th className="p-3 text-xl text-left">Profile</th>
              <th className="p-3 text-xl text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
           {Array.isArray(students) && students.length > 0 ? (
                students.map((s) => (
                  <tr
                    key={s.id || Math.random()}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-3 text-xl font-semibold text-gray-700">{ count++ }</td>
                    <td className="p-3 text-xl font-bold text-indigo-900">{s.name}</td>
                    <td className="p-3 text-xl font-bold text-red-700">ID : {s.id }</td>
                    <td className="p-3 text-xl text-gray-700">{s.gender}</td>
                    <td className="p-3 text-xl text-gray-700">{s.phone}</td>
                    <td className="p-3">
                      <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
                        <img
                          src={user_logo}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3 align-middle">
                      <div className="flex items-center gap-2">
                        <button className="bg-blue-900 p-2 text-xl rounded text-white">
                          <FaEye />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStudent(s);
                            setEditStudentModal(true);
                          }}
                          className="bg-blue-900 p-2 text-xl rounded text-white"
                        >
                          <FaEdit />
                        </button>
                        <button className="bg-blue-900 p-2 text-xl rounded text-white">
                          <FaRandom />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    No students found
                  </td>
                </tr>
              )}

          </tbody>
        </table>
      </div>

      {/* Modal Edit Student */}
      {editStudentModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-[40%] overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-bold p-6 text-white bg-blue-900 rounded-t-lg">Edit Student</h2>
            <form className="flex flex-wrap gap-5 p-10" onSubmit={handleEditSubmit}>
              <div className="w-full">
                <label className="w-full text-lg">Full Name:</label>
                <input
                  type="text"
                  name="name"
                  value={selectedStudent.name}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name..."
                  className="w-full mt-3 text-lg text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="w-full text-lg">Gender:</label>
                <select
                  name="gender"
                  value={selectedStudent.gender}
                  onChange={handleInputChange}
                  className="border mt-3 text-lg w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="w-full">
                <label className="w-full text-lg">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={selectedStudent.phone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone..."
                  className="w-full mt-3 text-lg text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex w-full justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setEditStudentModal(false)}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 flex items-center gap-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Edit Student <FaEdit size={22} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
