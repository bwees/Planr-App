import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { FONTS } from "../theme/Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import UIStepper from 'react-native-ui-stepper';
import { useState } from "react";

const CreateAssignment = (props) => {

    const { colors } = useTheme();

    const [assignmentName, setAssignmentName] = useState("");
    const [classSelection, setClassSelection] = useState("Choose");
    const [typeSelection, setTypeSelection] = useState("Choose");
    const [dueDate, setDueDate] = useState(null);
    const [timeLength, setTimeLength] = useState(15);

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

            <ScrollView style={{ paddingHorizontal: 20, paddingTop: 16, flex: 1 }}>
                <Text style={[FONTS.h1, FONTS.bold, { color: colors.primary, paddingBottom: 16 }]}>New Assignment</Text>

                {/* Assignement Name */}
                <View height={44} style={[styles.textField, { marginBottom: 24 }]}>
                    <TextInput style={[FONTS.h3, { flex: 1, lineHeight: 18, color: colors.text }]} selectionColor={colors.primary} placeholder={"Assignment Name"} />
                </View>


                {/* Class Selector */}
                <View height={44} style={[styles.textField, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>Class</Text>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => { props.navigation.navigate("DropdownMenu", { options: ["English", "Math", "Science"], selected: classSelection, fieldName: "Class" }) }}>
                        <Text style={[FONTS.h3, { color: colors.gray }]}>{classSelection}</Text>
                        <Ionicons name={"ios-chevron-forward"} size={27} color={colors.chevron} style={{ paddingTop: 2 }} />
                    </TouchableOpacity>
                </View>


                {/* Type Selector */}
                <View height={44} style={[styles.textField, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>Assignment Type</Text>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => { props.navigation.navigate("DropdownMenu", { options: ["Homework", "Test", "Other"], selected: typeSelection, fieldName: "Type" }) }}>
                        <Text style={[FONTS.h3, { color: colors.gray }]}>{typeSelection}</Text>
                        <Ionicons name={"ios-chevron-forward"} size={27} color={colors.chevron} style={{ paddingTop: 2 }} />
                    </TouchableOpacity>
                </View>


                {/* Due Date */}
                <View height={44} style={[styles.textField, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.gray }]}>Due Date</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", padding: 4, paddingHorizontal: 6, borderRadius: 8, backgroundColor: colors.lightGray, marginRight: 8 }}>
                        <Text style={[FONTS.h3, { color: colors.primary }]}>January 11, 2021</Text>
                    </View>
                </View>


                {/* Time Stepper */}
                <View height={44} style={[styles.textField, { marginBottom: 8, justifyContent: "space-between" }]}>
                    <Text style={[FONTS.h3, { color: colors.text }]}>{timeLength}-{timeLength + 5} Minutes</Text>
                    <View style={{ paddingRight: 8 }}>
                        <UIStepper
                            onValueChange={(value) => { setTimeLength(value) }}
                            tintColor={colors.primary}
                            backgroundColor={colors.lightGray}
                            borderColor={colors.stepperOutline}
                            borderRadius={8}
                            initialValue={15}
                            steps={5}
                        />
                    </View>
                </View>

            </ScrollView>
        </View>
    );
};

export default CreateAssignment;