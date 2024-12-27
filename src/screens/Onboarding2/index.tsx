import React, { useState, useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { RootStackParamList } from "../../utils/types";
import { COLORS, FONTS, SIZES } from "../../utils/constants";
import Button from "../../components/Button";
import { adjustSize } from "../../utils/adjustsize";
import { UserContext } from "../../context";

type Props = {
  navigation: NativeStackScreenProps<RootStackParamList, "Onboarding2">;
};

export default function Onboarding2({ navigation }: Props) {
  const { loading, setLoading, setisFirstTime } = useContext(UserContext);
  // const [loading, setLoading] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.conainer}>
      <ImageBackground
        source={require("../../../assets/img/bg.png")}
        style={styles.sec1}
        resizeMode="contain"
      >
        <Image
          source={require("../../../assets/img/onboarding1.jpeg ")}
          style={styles.onboardingImage}
          resizeMode="contain"
        />
      </ImageBackground>
      <View style={styles.sec2}>
        <Text style={[styles.heading, { color: COLORS.GRAY_500 }]}>
          Plan your day with curated activities,
        </Text>
        <Text style={[styles.heading]}>
          chat, ask questions, and discover hidden gems.
        </Text>
      </View>
      <Button
        title={"Continue"}
        // @ts-ignore
        onPress={() => setisFirstTime(false)}
        customStyles={{
          View: {
            marginTop: SIZES.MARGIN_LARGE,
            borderRadius: 8,
            width: "60%",
            marginBottom: 20,
          },
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  heading: {
    color: COLORS.TEXT_COLOR,
    fontSize: SIZES.FONT_EXTRA_LARGE,
    fontFamily: FONTS.BOLD,
  },
  sec1: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sec2: {
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: adjustSize(SIZES.PADDING_MEDIUM),
    paddingVertical: adjustSize(SIZES.PADDING_LARGE),
  },
  onboardingImage: {
    resizeMode: "contain",
    width: "90%",
    height: "100%",
  },
});
