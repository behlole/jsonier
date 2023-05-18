import useModal from "../../store/useModal";
import {shallow} from "zustand/shallow";
import {ImportModal} from "../Modals/ImportModal";
import {ClearModal} from "../Modals/ClearModal";
import {DownloadModal} from "../Modals/DownloadModal";
import {SettingsModal} from "../Modals/SettingsModal";
import {CloudModal} from "../Modals/CloudModal";
import {AccountModal} from "../Modals/AccountModal";
import {PremiumModal} from "../Modals/PremiumModal";
import {LoginModal} from "../Modals/LoginModal";

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
            <ImportModal opened={importModal} onClose={() => setVisible("import")(false)}/>
            <ClearModal opened={clearModal} onClose={() => setVisible("clear")(false)}/>
            <DownloadModal opened={downloadModal} onClose={() => setVisible("download")(false)}/>
            <SettingsModal opened={settingsModal} onClose={() => setVisible("settings")(false)}/>
            <CloudModal opened={cloudModal} onClose={() => setVisible("cloud")(false)}/>
            <AccountModal opened={accountModal} onClose={() => setVisible("account")(false)}/>
            <PremiumModal opened={premiumModal} onClose={() => setVisible("premium")(false)}/>
            <LoginModal opened={loginModal} onClose={() => setVisible("login")(false)}/>
        </>
    )
}
export default ModalController;
