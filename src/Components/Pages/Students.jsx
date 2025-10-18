import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaRandom } from "react-icons/fa";
import user_logo from "../../assets/User-logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../API/studentAPI";
import Swal from "sweetalert2";
import { FaChalkboardUser } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa"; // from Font Awesome
const Students = () => {
  const [students, setStudents] = useState([]);
  const [editStudentModal, setEditStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const {id} = useParams();

  // get students from API
    useEffect(() => {
      const fetchStudent = async () => {
        if (!id) return;

        setLoading(true); // start loading
        setError(null);   // reset error
        setStudents([]);  // clear previous data

        try {
          const res = await getStudentById(id); // fetch single student

          //  Check API structure
          const studentData = res?.data || res;

          if (studentData) {
            setSelectedStudent(studentData);
            setStudents(studentData); // must be array for table
          } else {
            setStudents([]);
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

      // Optional cleanup to prevent memory leak
      return () => {
        setStudents([]);
        setSelectedStudent(null);
      };
    }, [id]);


  // Handle modal input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Edit submit (optional: call API to save)
  const handleEditSubmit = async (e) => {
    
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

      setTimeout(() => navigate(`/dashboard/students/${id}`), 500);

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

  // let [count ,setCount] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between bg-gray-200 gap-4 p-5 px-16 shadow rounded-lg mb-6">
        <div className="flex items-center w-[30%] gap-3 border-2 border-dashed border-indigo-700 p-4 rounded-xl bg-gray-300 shadow">
          <div className="flex items-center ">
            <div className="w-20 h-20 rounded-full p-4 bg-white mr-5">
                <FaChalkboardUser className="w-full h-full" />
            </div>
            <div>
                  <h3 className="text-xl font-bold text-indigo-800">Web-Design/React</h3>
                <p className="text-lg text-indigo-800">React</p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-[30%] gap-3 border-2 border-dashed border-indigo-700 p-4 rounded-xl bg-gray-300 shadow">
          <div className="flex items-center ">
            <div className="w-20 h-20 rounded-full p-4 bg-white mr-5">
                <FaChalkboardUser className="w-full h-full" />
            </div>
            <div>
                  <h3 className="text-xl font-bold text-indigo-800">Building 2</h3>
                <p className="text-lg text-indigo-800">Physical</p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-[30%] gap-3 border-2 border-dashed border-indigo-700 p-4 rounded-xl bg-gray-300 shadow">
          <div className="flex items-center ">
            <div className="w-20 h-20 rounded-full p-4 bg-white mr-5">
                <FaChalkboardUser className="w-full h-full" />
            </div>
            <div>
                <p className="text-lg font-bold  text-indigo-800">Mon-Thur</p>
                <h3 className="text-xl text-indigo-800" >9-11:00</h3>
            </div>
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
          <Link
              to={`/dashboard/attendance/${id}`} // id = classId or studentId
              className="inline-flex items-center gap-2 bg-indigo-700 hover:bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-200"
            >
              <FaClipboardCheck className="text-white text-lg" />
              Attendance
            </Link>
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
            {loading ? (
              
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-3">
                    <div className="h-6 w-10 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-6 w-28 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-full"></div>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </td>
                </tr>
              ))
            ) : Array.isArray(students) && students.length > 0 ? (
              students.map((s, index) => (
                <tr
                  key={s.id || index}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3 text-xl font-semibold text-gray-700">{index + 1}</td>
                  <td className="p-3 text-xl font-bold text-indigo-900">{s.name}</td>
                  <td className="p-3 text-xl font-bold text-red-700">ID : {s.id}</td>
                  <td className="p-3 text-xl text-gray-700">{s.gender}</td>
                  <td className="p-3 text-xl text-gray-700">{s.phone}</td>
                  <td className="p-3">
                    <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
                      <img
                        src={user_logo}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-3 align-middle">
                    <div className="flex items-center gap-2">
                      <Link to={`/dashboard/View_attendance/${s.id}`} className="bg-blue-900 p-2 text-xl rounded text-white">
                        <FaEye />
                      </Link>
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
                <td colSpan={7} className="text-center p-4 text-gray-500">
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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
