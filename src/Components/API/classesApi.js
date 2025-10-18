import axios from "axios";

const API_URL = "http://192.168.0.128:8000/api/user/class";

export const getClasses = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");

  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching classes:", error);
    throw error;
  }
};

export const addClass = async (classData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");

  try {
    const res = await axios.post(API_URL, classData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error adding class:", error);
    throw error;
  }
};

export const updateClass = async (classId, classData, token) => {
  if (!token) throw new Error("No auth token found");

  try {
    const res = await axios.put(`${API_URL}/${classId}`, classData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // should return updated class
  } catch (error) {
    console.error("❌ Error updating class:", error);
    throw error;
  }
};


export const EndClass = async (classId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");

  try {
    const res = await axios.delete(`${API_URL}/${classId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // API response after deletion
  } catch (error) {
    console.error("❌ Error ending/deleting class:", error);
    throw error;
  }
};