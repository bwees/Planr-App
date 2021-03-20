import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, Alert, InteractionManager } from "react-native";
import { TouchableOpacity } from "react-native";
import { FONTS, SHADOW } from "../../Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import SegmentedControl from "@react-native-community/segmented-control";
import SyncStorage from 'sync-storage';
import { deleteRealm } from "../../storage/StorageAPI";
import { getTheme } from "../../Helpers";

const Settings = (props) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        textField: {
            ...SHADOW,
            backgroundColor: colors.textField,
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingRight: 4,
            alignItems: "center",
            flexDirection: "row",
        },
    });

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
                            selectedIndex={parseInt(SyncStorage.get("theme"))}
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
                                height: 44,
                                marginBottom: 16,
                                marginTop: 16,
                                marginHorizontal: 20,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                FONTS.h3,
                                { flex: 1, lineHeight: 18, color: colors.text },
                            ]}
                        >
                            Classes
                        </Text>
                        <Ionicons
                            name={"ios-chevron-forward"}
                            size={28}
                            color={colors.chevron}
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
                            name={"ios-trash"}
                            size={24}
                            color={"red"}
                            style={{ paddingRight: 8 }}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

export default Settings;
