import React, { useState } from "react";
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

type Props = {
  navigation: NativeStackScreenProps<RootStackParamList, "Onboarding1">;
};

export default function Onboarding1({ navigation }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.conainer}>
      <ImageBackground
        source={require("../../../assets/img/bg.png")}
        style={styles.sec1}
        resizeMode="contain"
      >
        <Image
          source={require("../../../assets/img/onboarding.png")}
          style={styles.onboardingImage}
          resizeMode="contain"
        />
      </ImageBackground>
      <View style={styles.sec2}>
        <Text style={styles.heading}>
          Imagine if you could explore a new city...
        </Text>
        <Text style={[styles.heading, { color: COLORS.GRAY_500 }]}>
          ...and instantly connect with like-minded travelers and locals.
        </Text>
      </View>
      <Button
        title={"Explore Together"}
        loading={loading}
        // @ts-ignore
        onPress={() => navigation.navigate("Onboarding2")}
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: adjustSize(SIZES.PADDING_MEDIUM),
    paddingVertical: adjustSize(SIZES.PADDING_LARGE),
  },
  onboardingImage: {
    resizeMode: "contain",
    width: "90%",
    height: "100%",
  },
});
