import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, SectionList } from "react-native";
import { TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native-gesture-handler";
import { FONTS, SHADOW } from "../Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from "react";
import { Keyboard } from 'react-native'
import ListSeperator from "../components/ListSeperator";
import AssignmentCell from "../components/AssignmentCell";
import { getAssignments, groupAssignmentsBy } from "../storage/StorageAPI";
import { groupedToSectionList } from "../Helpers";

const AssignmentList = (props) => {

    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const [filterText, setFilter] = useState('');
    const [assignments, setAssignments] = useState(getAssignments());
    const [groupedAssignments, setGroupedAssignments] = useState(groupedToSectionList(groupAssignmentsBy(getAssignments(), "dueDate")));

    data = [
        {
            title: "Main dishes",
            data: ["Pizza", "Burger", "Risotto"]
        }]

    React.useEffect(() => {
        const refreshList = props.navigation.addListener('focus', () => {
            setAssignments(getAssignments(filterText))
            setGroupedAssignments(
                groupedToSectionList(
                    groupAssignmentsBy(
                        getAssignments(),
                        "dueDate"
                    )
                )
            );
        });
    }, [props.navigation]);

    return (
        <View style={{ flex: 1 }}>
            <View style={[SHADOW, { backgroundColor: colors.headerColor, zIndex: 100 }]}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: insets.top + 6 }}>
                    <Text style={[FONTS.h1, FONTS.bold, { color: colors.primary, marginHorizontal: 20, marginVertical: 8 }]}>Assignments</Text>
                    <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20 }} onPress={() => props.navigation.navigate("CreateAssignment")}>
                        <Ionicons name="ios-add" size={30} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                <View height={38} style={{ marginTop: 8, backgroundColor: colors.searchBar, padding: 8, marginHorizontal: 16, borderRadius: 8, flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="search" size={18} color={colors.gray} style={{ paddingRight: 4, paddingTop: 2 }} />
                    <TextInput placeholder={"Search"}
                        value={filterText}
                        selectionColor={colors.primary}
                        onChangeText={text => {
                            setFilter(text);
                            setAssignments(getAssignments(text));
                        }}
                        style={[FONTS.h3, {
                            lineHeight: 20,
                            color: colors.text,
                            flex: 1
                        }]}
                    />
                    <TouchableOpacity onPress={() => { setFilter(""); setAssignments(getAssignments()); }}>
                        <MaterialIcons name="cancel" size={18} color={colors.gray} style={{ paddingRight: 4, paddingTop: 2 }} />
                    </TouchableOpacity>
                </View>

                <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder, marginTop: 10, }} />

            </View>
            <View style={{ flex: 1 }}>
                <SectionList
                    style={{ paddingHorizontal: 20 }}
                    sections={groupedAssignments}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <AssignmentCell assignment={item} navigation={props.navigation} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <ListSeperator icon={"calendar"} label={new Date(title).toLocaleDateString()} color={colors.primary} />
                    )}
                />
            </View>
        </View>
    );
};

export default AssignmentList;