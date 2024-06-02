import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if(res.status !== 200) {
    throw new Error("Login failed");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if(res.status !== 200) {
    throw new Error("Unable to authenticate user");
  }
  const data = await res.data;
  return data;
};
