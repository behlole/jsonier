import React from "react";
import {ThemeProvider} from "styled-components";
import {darkTheme} from "src/constants/theme";
import EditorPage from "./editor";

const HomePage = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <EditorPage/>
        </ThemeProvider>
    )
}
export default HomePage;
