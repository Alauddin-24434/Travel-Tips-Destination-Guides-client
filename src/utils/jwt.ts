/* eslint-disable @typescript-eslint/no-explicit-any */
// import { jwtDecode } from "jwt-decode";

// export const verifyToken=(token:string)=>{
//     return jwtDecode(token);
// }

import { jwtDecode } from 'jwt-decode';


// types/token.d.ts

export interface TokenPayload {
    role: 'ADMIN' | 'USER';
    // Add other properties that are part of the token payload
    [key: string]: any; // Optional: For other dynamic properties
  }
  

export const verifyToken = (token: string): TokenPayload => {
  return jwtDecode<TokenPayload>(token);
};