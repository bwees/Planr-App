import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");


export const LightMode = {
    ...DefaultTheme,

    colors: {
        ...DefaultTheme.colors,

        text: "#444444",
        gray: "#888888",
        background: "#fefefe",
        headerColor: "white",
        primary: "#47b0fe",
        tabBarColor: "white",
        sheet: "white",
        lightGray: "#dfdfdf",
        cellColor: "white",
        chevron: "#c4c4c6",
        textField: "white",
        headerBorder: "#e3e3e3",
        assignmentCellText: "#888888",
        stepperOutline: "white",
        stepperDateFill: "#eaeaea",
        searchBar: "#eaeaea"
    },
};

export const DarkMode = {
    ...DarkTheme,

    colors: {
        ...DarkTheme.colors,

        text: "#dfdfdf",
        gray: "#8a8a8a",
        background: "#0f0f0f",
        headerColor: "#171717",
        primary: "#47b0fe",
        tabBarColor: "#202020",
        sheet: "#0F0F0F",
        lightGray: "#2d2d2d",
        cellColor: "#222222",
        chevron: "#96969C",
        assignmentCellText: "#dfdfdf",
        headerBorder: "#2a2a2a",
        textField: "#1c1c1c",
        stepperOutline: "#3d3d3d",
        stepperDateFill: "#2d2d2d",
        searchBar: "#2d2d2d",
    },
};


export const SIZES = {

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
        height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,

}


const appTheme = { FONTS, SHADOW };

export default appTheme;




