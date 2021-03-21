import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FONTS, SHADOW } from "../Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteClass } from "../storage/StorageAPI";

const ClassCell = (props) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        textField: {
            ...SHADOW,
            backgroundColor: colors.tertiaryCell,
            borderRadius: 12,
            paddingHorizontal: 12,
            alignItems: "center",
            flexDirection: "row",
        },
    });


    return (
        <View
            style={[styles.textField,
            {
                height: 44,
                marginBottom: 8,
                flexDirection: "row",
                justifyContent: "space-between"
            }]
            }>
            <Text style={[FONTS.h3, {color: colors.text}]}>{props.classObj.item.name}</Text>
            <TouchableOpacity onPress={() => {
                deleteClass(props.classObj.item.id)
                props.onDelete()
            }}>
                <Ionicons
                    name={"ios-trash"}
                    size={24}
                    color={colors.primary}
                    style={{ paddingLeft: 2 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ClassCell;