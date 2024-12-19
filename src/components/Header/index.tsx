import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../utils/constants";

const Header = ({
  title,
  customStyles,
}: {
  title?: string;
  customStyles?: {
    View?: ViewStyle;
    text1?: TextStyle;
  };
} & View["props"]) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          width: "90%",
          alignSelf: "center",
          marginTop: SIZES.FONT_MEDIUM,
          ...customStyles?.View,
        },
      ]}
    >
      <Text
        style={{
          fontFamily: FONTS.BOLD,
          fontSize: SIZES.FONT_EXTRA_LARGE - 2,
          ...customStyles?.text1,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Header;
