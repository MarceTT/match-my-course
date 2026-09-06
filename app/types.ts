export type User = {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    isVerified: boolean;
    agreeTerms: boolean;
    role: "admin" | "user"; // 🔥 Restringe el rol a valores válidos
    createdAt: string;
    updatedAt: string;
};

export type UserResponse = {
    success: boolean;
    data: {
        message: string;
        data: {
            user: User;
        };
    };
};



export type Country = {
  value: string;
  label: string;
  code: string;
  flag: string;
};

export type SchoolSettings = {
  allowInstantBooking?: boolean;
  accommodationAvailable?: boolean;
  currency?: 'EUR' | 'NZD' | 'USD';
  contactOnly?: boolean;
};

export type School = {
    _id: string;
    name: string;
    city: string;
    logo: string;
    status: boolean;
    country?: Country;
    settings?: SchoolSettings;
  };

  export type SchoolResponse = {
    message: string;
    data: {
      schools: School[];
    };
  };



  // SchoolDetails now lives canonically in lib/types/school.ts.
  export type { SchoolDetails } from "@/lib/types/school";