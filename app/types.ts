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



export type School = {
    _id: string;
    name: string;
    city: string;
    logo: string;
    status: boolean;
  };

  export type SchoolResponse = {
    message: string;
    data: {
      schools: School[];
    };
  };