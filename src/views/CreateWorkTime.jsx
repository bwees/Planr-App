import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Switch } from "react-native";
import { FONTS, SHADOW } from "../Theme";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { saveWorkTime } from "../apis/storage/StorageAPI";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useEffect } from "react";

const CreateAssignment = (props) => {

    const { colors } = useTheme();

    const [workTimeName, setWorkTimeName] = useState("");
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date().addHours(1))

    const [startVisible, setStartVisible] = useState(false)
    const [endVisible, setEndVisible] = useState(false)

    const [canExpand, setCanExpand] = useState(false);
    const [saveEnabled, setSaveEnabled] = useState(false);

    useEffect(() => {
        if (workTimeName.trim() === "") {
            setSaveEnabled(false)
        } else {
            setSaveEnabled(true)
        }
    }, [workTimeName])


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

    return (
        <View style={{ flex: 1 }}>

            {/* Header */}
            <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 55, backgroundColor: colors.headerColor }]}>
                <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20 }} onPress={() => { props.navigation.goBack(); }}>
                    <Text style={{ color: colors.primary, fontSize: 18 }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ marginHorizontal: 20 }}
                    onPress={() => {
                        saveWorkTime(
                            workTimeName,
                            startTime,
                            endTime,
                            canExpand
                        );
                        props.navigation.goBack();
                    }}
                    disabled={!saveEnabled}
                >
                    <Text style={[{ color: colors.primary, fontSize: 18, fontWeight: "bold" }, (saveEnabled ? { color: colors.primary } : { color: colors.lightGray })]}>Done</Text>
                </TouchableOpacity>
            </View>

            <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder }} />

            <KeyboardAwareScrollView style={{ paddingHorizontal: 20, paddingTop: 16, flex: 1 }} extraHeight={150}>
                <Text style={[FONTS.h1, FONTS.bold, { color: colors.primary, paddingBottom: 16 }]}>Create Work Time</Text>

                {/* Assignement Name */}
                <View height={44} style={[styles.textField, SHADOW, { marginBottom: 24 }]}>
                    <TextInput
                        style={[FONTS.h3, { flex: 1, lineHeight: 18, color: colors.text }]}
                        selectionColor={colors.primary}
                        placeholder={"Work Time Name"}
                        onChangeText={text => setWorkTimeName(text)} />
                </View>

                {/* Start */}
                <View height={44} style={[styles.textField, SHADOW, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>Start Time</Text>
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
                        onPress={() => setStartVisible(true)}
                    >
                        <Text style={[FONTS.h3, { color: colors.primary }]}>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </TouchableOpacity>
                </View>

                {/* End */}
                <View height={44} style={[styles.textField, SHADOW, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>End Time</Text>
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
                        onPress={() => setEndVisible(true)}
                    >
                        <Text style={[FONTS.h3, { color: colors.primary }]}>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </TouchableOpacity>
                </View>

                {/* Can Extend */}
                <View height={44} style={[styles.textField, SHADOW, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>Can Extend</Text>
                    <Switch
                        style={{
                            marginRight: 8
                        }}
                        trackColor={{ false: colors.lightGray, true: colors.primary }}
                        onValueChange={() => setCanExpand(!canExpand)}
                        value={canExpand}
                    />
                </View>
            </KeyboardAwareScrollView>
            <DateTimePickerModal
                isVisible={startVisible}
                mode="time"
                onConfirm={(time) => {
                    setStartTime(time)
                    setStartVisible(false)
                }}
                onCancel={() => setStartVisible(false)}
                headerTextIOS="Select Start Time"
                date={startTime}
            />
            <DateTimePickerModal
                isVisible={endVisible}
                mode="time"
                onConfirm={(time) => {
                    setEndTime(time)
                    setEndVisible(false)
                }}
                onCancel={() => setEndVisible(false)}
                headerTextIOS="Select End Time"
                date={endTime}
            />
        </View >
    );
};

export default CreateAssignment;