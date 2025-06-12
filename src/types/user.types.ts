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
    username: string;
    email: string;
    profileImage?: string;
    isVerified: boolean;
    bio?: string;
    address: Address;
    role: string;
    lastLogin?: Date;
    socialLinks: SocialLinks;
    createdAt?: Date;
    updatedAt?: Date;
};