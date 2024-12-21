import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WithLocalSvg } from "react-native-svg/css";

import { TabsParamsList } from "../../utils/types";
import {
  COLORS,
  FONTS,
  SIZES,
  destinations as mainlocations,
  nearByChats,
} from "../../utils/constants";
import { adjustSize } from "../../utils/adjustsize";
import Input from "../../components/Input";
import { SearchIcon } from "../../../assets/svg";
import ChatList from "../../components/ChatList";
import { UserContext } from "../../context";

type Props = {
  navigation: NativeStackScreenProps<TabsParamsList, "Home">;
};

export default function Home({ navigation }: Props) {
  const { user, destinations, popularLocations } = useContext(UserContext);
  const [search, setSearch] = useState("");
  return (
    <SafeAreaView style={styles.conainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.PADDING_MEDIUM }}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingMessage}>
              <Text style={{ color: COLORS.GRAY_500 }}>Hello,</Text>{" "}
              {user?.username.slice(0, 7)}
            </Text>
            <Text style={styles.address}>
              {user?.location?.city}, {user?.location?.country}
            </Text>
          </View>
          <View style={styles.logoSec}>
            <Text style={styles.logoTxt}>Tripchat</Text>
            <View style={styles.logo}>
              <WithLocalSvg
                asset={require("../../../assets/svg/star.svg")}
                width={20}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{
                uri: user?.profile_pic
                  ? user?.profile_pic[0]
                  : "https://bzphwlvkfpfmzsbcmrgl.supabase.co/storage/v1/object/public/profile_pictures/user.png",
              }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Search")}
        >
          <Input
            placeholder="Explore cities and activities"
            autoCapitalize="none"
            value={search}
            onChangeText={setSearch}
            leftIcon={<SearchIcon color="#3C3C4399" />}
            editable={false}
            customStyle={{
              input: {
                marginLeft: SIZES.MARGIN_MEDIUM,
                fontSize: SIZES.FONT_MEDIUM,
              },
              container: {
                backgroundColor: COLORS.GRAY_100,
                borderWidth: 1,
                borderColor: COLORS.GRAY_200,
                borderRadius: 10,
                height: adjustSize(56),
                marginTop: adjustSize(SIZES.MARGIN_LARGE),
              },
            }}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Chats happening near you</Text>
        <ChatList data={destinations} />
        <Text style={styles.heading}>Explore popular destinations</Text>
        <View style={styles.destionationWraper}>
          {popularLocations.slice(0, 4).map((item: any, i: number) => (
            <TouchableOpacity
              style={styles.itemContainer}
              activeOpacity={0.5}
              key={i}
              onPress={() =>
                navigation.navigate("Activities", {
                  city: item.city,
                  country: item.country,
                  continent: item.continent,
                })
              }
            >
              <View style={styles.containerBackground} />
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.name}>{item.city}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.PADDING_MEDIUM,
    marginTop: SIZES.MARGIN_LARGE,
  },
  profileImage: {
    width: adjustSize(51),
    height: adjustSize(51),
    borderRadius: adjustSize(51) / 2,
  },
  greetingMessage: {
    fontFamily: FONTS.BOLD,
    fontSize: SIZES.FONT_LARGE - 1,
    color: COLORS.BLACK,
  },
  address: {
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
  },
  heading: {
    width: "90%",
    alignSelf: "center",
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: SIZES.FONT_LARGE,
    marginTop: SIZES.MARGIN_EXTRA_LARGE,
  },
  itemContainer: {
    alignItems: "center",
    borderColor: "#ccc",
    height: adjustSize(130),
    width: "48%",
    justifyContent: "center",
    marginTop: adjustSize(SIZES.MARGIN_MEDIUM),
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: adjustSize(130),
    width: "100%",
    position: "absolute",
    borderRadius: adjustSize(10),
  },
  name: {
    fontSize: SIZES.FONT_LARGE,
    fontFamily: FONTS.INTER_MEDIUM,
    color: COLORS.WHITE,
    zIndex: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  containerBackground: {
    height: adjustSize(130),
    width: "100%",
    backgroundColor: "#00000080",
    borderRadius: adjustSize(10),
    position: "absolute",
    zIndex: 1,
  },
  destionationWraper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  logoTxt: {
    color: COLORS.BLACK,
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: SIZES.FONT_LARGE,
  },
  logoSec: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginTop: -15,
  },
});
