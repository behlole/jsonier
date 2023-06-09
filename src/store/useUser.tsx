import toast from "react-hot-toast";
import {create} from "zustand";
import {AltogicAuth, User} from "src/typings/altogic";
import useModal from "./useModal";
import altogic from "../api/altogic";

interface UserActions {
    login: (response: AltogicAuth) => void;
    logout: () => void;
    setUser: (key: keyof typeof initialStates, value: any) => void;
    checkSession: () => void;
    isPremium: () => boolean;
    validatePremium: (cb: () => void) => void;
}

const initialStates = {
    isAuthenticated: false,
    user: null as User | null,
};

export type UserStates = typeof initialStates;

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
            toast.success("Logged out.");
            useModal.setState({account: false});
            set(initialStates);
        },
        login: response => {
            set({user: response.user as any, isAuthenticated: true});
        },
        checkSession: async () => {
            const currentSession = altogic.auth.getSession();

            if (currentSession) {
                const dbUser = await altogic.auth.getUserFromDB();

                altogic.auth.setSession(currentSession);
                set({user: dbUser.user as any, isAuthenticated: true});
            } else {
                if (!new URLSearchParams(window.location.search).get("access_token")) return;

                const data = await altogic.auth.getAuthGrant();
                if (!data.errors?.items.length) {
                    set({user: data.user as any, isAuthenticated: true});
                }
            }
        },
        validatePremium: callback => {
            if (get().isAuthenticated) {
                if (!get().isPremium()) return useModal.getState().setVisible("premium")(true);
                return callback();
            } else {
                return useModal.getState().setVisible("account")(true);
            }
        },
    }));

export default useUser;
