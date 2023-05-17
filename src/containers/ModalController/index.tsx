import useModal from "../../store/useModal";
import {shallow} from "zustand/shallow";

export const ModalController = () => {
    const setVisible = useModal(state => state.setVisible);
    const [
        importModal,
        clearModal,
        downloadModal,
        settingsModal,
        cloudModal,
        accountModal,
        shareModal,
        loginModal,
        premiumModal
    ] = useModal(
        state => [
            state.import,
            state.clear,
            state.download,
            state.settings,
            state.cloud,
            state.account,
            state.share,
            state.login,
            state.premium
        ],
        shallow
    )
    return (
        <>
        </>
    )

}
