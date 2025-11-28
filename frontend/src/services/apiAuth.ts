import axios from "axios";

// กำหนดตัวแปรสำหรับ URL ของ API จาก environment variable
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// interface สำหรับข้อมูลการเข้าสู่ระบบ
interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
    firstName: string;
    lastName: string;
    employeeId: string;
    departmentName: string;
    username: string;
    email: string;
    password: string;
}

// สร้าง config สำหรับ axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ฟังก์ชันสำหรับการเข้าสู่ระบบ
const authLogin = async (data: LoginData) => {
    try {
        const response = await apiClient.post("/Authenticate/login", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ฟังก์ชันสำหรับการลงทะเบียน
const authRegister = async (data: RegisterData) => {
    try {
        const response = await apiClient.post("/Authenticate/register-user", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { authLogin, authRegister };
export type { LoginData, RegisterData }