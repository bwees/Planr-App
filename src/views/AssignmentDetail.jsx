import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Linking, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FONTS, SHADOW } from "../Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommuniyIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SegmentedControl from '@react-native-community/segmented-control';
import { useState } from "react";
import FileCell from "../components/FileCell";
import { FlatList } from "react-native-gesture-handler";
import { deleteAssignmentWithID, getAssignmentByID, updateStatus } from "../apis/storage/Storage";
import RNFS from "react-native-fs"
import { getTheme, minutesToTimeString } from "../Helpers";
import { getGCLinkingURL } from "../apis/googleclassroom/GoogleClassroom";


const AssignmentDetail = ({ route, navigation }) => {

    const { assignmentID } = route.params;
    const [assignment, setAssignment] = useState(getAssignmentByID(assignmentID));
    var [assignmentStatus, setStatus] = useState(getAssignmentByID(assignmentID).status);

    navigation.addListener('focus', () => {
        setAssignment(getAssignmentByID(assignmentID));
    });

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
                                    marginTop: 24
                                }]}
                        >
                            <View>
                                <View style={{ paddingHorizontal: 20, paddingTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={[FONTS.h2, FONTS.bold, { color: colors.primary }]}>Details</Text>
                                    <TouchableOpacity>
                                        <MaterialCommuniyIcons
                                            name="pencil-circle"
                                            size={24}
                                            color={colors.primary}
                                            onPress={() => {
                                                navigation.navigate('EditAssignment', {
                                                    screen: "EditAssignmentScreen",
                                                    params: {
                                                        assignmentID: assignment.id
                                                    }
                                                });
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 1, borderRadius: 4, backgroundColor: colors.lightGray, marginTop: 10, }} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 16, }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Ionicons name="calendar" size={20} color={colors.text} />
                                        <Text style={[FONTS.h3, { color: colors.text, paddingLeft: 8 }]}>{new Date(assignment.dueDate).toLocaleDateString()}</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 4 }}>
                                        <Ionicons name="time" size={20} color={colors.text} />
                                        <Text style={[FONTS.h3, { color: colors.text, paddingLeft: 8 }]}>{minutesToTimeString(assignment.time)}</Text>
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
                                                updateStatus(assignment.id, event.nativeEvent.selectedSegmentIndex);
                                            }}
                                            appearance={getTheme()}
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

                                    {assignment.attachments.length != 0 &&
                                        <View>
                                            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
                                                <Text style={[FONTS.h2, FONTS.bold, { color: colors.primary, paddingRight: 6 }]}>Attachments</Text>
                                                <MaterialCommuniyIcons name="paperclip" size={20} color={colors.primary} />
                                            </View>

                                            <FlatList
                                                scrollEnabled={false}
                                                data={assignment.attachments}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <FileCell file={item} />
                                                    )
                                                }}
                                                keyExtractor={item => item.id}
                                                style={{ overflow: "visible" }}
                                            />
                                        </View>
                                    }

                                    { assignment.gcURL === "" &&
                                        <TouchableOpacity
                                            style={[SHADOW, { height: 42, backgroundColor: colors.cellColor, borderRadius: 16, marginTop: 16, marginBottom: 32, alignItems: "center", justifyContent: "center", flexDirection: "row" }]}
                                            onPress={() => {
                                                Alert.alert(
                                                    "Delete Assignment?",
                                                    "Are you sure you want to delete the assignment?",
                                                    [
                                                        {
                                                            text: "Cancel",
                                                            style: "cancel"
                                                        },
                                                        {
                                                            text: "Delete",
                                                            onPress: () => {
                                                                for (const attachment of assignment.attachments) {
                                                                    RNFS.unlink(attachment.path)
                                                                        .catch((err) => {
                                                                            console.log(err.message, err.code);
                                                                        });
                                                                }
                                                                deleteAssignmentWithID(assignmentID)
                                                                navigation.goBack();
                                                            },
                                                            style: "destructive"
                                                        }
                                                    ],
                                                    { cancelable: false }
                                                );
                                            }}
                                        >
                                            <Ionicons name="ios-trash" size={20} color={colors.primary} />
                                            <Text style={[FONTS.h3, FONTS.bold, { color: colors.primary, paddingLeft: 4 }]}>Delete Assignment</Text>
                                        </TouchableOpacity>
                                    }
                                    { assignment.gcURL !== "" &&
                                        <TouchableOpacity
                                            style={[SHADOW, { height: 42, backgroundColor: colors.cellColor, borderRadius: 16, marginTop: 16, marginBottom: 32, alignItems: "center", justifyContent: "center", flexDirection: "row" }]}
                                            onPress={async () => {
                                                var gcLink = getGCLinkingURL(assignment.gcURL)
                                                
                                                Linking.openURL(gcLink).catch((err) => {
                                                    Alert.alert("Unable To Open", "Verify that the Google Classroom app is installed on your phone to continue.")
                                                })
                                            }}
                                        >
                                            <Image
                                                source={require('../../resources/gc-icon.png')}
                                                style={{ width: 32, height: 32, marginRight: 4 }}
                                                resizeMode={"contain"}
                                            />
                                            <Text style={[FONTS.h3, FONTS.bold, { color: colors.text, paddingLeft: 4 }]}>Open in Google Classroom</Text>
                                        </TouchableOpacity>
                                    }
                                </ScrollView>

                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View >

    );
};

export default AssignmentDetail;