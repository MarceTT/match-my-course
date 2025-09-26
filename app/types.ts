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



  export interface SchoolDetails {
    _id: string;
    name: string;
    city: string;
    status: boolean;
    mainImage?: string;
    logo?: string;
    galleryImages?: string[];
    prices?: any[];
    weekPrices?: any[];
    weekRanges?: any[];
    description?: {
      añoFundacion?: number;
    };
    qualities?: {
      ponderado?: number;
    };
    [key: string]: any;
  }