import React from "react";
import { Text, TextStyle } from "react-native";
import { COLORS, FONTS, SIZES } from "../../utils/constants";

const TextComponent = ({
  customStyles,
  children,
  ...props
}: {
  customStyles?: {
    text?: TextStyle;
  };
} & Text["props"]) => {
  return (
    <Text
      style={[
        {
          fontFamily: FONTS.MEDIUM,
          fontSize: SIZES.FONT_SMALL + 2,
          color: COLORS.TEXT_COLOR,
        },
        customStyles?.text,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextComponent;
