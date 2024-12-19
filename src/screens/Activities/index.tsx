import React, { useState, useRef, useEffect, useContext } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Entypo from "@expo/vector-icons/Entypo";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../../utils/types";
import { COLORS, FONTS, SIZES, nearByChats } from "../../utils/constants";
import { adjustSize } from "../../utils/adjustsize";
import ChatCard from "../../components/ChatCard";
import { UserContext } from "../../context";

type Props = {
  navigation: NativeStackScreenProps<RootStackParamList, "Activities">;
  route: RouteProp<RootStackParamList, "Activities">;
};

export default function Activities({ navigation, route }: Props) {
  let { city, country, continent }: any = route.params;
  const { destinations } = useContext(UserContext);
  const [search, setSearch] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("Morning");

  useEffect(() => {
    if (route.params?.timeOfDay) {
      setActiveTab(route.params?.timeOfDay);
    }
  }, []);

  const filterDestinations = destinations.filter(
    (destination) => destination.city === city && destination.time === activeTab
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-small-left" size={24} color={COLORS.BLACK} />
        </TouchableOpacity>
        <Text style={styles.heading}>
          {city}, {country}
        </Text>
        <Text style={styles.subTitle}>
          <Text style={{ color: COLORS.GRAY_700 }}>Join Chats</Text> Based on
          Time of Day
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.PADDING_MEDIUM }}
        nestedScrollEnabled
      >
        <View style={styles.tabs}>
          {["Morning", "Afternoon", "Evening"].map((time, i) => (
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
          ))}
        </View>
        <FlatList
          data={filterDestinations}
          renderItem={({ item }) => <ChatCard data={item} />}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled
          ListEmptyComponent={() => (
            <View style={styles.notFoundContainer}>
              <Text style={styles.notFoundTxt}>No destination found</Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  backBtn: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    width: 32,
    height: 32,
    borderRadius: adjustSize(10),
  },
  header: {
    backgroundColor: COLORS.WHITE,
    // marginTop: StatusBar.currentHeight,
    paddingHorizontal: SIZES.PADDING_MEDIUM,
    paddingVertical: SIZES.PADDING_MEDIUM,
  },
  heading: {
    color: COLORS.BLACK,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: SIZES.FONT_EXTRA_LARGE,
    marginTop: SIZES.MARGIN_MEDIUM,
  },
  subTitle: {
    color: COLORS.TEXT_COLOR,
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: SIZES.FONT_MEDIUM,
  },
  listContainer: {
    paddingHorizontal: SIZES.PADDING_MEDIUM,
    paddingVertical: SIZES.PADDING_SMALL,
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
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.MARGIN_LARGE,
    gap: 10,
  },
  tabStyle: {
    backgroundColor: COLORS.GRAY_200,
    borderRadius: 6,
    paddingHorizontal: SIZES.PADDING_SMALL + 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabStyle: {
    backgroundColor: COLORS.WHITE,
  },
  tabTextStyle: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    lineHeight: 18,
    fontSize: SIZES.FONT_SMALL,
    color: COLORS.GRAY_700,
  },
  activeTextTabStyle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.GRAY_800,
  },
  line: {
    height: 1,
    backgroundColor: "#9797974D",
    marginVertical: SIZES.MARGIN_MEDIUM,
  },
  exploreBtn: {
    marginLeft: SIZES.MARGIN_LARGE,
    borderWidth: 1,
    alignSelf: "flex-start",
    paddingHorizontal: SIZES.PADDING_SMALL,
    height: adjustSize(27),
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.GRAY_500,
    borderRadius: 4,
    marginTop: SIZES.MARGIN_SMALL,
  },
  exploreBtnTxt: {
    color: COLORS.TEXT_COLOR,
    fontFamily: FONTS.BOLD,
    fontSize: SIZES.FONT_SMALL - 1,
  },
});
