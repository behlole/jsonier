import {AppProps} from "next/app";
import React from "react";
import {useStored} from "@/store/useStored";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
})

function Jsonier({Component, pageProps}: AppProps) {
    const [isReady, setReady] = React.useState(false);
    const isLightMode = useStored(state => state.lightMode);

    React.useEffect(() => {
        setReady(true);
    }, [])
    if (isReady) {
        <QueryClientProvider client={queryClient}>

        </QueryClientProvider>
    }
}
