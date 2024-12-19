import React, { forwardRef } from "react";
import { TextInput, View, Text } from "react-native";
import { TextInptProps } from "../../utils/types";
import { COLORS, FONTS, SIZES } from "../../utils/constants";

export default function Input({
  leftIcon,
  rightIcon,
  focus,
  customStyle,
  label,
  error,
  ...props
}: TextInptProps & TextInput["props"]) {
  return (
    <View
      style={{
        width: "90%",
        alignSelf: "center",
        marginTop: SIZES.MARGIN_EXTRA_LARGE,
      }}
    >
      {label && (
        <Text
          style={{
            marginBottom: SIZES.MARGIN_MEDIUM,
            fontFamily: FONTS.INTER_MEDIUM,
            fontSize: SIZES.FONT_MEDIUM,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          height: SIZES.HEIGHT_SMALL + 10,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          alignSelf: "center",
          borderRadius: 16,
          paddingHorizontal: SIZES.PADDING_MEDIUM,
          backgroundColor: COLORS.LIGHT_GRAY,
          ...customStyle?.container,
        }}
      >
        {leftIcon && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {leftIcon}
          </View>
        )}
        <TextInput
          cursorColor={COLORS.PRIMARY}
          style={{
            color: COLORS.TEXT_COLOR,
            fontFamily: FONTS.INTER_REGULAR,
            fontSize: SIZES.FONT_SMALL + 2,
            height: SIZES.HEIGHT_SMALL + 10,
            flex: 1,
            ...customStyle?.input,
          }}
          placeholderTextColor={COLORS.GRAY}
          {...props}
        />
        {rightIcon && rightIcon}
      </View>
      {error && (
        <Text
          style={{
            color: "red",
            fontSize: SIZES.FONT_SMALL,
            // marginTop: 4,
            alignSelf: "flex-start",
            fontFamily: FONTS.MEDIUM,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
