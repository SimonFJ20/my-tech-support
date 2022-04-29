
export type SupporterId = number;

export type Supporter = {
    id: SupporterId,
    createdAt: Date,
    email: string,
    firstName: string,
    lastName: string,
    passwordHash: string,
    permissions: 'default' | 'admin',
    role: 'level 1' | 'level 2',
};
