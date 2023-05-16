import {create} from "zustand";
import {persist} from "zustand/middleware";
import {set} from "zod";

type Sponsor = {
    handle: String,
    avatar: String,
    profile: String
}
const initialStates = {
    lightMode: false,
    hideCollapse: true,
    childrenCount: true,
    imagePreview: true,
    sponsors: {
        users: [] as Sponsor[],
        nextDate: Date.now()
    }
}

export interface ConfigActions {
    setSponsors: (sponsors: Sponsor[]) => void;
    setLightTheme: (theme: boolean) => void;
    toggleHideCollapse: (value: boolean) => void;
    toggleChildrenCount: (value: boolean) => void;
    toggleImagePreview: (value: boolean) => void;
}

function getTomorrow(): number {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1)
    return new Date(tomorrow).getTime()
}

export const useStored = create(
    persist<typeof initialStates & ConfigActions>(
        set => (
            {
                ...initialStates,
                setLightTheme: (value: boolean) => {
                    set({lightMode: value})
                },
                setSponsors: (users: Sponsor[]) => {
                    set({
                        sponsors: {
                            users,
                            nextDate: getTomorrow()
                        }
                    })
                },
                toggleHideCollapse: (value: boolean) => {
                    set({hideCollapse: value})
                },
                toggleChildrenCount: (value: boolean) => {
                    set({childrenCount: value})
                },
                toggleImagePreview: (value: boolean) => {
                    set({imagePreview: value})
                }
            }
        ),
        {
            name: "config"
        }
    )
)
