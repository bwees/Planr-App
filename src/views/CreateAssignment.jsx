import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Keyboard, KeyboardAvoidingView, FlatList } from "react-native";
import { FONTS, SHADOW } from "../Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import UIStepper from 'react-native-ui-stepper';
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FileCell from "../components/FileCell";
import DocumentPicker from 'react-native-document-picker';
import ActionSheet from 'react-native-actionsheet'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { saveAssignment } from "../storage/StorageAPI";
import uuid from 'react-native-uuid';
import { addDate, stripTime } from "../Helpers";
import RNFS from "react-native-fs";
import mime from "mime";


const CreateAssignment = (props) => {

    const { colors } = useTheme();

    const [assignmentName, setAssignmentName] = useState("");
    const [classSelection, setClassSelection] = useState("Choose");
    const [typeSelection, setTypeSelection] = useState("Choose");
    const [dueDate, setDueDate] = useState(stripTime(addDate(new Date(), 1)));
    const [timeLength, setTimeLength] = useState(15);
    const [notes, setNotes] = useState("");
    const [files, setFiles] = useState([]);

    const [imageCount, setImageCount] = useState(1);

    // Handle returning with parameters
    props.navigation.addListener('focus', () => {
        if (props.route.params?.selection) {
            if (props.route.params?.fieldName === "Class") {
                setClassSelection(props.route.params.selection)
            }
            else if (props.route.params?.fieldName === "Type") {
                setTypeSelection(props.route.params.selection)
            }
            else if (props.route.params?.fieldName === "Calendar") {
                setDueDate(props.route.params.selection)
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


    attachFiles = async () => {
        //Opening Document Picker for selection of multiple file
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well find above
            });
            for (const res of results) {
                const id = uuid()
                fileObj = {
                    id: id,
                    name: res.name,
                    type: "document",
                    path: RNFS.DocumentDirectoryPath + "/" + id + "." + mime.getExtension(res.type),
                }

                RNFS.copyFile(res.uri, RNFS.DocumentDirectoryPath + "/" + id + "." + mime.getExtension(res.type))
                    .catch((err) => {
                        console.log(err.message, err.code);
                    });

                setFiles([...files, fileObj]);
            }

        } catch (err) {
            //Handling any exception (If any)
            if (!DocumentPicker.isCancel(err)) {
                throw err;
            }
        }
    };

    attachPhotos = (res) => {
        const id = uuid();

        fileObj = {
            name: "Image" + imageCount + ".jpg",
            type: "picture",
            path: res.uri,
            id: id
        }

        setImageCount(imageCount + 1);

        RNFS.copyFile(res.uri, RNFS.DocumentDirectoryPath + "/" + id + "." + mime.getExtension(res.type))
            .catch((err) => {
                console.log(err.message, err.code);
            });

        setFiles([...files, fileObj]);
    }

    return (
        <View style={{ flex: 1 }}>

            {/* Header */}
            <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 55, backgroundColor: colors.headerColor }]}>
                <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20 }} onPress={() => { props.navigation.goBack() }}>
                    <Text style={{ color: colors.primary, fontSize: 18 }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ marginHorizontal: 20 }}
                    onPress={() => {
                        saveAssignment(
                            assignmentName,
                            typeSelection,
                            classSelection,
                            dueDate,
                            timeLength,
                            notes,
                            files
                        );
                        props.navigation.goBack();
                    }}>
                    <Text style={{ color: colors.primary, fontSize: 18, fontWeight: "bold" }}>Done</Text>
                </TouchableOpacity>
            </View>

            <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder }} />

            <KeyboardAwareScrollView style={{ paddingHorizontal: 20, paddingTop: 16, flex: 1 }} extraHeight={150}>
                <Text style={[FONTS.h1, FONTS.bold, { color: colors.primary, paddingBottom: 16 }]}>New Assignment</Text>

                {/* Assignement Name */}
                <View height={44} style={[styles.textField, SHADOW, { marginBottom: 24 }]}>
                    <TextInput style={[FONTS.h3, { flex: 1, lineHeight: 18, color: colors.text }]} selectionColor={colors.primary} placeholder={"Assignment Name"} onChangeText={text => setAssignmentName(text)} />
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
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 4,
                            paddingHorizontal: 6,
                            borderRadius: 8,
                            backgroundColor: colors.stepperDateFill,
                            marginRight: 8
                        }}
                        onPress={() => props.navigation.navigate("CalendarPicker", { selected: dueDate })}
                    >
                        <Text style={[FONTS.h3, { color: colors.primary }]}>{new Date(dueDate).toLocaleString('default', { month: 'long', day: "numeric", year: "numeric" })}</Text>
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
                    onChangeText={text => setNotes(text)}
                />

                {/* Attachments */}
                <View style={[SHADOW, { backgroundColor: colors.textField, borderRadius: 12, paddingTop: 8, paddingBottom: 8, marginBottom: 32 }]}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 8, paddingHorizontal: 16 }}>
                        <Text style={[FONTS.h3, { color: colors.gray }]}>Attachments</Text>
                        <TouchableOpacity onPress={() => this.ActionSheet.show()}>
                            <Ionicons name={"add-circle"} size={24} color={colors.primary} style={{ paddingTop: 2 }} />
                        </TouchableOpacity>
                    </View>
                    {files.length != 0 &&
                        <View>
                            <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder }} />
                            <View style={{ flex: 1, paddingTop: 16, paddingHorizontal: 16 }}>
                                {files.map((item, key) => (
                                    <FileCell file={item} key={key} />
                                ))}
                            </View>
                        </View>
                    }
                </View>



            </KeyboardAwareScrollView>
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