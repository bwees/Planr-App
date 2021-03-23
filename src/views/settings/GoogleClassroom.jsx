import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, Image, Button, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS, SHADOW } from "../../Theme";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-google-signin/google-signin';
import { useState } from "react";
import { set } from "react-native-reanimated";
import { color } from "react-native-redash";
import { getCourses, getCourseWork, getSubmissionForWork, getWorkForCourse } from "../../apis/googleclassroom/GoogleClassroom";

const GoogleClassroom = (props) => {

    const { colors } = useTheme();

    const [userData, setUserData] = useState(null)

    props.navigation.addListener("focus", () => {
        GoogleSignin.getCurrentUser().then((user) => setUserData(user))
    })

    async function gSignIn() {
        try {
            await GoogleSignin.hasPlayServices();
            const userData = await GoogleSignin.signIn();
            setUserData(userData)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 55, backgroundColor: colors.headerColor }}>
                <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 8, flexDirection: "row", alignItems: "center" }} onPress={() => { props.navigation.goBack() }}>
                    <Ionicons name={"ios-chevron-back"} size={30} color={colors.primary} />
                    <Text style={{ color: colors.primary, fontSize: 18 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <View height={1} style={{ borderRadius: 4, backgroundColor: colors.headerBorder }} />
            <View style={{ paddingHorizontal: 20, paddingVertical: 4, alignItems: "center" }}>
                <Image
                    source={require('../../../resources/gc-icon.png')}
                    style={{ width: 50, height: 50 }}
                    resizeMode={"contain"}
                />
                <Text style={[FONTS.h1, { color: colors.text, fontWeight: "bold", color: colors.primary }]}>Google Classroom</Text>
                <Text style={[FONTS.h4, { color: colors.text, paddingTop: 8, textAlign: "center" }]}>
                    Planr can sync with Google Classroom to automatically import and update assignments.
                </Text>

                {userData == null &&
                    <GoogleSigninButton
                        style={{ width: 192, height: 48, marginTop: 16 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={gSignIn}
                        disabled={false}
                    />
                }


                {userData != null &&
                    <View style={[SHADOW,
                        {
                            marginTop: 16,
                            padding: 8,
                            borderRadius: 16,
                            backgroundColor: colors.cellColor,
                            width: "75%"
                        }]}>
                        <Text
                            style={[FONTS.h3,
                            {
                                color: colors.text,
                                fontWeight: "bold",
                                textAlign: "center"
                            }]}
                        >
                            Current Account:{"\n"}{userData.user.email}
                        </Text>
                        <Button
                            title={"Sign Out"}
                            onPress={() => {
                                Alert.alert(
                                    "Sign Out",
                                    "Are you sure you want to sign out? Doing this will stop syncing all assignments that were imported from Google Classroom.",
                                    [
                                        {
                                            text: "Cancel",
                                            style: "cancel"
                                        },
                                        {
                                            text: "Sign Out",
                                            onPress: () => {
                                                GoogleSignin.signOut()
                                                setUserData(null)
                                            },
                                            style: "destructive"
                                        }
                                    ],
                                    { cancelable: false }
                                )
                            }}
                            color={colors.primary}
                        />
                    </View>
                }
            </View>
        </View>
    );
};

export default GoogleClassroom;