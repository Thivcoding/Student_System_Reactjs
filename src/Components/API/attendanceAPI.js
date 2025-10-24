import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/user/attendances";

export const submitAttendance = async (attendanceData, token) => {
  try {
    const res = await axios.post(
      API_URL,
      { attendances: attendanceData }, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ប្រសិនបើ API require token
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("❌ Error submitting attendance:", error.response?.data || error.message);
    throw error;
  }
};

// getAttendance
export const GetAttendance = async (studentID) => {
  try {
    const token = localStorage.getItem("token"); // your saved JWT token
    const res = await axios.get(`${API_URL}/${studentID}`, {
      headers: {
        Authorization: `Bearer ${token}`, // add token here
      },
    });

    // console.log(res.data);
    return res.data; // { status: "success", data: [...] }
  } catch (error) {
    console.error("❌ Error fetching attendance:", error.response?.data || error.message);
    throw error;
  }
};

// UpdateAttendance
export const UpdateAttendance = async (attenID, payload, token) => {
  try {
    const res = await axios.put(`${API_URL}/${attenID}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`, // if you use token auth
      },
    });
    console.log(res.data);
    
    return res.data; // response from API
  } catch (error) {
    console.error("❌ Error updating attendance:", error.response?.data || error.message);
    throw error;
  }
};


