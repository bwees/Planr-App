import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");


export const LightMode = {
    ...DefaultTheme,

    colors: {
        ...DefaultTheme.colors,

        text: "white",
        gray: "#ababab",
        background: "white",
        headerColor: "white",
        primary: "#47b0fe",
        primaryRGB: "71, 176, 254",
        tabBarColor: "white",
        tileColor: "white",
        sheet: "white",
        lightGray: "#dfdfdf"
    },
};

export const DarkMode = {
    ...DarkTheme,

    colors: {
        ...DarkTheme.colors,

        text: "#dfdfdf",
        gray: "#bdbdbd",
        background: "#0f0f0f",
        headerColor: "#121212",
        primary: "#47b0fe",
        primaryRGB: "71, 176, 254",
        tabBarColor: "#202020",
        tileColor: "#1d1d1d",
        sheet: "#1d1d1d",
        lightGray: "#444444"
    },
};


export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,

    hPad: { paddingStart: 20 },

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontSize: SIZES.body4, lineHeight: 22 },
    bold: { fontWeight: "bold" },
};

export const SHADOW = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

}


const appTheme = { FONTS, SHADOW };

export default appTheme;




