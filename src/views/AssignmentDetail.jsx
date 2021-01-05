import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FONTS, SHADOW } from "../theme/Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';

const AssignmentDetail = ({ route, navigation }) => {

    const { assignment } = route.params;
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1, marginBottom: 0 }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: .1 }} colors={["#4287f5", "#40d6ff",]} useAngle={true} angle={120} style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingTop: 16 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20 }}>
                            <Ionicons name="ios-share-outline" size={28} color={"white"} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20 }} onPress={() => { navigation.goBack(); }}>
                            <Text style={[FONTS.bold, { fontSize: 18, color: "white" }]}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: "column", marginTop: 24 }}>
                        <View style={{ paddingHorizontal: 20, justifyContent: "flex-start" }}>
                            <Text style={[FONTS.h1, FONTS.bold, { color: "white" }]} numberOfLines={2}>{assignment.name}</Text>
                        </View>
                        <View
                            style={[SHADOW, {
                                backgroundColor: colors.background,
                                borderTopLeftRadius: 24,
                                borderTopRightRadius: 24,
                                flexGrow: 1,
                                marginTop: 16
                            }]}>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View >

    );
};

export default AssignmentDetail;