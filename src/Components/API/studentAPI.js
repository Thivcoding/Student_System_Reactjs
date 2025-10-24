// src/api/studentsApi.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/user/students";

// Fetch all students
export const getStudentById = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found, please login first.");

  // console.log(id);
  

  try {
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("✅ Student API Response:", res.data);
    
    return res.data.datas || null;
  } catch (error) {
    console.error("❌ Error fetching student:", error);
    throw error;
  }
};

// Add a new student
export const addStudent = async (studentData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found, please login first.");

  try {
    const res = await axios.post(API_URL, studentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ Add Student Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error adding student:", error);
    throw error;
  }
};

// update student
export const updateStudent = async (id, studentData) => {
  const token = localStorage.getItem("token"); // if your API uses auth
  if (!token) throw new Error("No auth token found");

  try {
    const res = await axios.put(`${API_URL}/${id}`, studentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error updating student:", error);
    throw error;
  }
};
