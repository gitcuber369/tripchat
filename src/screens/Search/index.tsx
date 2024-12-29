import React, { useState, useRef, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RBSheet from "react-native-raw-bottom-sheet";

import { RootStackParamList, ILocations } from "../../utils/types";
import { COLORS, FONTS, SIZES, locations } from "../../utils/constants";
import { adjustSize } from "../../utils/adjustsize";
import { CalenderIcon, SearchIcon } from "../../../assets/svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { UserContext } from "../../context";

let { height } = Dimensions.get("screen");

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

export default function Search({ navigation }: Props) {
  const { destinations, popularLocations } = useContext(UserContext);
  const refRBSheet = useRef<any>(null);
  const [search, setSearch] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [showArrivalPicker, setShowArrivalPicker] = useState<boolean>(false);
  const [searchedDestination, setSearchedDestination] = useState<any>(null);
  const [showDeparturePicker, setShowDeparturePicker] =
    useState<boolean>(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (showArrivalPicker) {
      setShowArrivalPicker(false);
      // setShowDeparturePicker(false);
      if (selectedDate) setArrivalDate(selectedDate);
    } else if (showDeparturePicker) {
      setShowDeparturePicker(false);
      // setShowArrivalPicker(false);
      if (selectedDate) setDepartureDate(selectedDate);
    }
  };

  const filteredLocations = popularLocations.filter(
    (location: any) =>
      location.city.toLowerCase().includes(search.toLowerCase()) ||
      location.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.BLACK} />
        <Text style={styles.backBtnTxt}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Search Trips</Text>

      <View style={styles.mainSec}>
        <Text style={styles.label}>Destinations</Text>
        <TouchableOpacity
          style={styles.destinationPicker}
          onPress={() => refRBSheet.current.open()}
        >
          <Text style={styles.destinationTxt}>
            {searchedDestination?.city || "Select destination"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainSec}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => {
            setShowArrivalPicker(true);
            setShowDeparturePicker(false);
          }}
        >
          <CalenderIcon color={COLORS.GRAY_500} />
          <Text style={styles.dateTxt}>
            {arrivalDate ? arrivalDate.toDateString() : "Arrival date"}
          </Text>
        </TouchableOpacity>

        {/* DateTimePicker Modals */}
        {showArrivalPicker && (
          <DateTimePicker
            value={arrivalDate || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(event, date) => handleDateChange(event, date)}
          />
        )}
        <TouchableOpacity
          style={[styles.datePicker, { marginTop: SIZES.MARGIN_EXTRA_LARGE }]}
          onPress={() => {
            setShowDeparturePicker(true);
            setShowArrivalPicker(false);
          }}
        >
          <CalenderIcon color={COLORS.GRAY_500} />
          <Text style={styles.dateTxt}>
            {departureDate ? departureDate.toDateString() : "Departure date"}
          </Text>
        </TouchableOpacity>
        {showDeparturePicker && (
          <DateTimePicker
            value={departureDate || new Date()}
            mode="date"
            // display="inline"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(event, date) => handleDateChange(event, date)}
          />
        )}
      </View>

      <Button
        title="Search"
        loading={false}
        disabled={!searchedDestination || !arrivalDate || !departureDate}
        customStyles={{
          View: {
            borderRadius: 10,
            marginTop: SIZES.MARGIN_EXTRA_LARGE + 10,
            backgroundColor:
              !searchedDestination || !arrivalDate || !departureDate
                ? "#4A90E233"
                : COLORS.PRIMARY,
          },
        }}
        onPress={() =>
          navigation.navigate("SearchedResults", { ...searchedDestination })
        }
      />

      <RBSheet
        ref={refRBSheet}
        height={height / 1.5}
        openDuration={250}
        draggable
        customStyles={{
          wrapper: {
            backgroundColor: "#00000080",
          },
          draggableIcon: {
            backgroundColor: COLORS.GRAY_500,
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <Text style={styles.bottomSheetHeading}>Select destinations</Text>
        <Input
          placeholder="Search destinations"
          autoCapitalize="none"
          value={search}
          onChangeText={setSearch}
          leftIcon={<SearchIcon color="#3C3C4399" />}
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
            },
          }}
        />
        <FlatList
          data={filteredLocations}
          renderItem={({ item }) => (
            <View style={styles.destinationCard}>
              {/* <Image style={styles.flagImage} source={{ uri: item.flag }} /> */}
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{item.city}</Text>
                <Text style={styles.fullNameText}>{item.country}</Text>
              </View>
              <TouchableOpacity
                style={styles.goButton}
                activeOpacity={0.5}
                onPress={() => {
                  setSearchedDestination(item);
                  refRBSheet.current.close();
                }}
              >
                <Text style={styles.goButtonText}>Go</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={styles.notFoundContainer}>
              <Text style={styles.notFoundTxt}>
                No destination {search} Is'nt live yet! We're working hard to
                bring TripChat to more cities.
              </Text>
              <Text
                style={{
                  marginTop: 20,
                  color: COLORS.GRAY_500,
                  fontFamily: FONTS.POPPINS_REGULAR,
                }}
              >
                Want {search} to be added? Let us know!
              </Text>
              <View>
                <Button>Request {search}</Button>
              </View>
            </View>
          )}
        />
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  backBtn: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: SIZES.MARGIN_LARGE,
    marginTop: SIZES.MARGIN_MEDIUM,
  },
  backBtnTxt: {
    marginLeft: SIZES.MARGIN_SMALL,
    color: COLORS.BLACK,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: SIZES.FONT_MEDIUM,
  },
  mainSec: {
    width: "90%",
    alignSelf: "center",
    marginTop: SIZES.MARGIN_LARGE,
  },
  destinationPicker: {
    borderWidth: 1,
    height: adjustSize(56),
    borderColor: COLORS.GRAY_200,
    justifyContent: "center",
    paddingHorizontal: SIZES.PADDING_SMALL,
    borderRadius: adjustSize(10),
    marginTop: SIZES.MARGIN_SMALL,
  },
  datePicker: {
    borderWidth: 1,
    height: adjustSize(56),
    borderColor: COLORS.GRAY_200,
    paddingHorizontal: SIZES.PADDING_SMALL,
    borderRadius: adjustSize(10),
    marginTop: SIZES.MARGIN_SMALL,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: COLORS.BLACK,
    fontFamily: FONTS.POPPINS_MEDIUM,
  },
  heading: {
    width: "90%",
    alignSelf: "center",
    marginTop: SIZES.MARGIN_LARGE,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: SIZES.FONT_EXTRA_LARGE,
  },
  dateTxt: {
    marginLeft: SIZES.MARGIN_MEDIUM,
    fontFamily: FONTS.POPPINS_REGULAR,
    color: "#00000080",
    fontSize: SIZES.FONT_MEDIUM,
  },
  destinationTxt: {
    color: "#00000080",
    fontSize: SIZES.FONT_MEDIUM,
    fontFamily: FONTS.POPPINS_REGULAR,
  },
  bottomSheetHeading: {
    width: "90%",
    alignSelf: "center",
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: SIZES.FONT_MEDIUM,
  },
  destinationCard: {
    backgroundColor: "#F5F3F0",
    marginTop: SIZES.MARGIN_MEDIUM,
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.PADDING_SMALL,
    borderRadius: adjustSize(9),
  },
  listContainer: {
    paddingVertical: adjustSize(SIZES.PADDING_SMALL),
    paddingHorizontal: adjustSize(SIZES.PADDING_MEDIUM),
  },
  goButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: adjustSize(12),
  },
  goButtonText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: SIZES.FONT_MEDIUM,
  },
  flagImage: {
    width: adjustSize(44),
    height: adjustSize(44),
    borderRadius: adjustSize(10),
  },
  textContainer: {
    flex: 1,
    marginLeft: SIZES.MARGIN_MEDIUM,
  },
  nameText: {
    color: COLORS.BLACK,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: SIZES.FONT_MEDIUM,
  },
  fullNameText: {
    color: COLORS.BLACK,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: SIZES.FONT_MEDIUM - 2,
    lineHeight: 18,
  },
  notFoundContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: adjustSize(200),
  },
  notFoundTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.GRAY_500,
    alignContent: "center",
    textAlign: "center",
  },
});
