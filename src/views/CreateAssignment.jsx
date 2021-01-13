import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Keyboard, KeyboardAvoidingView } from "react-native";
import { FONTS, SHADOW } from "../theme/Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import UIStepper from 'react-native-ui-stepper';
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FileCell from "../components/FileCell";
import DocumentPicker from 'react-native-document-picker';
import ActionSheet from 'react-native-actionsheet'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const CreateAssignment = (props) => {

    const { colors } = useTheme();

    const [assignmentName, setAssignmentName] = useState("");
    const [classSelection, setClassSelection] = useState("Choose");
    const [typeSelection, setTypeSelection] = useState("Choose");
    const [dueDate, setDueDate] = useState(null);
    const [timeLength, setTimeLength] = useState(15);
    const [notes, setNotes] = useState("");
    const [files, setFiles] = useState([]);

    props.navigation.addListener('focus', () => {
        if (props.route.params?.selection) {
            if (props.route.params?.fieldName === "Class") {
                setClassSelection(props.route.params.selection)
            }
            else if (props.route.params?.fieldName === "Type") {
                setTypeSelection(props.route.params.selection)
            }
        }
    });

    const styles = StyleSheet.create({
        textField: {
            ...SHADOW,
            backgroundColor: colors.textField,
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingRight: 4,
            alignItems: "center",
            flexDirection: "row",
        }
    });

    async function attachFiles() {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            });
            for (const res of results) {
                fileObj = {
                    name: res.name,
                    type: "document",
                    path: res.uri
                }

                setFiles([...files, fileObj]);
                console.log([...files, fileObj])
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }

    }

    function attachPhotos(response) {
        console.log(response);
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    return (
        <View style={{ flex: 1 }}>

            {/* Header */}
            <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 55, backgroundColor: colors.headerColor }]}>
                <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20 }} onPress={() => { props.navigation.goBack() }}>
                    <Text style={{ color: colors.primary, fontSize: 18 }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20 }} onPress={() => { props.navigation.goBack() }}>
                    <Text style={{ color: colors.primary, fontSize: 18, fontWeight: "bold" }}>Done</Text>
                </TouchableOpacity>
            </View>
            <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder }} />

            <ScrollView style={{ paddingHorizontal: 20, paddingTop: 16, flex: 1 }} extraHeight={150}>
                <Text style={[FONTS.h1, FONTS.bold, { color: colors.primary, paddingBottom: 16 }]}>New Assignment</Text>

                {/* Assignement Name */}
                <View height={44} style={[styles.textField, SHADOW, { marginBottom: 24 }]}>
                    <TextInput style={[FONTS.h3, { flex: 1, lineHeight: 18, color: colors.text }]} selectionColor={colors.primary} placeholder={"Assignment Name"} />
                </View>


                {/* Class Selector */}
                <View height={44} style={[styles.textField, SHADOW, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>Class</Text>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => { props.navigation.navigate("DropdownMenu", { options: ["English", "Math", "Science"], selected: classSelection, fieldName: "Class" }) }}>
                        <Text style={[FONTS.h3, classSelection === "Choose" ? { color: colors.gray } : { color: colors.text }]}>{classSelection}</Text>
                        <Ionicons name={"ios-chevron-forward"} size={27} color={colors.chevron} style={{ paddingTop: 2 }} />
                    </TouchableOpacity>
                </View>


                {/* Type Selector */}
                <View height={44} style={[styles.textField, SHADOW, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>Assignment Type</Text>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => { props.navigation.navigate("DropdownMenu", { options: ["Homework", "Test", "Other"], selected: typeSelection, fieldName: "Type" }) }}>
                        <Text style={[FONTS.h3, typeSelection === "Choose" ? { color: colors.gray } : { color: colors.text }]}>{typeSelection}</Text>
                        <Ionicons name={"ios-chevron-forward"} size={27} color={colors.chevron} style={{ paddingTop: 2 }} />
                    </TouchableOpacity>
                </View>


                {/* Due Date */}
                <View height={44} style={[styles.textField, SHADOW, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>Due Date</Text>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", padding: 4, paddingHorizontal: 6, borderRadius: 8, backgroundColor: colors.stepperDateFill, marginRight: 8 }}>
                        <Text style={[FONTS.h3, { color: colors.primary }]}>January 11, 2021</Text>
                    </TouchableOpacity>
                </View>


                {/* Time Stepper */}
                <View height={44} style={[styles.textField, SHADOW, { marginBottom: 24, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.text }]}>{timeLength}-{timeLength + 5} Minutes</Text>
                    <View style={{ paddingRight: 8 }}>
                        <UIStepper
                            onValueChange={(value) => { setTimeLength(value) }}
                            tintColor={colors.primary}
                            backgroundColor={colors.stepperDateFill}
                            borderColor={colors.stepperOutline}
                            borderRadius={8}
                            minimumValue={5}
                            initialValue={15}
                            steps={5}
                        />
                    </View>
                </View>


                {/* Notes */}
                <TextInput
                    style={[FONTS.h3, styles.textField,
                    {
                        flex: 1,
                        color: colors.text,
                        marginBottom: 12,
                        height: 150,
                        paddingTop: 12,
                        paddingHorizontal: 16,
                        alignItems: "flex-start"
                    }]}
                    multiline
                    textAlignVertical={"top"}
                    selectionColor={colors.primary}
                    placeholder={"Notes"}
                    placeholderTextColor={colors.gray}
                    onTextInput={text => setNotes(text)}
                />

                {/* Attachments */}
                <View height={44} style={[SHADOW, { backgroundColor: colors.textField, borderRadius: 12, height: 225, padding: 8, paddingHorizontal: 0, marginBottom: 32 }]}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 8, paddingHorizontal: 16 }}>
                        <Text style={[FONTS.h3, { color: colors.gray }]}>Attachments</Text>
                        <TouchableOpacity onPress={showActionSheet}>
                            <Ionicons name={"add-circle"} size={24} color={colors.primary} style={{ paddingTop: 2 }} />
                        </TouchableOpacity>
                    </View>
                    <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder }} />
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ paddingHorizontal: 8, paddingTop: 8 }}>

                        </ScrollView>
                    </View>
                </View>



            </ScrollView>
            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'Choose Attachment Source'}
                options={['Camera', 'Photo Library', 'Files', "Cancel"]}
                cancelButtonIndex={3}
                tintColor={colors.primary}
                onPress={(index) => {
                    if (index == 0) {
                        launchCamera(
                            {
                                mediaType: 'photo',
                            },
                            attachPhotos
                        )
                    }
                    if (index == 1) {
                        launchImageLibrary(
                            {
                                mediaType: 'photo',
                            },
                            attachPhotos
                        )
                    }
                    if (index == 2) {
                        attachFiles();
                    }
                }}
            />
        </View>
    );
};

export default CreateAssignment;