import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { FONTS, SHADOW } from "../Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from "react";
import { Keyboard } from 'react-native'
import ListSeperator from "../components/ListSeperator";
import AssignmentCell from "../components/AssignmentCell";

const AssignmentList = (props) => {

    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const [searchText, changeSearchText] = useState('');
    var assignment2 = {
        name: "Example Assignment",
        class: "English",
        dueDate: "11-11-20",
        type: "Homework",
        time: "15-20 Minutes",
        notes: "asfdsadsadasdfasdfdfjklshalsifuawheif;awelifuhakweufhaewilufhaleisufhaleiwufhwleifhlaeiufhaileufhilausefhlaiseuhflaiseufhasieufheaslifhesiuf",
        status: 1,
        id: "2"
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={[SHADOW, { backgroundColor: colors.headerColor, zIndex: 100 }]}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: insets.top + 6 }}>
                    <Text style={[FONTS.h1, FONTS.bold, { color: colors.primary, marginHorizontal: 20, marginVertical: 8 }]}>Assignments</Text>
                    <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20 }}>
                        <Ionicons name="ios-add" size={30} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                <View height={38} style={{ marginTop: 8, backgroundColor: colors.searchBar, padding: 8, marginHorizontal: 16, borderRadius: 8, flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="search" size={18} color={colors.gray} style={{ paddingRight: 4, paddingTop: 2 }} />
                    <TextInput placeholder={"Search"} value={searchText} selectionColor={colors.primary} onChangeText={text => changeSearchText(text)} style={[FONTS.h3, { lineHeight: 20, color: colors.text, flex: 1 }]} />
                    <TouchableOpacity onPress={() => { changeSearchText("") }}>
                        <MaterialIcons name="cancel" size={18} color={colors.gray} style={{ paddingRight: 4, paddingTop: 2 }} />
                    </TouchableOpacity>
                </View>

                <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder, marginTop: 10, }} />

            </View>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20 }} onScroll={() => { Keyboard.dismiss() }} scrollEventThrottle={3}>
                    <ListSeperator icon={"file-tray-full"} label={"English"} color={colors.primary} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <ListSeperator icon={"file-tray-full"} label={"Math"} color={colors.primary} />

                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <ListSeperator icon={"file-tray-full"} label={"Science"} color={colors.primary} />

                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />
                    <AssignmentCell navigation={props.navigation} assignment={assignment2} />

                </ScrollView>
            </View>
        </View>
    );
};

export default AssignmentList;