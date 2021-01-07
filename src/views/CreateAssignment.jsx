import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { FONTS } from "../theme/Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import UIStepper from 'react-native-ui-stepper';

const CreateAssignment = (props) => {

    const { colors } = useTheme();

    const styles = StyleSheet.create({
        textField: {
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
            <View height={52} style={{ backgroundColor: colors.headerColor, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }}>
                <TouchableOpacity>
                    <Text style={[FONTS.h3, { color: colors.primary }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[FONTS.h3, FONTS.bold, { color: colors.primary }]}>Done</Text>
                </TouchableOpacity>
            </View>
            <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder, }} />

            <ScrollView style={{ paddingVertical: 16, paddingHorizontal: 20, flex: 1 }}>
                <Text style={[FONTS.h1, FONTS.bold, { color: colors.primary, paddingBottom: 16 }]}>New Assignment</Text>

                <View height={44} style={[styles.textField, { marginBottom: 24 }]}>
                    <TextInput style={[FONTS.h3, { flex: 1, lineHeight: 18, color: colors.text }]} selectionColor={colors.primary} placeholder={"Assignment Name"} />
                </View>

                <View height={44} style={[styles.textField, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>Class Name</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={[FONTS.h3, { color: colors.gray }]}>Choose</Text>
                        <Ionicons name={"ios-chevron-forward"} size={27} color={colors.chevron} style={{ paddingTop: 2 }} />
                    </View>
                </View>
                <View height={44} style={[styles.textField, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>Assignment Type</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={[FONTS.h3, { color: colors.gray }]}>Choose</Text>
                        <Ionicons name={"ios-chevron-forward"} size={27} color={colors.chevron} style={{ paddingTop: 2 }} />
                    </View>
                </View>
                <View height={44} style={[styles.textField, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>Due Date</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", padding: 4, paddingHorizontal: 6, borderRadius: 8, backgroundColor: colors.lightGray, marginRight: 8 }}>
                        <Text style={[FONTS.h3, { color: colors.primary }]}>January 11, 2021</Text>
                    </View>
                </View>
                <View height={44} style={[styles.textField, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.text }]}>15-20 Minutes</Text>
                    <View style={{ paddingRight: 8 }}>
                        <UIStepper
                            onValueChange={(value) => { this.setValue(value) }}
                            tintColor={colors.primary}
                            backgroundColor={colors.lightGray}
                            borderColor={colors.stepperOutline}
                            borderRadius={8}
                        />
                    </View>
                </View>

            </ScrollView>
        </View>
    );
};

export default CreateAssignment;