import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, ScrollView, Text, Button } from "react-native";
import { FONTS } from "../theme/Theme";

const HomeworkSchedule = (props) => {
    const { colors } = useTheme();

    return (
        <View>
            <View style={{
                backgroundColor: colors.sheet,
                paddingTop: 16,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}>
                <View style={{ alignItems: "center" }}>

                    <View style={{
                        width: 50,
                        height: 6,
                        borderRadius: 4,
                        backgroundColor: colors.gray,
                        marginBottom: 8,
                    }} />

                </View>
                <Text style={[FONTS.h2, FONTS.bold, { color: colors.text, paddingHorizontal: 16, }]}>Homework Schedule</Text>
                <Text style={[FONTS.h4, { color: colors.gray, paddingHorizontal: 16 }]}>8 Assignments</Text>
                <View width={"100%"}
                    style={{
                        height: 1,
                        borderRadius: 4,
                        backgroundColor: colors.lightGray,
                        marginTop: 10,
                    }}
                />

            </View>
            <View style={{ backgroundColor: colors.sheet }}>
                <ScrollView syle={{ paddingHorizontal: 16 }}>



                </ScrollView>
            </View>
        </View>
    );
};

export default HomeworkSchedule;