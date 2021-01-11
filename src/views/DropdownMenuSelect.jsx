import { useTheme } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FONTS } from "../theme/Theme";

const DropdownMenuSelect = ({ navigation, route }) => {

    const { colors } = useTheme();
    const { options, selected, fieldName } = route.params;

    const [selectedItem, changeSelected] = useState(selected)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 8, marginTop: -45, flexDirection: "row", alignItems: "center" }} onPress={() => { navigation.goBack() }}>
                    <Ionicons name={"ios-chevron-back"} size={30} color={colors.primary} />
                    <Text style={{ color: colors.primary, fontSize: 18 }}>Back</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

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
            <TouchableOpacity style={[styles.textField, { marginBottom: 8, height: 44, justifyContent: "space-between" }]} onPress={() => { changeSelected(item); navigation.navigate('CreateAssignment', { selection: item, fieldName: fieldName }); }}>
                <Text style={[FONTS.h3, { color: colors.text }]}>{item}</Text>
                {item === selectedItem &&
                    <Ionicons name={"checkmark"} size={26} color={colors.primary} />
                }
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, paddingTop: 16, paddingHorizontal: 20 }}>
            <FlatList
                data={options}
                renderItem={listItem}
                keyExtractor={item => item.name}
            />
        </View>
    );
};

export default DropdownMenuSelect;