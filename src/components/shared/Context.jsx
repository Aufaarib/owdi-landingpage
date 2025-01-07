// // AppStateContext.js
// import {
//   createContext,
//   useReducer,
//   useContext,
//   useState,
//   useEffect,
// } from "react";

// // Create context
// const AppStateContext = createContext();

// // Create context provider
// export const AppStateProvider = ({ children }) => {
//   return (
//     <AppStateContext.Provider value={{ screen }}>
//       {children}
//     </AppStateContext.Provider>
//   );
// };

// // Create custom hook to use the context
// export const useAppState = () => {
//   const context = useContext(AppStateContext);
//   if (!context) {
//     throw new Error("useAppState must be used within an AppStateProvider");
//   }
//   return context;
// };
