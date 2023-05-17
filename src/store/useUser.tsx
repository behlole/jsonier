import {AltogicAuth, User} from "../typings/altogic";
import {create} from "zustand";
import altogic from "../api/altogic";
import toast from "react-hot-toast";
import useModal from "./useModal";

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
        setUser: (key, value) => set({[key]: value}),
        isPremium: () => {
            const user = get().user;
            if (user) return user.type > 0;
            return false;
        },
        logout: () => {
            altogic.auth.signOut();
            toast.success("Logged Out");
            useModal.setState({account: false});
            set(initialStates);
        },
        checkSession: () => {

        },
        validatePremium: () => {
            return false
        },
        login: (response) => {
            set({user: response.user, isAuthenticated: true});
        }
    })
)
export default useUser;
