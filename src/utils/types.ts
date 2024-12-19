import { TextStyle, ViewStyle } from "react-native";
import { NavigatorScreenParams } from "@react-navigation/native";

export type TDestinations = {
  id: string;
  name: string;
  activeUser: string;
  image: string;
  flag: string;
};

export type IMember = {
  id: string;
  name: string;
  profileUrl: string;
};

export type INearbyChats = {
  id: string;
  name: string;
  location: string;
  description: string;
  Interest?: string[];
  imageUrl: string;
  members: IMember[];
  hashTags?: string[];
  title?: string;
  interest: string[];
  time?: string;
  destination_members: IUser[];
  city: string;
  country: string;
  continent: string;
};
export type ILocations = {
  id: string;
  flag: string;
  name: string;
  fullName: string;
};

export type TextInptProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  focus?: boolean;
  customStyle?: {
    container?: ViewStyle;
    input?: TextStyle;
  };
  label?: string;
  error?: any;
};
export type TabsParamsList = {
  Home: undefined;
  Explore: undefined;
  Chats: undefined;
  Profile: undefined;
};
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabsParamsList>;
  Login: undefined;
  Signup: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  ActivityDetails: INearbyChats;
  Search: undefined;
  SearchedResults: any;
  Activities: any;
  Chat: any;
  EditProfile: undefined;
  UserProfile: { id: string };
  ForgotPassword:undefined;
  ResetPassword:undefined
};

export type IChats = {
  id: string;
  title: string;
  lastMessage: string;
  isLastMessageRead: boolean;
  imageUrl: string;
  chatType: string;
  lastMessageTime: Date;
  active: boolean;
};

export type activitiesTypes = {
  id: string;
  title: string;
  date: Date;
};

export type ISocialsLinks = {
  name: string;
  link?: string;
  icon?: any;
};

export type IUser = {
  username: string;
  email: string;
  role: string;
  profile_pic: string[] | null;
  id: string;
  location?: any;
  description: string | null;
  interests: string[];
  socials: ISocialsLinks[];
};

export type UserContextType = {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
  destinations: INearbyChats[] | never[];
  setDestinations: (data: INearbyChats[] | never[]) => void;
  fetchDestinationsWithMembers: () => void;
  popularLocations: any;
  isFirstTime: Boolean;
  setisFirstTime: (isFirstTime: Boolean) => void;
  loading: Boolean;
  setLoading: (loading: Boolean) => void;
};
