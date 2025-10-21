interface Address {
    country: string;
    city: string;
};
interface SocialLinks {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
};

export interface UserModal {
    name: string;
    age: number;
    email: string;
    profileImage?: string;
    isVerified: boolean;
    bio?: string;
    address: Address;
    role: string;
    lastLogin?: Date;
    socialLinks?: SocialLinks;
    profession?: string;
    createdAt?: Date;
    updatedAt?: Date;
};