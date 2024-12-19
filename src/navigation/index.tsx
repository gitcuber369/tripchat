import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { WithLocalSvg } from "react-native-svg/css";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import Onboarding1 from "../screens/Onbording1";
import Onboarding2 from "../screens/Onboarding2";
import Explore from "../screens/Explore";
import Chats from "../screens/Chats";
import Profile from "../screens/Profile";
import ActivityDetails from "../screens/ActivityDetails";
import Search from "../screens/Search";
import SearchedResults from "../screens/SearchedResults";
import Activities from "../screens/Activities";
import Chat from "../screens/Chat";
import EditProfile from "../screens/EditProfile";
import UserProfile from "../screens/UserProfile";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";

import HomeIcon from "../../assets/svg/HomeIcon";
import Feather from "@expo/vector-icons/Feather";
import { ChatsIcon } from "../../assets/svg";
import { COLORS, FONTS, SIZES } from "../utils/constants";
import { UserContext } from "../context";

import { usePushNotifications } from "../context/usePushNotifications";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? (
              <HomeIcon color={COLORS.PRIMARY} />
            ) : (
              <HomeIcon color={COLORS.GRAY_700} />
            );
          } else if (route.name === "Explore") {
            iconName = focused ? (
              <Feather name="search" size={24} color={COLORS.PRIMARY} />
            ) : (
              <Feather name="search" size={24} color={COLORS.GRAY_700} />
            );
          } else if (route.name === "Chats") {
            iconName = focused ? (
              <ChatsIcon color={COLORS.PRIMARY} />
            ) : (
              <ChatsIcon color={COLORS.GRAY_700} />
            );
          } else if (route.name === "Profile") {
            iconName = focused ? (
              <Feather name="user" size={24} color={COLORS.PRIMARY} />
            ) : (
              <Feather name="user" size={24} color={COLORS.GRAY_700} />
            );
          }
          return iconName;
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GRAY_700,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: FONTS.MEDIUM,
          fontSize: SIZES.FONT_SMALL,
        },
        tabBarStyle: {
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function Navigation() {
  const { user, isFirstTime, setisFirstTime, loading, setLoading } =
    useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("isFirstTime");
        if (value !== null) {
          if (value === "Yes") {
            setisFirstTime(false);
          }
        } else {
          await AsyncStorage.setItem("isFirstTime", "Yes");
        }
        setLoading(false);
      } catch (e) {
        // error reading value
      }
    })();
  }, []);
  const { expoPushToken, notification, sendPushNotification } =
    usePushNotifications();

  const linking: any = {
    prefixes: ["Sologo://"],
    config: {
      screens: {
        Chat: "Chat/:id",
        ResetPassword: "ResetPassword",
      },
    },
    async getInitialURL() {
      // First, you may want to do the default deep link handling
      // Check if app was opened from a deep link
      const url = await Linking.getInitialURL();

      if (url != null) {
        return url;
      }

      // Handle URL from expo push notifications
      const response = await Notifications.getLastNotificationResponseAsync();

      return `Sologo://Chat/${response?.notification.request.content.data.chatId}`;
    },
    subscribe(listener: any) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);

      // Listen to incoming links from deep linking
      const eventListenerSubscription = Linking.addEventListener(
        "url",
        onReceiveURL
      );

      // Listen to expo push notifications
      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const url = `Sologo://Chat/${response?.notification.request.content.data.chatId}`;
          // Any custom logic to see whether the URL needs to be handled
          //...

          // Let React Navigation handle the URL
          listener(url);
        });

      return () => {
        // Clean up the event listeners
        eventListenerSubscription.remove();
        subscription.remove();
      };
    },
  };
  console.log("====expoPushToken====", expoPushToken);

  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: COLORS.BLACK,
              fontFamily: FONTS.POPPINS_BOLD,
              fontSize: SIZES.FONT_LARGE,
            }}
          >
            Sologo
          </Text>
          <View style={{ marginTop: -15 }}>
            <WithLocalSvg
              asset={require("../../assets/svg/star.svg")}
              width={20}
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            {isFirstTime ? (
              <>
                <Stack.Screen name="Onboarding1" component={Onboarding1} />
                <Stack.Screen name="Onboarding2" component={Onboarding2} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
              </>
            )}
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="ActivityDetails" component={ActivityDetails} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="SearchedResults" component={SearchedResults} />
            <Stack.Screen name="Activities" component={Activities} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
