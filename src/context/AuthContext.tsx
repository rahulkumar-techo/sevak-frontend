
// // src/context/AuthContext.tsx
// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";

// type User = { id: string; email: string; role: string } | null;

// const AuthContext = createContext<{ user: User; loading: boolean }>({
//   user: null,
//   loading: true,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = Cookies.get("authToken");
//     if (!token) {
//       setUser(null);
//       setLoading(false);
//       return;
//     }

//     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.valid) setUser(data.user);
//         else setUser(null);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
