export interface User {
    id: string,
    name?: string,
    avatar?: string,
    email: string,
    phone?: string,
    verified: boolean,
    address?: string,
    role: string,
    active: boolean,
    gender: string,
    dateOfBirth: string;
}
export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
}
export interface LanguageItem {
  id: string;
  code: string;
  nameVi?: string;
  nameEn?: string;
}

export interface LanguageListProps {
  listLanguages: LanguageItem[];
  listCustom: LanguageItem[];
  onSuccess: () => void;
}