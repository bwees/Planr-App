import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS, SHADOW } from "../Theme";
import FileViewer from "react-native-file-viewer";

const FileCell = (props) => {

    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[SHADOW, {
                flexDirection: "row",
                backgroundColor: colors.cellColor,
                height: 40,
                alignItems: "center",
                paddingLeft: 12,
                borderRadius: 12,
                justifyContent: "space-between",
                marginBottom: 8
            }]}
            onPress={() => FileViewer.open(props.file.path)}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {props.file.type === "picture" &&
                    <Ionicons name="image" size={24} color={colors.primary} />
                }

                {props.file.type === "document" &&
                    <Ionicons name="document-text" size={24} color={colors.primary} />
                }

                <Text numberOfLines={1} style={[FONTS.h3, FONTS.bold, { color: colors.text, paddingLeft: 8, flex: 1 }]}>{props.file.name}</Text>
                <Ionicons name={"ios-chevron-forward"} size={27} color={colors.chevron} style={{ paddingRight: 8 }} />
            </View>

        </TouchableOpacity>
    );
};

export default FileCell;