"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { setAccessToken } from "@/app/utils/axiosInterceptor";

export const AccessTokenSync = () => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      setAccessToken(token);
    }
  }, [token]);

  return null;
};
