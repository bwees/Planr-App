import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FONTS, SHADOW } from '../../Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import SegmentedControl from '@react-native-community/segmented-control';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        }
    });

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={[{ flexDirection: "row", paddingHorizontal: 20, alignItems: "center", justifyContent: "space-between", height: 55, backgroundColor: colors.headerColor }]}>
                <Text style={{ color: colors.primary, fontSize: 26, fontWeight: "bold" }}>Settings</Text>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        props.navigation.goBack();
                    }}>
                    <Text style={{ color: colors.primary, fontSize: 18, fontWeight: "bold" }}>Done</Text>
                </TouchableOpacity>
            </View>
            <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder }} />


            {/* Settings List */}
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <ScrollView>
                    <TouchableOpacity style={[styles.textField, SHADOW, { height: 44, marginBottom: 16, marginTop: 16, flexDirection: "row", justifyContent: "space-between" }]}
                        onPress={() => {
                            props.navigation.navigate("About")
                        }}
                    >
                        <Text style={[FONTS.h3, { flex: 1, lineHeight: 18, color: colors.text }]}>About</Text>
                        <Ionicons name={"ios-chevron-forward"} size={28} color={colors.chevron} style={{ paddingTop: 2 }} />
                    </TouchableOpacity>

                    <Text style={{ color: colors.primary, fontSize: 18, paddingBottom: 8, fontWeight: "bold" }}>Theme</Text>
                    <SegmentedControl
                        values={["System Theme", "Light", "Dark"]}
                        selectedIndex={0}
                        onChange={(event) => {
                            const storeData = async () => {
                                try {
                                    await AsyncStorage.setItem('theme', event.nativeEvent.selectedSegmentIndex.toString())
                                } catch (e) {
                                    console.log(e)
                                }
                            }
                            storeData()
                        }}
                    />
                    <Text style={{ color: colors.gray, fontSize: 12, paddingVertical: 4 }}>You may need to relaunch the app to see changes.</Text>

                </ScrollView>

            </View>
        </View>
    )
}

export default Settings;
