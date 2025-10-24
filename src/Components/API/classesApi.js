import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/user/class";

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

//  Get class by ID
export const getClassById = async (id) => {
try {
    //  Get token from localStorage (saved when user logged in)
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("⚠️ No token found — user not authenticated.");
      throw new Error("Unauthorized. Please login first.");
    }

    //  Call API with Authorization header
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error(`Error fetching class with ID ${id}:`, error);
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