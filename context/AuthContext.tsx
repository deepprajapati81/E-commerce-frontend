'use client'
import { useState,createContext, ReactNode, useEffect } from "react";


type AuthContextProps ={
    role:'customer'| "admin" |undefined,
    setRole:React.Dispatch<React.SetStateAction<"customer" | "admin" | undefined>>
    isLoggedIn:boolean,
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>
    cartItemCount:number,
    setCartItemCount:React.Dispatch<React.SetStateAction<number>>
}


export const AuthContext = createContext<AuthContextProps| null>(null)

export function AuthProvider({children,intitalRole}:{children:ReactNode,intitalRole:"customer" | "admin"| undefined}){


    const [role,setRole] = useState<'customer'| "admin" |undefined>(intitalRole)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!intitalRole)
    const [cartItemCount,setCartItemCount] = useState<number>(0)
    useEffect(()=>{
        setCartItemCount(Number(localStorage.getItem("quantity")))
    },[cartItemCount])
    

    return (
        <AuthContext.Provider value={{role,setRole,isLoggedIn,setIsLoggedIn,cartItemCount,setCartItemCount}}>
                {children}
        </AuthContext.Provider>
    )
}