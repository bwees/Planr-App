import React from "react";
import { View, Text, Button } from "react-native";

const HomeworkSchedule = (props) => {
    return (
        <View style={{ padding: 20 }}>
            <Button title="Home" onPress={() => props.navigation.navigate("Home")} />
        </View>
    );
};

export default HomeworkSchedule;