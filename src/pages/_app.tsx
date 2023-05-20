import {AppProps} from "next/app";
import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "styled-components";
import {MantineProvider} from "@mantine/core";
import {init} from "@sentry/nextjs";
import localFont from "next/font/local";
import {useStored} from "../store/useStored";
import {darkTheme, lightTheme} from "../constants/theme";
import GlobalStyle from "../constants/globalStyle";
import ModalController from "../containers/ModalController";
import {Toaster} from "react-hot-toast";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
})
if (process.env.NODE_ENV != 'development') {
    init({
        dsn: "https://8848490511b64a75a2c1b32c55fd84a1@o4505191322025984.ingest.sentry.io/4505191323729920",
        tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
}
const monaSans = localFont({
    src: "../pages/Mona-Sans.woff2",
    variable: "--mona-sans",
    display: "swap",
    fallback: ["Arial, Helvetica, sans-serif", "Tahoma, Verdana, sans-serif"],
});

function Jsonier({Component, pageProps}: AppProps) {
    const [isReady, setReady] = React.useState(false);
    const isLightMode = useStored(state => state.lightMode);

    React.useEffect(() => {
        setReady(true);
    }, [])
    if (isReady) {
        return (<QueryClientProvider client={queryClient}>
                <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
                    <GlobalStyle/>
                    <MantineProvider
                        withGlobalStyles
                        withCSSVariables
                        withNormalizeCSS
                        theme={
                            {
                                colorScheme: isLightMode ? "light" : "dark",
                                fontFamily: monaSans.style.fontFamily,
                                components: {
                                    Divider: {
                                        styles: () => ({
                                            root: {
                                                borderTopColor: "#4D4D4D !important",
                                            },
                                        }),
                                    },
                                    Modal: {
                                        styles: theme => ({
                                            title: {
                                                fontWeight: 700,
                                            },
                                            header: {
                                                backgroundColor: theme.colorScheme === "dark" ? "#36393E" : "#FFFFFF",
                                            },
                                            body: {
                                                backgroundColor: theme.colorScheme === "dark" ? "#36393E" : "#FFFFFF",
                                            },
                                        }),
                                    },
                                    Button: {
                                        styles: theme => ({
                                            inner: {
                                                fontWeight: 700,
                                            },
                                        }),
                                    },
                                },
                            }
                        }
                    >
                        <Component {...pageProps}/>
                        <ModalController/>
                        <Toaster
                            position={"top-right"}
                            containerStyle={{
                                top: 40,
                                right: 6,
                                fontSize: 6
                            }}
                        />
                    </MantineProvider>
                </ThemeProvider>
            </QueryClientProvider>
        )
    }
}

export default Jsonier;
