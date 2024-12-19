import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TabsParamsList } from "../../utils/types";
import { COLORS, SIZES, FONTS, destinations } from "../../utils/constants";
import { adjustSize } from "../../utils/adjustsize";
import { UserContext } from "../../context";

type Props = {
  navigation: NativeStackScreenProps<TabsParamsList, "Explore">;
};

export default function Explore({ navigation }: Props) {
  const { popularLocations } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("Asia");

  // const [popularLocationsList, setPopularLocationsList] = useState([]);
  // useEffect(() => {
  //   setPopularLocationsList(popularLocations);
  // }, []);

  const filterPopularLocations = popularLocations.filter(
    (location: any) => location.continent === activeTab
  );
  return (
    <SafeAreaView style={styles.conainer}>
      <Text style={styles.heading}>Explore popular destinations</Text>

      <View style={styles.tabs}>
        <ScrollView
          horizontal
          contentContainerStyle={{
            paddingHorizontal: SIZES.MARGIN_LARGE,
            paddingVertical: SIZES.PADDING_MEDIUM,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {["Asia", "Europe", "South America", "North America", "Africa"].map(
            (time, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.tabStyle,
                  time === activeTab && styles.activeTabStyle,
                ]}
                onPress={() => setActiveTab(time)}
              >
                <Text
                  style={[
                    styles.tabTextStyle,
                    time === activeTab && styles.activeTextTabStyle,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>
      <FlatList
        data={filterPopularLocations}
        renderItem={({ item }) => {
          // if (item.continent === activeTab) {
          return (
            <TouchableOpacity
              style={styles.destination}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Activities", {
                  city: item.city,
                  country: item.country,
                  continent: item.continent,
                })
              }
            >
              <ImageBackground
                style={styles.destinationBg}
                source={{ uri: item.imageUrl }}
              >
                <View style={styles.destinationContainer}>
                  <Text style={styles.name}>{item.city}</Text>
                  <Text style={styles.users}>
                    {item.destination_members.length} Active users
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
          // }
          // return null;
        }}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundTxt}>No destination found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  heading: {
    width: "90%",
    alignSelf: "center",
    marginTop: SIZES.MARGIN_MEDIUM,
    color: COLORS.BLACK,
    fontSize: SIZES.FONT_LARGE,
    fontFamily: FONTS.INTER_MEDIUM,
  },
  tabs: {
    // marginTop: SIZES.MARGIN_LARGE,
  },
  tabStyle: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    paddingHorizontal: SIZES.PADDING_SMALL + 5,
    height: adjustSize(39),
    justifyContent: "center",
    alignItems: "center",
    marginRight: SIZES.MARGIN_MEDIUM,
    elevation: 5,
  },
  activeTabStyle: {
    backgroundColor: COLORS.BLACK,
  },
  tabTextStyle: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    lineHeight: 15,
    fontSize: SIZES.FONT_SMALL,
    color: COLORS.GRAY_700,
  },
  activeTextTabStyle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.WHITE,
  },
  listContainer: {
    paddingHorizontal: SIZES.PADDING_MEDIUM,
    paddingBottom: SIZES.PADDING_SMALL,
  },
  notFoundContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: adjustSize(200),
  },
  notFoundTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.GRAY_500,
  },
  destination: {
    height: 143,
    marginTop: SIZES.MARGIN_MEDIUM,
    borderRadius: 4,
    overflow: "hidden",
  },
  destinationBg: {
    height: 143,
  },
  destinationContainer: {
    height: 143,
    backgroundColor: "#0000004D",
    padding: SIZES.PADDING_SMALL,
    justifyContent: "flex-end",
  },
  name: {
    color: COLORS.WHITE,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: SIZES.FONT_LARGE,
  },
  users: {
    color: COLORS.GRAY_200,
    fontSize: SIZES.FONT_SMALL - 2,
    fontFamily: FONTS.POPPINS_MEDIUM,
  },
});
