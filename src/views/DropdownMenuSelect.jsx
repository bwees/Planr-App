import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

const DropdownMenuSelect = ({ navigation, route }) => {

    const { colors } = useTheme();
    const { options } = route.params;

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
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingRight: 4,
            alignItems: "center",
            flexDirection: "row",
        }
    });

    const listItem = ({ item }) => {
        return (

            <View height={44} style={[styles.textField, { marginBottom: 8, justifyContent: "space-between" }]}>
                <Text style={{ color: colors.text }}>{item}</Text>
            </View>
        )
    }

    console.log(route.params.options)

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