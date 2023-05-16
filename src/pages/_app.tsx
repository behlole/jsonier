import {AppProps} from "next/app";
import React from "react";
import {useStored} from "@/store/useStored";

function Jsonier({Component, pageProps}: AppProps) {
    const [isReady, setReady] = React.useState(false);
    const isLightMode = useStored(state => state.lightMode);
}
