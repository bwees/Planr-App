import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, Alert, TextInput, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { FONTS, SHADOW } from "../../Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import SegmentedControl from "@react-native-community/segmented-control";
import SyncStorage from 'sync-storage';
import { addClass, addType, deleteRealm, getClasses, getTypes } from "../../storage/StorageAPI";
import { getTheme } from "../../Helpers";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ClassAndTypeCell from "../../components/ClassAndTypeCell";
import { FlatList } from "react-native-gesture-handler";

const Settings = (props) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        textField: {
            ...SHADOW,
            backgroundColor: colors.textField,
            borderRadius: 12,
            paddingHorizontal: 12,
            alignItems: "center",
            flexDirection: "row",
        },
    });

    const [newClassName, setClassName] = useState("")
    const [newTypeName, setTypeName] = useState("")
    const [classValidation, setClassValidation] = useState(false)
    const [typeValidation, setTypeValidation] = useState(false)
    const [classes, setClasses] = useState(getClasses())
    const [types, setTypes] = useState(getClasses())

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View
                style={[
                    {
                        flexDirection: "row",
                        paddingHorizontal: 20,
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: 55,
                        backgroundColor: colors.headerColor,
                    },
                ]}
            >
                <Text
                    style={{ color: colors.primary, fontSize: 26, fontWeight: "bold" }}
                >
                    Settings
                </Text>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                >
                    <Text
                        style={{ color: colors.primary, fontSize: 18, fontWeight: "bold" }}
                    >
                        Done
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                height={1}
                style={{ borderRadius: 4, backgroundColor: colors.headerBorder }}
            />

            {/* Settings List */}
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <TouchableOpacity
                        style={[
                            styles.textField,
                            SHADOW,
                            {
                                height: 44,
                                marginBottom: 16,
                                marginTop: 16,
                                marginHorizontal: 20,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            },
                        ]}
                        onPress={() => {
                            props.navigation.navigate("About");
                        }}
                    >
                        <Text
                            style={[
                                FONTS.h3,
                                { flex: 1, lineHeight: 18, color: colors.text },
                            ]}
                        >
                            About
                        </Text>
                        <Ionicons
                            name={"ios-chevron-forward"}
                            size={28}
                            color={colors.chevron}
                        />
                    </TouchableOpacity>

                    <View
                        style={[
                            SHADOW,
                            {
                                backgroundColor: colors.textField,
                                marginHorizontal: 20,
                                padding: 12,
                                borderRadius: 12,
                            },
                        ]}
                    >
                        <Text
                            style={{
                                color: colors.primary,
                                fontSize: 18,
                                paddingBottom: 8,
                                fontWeight: "bold",
                            }}
                        >
                            Theme
                        </Text>
                        <SegmentedControl
                            values={["System Theme", "Light", "Dark"]}
                            selectedIndex={parseInt(SyncStorage.get("theme") == undefined ? 0 : SyncStorage.get("theme"))}
                            onChange={(event) => {
                                SyncStorage.set('theme', event.nativeEvent.selectedSegmentIndex.toString());
                            }}
                            appearance={getTheme()}
                        />
                        <Text
                            style={{ color: colors.gray, fontSize: 12, paddingVertical: 4 }}
                        >
                            You may need to relaunch the app to see changes.
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.textField,
                            SHADOW,
                            {
                                marginBottom: 16,
                                marginTop: 16,
                                paddingTop: 16,
                                paddingBottom: 8,
                                marginHorizontal: 20,
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start"
                            },
                        ]}
                    >
                        <Text
                            style={[
                                FONTS.h3,
                                { lineHeight: 18, color: colors.text },
                                {
                                    color: colors.primary,
                                    fontSize: 18,
                                    paddingBottom: 8,
                                    fontWeight: "bold",
                                }
                            ]}
                        >
                            Classes
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View height={36} style={[{
                                backgroundColor: colors.textField,
                                borderRadius: 12,
                                paddingHorizontal: 12,
                                paddingRight: 4,
                                alignItems: "center",
                                flexDirection: "row",
                            }, { flex: 1, backgroundColor: colors.searchBar, marginRight: 8 }]}>
                                <TextInput
                                    style={[FONTS.h3, { flex: 1, lineHeight: 18, color: colors.text }]}
                                    selectionColor={colors.primary} placeholder={"Class Name"}
                                    placeholderTextColor={colors.gray}
                                    onChangeText={text => {
                                        setClassName(text)
                                        if (text.trim() === "")
                                            setClassValidation(false)
                                        else
                                        setClassValidation(true)
                                    }}
                                    value={newClassName}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    addClass(newClassName)
                                    setClasses(getClasses())
                                    setClassName("")
                                    setClassValidation(false)
                                }}
                                disabled={!classValidation}
                            >
                                <Ionicons
                                    name={"add-circle"}
                                    size={24}
                                    color={classValidation ? colors.primary : colors.gray}
                                    style={{ marginRight: 4 }}
                                />
                            </TouchableOpacity>
                        </View>

                        <View height={1} style={{ borderRadius: 4, marginVertical: 12, backgroundColor: colors.headerBorder, width: "100%" }} />

                        <FlatList
                            data={getClasses()}
                            style={{ width: "100%", overflow: "visible" }}
                            renderItem={(item) => {
                                return (
                                    <ClassAndTypeCell
                                        obj={item}
                                        type={"class"}
                                        style={{ width: "100%" }}
                                        onDelete={() => {
                                            setClasses(getClasses())
                                        }}
                                    />)
                            }}
                            keyExtractor={item => item.id}
                        />

                    </View>

                    <View
                        style={[
                            styles.textField,
                            SHADOW,
                            {
                                marginBottom: 16,
                                paddingTop: 16,
                                paddingBottom: 8,
                                marginHorizontal: 20,
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start"
                            },
                        ]}
                    >
                        <Text
                            style={[
                                FONTS.h3,
                                { lineHeight: 18, color: colors.text },
                                {
                                    color: colors.primary,
                                    fontSize: 18,
                                    paddingBottom: 8,
                                    fontWeight: "bold",
                                }
                            ]}
                        >
                            Assignment Types
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View height={36} style={[{
                                backgroundColor: colors.textField,
                                borderRadius: 12,
                                paddingHorizontal: 12,
                                paddingRight: 4,
                                alignItems: "center",
                                flexDirection: "row",
                            }, { flex: 1, backgroundColor: colors.searchBar, marginRight: 8 }]}>
                                <TextInput
                                    style={[FONTS.h3, { flex: 1, lineHeight: 18, color: colors.text }]}
                                    selectionColor={colors.primary} placeholder={"Type Name"}
                                    placeholderTextColor={colors.gray}
                                    onChangeText={text => {
                                        setTypeName(text)
                                        if (text.trim() === "")
                                            setTypeValidation(false)
                                        else
                                            setTypeValidation(true)
                                    }}
                                    value={newTypeName}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    addType(newTypeName)
                                    setTypes(getTypes())
                                    setTypeName("")
                                    setTypeValidation(false)
                                }}
                                disabled={!typeValidation}
                            >
                                <Ionicons
                                    name={"add-circle"}
                                    size={24}
                                    color={typeValidation ? colors.primary : colors.gray}
                                    style={{ marginRight: 4 }}
                                />
                            </TouchableOpacity>
                        </View>

                        <View height={1} style={{ borderRadius: 4, marginVertical: 12, backgroundColor: colors.headerBorder, width: "100%" }} />

                        <FlatList
                            data={getTypes()}
                            style={{ width: "100%", overflow: "visible" }}
                            renderItem={(item) => {
                                return (
                                    <ClassAndTypeCell
                                        obj={item}
                                        type={"type"}
                                        style={{ width: "100%" }}
                                        onDelete={() => {
                                            setTypes(getTypes())
                                        }}
                                    />)
                            }}
                            keyExtractor={item => item.id}
                        />

                    </View>

                    <TouchableOpacity
                        style={[
                            styles.textField,
                            SHADOW,
                            {
                                height: 44,
                                marginBottom: 16,
                                marginTop: 16,
                                marginHorizontal: 20,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            },
                        ]}
                        onPress={() => {
                            Alert.alert(
                                "Reset App?",
                                "Are you sure you want to delete all data?",
                                [
                                    {
                                        text: "Cancel",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Delete",
                                        onPress: () => {
                                            deleteRealm()
                                            AsyncStorage.clear()
                                            Alert.alert("Reopen App", "Please relaunch the app for changes to take effect")
                                        },
                                        style: "destructive"
                                    }
                                ],
                                { cancelable: false }
                            )
                        }}
                    >
                        <Text
                            style={[
                                FONTS.h3,
                                { flex: 1, lineHeight: 18, color: "red", fontWeight: "bold" },
                            ]}
                        >
                            Reset App
                        </Text>
                        <Ionicons
                            name={"ios-refresh"}
                            size={24}
                            color={"red"}
                        />
                    </TouchableOpacity>
                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
        </View>
    );
};

export default Settings;
