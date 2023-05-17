import {AltogicAuth, User} from "../typings/altogic";
import {create} from "zustand";

interface UserActions {
    login: (response: AltogicAuth) => void;
    logout: () => void;
    setUser: (key: keyof typeof initialStates, value: any) => void;
    checkSession: () => void;
    isPremium: () => boolean;
    validatePremium: (cb: () => void) => boolean;
}

export type UserStates = typeof initialStates;
const initialStates = {
    isAuthenticated: false,
    user: null as User | null,
}
const useUser = create<UserStates & UserActions>()(
    (set, get) => ({
        ...initialStates,
        setUser: (key, value) => set({[key], value}),
        isPremium: () => {
            const user = get().user;
            if (user) return user.type > 0;
            return false;
        },
        logout: () => {

        },
        checkSession: () => {

        },
        validatePremium: () => {
            return false
        },
        login: () => {

        }
    })
)
