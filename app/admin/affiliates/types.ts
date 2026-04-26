export interface Influencer {
  _id: string;
  userId: string;
  code: string;
  name: string;
  email: string;
  phone?: string;
  instagram?: string;
  commissionType: "fixed" | "percentage";
  commissionAmount: number;
  totalVisits: number;
  totalLeads: number;
  totalConversions: number;
  totalEarnings: number;
  pendingPayout: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface StatusChange {
  status: string;
  date: string;
  changedBy?: { _id: string; name: string };
  note?: string;
}

export interface Referral {
  _id: string;
  influencerId: Influencer | string;
  referralCode: string;
  prospectName: string;
  prospectEmail: string;
  prospectPhone?: string;
  source: "contact_form" | "booking" | "consulting" | "service_form";
  courseInterest?: string;
  status: "new" | "contacted" | "negotiating" | "booked" | "paid" | "cancelled";
  statusHistory: StatusChange[];
  bookingAmount?: number;
  commissionAmount?: number;
  commissionStatus: "none" | "pending" | "approved" | "paid";
  commissionPaidAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  influencers: { total: number; active: number };
  referrals: { total: number; converted: number };
  commissions: { pending: number; paid: number };
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ReferralsResponse {
  success: boolean;
  data: {
    referrals: Referral[];
    pagination: PaginationData;
  };
}

export interface InfluencersResponse {
  success: boolean;
  data: {
    influencers: Influencer[];
  };
}

export interface InfluencerResponse {
  success: boolean;
  data: Influencer;
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export interface CreateInfluencerResponse {
  success: boolean;
  data: Influencer & { temporaryPassword?: string };
}
