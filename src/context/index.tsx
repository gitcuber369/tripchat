import { createContext, useEffect, useState } from "react";
import { INearbyChats, IUser, UserContextType } from "../utils/types";
import { supabase } from "../utils/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const initialUser: IUser | null = null;
// const destinations: INearbyChats | null = null;

export const UserContext = createContext<UserContextType>({
  user: initialUser,
  setUser: () => {},
  logout: () => {},
  destinations: [],
  setDestinations: () => {},
  fetchDestinationsWithMembers: () => {},
  popularLocations: [],
  isFirstTime: true,
  setisFirstTime: () => {},
  loading: true,
  setLoading: () => {},
});

export type ISessionUser = {
  id: string;
  email: string;
  username: string;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(initialUser);
  const [destinations, setDestinations] = useState<INearbyChats[] | never[]>(
    []
  );
  const [popularLocations, setPopularLocations] = useState<any>([]);
  const [isFirstTime, setisFirstTime] = useState<Boolean>(true);
  const [loading, setLoading] = useState<Boolean>(true);

  async function getUser() {
    const session = await supabase.auth.getUser();

    if (session) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.data!.user!?.id)
        .single();

      if (error) {
        return;
      }

      setUser(data);
    }
  }

  const extractUniqueCities = (data: any) => {
    // Create a Map to store unique cities with their properties
    const uniqueCitiesMap = new Map();

    data.forEach((item: INearbyChats) => {
      const { city, country, continent, destination_members, imageUrl } = item;
      // Use city as the key to ensure uniqueness
      if (!uniqueCitiesMap.has(city)) {
        uniqueCitiesMap.set(city, {
          city,
          country,
          continent,
          destination_members,
          imageUrl,
        });
      }
    });

    // Convert the Map values back to an array
    return Array.from(uniqueCitiesMap.values());
  };

  const fetchDestinationsWithMembers = async () => {
    const { data, error }: any = await supabase.from("destinations").select(`*,
        destination_members (*,user_id, users!destination_members_user_id_fkey(*))
      `);

    if (error) {
      console.error("Error fetching destinations with members:", error);
    } else {
      setDestinations(data);

      // Extract unique cities
      const uniqueCities = extractUniqueCities(data);
      setPopularLocations(uniqueCities);
      // console.log("Unique cities with properties:", uniqueCities);
    }
  };

  // async function getCommunities() {
  //   try {
  //     const { data, error }: any = await supabase
  //       .from("destinations")
  //       .select("*");
  //     if (error) {
  //       throw error;
  //     }
  //     // console.log(data);
  //     setDestinations(data);
  //   } catch (error) {}
  // }

  useEffect(() => {
    getUser();
    fetchDestinationsWithMembers();
    // getCommunities();
  }, []);

  // const signOut = async () => {
  //   try {
  //     // setState({ user: null }); // Remember to remove the user from your app's state as well
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      await supabase.auth.signOut();

      setUser(null); // Clear user state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        destinations,
        setDestinations,
        fetchDestinationsWithMembers,
        popularLocations,
        isFirstTime,
        setisFirstTime,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
