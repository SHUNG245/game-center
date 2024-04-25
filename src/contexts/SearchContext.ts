import { createContext } from "react";
export const SearchContext = createContext((text:string)=>console.log(text))