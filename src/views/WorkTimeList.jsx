import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, SectionList } from "react-native";
import { TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native-gesture-handler";
import { FONTS, SHADOW } from "../Theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from "react";
import WorkTimeCell from "../components/WorkTimeCell";
import { getWorkTimes } from "../apis/storage/Storage";

const WorkTimeList = (props) => {

    const { colors } = useTheme()
    const insets = useSafeAreaInsets()

    const [workTimes, setWorkTimes] = useState(getWorkTimes())

    React.useEffect(() => {
        props.navigation.addListener('focus', () => setWorkTimes(getWorkTimes()));
    }, [props.navigation])

    return (
        <View style={{ flex: 1 }}>
            <View style={[{ backgroundColor: colors.headerColor, zIndex: 100 }]}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: insets.top }}>
                    <Text style={[FONTS.h1, FONTS.bold, { color: colors.primary, marginHorizontal: 20, marginVertical: 8 }]}>Work Times</Text>
                    <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 20 }} onPress={() => props.navigation.navigate("CreateWorkTime")}>
                        <Ionicons name="ios-add" size={30} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder, marginTop: 4, }} />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ paddingHorizontal: 20, paddingVertical: 16 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <WorkTimeCell workTime={item}
                            navigation={props.navigation}
                            onDelete={() => {
                                setWorkTimes(getWorkTimes())
                            }}
                        />
                    }
                    data={getWorkTimes()}
                />
            </View>
        </View>
    );
};

export default WorkTimeList;