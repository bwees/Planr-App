import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FONTS, SHADOW } from "../theme/Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommuniyIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
                            style={[SHADOW,
                                {
                                    backgroundColor: colors.background,
                                    borderTopLeftRadius: 24,
                                    borderTopRightRadius: 24,
                                    flexGrow: 1,
                                    marginTop: 16
                                }
                            ]}>
                            <View>
                                <View style={{ paddingHorizontal: 20, paddingTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={[FONTS.h2, FONTS.bold, { color: colors.primary }]}>Details</Text>
                                    <MaterialCommuniyIcons name="pencil-circle" size={24} color={colors.primary} />
                                </View>
                                <View style={{ height: 1, borderRadius: 4, backgroundColor: colors.lightGray, marginTop: 10, }} />
                            </View>

                            <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Ionicons name="calendar" size={20} color={colors.gray} />
                                    <Text style={[FONTS.h3, { color: colors.gray, paddingLeft: 4 }]}>{assignment.dueDate}</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 4 }}>
                                    <Ionicons name="time" size={20} color={colors.gray} />
                                    <Text style={[FONTS.h3, { color: colors.gray, paddingLeft: 4 }]}>{assignment.time}</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 4 }}>
                                    <Ionicons name="person" size={20} color={colors.gray} />
                                    <Text style={[FONTS.h3, { color: colors.gray, paddingLeft: 4 }]}>{assignment.class}</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 4 }}>
                                    <Ionicons name="pencil" size={20} color={colors.gray} />
                                    <Text style={[FONTS.h3, { color: colors.gray, paddingLeft: 4 }]}>{assignment.type}</Text>
                                </View>

                            </View>

                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View >

    );
};

export default AssignmentDetail;