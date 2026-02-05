import api from "./api";
export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const signupUser = async (payload) => {
  const response = await api.post("/auth/signin", payload);
  return response.data;
};



















// import api from "./api";

// export const loginUser = async (payload) => {
//   const response = await api.post("/api/auth/login", payload);
//   return response.data;
// };
// export const signupUser = async (payload) => {
//   const response = await api.post("/api/auth/signup", payload);
//   return response.data;
// };










// import api from "./api";

// // LOGIN
// export const loginUser =  (data) => {
//    return api.post("/users/login", data);
  
// };

// // SIGNUP
// export const signupUser = async (data) => {
//   return api.post("/users/register", data);
// };










// // LOGIN - Mock for now
// export const loginUser = async (data) => {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   // Mock successful login
//   return { token: "mock-token-123", user: { email: data.email } };
// };

// // SIGNUP - Mock for now
// export const signupUser = async (data) => {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   // Mock successful signup
//   return { message: `Account for ${data.name} created successfully` };
// };
