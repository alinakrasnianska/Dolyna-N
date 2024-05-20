import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
   name: 'language', 
   initialState: { value: "EN" },
   reducers: {
     setEn: (state) => {
       state.value = "EN";
     },
     setUa: (state) => {
       state.value = "UA";
     },
   },
 });
 
export const { setEn, setUa } = languageSlice.actions;
 
export default languageSlice.reducer; 