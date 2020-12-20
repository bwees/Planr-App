
import ProgressBar from 'react-native-progress/Bar';
import React from "react";
import { View, Text } from "react-native";
import { FONTS } from "../theme/Theme";

const TimeChart = (props) => {

    return (
        <View style={[props.style, { flexDirection: "column", alignItems: "center" }]}>

            <Text style={[FONTS.h3, FONTS.bold, { color: props.subtitleColor }]}>{props.title}</Text>
            <Text style={[FONTS.h1, { color: props.textColor, fontWeight: "800" }]}>{props.time}</Text>

            <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 8 }}>
                <ProgressBar progress={props.progress} color={props.barColor} flex={1} flexDirection={"column"} width={null} />
            </View>
            <Text style={[FONTS.h4, FONTS.bold, { color: props.subtitleColor, paddingTop: 8 }]}>{props.subtitle}</Text>



        </View>

    );
};

export default TimeChart;