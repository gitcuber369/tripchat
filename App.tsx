import React, { useCallback } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MenuProvider } from "react-native-popup-menu";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { UserProvider } from "./src/context";

import Navigation from "./src/navigation";
import { COLORS } from "./src/utils/constants";

SplashScreen.preventAutoHideAsync();
GoogleSignin.configure({
  // webClientId:
  //   "273383385048-7shv1mule7tifrk79k29vu9b4a8laein.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  // iosClientId: "",
  scopes: ["https://www.googleapis.com/auth/drive"],
  webClientId:
    "1082163378951-9bu7ms996q4j0g49qs42fkb8a7gjci9e.apps.googleusercontent.com",
  // "1082163378951-u7fjc8efrgsn14f05llpamoj4tkbo4hf.apps.googleusercontent.com",
  // iosClientId: 'iosClientId for iOS, nothing special here',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Nunito-Light": require("./assets/fonts/Nunito-Light.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Italic": require("./assets/fonts/Nunito-Italic.ttf"),
    "Nunito-Medium": require("./assets/fonts/Nunito-Medium.ttf"),
    "Nunito-SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Somewhere in your code

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ToastProvider
      placement="bottom"
      duration={5000}
      animationType="zoom-in"
      animationDuration={250}
      successColor="green"
      dangerColor="red"
      warningColor="orange"
      normalColor="gray"
      textStyle={{ fontSize: 16, fontFamily: "Nunito-Bold" }}
      offset={50} // offset for both top and bottom toasts
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled={true}
    >
      <UserProvider>
        <MenuProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
              <Navigation />
              <StatusBar
                barStyle="dark-content"
                backgroundColor={COLORS.BACKGROUND_COLOR}
              />
            </SafeAreaView>
          </GestureHandlerRootView>
        </MenuProvider>
      </UserProvider>
    </ToastProvider>
  );
}

const email = "beerkumar784@gmail.com";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
