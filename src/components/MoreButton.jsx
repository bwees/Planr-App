import { useTheme } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SHADOW } from "../theme/Theme";
import Ionicons from "react-native-vector-icons/Ionicons";

const MoreButton = (props) => {

    const { colors } = useTheme();

    return (
        <TouchableOpacity activeOpacity={0.6} style={[{ marginLeft: -15 }]} >
            <View style={{
                height: 115,
                width: 75,
                justifyContent: "center",
                alignItems: "center"
            }} >
                <Ionicons name="ellipsis-horizontal-circle" size={30} color={colors.gray} />
                <Text style={{ color: colors.gray }}>MORE</Text>
            </View>
        </TouchableOpacity >

    );
};

export default MoreButton;