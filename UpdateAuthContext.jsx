// /* eslint-disable react/prop-types */
// import  { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [authState, setAuthState] = useState({ isAuthenticated: false, userRole: null });

//     const updateAuthContext = (data) => {
//         setAuthState(data);
//     };

//     return (
//         <AuthContext.Provider value={{ ...authState, updateAuthContext }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };