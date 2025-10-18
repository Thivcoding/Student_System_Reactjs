import React, { useEffect, useState } from "react";
import { FaUsers, FaUser, FaUserPlus, FaSearch } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addStudent } from "../API/studentAPI";
import { addClass, EndClass, getClasses, updateClass } from "../API/classesApi";
import { TbAntennaBars1 } from "react-icons/tb";
import { MdDeleteSweep } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

const Classes = () => {
const navigate = useNavigate();
const [activeClassId, setActiveClassId] = useState(null);

  const rooms = ["101", "102", "103"];
  const courses = ["Web Design + Vuejs","Web Design +Reacjs","PHP + Ajax","PHP + Laravel","C++ + Mysql"];
  const terms = ["Mon-Thur","Sat-Sun"];
  const times = ["9:00-10:30","11:00-12:15","12:30-13:45","14:00-15:15","15:30-17:00","17:00-18:00","18:00-19:15","19:15-20:30"];
  
  // State
  const [showModal, setShowModal] = useState(false);
  const [room, setRoom] = useState("");
  const [course, setCourse] = useState("");
  const [term, setTerm] = useState("");
  const [time, setTime] = useState("");
  const [classesList, setClassesList] = useState([]);

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  // getClass
    useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      setError(null);

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) throw new Error("No user info found!");

        const data = await getClasses();
        if (!data?.data) throw new Error("Invalid response from server");

        const userClasses = data.data.filter(
          (cls) => String(cls.teachid) === String(user.id)
        );

        // ✅ Simulate network delay using setTimeout
        setTimeout(() => {
          setClassesList(userClasses);
          setLoading(false);
        }, 1500); // delay 1.5 seconds
      } catch (err) {
        setTimeout(() => {
          setError(err.message || "Failed to fetch classes.");
          setClassesList([]);
          setLoading(false);
        }, 1500); // delay 1.5 seconds
      }
    };

    fetchClasses();
  }, []);


  // Add class handler
    const handleAddClass = async (e) => {
      e.preventDefault();

      if (!room || !course || !term || !time) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all fields before adding!",
        });
        return;
      }

      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token"); // ✅ match with login key
      const user = storedUser ? JSON.parse(storedUser) : null;
      const teacherId = user ? user.id : null;
      
      if (!teacherId || !token) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "You must be logged in to add a class.",
        });
        return;
      }

      try {
        const response = await addClass(
          {
            Course: course,
            time: time,
            term: term,
            room: room,
            teachid: teacherId,
          },
          token
        );

        setTimeout(() => navigate("/dashboard/Class"), 1500);

        // ✅ Update list
        setClassesList((prev) => [...prev, response.class]);



        Swal.fire({
          icon: "success",
          title: "Class Added!",
          text: response.message,
          timer: 2000,
          showConfirmButton: false,
        });

        // ✅ Reset form
        setRoom("");
        setCourse("");
        setTerm("");
        setTime("");
        setShowModal(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Cannot connect to the server or invalid data.",
        });
      }
    };

  // EditClass
  const handleEditClass = async (e) => {
      e.preventDefault();

      if (!room || !course || !term || !time || !selectedClassId) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all fields before saving!",
        });
        return;
      }

      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const user = storedUser ? JSON.parse(storedUser) : null;
      const teacherId = user ? user.id : null;

      if (!teacherId || !token) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "You must be logged in to edit a class.",
        });
        return;
      }

      try {
        // Call your update API (you need to create it similar to addClass)
        const response = await updateClass(
          selectedClassId, // class ID to update
          {
            Course: course,
            time: time,
            term: term,
            room: room,
            teachid: teacherId,
          },
          token
        );

        // ✅ Update local list
        setClassesList((prev) =>
          prev.map((cls) =>
            cls.id === selectedClassId ? { ...cls, ...response.class } : cls
          )
        );

        Swal.fire({
          icon: "success",
          title: "Class Updated!",
          text: response.message,
          timer: 2000,
          showConfirmButton: false,
        });

        // ✅ Reset form/modal
        setRoom("");
        setCourse("");
        setTerm("");
        setTime("");
        setSelectedClassId(null);
        setShowModal(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Cannot connect to the server or invalid data.",
        });
      }
    };


  // EndClass
    const handleEndClass = async (classId) => {
      if (!classId) return;

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to end this class?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, end it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      try {
        setLoading(true);
        await EndClass(classId); // delete class by ID
        Swal.fire("Success!", "Class has been ended.", "success");
        // Remove class from local state
        setClassesList((prev) => prev.filter((cls) => cls.id !== classId));
      } catch (error) {
        console.error("Error ending class:", error);
        Swal.fire("Error", "Failed to end class.", "error");
      } finally {
        setLoading(false);
      }
    };

    // State for Add Student
    const [AddStudent,setAddStudent] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [studentName, setStudentName] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");

    // Handler for Add Student
    const handleAddStudent = async (e) => {

        e.preventDefault();
        // alert(selectedClassId)
        if (!studentName || !gender || !phone) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill all fields before adding!",
          });
          return;
        }

        if (!selectedClassId) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No class selected!",
          });
          return;
        }

        
        
        try {
          const response = await addStudent({
            name: studentName,
            gender,
            phone,
            classid: selectedClassId,
          });

          Swal.fire({
            icon: "success",
            title: "Student Added!",
            text: response.message,
            timer: 2000,
            showConfirmButton: false,
          });

          setStudentName("");
          setGender("");
          setPhone("");
          setAddStudent(false);

          // Optional: update class list
          // setClassesList(prev =>
          //   prev.map(cls =>
          //     cls.id === selectedClassId
          //       ? { ...cls, students: [...(cls.students || []), { id: response.student.id, name: studentName }] }
          //       : cls
          //   )
          // );

        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Cannot connect to the server or invalid data.",
          });
        }
      };


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Attendance System</h1>
          <p className="mt-2 text-lg text-gray-600">Manage your class like manage your own heart 💖</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">{classesList.length}</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
              <FaUserPlus className="h-10 w-10 text-blue-600" />
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">0</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-100">
              <FaUsers className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow">
            <div>
              <p className="text-sm font-medium text-gray-600">Male Students</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">0</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
              <FaUser className="h-10 w-10 text-blue-500" />
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow">
            <div>
              <p className="text-sm font-medium text-gray-600">Female Students</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">0</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-pink-100">
              <FaUser className="h-10 w-10 text-pink-500" />
            </div>
          </div>
        </div>

        {/* Search & Add Button */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <FaSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Class..."
              className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 flex justify-center gap-2 items-center text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
          >
            Add Class 
            
            <MdOutlineAddCircleOutline size={22} />
          </button>
        </div>

        {/* Class List */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? // ✅ Skeleton placeholders
              Array(6)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white rounded-lg shadow animate-pulse p-4 space-y-3"
                  >
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>

                    {/* Buttons Skeleton */}
                    <div className="flex gap-2 mt-4">
                      <div className="h-10 bg-gray-300 rounded w-full"></div>
                      <div className="h-10 bg-gray-300 rounded w-12"></div>
                    </div>
                  </div>
                ))
            : Array.isArray(classesList) && classesList.length > 0
            ? // ✅ Actual class cards
              classesList.map((cls, i) => (
                <div
                  key={cls?.id || i}
                  className="relative bg-white rounded-lg shadow hover:shadow-xl transition-all"
                >
                  <div className="p-4 space-y-2">
                    <h1 className="text-2xl font-bold text-black bg-gray-100 p-2 rounded">
                      {cls?.Course ?? "No Name"}
                    </h1>
                    <p className="text-lg font-bold p-2 rounded">
                      Term: {cls?.term ?? "N/A"}
                    </p>
                    <p className="text-lg font-bold bg-gray-100 p-2 rounded">
                      Room: {cls?.room ?? "N/A"}
                    </p>
                    <p className="text-lg font-bold bg-white p-2 rounded">
                      Teacher ID: {cls?.teachid ?? "N/A"}
                    </p>
                    <p className="text-lg font-bold bg-gray-100 p-2 rounded">
                      Time: {cls?.time ?? "N/A"}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between gap-5 p-4 bg-gray-50">
                    <Link
                      to={`/dashboard/Students/${cls?.id ?? ""}`}
                      className="bg-blue-900 text-white w-full flex items-center justify-center py-2 rounded hover:bg-blue-950 transition-all"
                    >
                      View Students
                    </Link>

                    <button
                      onClick={() =>
                        setActiveClassId((prev) => (prev === cls.id ? null : cls.id))
                      }
                      className="flex cursor-pointer items-center justify-center bg-blue-900 text-white p-2 rounded hover:bg-blue-950 transition-all"
                    >
                      <TbAntennaBars1 size={24} className="transform rotate-90" />
                    </button>

                    {activeClassId === cls.id && (
                      <div className="absolute bottom-20 right-0 w-1/2 justify-center gap-2 bg-gray-200 shadow-lg rounded border border-gray-200 z-50 flex flex-col">
                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white cursor-pointer transition-all"
                          onClick={() => {
                            setSelectedClassId(cls.id);
                            setAddStudent(true);
                            setActiveClassId(null);
                          }}
                        >
                          <IoPersonAddSharp size={18} /> Add Student
                        </button>

                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white cursor-pointer transition-all"
                          onClick={() => {
                            setSelectedClassId(cls.id);
                            setRoom(cls.room);
                            setCourse(cls.Course);
                            setTerm(cls.term);
                            setTime(cls.time);
                            setShowModal(true);
                            setActiveClassId(null);
                          }}
                        >
                          <FaUserEdit size={22} /> Edit Student
                        </button>

                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white cursor-pointer transition-all"
                          onClick={() => handleEndClass(cls.id)}
                        >
                          <MdDeleteSweep size={24} /> End Class
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            : // ✅ No classes message
              <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-700">
                  Looks like there are no classes yet
                </h2>
                <p className="mt-2 flex items-center gap-1 text-gray-600">
                  You can add a new class to get started <span className="text-xl">✨</span>
                </p>
              </div>}
        </div>

      </div>

      {/* Modal Add Class*/}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-[50%] overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-bold p-6 text-white bg-blue-900 rounded-t-lg">
              {selectedClassId ? "Edit Class" : "Add New Class"}
            </h2>

            <form
              className="flex flex-wrap gap-10 p-10"
              onSubmit={selectedClassId ? handleEditClass : handleAddClass} // ✅ dynamic
            >
              {/* Room */}
              <div className="w-[47%]">
                <label className="w-full text-lg">Room:</label>
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="border mt-3 text-lg w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Room</option>
                  {rooms.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Course */}
              <div className="w-[47%]">
                <label className="w-full text-lg">Select Course:</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="border mt-3 text-lg w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Term */}
              <div className="w-[47%]">
                <label className="w-full text-lg">Term:</label>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="border mt-3 text-lg w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Term</option>
                  {terms.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time */}
              <div className="w-[47%]">
                <label className="w-full text-lg">Time:</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border mt-3 text-lg w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Time</option>
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex w-full justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedClassId(null); // clear edit state
                  }}
                  className="px-4 py-2 rounded bg-red-600 text-white cursor-pointer border hover:bg-red-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 flex items-center gap-2 cursor-pointer rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  {selectedClassId ? "Save Changes" : "Add Class"}{" "}
                  <MdOutlineAddCircleOutline size={22} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Student*/}
      {AddStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-[40%] overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-bold p-6 text-white bg-blue-900 rounded-t-lg">Add New Student</h2>
            <form className="flex flex-wrap gap-5 p-10" onSubmit={handleAddStudent}>

              {/* Full Name */}
              <div className="w-full">
                <label className="w-full text-lg">Full Name:</label>
                <input 
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter Full Name..."
                  className="w-full mt-3 text-lg text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Gender */}
              <div className="w-full">
                <label className="w-full text-lg">Gender:</label>
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="border mt-3 text-lg w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Phone Number */}
              <div className="w-full">
                <label className="w-full text-lg">Number Phone:</label>
                <input 
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Number Phone..."
                  className="w-full mt-3 text-lg text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex w-full justify-end gap-3 mt-2">
                <button type="button" onClick={() => setAddStudent(false)}
                  className="px-4 py-2 rounded bg-red-600 text-white border hover:bg-red-700">Cancel</button>
                <button type="submit"
                  className="px-4 py-2 flex items-center gap-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                  Add Student
                  <IoPersonAddSharp size={20} />
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Classes;
