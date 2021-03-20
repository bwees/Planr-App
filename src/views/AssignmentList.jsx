import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, SectionList, Animated, TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList, } from "react-native";

import { FONTS, SHADOW } from "../Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { Keyboard } from "react-native";
import ListSeperator from "../components/ListSeperator";
import AssignmentCell from "../components/AssignmentCell";
import { getAssignments, groupAssignmentsBy } from "../storage/StorageAPI";
import { groupedToSectionList, sortByDate } from "../Helpers";

const AssignmentList = (props) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [filterText, setFilter] = useState("");
  const [groupedAssignments, setGroupedAssignments] = useState(
    sortByDate(groupAssignmentsBy(getAssignments(""), "dueDate"))
  );

  function updateAssignmentList(filter) {
    setGroupedAssignments(
      sortByDate(groupAssignmentsBy(getAssignments(filter), "dueDate"))
    );
  }

  React.useEffect(() => {
    const refreshList = props.navigation.addListener("focus", () =>
      updateAssignmentList("")
    );
  }, [props.navigation]);

  React.useEffect(() => {
    updateAssignmentList(filterText);
  }, [filterText]);

  return (
    <View style={{ flex: 1 }}>
      <View style={[{ backgroundColor: colors.headerColor, zIndex: 100 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: insets.top,
          }}
        >
          <Text
            style={[
              FONTS.h1,
              FONTS.bold,
              {
                color: colors.primary,
                marginHorizontal: 20,
                marginVertical: 8,
              },
            ]}
          >
            Assignments
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ marginHorizontal: 20 }}
            onPress={() => props.navigation.navigate("CreateAssignmentStack")}
          >
            <Ionicons name="ios-add" size={30} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View
          height={38}
          style={{
            marginTop: 8,
            backgroundColor: colors.searchBar,
            padding: 8,
            marginHorizontal: 16,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="search"
            size={18}
            color={colors.gray}
            style={{ paddingRight: 4, paddingTop: 2 }}
          />
          <TextInput
            placeholder={"Search"}
            value={filterText}
            selectionColor={colors.primary}
            onChangeText={(text) => {
              setFilter(text);
            }}
            style={[
              FONTS.h3,
              {
                lineHeight: 20,
                color: colors.text,
                flex: 1,
              },
            ]}
          />
          {filterText != "" && (
            <TouchableOpacity
              onPress={() => {
                setFilter("");
              }}
            >
              <MaterialIcons
                name="cancel"
                size={18}
                color={colors.gray}
                style={{ paddingRight: 4, paddingTop: 2 }}
              />
            </TouchableOpacity>
          )}
        </View>

        <View
          height={1}
          style={{
            borderRadius: 4,
            backgroundColor: colors.headerBorder,
            marginTop: 10,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Animated.SectionList
          style={{ paddingHorizontal: 20 }}
          sections={groupedAssignments}
          keyExtractor={(item, index) => item + index}
          stickySectionHeadersEnabled={false}
          renderItem={({ item }) => (
            <AssignmentCell
              assignment={item}
              navigation={props.navigation}
              swipeEnabled={false}
              deleteAnimation={false}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <ListSeperator
              icon={"calendar"}
              label={new Date(title).toLocaleString("default", {
                month: "long",
                day: "numeric",
              })}
              color={colors.primary}
              bgColor={colors.background}
            />
          )}
        />
      </View>
    </View>
  );
};

export default AssignmentList;
