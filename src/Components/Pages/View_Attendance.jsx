import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { GetAttendance, UpdateAttendance } from "../API/attendanceAPI";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


const View_Attendance = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  const { id } = useParams();
  const studentID = parseInt(id);

  const [isOpen, setIsOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [status, setStatus] = useState(records.status);
  const [resson, setResson] = useState(records.resson || "");

const handleSave = async () => {
  if (!editingRecord) return;

  // ✅ Frontend validation
  if (status === "late" && (!resson || resson.trim() === "")) {
    return Swal.fire({
      icon: "error",
      title: "Error!",
      text: "សូមបញ្ចូលមូលហេតុសម្រាប់សិស្សដែលយឺត។",
      confirmButtonText: "OK",
    });
  }

  try {
    // Prepare payload
    const payload = {
      status: status,
      resson: status === "late" ? resson.trim() : "", // only send reason for late
    };

    const token = localStorage.getItem("token");
    await UpdateAttendance(editingRecord.attenID, payload, token);

    // Update local state
    setRecords((prevRecords) =>
      prevRecords.map((r) =>
        r.attenID === editingRecord.attenID
          ? { ...r, status: status, resson: status === "late" ? resson.trim() : null }
          : r
      )
    );

    setIsOpen(false);
    setEditingRecord(null);

    // SweetAlert success
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Attendance record has been updated.",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("Error updating attendance:", error);

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to update attendance. Please try again.",
    });
  }
};




  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await GetAttendance(studentID);
        // console.log(data);
        
        setRecords(data || []);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [studentID]);

//   console.log(records);

    const student = records.length > 0 ? records[0] : {};

    console.log(student);
    
  

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">
        Today’s Attendance Records
      </h1>

      {/* Student Info */}
    <div className="flex justify-between text-lg font-semibold border-b border-gray-300 pb-3 mb-6">
    <div>
        Name:{" "}
        <span className="text-red-600">
        {loading ? <SkeletonText width="100px" /> : student.name ?? "Empty"}
        </span>
    </div>
    <div>
        Gender:{" "}
        <span className="text-red-600">
        {loading ? <SkeletonText width="60px" /> : student.gender ?? "Empty"}
        </span>
    </div>
    <div>
        Course:{" "}
        <span className="text-red-600">
        {loading ? <SkeletonText width="140px" /> :student.courses ?? "Web-Design/React"} {/* Or student.course if exists */}
        </span>
    </div>
    </div>


      {/* Attendance Table */}
    <table className="w-full border-collapse text-center">
    <thead>
        <tr className="bg-blue-100 text-blue-900 text-lg font-semibold">
        <th className="p-3 border">Attendance-ID</th>
        <th className="p-3 border">Status</th>
        <th className="p-3 border">Date & Time</th>
        <th className="p-3 border">Reason</th>
        <th className="p-3 border">Action</th>
        </tr>
    </thead>
    <tbody>
      {loading ? (
        Array(6).fill().map((_, index) => (
          <tr key={index} className="bg-gray-50 animate-pulse">
            <td className="p-3 border"><SkeletonBox width="60px" /></td>
            <td className="p-3 border"><SkeletonBox width="80px" /></td>
            <td className="p-3 border"><SkeletonBox width="140px" /></td>
            <td className="p-3 border"><SkeletonBox width="120px" height="30px" /></td>
            <td className="p-3 border flex justify-center gap-3">
              <SkeletonCircle /><SkeletonCircle />
            </td>
          </tr>
        ))
      ) : records.length > 0 ? (
        records.map((record, index) => (
          <tr key={record.attenID} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"} hover:bg-gray-200 transition-all duration-200`}>
            <td className="p-3 border font-semibold">{record.attenID}</td>
            <td className="p-3 border">
              <span className={`inline-block px-3 py-1 rounded-xl text-white font-semibold text-sm ${
                record.status === "present" ? "bg-green-600" :
                record.status === "late" ? "bg-yellow-500" :
                record.status === "absent" ? "bg-red-600" : "bg-gray-500"
              } capitalize`}>
                {record.status ?? "empty"}
              </span>
            </td>
            <td className="p-3 border">{record.date}</td>
            <td className="p-3 border">
              <span className={`inline-block px-3 py-1 rounded-md text-sm text-gray-700 border ${
                record.resson ? "bg-gray-100" : "bg-red-100 text-red-600"
              }`}>
                {record.resson ?? "Empty"}
              </span>
            </td>
            <td className="p-3 border flex justify-center gap-3">
              <button
                onClick={() => {
                  setEditingRecord(record);
                  setStatus(record.status);
                  setResson(record.resson || "");
                  setIsOpen(true);
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg shadow-md transition duration-200"
              >
                <AiOutlineEdit className="w-5 h-5" />
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md transition duration-200">
                <AiOutlineDelete className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="p-4 text-center text-gray-500">
            គ្មាន attendance data សម្រាប់សិស្សនេះ
          </td>
        </tr>
      )}
    </tbody>

    </table>

    {/* Modal */}
    {isOpen && editingRecord && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg w-[40%] overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold p-6 text-white bg-blue-900 rounded-t-lg">
            Update Attendance
        </h2>
        <form className="flex flex-wrap gap-5 p-10" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            {/* Status */}
            <div className="w-full">
            <label className="w-full text-lg">Status:</label>
            <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border mt-3 text-lg w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="absent">Absent</option>
            </select>
            </div>

            {/* Reason */}
            <div className="w-full">
            <label className="w-full text-lg">Resson:</label>
            <input
                type="text"
                name="reason"
                value={resson}
                onChange={(e) => setResson(e.target.value)}
                placeholder="Enter reason (optional)"
                disabled={status !== "late"}
                className={`w-full mt-3 text-lg text-black border rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                    ${status === "late" ? "bg-yellow-100 border-yellow-400" 
                    : status === "present" ? "bg-green-100 border-green-400" 
                    : "bg-red-100 border-red-400"} 
                    focus:ring-blue-500`
                }
                />
            </div>

            {/* Buttons */}
            <div className="flex w-full justify-end gap-3 mt-2">
            <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 flex items-center gap-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
                Save Changes
            </button>
            </div>
        </form>
        </div>
    </div>
    )}


    </div>
  );
};

// Skeleton Components
const SkeletonBox = ({ width = "100%", height = "20px" }) => (
  <div
    className="animate-pulse bg-gray-300 rounded-md mx-auto"
    style={{ width, height }}
  ></div>
);

const SkeletonText = ({ width = "80px", height = "16px" }) => (
  <span
    className="animate-pulse bg-gray-300 rounded-md inline-block"
    style={{ width, height }}
  ></span>
);

const SkeletonCircle = () => (
  <div className="animate-pulse bg-gray-300 rounded-full w-8 h-8"></div>
);

export default View_Attendance;
