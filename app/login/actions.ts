'use server'

import { cookies } from 'next/headers'

export async function loginAction(email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    });


    const data = await res.json();

    console.log(data);


    if(data.message !== "success"){
        return { success: false, error: data.message || "Error desconocido" };
    }


    const cookieStore = await cookies();
    cookieStore.set("refreshToken", data.data.refreshToken, { httpOnly: true });    
        
        return {
            success: true,
            user: data.data.user, // ✅ Devolver los datos del usuario
            error: null, // ✅ Evitamos retornar `null`
        };

}