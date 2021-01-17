import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FONTS, SHADOW } from "../Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommuniyIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SegmentedControl from '@react-native-community/segmented-control';
import { useState } from "react";
import FileCell from "../components/FileCell";

const AssignmentDetail = ({ route, navigation }) => {

    const { assignment } = route.params;
    const { colors } = useTheme();

    var [assignmentStatus, setStatus] = useState(assignment.status);

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
                                    marginTop: 24
                                }]}
                        >
                            <View>
                                <View style={{ paddingHorizontal: 20, paddingTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={[FONTS.h2, FONTS.bold, { color: colors.primary }]}>Details</Text>
                                    <TouchableOpacity>
                                        <MaterialCommuniyIcons name="pencil-circle" size={24} color={colors.primary} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 1, borderRadius: 4, backgroundColor: colors.lightGray, marginTop: 10, }} />
                            </View>

                            <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Ionicons name="calendar" size={20} color={colors.text} />
                                    <Text style={[FONTS.h3, { color: colors.text, paddingLeft: 8 }]}>{new Date(assignment.dueDate).toLocaleDateString()}</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 4 }}>
                                    <Ionicons name="time" size={20} color={colors.text} />
                                    <Text style={[FONTS.h3, { color: colors.text, paddingLeft: 8 }]}>{assignment.time + " Minutes"}</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 4 }}>
                                    <Ionicons name="person" size={20} color={colors.text} />
                                    <Text style={[FONTS.h3, { color: colors.text, paddingLeft: 8 }]}>{assignment.className}</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 4 }}>
                                    <Ionicons name="pencil" size={20} color={colors.text} />
                                    <Text style={[FONTS.h3, { color: colors.text, paddingLeft: 8 }]}>{assignment.type}</Text>
                                </View>

                                <View style={{ paddingVertical: 12 }}>
                                    <SegmentedControl
                                        values={["Not Started", "In Progress", "Done"]}
                                        selectedIndex={assignmentStatus}
                                        onChange={(event) => {
                                            setStatus(event.nativeEvent.selectedSegmentIndex);
                                        }}
                                    />
                                </View>

                                {assignment.notes != "" &&
                                    <View style={{ paddingBottom: 16 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
                                            <Text style={[FONTS.h2, FONTS.bold, { color: colors.primary, paddingRight: 6 }]}>Notes</Text>
                                            <Ionicons name="chatbubble-ellipses" size={20} color={colors.primary} />
                                        </View>

                                        <Text style={[{ color: colors.text }]}>{assignment.notes}</Text>
                                    </View>
                                }

                                {assignment.attachments != [] &&
                                    <View>
                                        <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
                                            <Text style={[FONTS.h2, FONTS.bold, { color: colors.primary, paddingRight: 6 }]}>Attachments</Text>
                                            <MaterialCommuniyIcons name="paperclip" size={20} color={colors.primary} />
                                        </View>

                                        <FileCell file={{ name: "Assignment.pdf", type: "document", filePath: "./sdfsfd.jpg" }} />
                                        <FileCell file={{ name: "Picture.jpg", type: "picture", filePath: "./sdfsfd.jpg" }} />
                                        <FileCell file={{ name: "Other.jpg", type: "picture", filePath: "./sdfsfd.jpg" }} />
                                    </View>
                                }

                            </ScrollView>

                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View >

    );
};

export default AssignmentDetail;