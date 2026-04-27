"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/apiClient";
import type {
  Influencer,
  InfluencersResponse,
  InfluencerResponse,
  CreateInfluencerResponse,
  ReferralsResponse,
  DashboardResponse,
} from "../types";

// Dashboard
export function useDashboard() {
  return useQuery<DashboardResponse>({
    queryKey: ["affiliates", "dashboard"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/affiliates/dashboard");
      return data;
    },
  });
}

// Influencers
interface UseInfluencersParams {
  status?: string;
  search?: string;
}

export function useInfluencers(params?: UseInfluencersParams) {
  return useQuery<InfluencersResponse>({
    queryKey: ["affiliates", "influencers", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.set("status", params.status);
      if (params?.search) searchParams.set("search", params.search);

      const { data } = await axiosInstance.get(
        `/affiliates/influencers?${searchParams.toString()}`
      );
      return data;
    },
  });
}

export function useInfluencer(id: string) {
  return useQuery<InfluencerResponse>({
    queryKey: ["affiliates", "influencers", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/affiliates/influencers/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

interface CreateInfluencerData {
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  instagram?: string;
  commissionType: "fixed" | "percentage";
  commissionAmount: number;
  password?: string;
}

export function useCreateInfluencer() {
  const queryClient = useQueryClient();
  return useMutation<CreateInfluencerResponse, Error, CreateInfluencerData>({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post("/affiliates/influencers", formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliates", "influencers"] });
      queryClient.invalidateQueries({ queryKey: ["affiliates", "dashboard"] });
    },
  });
}

interface UpdateInfluencerParams {
  id: string;
  data: Partial<Influencer>;
}

export function useUpdateInfluencer() {
  const queryClient = useQueryClient();
  return useMutation<InfluencerResponse, Error, UpdateInfluencerParams>({
    mutationFn: async ({ id, data: updateData }) => {
      const { data } = await axiosInstance.put(
        `/affiliates/influencers/${id}`,
        updateData
      );
      return data;
    },
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["affiliates", "influencers"] });
      queryClient.invalidateQueries({
        queryKey: ["affiliates", "influencers", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["affiliates", "dashboard"] });
    },
  });
}

export function useDeleteInfluencer() {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.delete(`/affiliates/influencers/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliates", "influencers"] });
      queryClient.invalidateQueries({ queryKey: ["affiliates", "dashboard"] });
    },
  });
}

interface ResetPasswordResponse {
  success: boolean;
  data: { temporaryPassword: string };
}

export function useResetInfluencerPassword() {
  return useMutation<ResetPasswordResponse, Error, string>({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.post(`/affiliates/influencers/${id}/reset-password`);
      return data;
    },
  });
}

// Referrals
interface UseReferralsParams {
  status?: string;
  influencerId?: string;
  page?: number;
  limit?: number;
}

export function useReferrals(params?: UseReferralsParams) {
  return useQuery<ReferralsResponse>({
    queryKey: ["affiliates", "referrals", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.set("status", params.status);
      if (params?.influencerId) searchParams.set("influencerId", params.influencerId);
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());

      const { data } = await axiosInstance.get(
        `/affiliates/referrals?${searchParams.toString()}`
      );
      return data;
    },
  });
}

export function useReferral(id: string) {
  return useQuery<{ success: boolean; data: import("../types").Referral }>({
    queryKey: ["affiliates", "referrals", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/affiliates/referrals/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

interface UpdateReferralStatusParams {
  id: string;
  status: string;
  note?: string;
  bookingAmount?: number;
}

export function useUpdateReferralStatus() {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, Error, UpdateReferralStatusParams>({
    mutationFn: async ({ id, status, note, bookingAmount }) => {
      const { data } = await axiosInstance.put(`/affiliates/referrals/${id}/status`, {
        status,
        note,
        bookingAmount,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliates", "referrals"] });
      queryClient.invalidateQueries({ queryKey: ["affiliates", "dashboard"] });
    },
  });
}

export function useMarkCommissionPaid() {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.put(`/affiliates/referrals/${id}/pay`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliates", "referrals"] });
      queryClient.invalidateQueries({ queryKey: ["affiliates", "dashboard"] });
    },
  });
}
