'use server'

import { cookies } from 'next/headers'

export async function loginAction(email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });


    const data = await res.json();


    if(data.message !== "success"){
        return { success: false, error: data.message || "Error desconocido" };
    }



        const cookie = await cookies();
        cookie.set("token", data.data.token, { httpOnly: true });
        
        return {
            success: true,
            user: data.data.user, // ✅ Devolver los datos del usuario
            error: null, // ✅ Evitamos retornar `null`
        };

}