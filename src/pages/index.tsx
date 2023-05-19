import React from "react";
import {ThemeProvider} from "styled-components";
import {darkTheme} from "src/constants/theme";
import Editor from "./editor";

const HomePage = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Editor/>
        </ThemeProvider>
    )
}
export default HomePage;
