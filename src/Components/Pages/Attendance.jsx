import React, { useState, useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { AiOutlineFileProtect } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { submitAttendance } from "../API/attendanceAPI";
import { getStudentById } from "../API/studentAPI";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AttendanceForm = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
   const navigate = useNavigate();

  const { classID } = useParams();  
  const classIDInt = parseInt(classID); 


  //  Fetch simulated students
    useEffect(() => {
      if (!classIDInt) return;

      const fetchStudents = async () => {
        setLoading(true);
        try {
          const studentsData = await getStudentById(classIDInt); 
          const studentsArray = studentsData || []; 

          // Add default status & resson
          const studentsWithStatus = studentsArray.map((s) => ({
            ...s,
            status: s.status || "A", // "A" = absent default
            resson: s.resson || "",
          }));

          setStudents(studentsWithStatus);
          // console.log("Students loaded:", studentsWithStatus);
        } catch (error) {
          console.error("❌ Error loading students:", error);
          setStudents([]);
        } finally {
          setLoading(false);
        }
      };

      fetchStudents();
    }, [classIDInt]);


  //  Handle change of attendance status
  const handleStatusChange = (id, newStatus) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  // Handle resson input
  const handleRessonChange = (id, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, resson: value } : student
      )
    );
  };

  // Submit to API
  const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      setMessage(null);

      // ✅ បង្កើត payload
      const attendancePayload = students.map((s) => ({
        student_id: s.id,
        status:
          s.status === "P"
            ? "present"
            : s.status === "R"
            ? "late"
            : "absent",
        resson: s.resson || undefined,
      }));

      try {
        const token = localStorage.getItem("token");
        const res = await submitAttendance(attendancePayload, token);
        console.log("✅ Attendance submitted:", res);

        // ✅ SweetAlert Success
        await Swal.fire({
          title: "Success!",
          text: "Attendance successfully submitted!",
          icon: "success",
          confirmButtonText: "OK",
        });

        // ✅ Navigate to another page
        navigate(`/dashboard/students/${classID}`);
      } catch (error) {
        console.error("❌ Error:", error);

        // ❌ SweetAlert Error
        Swal.fire({
          title: "Error!",
          text: "Failed to submit attendance. Please try again.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <div className="p-4">
      <div className="bg-white p-4 py-8 flex items-center">
        <h2 className="text-4xl font-semibold text-indigo-700">
          Today Attendance Records
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-lg p-4 mt-4"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-50 border-b">
                {["ID", "Name", "Action", "Gender", "Status", "Resson"].map(
                  (th) => (
                    <th
                      key={th}
                      className="px-6 py-3 text-left text-xl font-bold text-indigo-700"
                    >
                      {th}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array(9)
                    .fill(0)
                    .map((_, idx) => (
                      <tr key={idx} className="border-b">
                        {Array(6)
                          .fill(0)
                          .map((__, i) => (
                            <td key={i} className="px-6 py-3">
                              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                          ))}
                      </tr>
                    ))
                : students.map((student, index) => (
                    <tr
                      key={student.id}
                      className={`border-b hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-3 text-xl text-blue-900">
                        {student.id}
                      </td>
                      <td className="px-6 py-3 text-xl text-blue-900 font-medium">
                        {student.name}
                      </td>

                      {/* ✅ Status Buttons */}
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, "P")}
                            className={`w-9 h-9 rounded-md flex items-center justify-center transition-all active:scale-90 ${
                              student.status === "P"
                                ? "bg-green-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            <CiCircleCheck className="text-white w-7 h-7" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, "R")}
                            className={`w-9 h-9 rounded-md flex items-center justify-center transition-all active:scale-90 ${
                              student.status === "R"
                                ? "bg-yellow-600"
                                : "bg-yellow-500 hover:bg-yellow-600"
                            }`}
                          >
                            <AiOutlineFileProtect className="text-white w-7 h-7" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, "A")}
                            className={`w-9 h-9 rounded-md flex items-center justify-center transition-all active:scale-90 ${
                              student.status === "A"
                                ? "bg-red-600"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                          >
                            <IoIosCloseCircleOutline className="text-white w-7 h-7" />
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-3 text-xl text-blue-900">
                        {student.gender}
                      </td>

                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-md font-semibold text-xl ${
                            student.status === "P"
                              ? "bg-green-100 text-green-700"
                              : student.status === "R"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>

                      <td className="px-6 py-3">
                        <input
                          type="text"
                          placeholder="Enter resson..."
                          value={student.resson}
                          onChange={(e) =>
                            handleRessonChange(student.id, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-blue-900 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                          disabled={student.status != "R"}
                        />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/*  Message */}
        {message && (
          <p
            className={`mt-4 text-lg font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/*  Submit button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={submitting}
            className={`${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-semibold px-6 py-2 rounded-lg shadow transition-all active:scale-95`}
          >
            {submitting ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
