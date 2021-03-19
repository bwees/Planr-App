import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Button,
  FlatList,
  Animated,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { FONTS, SHADOW, SIZES } from "../Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import TimeChart from "../components/TimeChart";
import LinearGradient from "react-native-linear-gradient";
import ListSeperator from "../components/ListSeperator";
import AssignmentCell from "../components/AssignmentCell";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getTodayAssignments } from "../storage/StorageAPI";
import { generateHomeworkSchedule } from "../algorithm/HomeworkScheduleAlgo";

const Home = (props) => {
  const { colors } = useTheme();

  var [progress, setProgress] = useState(0);

  var assignment = {
    name: "Example Assignment sdfasdasd",
    class: "English",
    dueDate: "11-11-20",
    type: "Homework",
    id: "1",
  };
  var assignment2 = {
    name: "Example Assignment",
    class: "English",
    dueDate: "11-11-20",
    type: "Homework",
    time: 15,
    notes:
      "asfdsadsadasdfasdfdfjklshalsifuawheif;awelifuhakweufhaewilufhaleisufhaleiwufhwleifhlaeiufhaileufhilausefhlaiseuhflaiseufhasieufheaslifhesiuf",
    status: 1,
    id: "2",
  };

  var [assignments, setAssignments] = useState(getTodayAssignments());

  generateHomeworkSchedule(assignments, []);

  React.useEffect(() => {
    const refreshList = props.navigation.addListener("focus", () =>
      setAssignments(getTodayAssignments())
    );
  }, [props.navigation]);

  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, marginBottom: 0 }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.1 }}
        colors={["#4287f5", "#40d6ff"]}
        useAngle={true}
        angle={120}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, paddingTop: insets.top - 8 }}>
          <View style={{ flex: 1, flexDirection: "column", marginTop: 48 }}>
            <View
              style={{
                height: 100,
                paddingHorizontal: 20,
                justifyContent: "center",
              }}
            >
              <TimeChart
                progress={0.32}
                title={"Homework Time"}
                time={"30-45 Minutes"}
                subtitle={"Light workload expected."}
                barColor={"white"}
                textColor={"white"}
                subtitleColor={"white"}
              />
            </View>

            {/* Info Card */}
            <View
              style={[
                SHADOW,
                {
                  backgroundColor: colors.background,
                  paddingTop: 16,
                  marginTop: 16,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  flexGrow: 1,
                },
              ]}
            >
              <View>
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={[FONTS.h2, FONTS.bold, { color: colors.text }]}>
                    Homework Schedule
                  </Text>
                  <Text style={[FONTS.h4, { color: colors.gray }]}>
                    {assignments.length} Assignments
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    borderRadius: 4,
                    backgroundColor: colors.lightGray,
                    marginTop: 10,
                  }}
                />
              </View>
              <Animated.View style={{ flex: 1 }}>
                <Animated.FlatList
                  contentContainerStyle={{
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                    paddingTop: 8,
                    overflow: false,
                  }}
                  data={assignments}
                  renderItem={({ item }) => (
                    <AssignmentCell
                      assignment={item}
                      navigation={props.navigation}
                      deleteAnimation={true}
                      onSetDone={() => setAssignments(getTodayAssignments())}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Home;
