import { DeepPartial, extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: DeepPartial<ThemeConfig> = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const theme = extendTheme({ config });
export default theme;
