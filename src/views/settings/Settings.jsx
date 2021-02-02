import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FONTS, SHADOW } from '../../Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

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
                <Ionicons name={"cog"} size={34} color={colors.primary} style={{ paddingTop: 2 }} />

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        props.navigation.goBack();
                    }}>
                    <Text style={{ color: colors.primary, fontSize: 18, fontWeight: "bold" }}>Done</Text>
                </TouchableOpacity>
            </View>

            {/* Settings List */}
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <ScrollView>
                    <TouchableOpacity style={[styles.textField, SHADOW, { height: 44, marginBottom: 24, marginTop: 16, flexDirection: "row", justifyContent: "space-between" }]} >
                        <Text style={[FONTS.h3, { flex: 1, lineHeight: 18, color: colors.text }]}>About</Text>
                        <Ionicons name={"ios-chevron-forward"} size={28} color={colors.chevron} style={{ paddingTop: 2 }} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

export default Settings;
