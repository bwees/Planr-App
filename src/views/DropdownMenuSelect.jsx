import { useTheme } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FONTS, SHADOW } from "../theme/Theme";

const DropdownMenuSelect = ({ navigation, route }) => {

    const { colors } = useTheme();
    const { options, selected, fieldName } = route.params;

    const [selectedItem, changeSelected] = useState(selected)

    const styles = StyleSheet.create({
        textField: {
            backgroundColor: colors.textField,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingRight: 8,
            alignItems: "center",
            flexDirection: "row",
        }
    });

    const listItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.textField, SHADOW, { marginBottom: 8, height: 44, justifyContent: "space-between" }]} onPress={() => { changeSelected(item); navigation.navigate('CreateAssignment', { selection: item, fieldName: fieldName }); }}>
                <Text style={[FONTS.h3, { color: colors.text }]}>{item}</Text>
                {item === selectedItem &&
                    <Ionicons name={"checkmark"} size={26} color={colors.primary} />
                }
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 55, backgroundColor: colors.headerColor }}>
                <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 8, flexDirection: "row", alignItems: "center" }} onPress={() => { navigation.goBack() }}>
                    <Ionicons name={"ios-chevron-back"} size={30} color={colors.primary} />
                    <Text style={{ color: colors.primary, fontSize: 18 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder }} />

            <FlatList
                data={options}
                renderItem={listItem}
                keyExtractor={item => item}
                style={{ paddingTop: 16, paddingHorizontal: 20 }}
            />
        </View>
    );
};

export default DropdownMenuSelect;