import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const About = (props) => {

    const { colors } = useTheme();

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 55, backgroundColor: colors.headerColor }}>
                <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 8, flexDirection: "row", alignItems: "center" }} onPress={() => { props.navigation.goBack() }}>
                    <Ionicons name={"ios-chevron-back"} size={30} color={colors.primary} />
                    <Text style={{ color: colors.primary, fontSize: 18 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder }} />
        </View>
    );
};

export default About;