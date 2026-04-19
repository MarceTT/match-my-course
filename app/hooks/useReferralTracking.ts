"use client";

import { useEffect, useCallback } from "react";
import { useSearchParams, usePathname } from "next/navigation";

const REFERRAL_STORAGE_KEY = "mmc_referral_code";
const REFERRAL_EXPIRY_KEY = "mmc_referral_expiry";
const REFERRAL_EXPIRY_DAYS = 60;

/**
 * Hook to track referral codes from URL and persist them
 * Usage: Call useReferralTracking() in your root layout or a provider
 */
export function useReferralTracking() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const refCode = searchParams.get("ref");

    if (refCode) {
      // Save referral code to localStorage with expiry
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + REFERRAL_EXPIRY_DAYS);

      localStorage.setItem(REFERRAL_STORAGE_KEY, refCode.toUpperCase());
      localStorage.setItem(REFERRAL_EXPIRY_KEY, expiryDate.toISOString());

      // Track the visit to backend (fire and forget)
      trackVisit(refCode, pathname);
    }
  }, [searchParams, pathname]);
}

/**
 * Get the stored referral code (if valid and not expired)
 */
export function getReferralCode(): string | null {
  if (typeof window === "undefined") return null;

  const code = localStorage.getItem(REFERRAL_STORAGE_KEY);
  const expiry = localStorage.getItem(REFERRAL_EXPIRY_KEY);

  if (!code || !expiry) return null;

  // Check if expired
  if (new Date(expiry) < new Date()) {
    // Clean up expired referral
    localStorage.removeItem(REFERRAL_STORAGE_KEY);
    localStorage.removeItem(REFERRAL_EXPIRY_KEY);
    return null;
  }

  return code;
}

/**
 * Clear the stored referral code (call after successful conversion)
 */
export function clearReferralCode() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(REFERRAL_STORAGE_KEY);
  localStorage.removeItem(REFERRAL_EXPIRY_KEY);
}

/**
 * Track visit to backend
 */
async function trackVisit(code: string, page: string) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    await fetch(`${API_URL}/api/affiliates/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, page }),
    });
  } catch (error) {
    // Silently fail - tracking should not break the user experience
    console.error("Failed to track referral visit:", error);
  }
}

/**
 * Create a referral/lead from form submission
 */
export async function createReferralLead(data: {
  prospectName: string;
  prospectEmail: string;
  prospectPhone?: string;
  source: "contact_form" | "booking" | "consulting" | "service_form";
  courseInterest?: string;
}): Promise<{ success: boolean; alreadyExists?: boolean }> {
  const code = getReferralCode();

  if (!code) {
    // No referral code, just return success (form should still submit normally)
    return { success: true };
  }

  try {
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${API_URL}/api/affiliates/convert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, code }),
    });

    const result = await response.json();
    return {
      success: result.success,
      alreadyExists: result.data?.alreadyExists,
    };
  } catch (error) {
    console.error("Failed to create referral lead:", error);
    return { success: false };
  }
}
