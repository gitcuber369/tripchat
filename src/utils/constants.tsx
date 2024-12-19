import {
  TDestinations,
  activitiesTypes,
  INearbyChats,
  ILocations,
  IChats,
  ISocialsLinks,
} from "./types";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const COLORS = {
  PRIMARY: "#4A90E2",
  // TEXT_COLOR: "#212121",
  WHITE: "#ffffff",
  BLACK: "#000000",
  BACKGROUND_COLOR: "#EDEDED",
  GRAY: "#9E9E9E",
  LIGHT_GRAY: "#FAFAFA",
  LIGHT_PRIMARY: "#FFDADB",
  GRAY2: "#838383",
  GRAY3: "#D9D9D9",
  TEXT_COLOR: "#161616",
  GRAY_100: "#F5F5F5",
  GRAY_200: "#D8DADC",
  GRAY_300: "#BEBEBE",
  GRAY_500: "#797876",
  GRAY_700: "#484C52",
  GRAY_800: "#434343",
};

export const FONTS = {
  LIGHT: "Nunito-Light",
  REGULAR: "Nunito-Regular",
  ITALIC: "Nunito-Italic",
  MEDIUM: "Nunito-Medium",
  SEMI_BOLD: "Nunito-SemiBold",
  BOLD: "Nunito-Bold",
  INTER_LIGHT: "Inter-Light",
  INTER_REGULAR: "Inter-Regular",
  INTER_MEDIUM: "Inter-Medium",
  INTER_SEMIBOLD: "Inter-SemiBold",
  INTER_BOLD: "Inter-Bold",
  POPPINS_LIGHT: "Poppins-Light",
  POPPINS_REGULAR: "Poppins-Regular",
  POPPINS_ITALIC: "Poppins-Italic",
  POPPINS_MEDIUM: "Poppins-Medium",
  POPPINS_SEMIBOLD: "Poppins-SemiBold",
  POPPINS_BOLD: "Poppins-Bold",
};

export const SIZES = {
  FONT_SMALL: 12,
  FONT_MEDIUM: 16,
  FONT_LARGE: 20,
  FONT_EXTRA_LARGE: 24,

  PADDING_SMALL: 10,
  PADDING_MEDIUM: 20,
  PADDING_LARGE: 30,
  PADDING_EXTRA_LARGE: 40,

  MARGIN_SMALL: 5,
  MARGIN_MEDIUM: 10,
  MARGIN_LARGE: 15,
  MARGIN_EXTRA_LARGE: 20,

  WIDTH_SMALL: 50,
  WIDTH_MEDIUM: 100,
  WIDTH_LARGE: 200,
  WIDTH_EXTRA_LARGE: 300,

  HEIGHT_SMALL: 50,
  HEIGHT_MEDIUM: 100,
  HEIGHT_LARGE: 200,
  HEIGHT_EXTRA_LARGE: 300,
};

export const destinations: TDestinations[] = [
  {
    id: "01",
    name: "Lisbon",
    activeUser: "400",
    image:
      "https://i.pinimg.com/736x/50/41/82/504182b20a6c9912f43f3532b097f5c8.jpg",
    flag: "https://s3-alpha-sig.figma.com/img/0628/ff32/1324cb4c46601f5c8f549738092d9582?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mvYDyymdAGLtQLBRyMk2JztcxaAfUOSn7R7MgngD1u~Koo9H-RDyXUXv-W2E~7E-OCfw3ypph8MINZxub3YksiOMSbjUa7JnDfx1mQusXb5FAzd8GZ29mmYLtHlOjNGHt5TIquyJ6MZ0LvoZ20AJrpMReQwUyo3ocDMga~eNqDAQnrua4wa4WG72sUdO58lrvZgZUkrq8ExxLtP512xkjYdsmxUDfaQ4nRv0kH7zGrgQ0eZsIxWSLABGZTTFs2OI0v1rSOUjP5hndWydkmd-b6bRaMjtc-t5tNHiE9eH1dM0oPbjmdPnW4~7~SaI~9QTaFG2Twzu3VsyvE2UmZZNwA__",
  },
  {
    id: "02",
    name: "Amsterdam",
    activeUser: "400",
    image:
      "https://i.pinimg.com/736x/13/50/ca/1350cae44aaf4bba186a3d58a56dc2eb.jpg",
    flag: "https://s3-alpha-sig.figma.com/img/0628/ff32/1324cb4c46601f5c8f549738092d9582?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mvYDyymdAGLtQLBRyMk2JztcxaAfUOSn7R7MgngD1u~Koo9H-RDyXUXv-W2E~7E-OCfw3ypph8MINZxub3YksiOMSbjUa7JnDfx1mQusXb5FAzd8GZ29mmYLtHlOjNGHt5TIquyJ6MZ0LvoZ20AJrpMReQwUyo3ocDMga~eNqDAQnrua4wa4WG72sUdO58lrvZgZUkrq8ExxLtP512xkjYdsmxUDfaQ4nRv0kH7zGrgQ0eZsIxWSLABGZTTFs2OI0v1rSOUjP5hndWydkmd-b6bRaMjtc-t5tNHiE9eH1dM0oPbjmdPnW4~7~SaI~9QTaFG2Twzu3VsyvE2UmZZNwA__",
  },
  {
    id: "03",
    name: "Barcelona",
    activeUser: "400",
    image:
      "https://i.pinimg.com/736x/4d/ed/02/4ded02b55ca28b9170b40c39708cfee6.jpg",
    flag: "https://s3-alpha-sig.figma.com/img/0628/ff32/1324cb4c46601f5c8f549738092d9582?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mvYDyymdAGLtQLBRyMk2JztcxaAfUOSn7R7MgngD1u~Koo9H-RDyXUXv-W2E~7E-OCfw3ypph8MINZxub3YksiOMSbjUa7JnDfx1mQusXb5FAzd8GZ29mmYLtHlOjNGHt5TIquyJ6MZ0LvoZ20AJrpMReQwUyo3ocDMga~eNqDAQnrua4wa4WG72sUdO58lrvZgZUkrq8ExxLtP512xkjYdsmxUDfaQ4nRv0kH7zGrgQ0eZsIxWSLABGZTTFs2OI0v1rSOUjP5hndWydkmd-b6bRaMjtc-t5tNHiE9eH1dM0oPbjmdPnW4~7~SaI~9QTaFG2Twzu3VsyvE2UmZZNwA__",
  },
  {
    id: "04",
    name: "Madrid",
    activeUser: "400",
    image:
      "https://i.pinimg.com/736x/5d/31/8f/5d318f8f8a3f14e88a3bfd4f6437b1a5.jpg",
    flag: "https://s3-alpha-sig.figma.com/img/0628/ff32/1324cb4c46601f5c8f549738092d9582?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mvYDyymdAGLtQLBRyMk2JztcxaAfUOSn7R7MgngD1u~Koo9H-RDyXUXv-W2E~7E-OCfw3ypph8MINZxub3YksiOMSbjUa7JnDfx1mQusXb5FAzd8GZ29mmYLtHlOjNGHt5TIquyJ6MZ0LvoZ20AJrpMReQwUyo3ocDMga~eNqDAQnrua4wa4WG72sUdO58lrvZgZUkrq8ExxLtP512xkjYdsmxUDfaQ4nRv0kH7zGrgQ0eZsIxWSLABGZTTFs2OI0v1rSOUjP5hndWydkmd-b6bRaMjtc-t5tNHiE9eH1dM0oPbjmdPnW4~7~SaI~9QTaFG2Twzu3VsyvE2UmZZNwA__",
  },
];

export const nearByChats: INearbyChats[] = [
  {
    id: "01",
    name: "Alfama morning Stroll & Café Meetup ☕️🌅",
    location: "Lisbon, Portugal",
    description: "I’m planning a sunrise stroll through Alfama to explore Lisbon’s most charming streets and viewpoints. Let’s meet at Miradouro de Santa Luzia for some amazing morning views, then wander through the neighborhood, stopping at spots like the Lisbon Cathedral and Portas do Sol.",
    Interest: ["City exploration", "Photography", "Walking tours"],
    imageUrl: "https://i.pinimg.com/736x/e8/61/ca/e861ca28d2b67a86dc6ec7c926bf5c65.jpg",
    members: [
      {
        id: "01",
        name: "Beerbal",
        profileUrl: "https://s3-alpha-sig.figma.com/img/c0fe/d1ca/98c2c8d54647a00cf39393ac3e23e11a?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=grhfJaun7b8jqVGBh7dDzjf9vtO4iLDg07J86iXkQ4mTaGIHLHnem021~0dH4fzcgKMopkum8IB1GuukuU~wnk81oysLwjuYp~wNRmg9J2rzCKfkE-vMQym44vWR1pLdW4E4kMJqC~ngKcX6FqETw~hCaQPiOtsh8zTDTDhP-mg-eF~BAlYFDjsTVJ2HZnM2ZN5Mt2CpjCENXWDVTI7UD3D1vqSOEwYy9SN0WqQEUVrNGgUGWTNkYSJcHb5CtucHc4HLyppFrLmJ5L-lApdAOaiFu6jQwANHh7t8lQH8WG5zeKzCqONwR6hoCiUaHd3tKOho-5H3hiq0c9h3GpTSSw__",
      },
      {
        id: "02",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/5062/ad85/fa5095badbfe0c87131327ae115df8c1?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RZvcUdGK~MzKmACq5Zqk9asnCPuDizwQS1J9FRa4V1qaKG9xVZYHqRAkzKHQO-~oILzYiHI10p-o4j5pULKA8we4z9TLX7CsPBhb4mCqsy~1cjgCmb~hlR2YtF4J9CGFI4rMmKgjqDV45Lln3XXZ9~ByMCuFFK6czlvzmlN2T4pqiNuZMD1TpmhqWsJ6h2iwd6c69Ps2Qcpg0QVloqfYlWoDXDqoXReEVYoDoXhjk7A2efisERV5548mctqWyJa4iP-Kmbr6UZZ1GfgEZlmOU2CxUc0SXcXn6nqbQtz~GLJTeKNLJVlq-s~g0exEIpqBv7KttrgB8UcU8bs8YuFZUw__",
      },
      {
        id: "03",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/a88c/de0f/b98dd881eb5b493cbae459a7ad8ce6ed?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZuQgu3xpZD8myjcLfpJkcUacgAo3DeQJ9fB8fkSr1bPbFTdfju2q5LALkBQ~S25X6~I1oxsWYFWtcOFECMRiSIoz~fq-WHIYXCNSQw0vgC-UTv6snDjsDu8UzudGj1CmfHbLhUf6L09igB~b2i-T0eXsP3eaubSQsQhC9rLyMPwyxUC9r4OTCIZ1wDKk3NxdZjx1KzEevvy1MKnDw9wbSKE7a9mNulwvmMWfEWSPFrPZiFdpR4-p0NoMj4cQAFySG-1cQvNeAOME8rcceEBL587xM95avNyPQXrULOWNqISNnyqA9DmcV4vYGsbJj1tfmG5OzQ2bJb1qxzPYbVFY0Q__",
      },
    ],
    interest: [],
    destination_members: []
  },
  {
    id: "02",
    name: "Join Global Travel Discussions",
    location: "Lisbon, Portugal",
    description: "I’m planning a sunrise stroll through Alfama to explore Lisbon’s most charming streets and viewpoints. Let’s meet at Miradouro de Santa Luzia for some amazing morning views, then wander through the neighborhood, stopping at spots like the Lisbon Cathedral and Portas do Sol.",
    Interest: ["City exploration", "Photography", "Walking tours"],
    imageUrl: "https://i.pinimg.com/736x/cd/83/fd/cd83fd4c137a9bbac0a386ddc60c20f5.jpg",
    members: [
      {
        id: "01",
        name: "Beerbal",
        profileUrl: "https://s3-alpha-sig.figma.com/img/c0fe/d1ca/98c2c8d54647a00cf39393ac3e23e11a?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=grhfJaun7b8jqVGBh7dDzjf9vtO4iLDg07J86iXkQ4mTaGIHLHnem021~0dH4fzcgKMopkum8IB1GuukuU~wnk81oysLwjuYp~wNRmg9J2rzCKfkE-vMQym44vWR1pLdW4E4kMJqC~ngKcX6FqETw~hCaQPiOtsh8zTDTDhP-mg-eF~BAlYFDjsTVJ2HZnM2ZN5Mt2CpjCENXWDVTI7UD3D1vqSOEwYy9SN0WqQEUVrNGgUGWTNkYSJcHb5CtucHc4HLyppFrLmJ5L-lApdAOaiFu6jQwANHh7t8lQH8WG5zeKzCqONwR6hoCiUaHd3tKOho-5H3hiq0c9h3GpTSSw__",
      },
      {
        id: "02",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/5062/ad85/fa5095badbfe0c87131327ae115df8c1?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RZvcUdGK~MzKmACq5Zqk9asnCPuDizwQS1J9FRa4V1qaKG9xVZYHqRAkzKHQO-~oILzYiHI10p-o4j5pULKA8we4z9TLX7CsPBhb4mCqsy~1cjgCmb~hlR2YtF4J9CGFI4rMmKgjqDV45Lln3XXZ9~ByMCuFFK6czlvzmlN2T4pqiNuZMD1TpmhqWsJ6h2iwd6c69Ps2Qcpg0QVloqfYlWoDXDqoXReEVYoDoXhjk7A2efisERV5548mctqWyJa4iP-Kmbr6UZZ1GfgEZlmOU2CxUc0SXcXn6nqbQtz~GLJTeKNLJVlq-s~g0exEIpqBv7KttrgB8UcU8bs8YuFZUw__",
      },
      {
        id: "03",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/a88c/de0f/b98dd881eb5b493cbae459a7ad8ce6ed?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZuQgu3xpZD8myjcLfpJkcUacgAo3DeQJ9fB8fkSr1bPbFTdfju2q5LALkBQ~S25X6~I1oxsWYFWtcOFECMRiSIoz~fq-WHIYXCNSQw0vgC-UTv6snDjsDu8UzudGj1CmfHbLhUf6L09igB~b2i-T0eXsP3eaubSQsQhC9rLyMPwyxUC9r4OTCIZ1wDKk3NxdZjx1KzEevvy1MKnDw9wbSKE7a9mNulwvmMWfEWSPFrPZiFdpR4-p0NoMj4cQAFySG-1cQvNeAOME8rcceEBL587xM95avNyPQXrULOWNqISNnyqA9DmcV4vYGsbJj1tfmG5OzQ2bJb1qxzPYbVFY0Q__",
      },
    ],
    interest: [],
    destination_members: []
  },
  {
    id: "03",
    name: "Join Global Travel Discussions",
    location: "Lisbon, Portugal",
    description: "I’m planning a sunrise stroll through Alfama to explore Lisbon’s most charming streets and viewpoints. Let’s meet at Miradouro de Santa Luzia for some amazing morning views, then wander through the neighborhood, stopping at spots like the Lisbon Cathedral and Portas do Sol.",
    Interest: ["City exploration", "Photography", "Walking tours"],
    imageUrl: "https://i.pinimg.com/736x/32/7f/6d/327f6d92bc73a958226f89bd127cdb13.jpg",
    members: [
      {
        id: "01",
        name: "Beerbal",
        profileUrl: "https://s3-alpha-sig.figma.com/img/c0fe/d1ca/98c2c8d54647a00cf39393ac3e23e11a?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=grhfJaun7b8jqVGBh7dDzjf9vtO4iLDg07J86iXkQ4mTaGIHLHnem021~0dH4fzcgKMopkum8IB1GuukuU~wnk81oysLwjuYp~wNRmg9J2rzCKfkE-vMQym44vWR1pLdW4E4kMJqC~ngKcX6FqETw~hCaQPiOtsh8zTDTDhP-mg-eF~BAlYFDjsTVJ2HZnM2ZN5Mt2CpjCENXWDVTI7UD3D1vqSOEwYy9SN0WqQEUVrNGgUGWTNkYSJcHb5CtucHc4HLyppFrLmJ5L-lApdAOaiFu6jQwANHh7t8lQH8WG5zeKzCqONwR6hoCiUaHd3tKOho-5H3hiq0c9h3GpTSSw__",
      },
      {
        id: "02",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/5062/ad85/fa5095badbfe0c87131327ae115df8c1?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RZvcUdGK~MzKmACq5Zqk9asnCPuDizwQS1J9FRa4V1qaKG9xVZYHqRAkzKHQO-~oILzYiHI10p-o4j5pULKA8we4z9TLX7CsPBhb4mCqsy~1cjgCmb~hlR2YtF4J9CGFI4rMmKgjqDV45Lln3XXZ9~ByMCuFFK6czlvzmlN2T4pqiNuZMD1TpmhqWsJ6h2iwd6c69Ps2Qcpg0QVloqfYlWoDXDqoXReEVYoDoXhjk7A2efisERV5548mctqWyJa4iP-Kmbr6UZZ1GfgEZlmOU2CxUc0SXcXn6nqbQtz~GLJTeKNLJVlq-s~g0exEIpqBv7KttrgB8UcU8bs8YuFZUw__",
      },
      {
        id: "03",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/a88c/de0f/b98dd881eb5b493cbae459a7ad8ce6ed?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZuQgu3xpZD8myjcLfpJkcUacgAo3DeQJ9fB8fkSr1bPbFTdfju2q5LALkBQ~S25X6~I1oxsWYFWtcOFECMRiSIoz~fq-WHIYXCNSQw0vgC-UTv6snDjsDu8UzudGj1CmfHbLhUf6L09igB~b2i-T0eXsP3eaubSQsQhC9rLyMPwyxUC9r4OTCIZ1wDKk3NxdZjx1KzEevvy1MKnDw9wbSKE7a9mNulwvmMWfEWSPFrPZiFdpR4-p0NoMj4cQAFySG-1cQvNeAOME8rcceEBL587xM95avNyPQXrULOWNqISNnyqA9DmcV4vYGsbJj1tfmG5OzQ2bJb1qxzPYbVFY0Q__",
      },
    ],
    interest: [],
    destination_members: []
  },
  {
    id: "04",
    name: "Alfama morning Stroll & Café Meetup ☕️🌅",
    location: "Lisbon, Portugal",
    description: "I’m planning a sunrise stroll through Alfama to explore Lisbon’s most charming streets and viewpoints. Let’s meet at Miradouro de Santa Luzia for some amazing morning views, then wander through the neighborhood, stopping at spots like the Lisbon Cathedral and Portas do Sol.",
    Interest: ["City exploration", "Photography", "Walking tours"],
    imageUrl: "https://i.pinimg.com/736x/26/df/c6/26dfc66f34e68c3636c1b8d535f97835.jpg",
    members: [
      {
        id: "01",
        name: "Beerbal",
        profileUrl: "https://s3-alpha-sig.figma.com/img/c0fe/d1ca/98c2c8d54647a00cf39393ac3e23e11a?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=grhfJaun7b8jqVGBh7dDzjf9vtO4iLDg07J86iXkQ4mTaGIHLHnem021~0dH4fzcgKMopkum8IB1GuukuU~wnk81oysLwjuYp~wNRmg9J2rzCKfkE-vMQym44vWR1pLdW4E4kMJqC~ngKcX6FqETw~hCaQPiOtsh8zTDTDhP-mg-eF~BAlYFDjsTVJ2HZnM2ZN5Mt2CpjCENXWDVTI7UD3D1vqSOEwYy9SN0WqQEUVrNGgUGWTNkYSJcHb5CtucHc4HLyppFrLmJ5L-lApdAOaiFu6jQwANHh7t8lQH8WG5zeKzCqONwR6hoCiUaHd3tKOho-5H3hiq0c9h3GpTSSw__",
      },
      {
        id: "02",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/5062/ad85/fa5095badbfe0c87131327ae115df8c1?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RZvcUdGK~MzKmACq5Zqk9asnCPuDizwQS1J9FRa4V1qaKG9xVZYHqRAkzKHQO-~oILzYiHI10p-o4j5pULKA8we4z9TLX7CsPBhb4mCqsy~1cjgCmb~hlR2YtF4J9CGFI4rMmKgjqDV45Lln3XXZ9~ByMCuFFK6czlvzmlN2T4pqiNuZMD1TpmhqWsJ6h2iwd6c69Ps2Qcpg0QVloqfYlWoDXDqoXReEVYoDoXhjk7A2efisERV5548mctqWyJa4iP-Kmbr6UZZ1GfgEZlmOU2CxUc0SXcXn6nqbQtz~GLJTeKNLJVlq-s~g0exEIpqBv7KttrgB8UcU8bs8YuFZUw__",
      },
      {
        id: "03",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/a88c/de0f/b98dd881eb5b493cbae459a7ad8ce6ed?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZuQgu3xpZD8myjcLfpJkcUacgAo3DeQJ9fB8fkSr1bPbFTdfju2q5LALkBQ~S25X6~I1oxsWYFWtcOFECMRiSIoz~fq-WHIYXCNSQw0vgC-UTv6snDjsDu8UzudGj1CmfHbLhUf6L09igB~b2i-T0eXsP3eaubSQsQhC9rLyMPwyxUC9r4OTCIZ1wDKk3NxdZjx1KzEevvy1MKnDw9wbSKE7a9mNulwvmMWfEWSPFrPZiFdpR4-p0NoMj4cQAFySG-1cQvNeAOME8rcceEBL587xM95avNyPQXrULOWNqISNnyqA9DmcV4vYGsbJj1tfmG5OzQ2bJb1qxzPYbVFY0Q__",
      },
    ],
    interest: [],
    destination_members: []
  },
];

export const upcomingEvents: INearbyChats[] = [
  {
    id: "01",
    name: "Miami Food Wine Festival",
    location: "Lisbon, Portugal",
    description: "I’m planning a sunrise stroll through Alfama to explore Lisbon’s most charming streets and viewpoints. Let’s meet at Miradouro de Santa Luzia for some amazing morning views, then wander through the neighborhood, stopping at spots like the Lisbon Cathedral and Portas do Sol.",
    hashTags: ["#locals"],
    imageUrl: "https://s3-alpha-sig.figma.com/img/d3bf/6ab2/f9f7ead655e5d7c6907d2cfdb927e6bb?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ud92kjnmgnsQCBgL0byz7OnVfGIDX93ra4oRIPGBa1n4UXTZ1wv2DNhHz~LkYV5XWmsiriPhpUelqlCkJb0LCoTjHjXWwOQ3KxXbDSlSrIZ9nnnxGlctNxBR2KTDTNCIRZJK0~VoHXK72e3LClR-FcMJiH-obPEwrqzGB~yrVOAz073Eo~ZQtpGfXqPMlY9Ml~rWfcUYLyXK7cDgYfgrT8q~~bSvaGAdHRbTCtcMs-4ALqK1tQVfR5PVTURIlduU-ASnGxkSHsDRIw-uwIcdlZvbfvjlJfHC8ryKwNUWAvFoTbx74KlzDiebbsppUOBml60msQ0jDTFEXMMrBS1dwA__",
    members: [
      {
        id: "01",
        name: "Beerbal",
        profileUrl: "https://s3-alpha-sig.figma.com/img/c0fe/d1ca/98c2c8d54647a00cf39393ac3e23e11a?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=grhfJaun7b8jqVGBh7dDzjf9vtO4iLDg07J86iXkQ4mTaGIHLHnem021~0dH4fzcgKMopkum8IB1GuukuU~wnk81oysLwjuYp~wNRmg9J2rzCKfkE-vMQym44vWR1pLdW4E4kMJqC~ngKcX6FqETw~hCaQPiOtsh8zTDTDhP-mg-eF~BAlYFDjsTVJ2HZnM2ZN5Mt2CpjCENXWDVTI7UD3D1vqSOEwYy9SN0WqQEUVrNGgUGWTNkYSJcHb5CtucHc4HLyppFrLmJ5L-lApdAOaiFu6jQwANHh7t8lQH8WG5zeKzCqONwR6hoCiUaHd3tKOho-5H3hiq0c9h3GpTSSw__",
      },
      {
        id: "02",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/5062/ad85/fa5095badbfe0c87131327ae115df8c1?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RZvcUdGK~MzKmACq5Zqk9asnCPuDizwQS1J9FRa4V1qaKG9xVZYHqRAkzKHQO-~oILzYiHI10p-o4j5pULKA8we4z9TLX7CsPBhb4mCqsy~1cjgCmb~hlR2YtF4J9CGFI4rMmKgjqDV45Lln3XXZ9~ByMCuFFK6czlvzmlN2T4pqiNuZMD1TpmhqWsJ6h2iwd6c69Ps2Qcpg0QVloqfYlWoDXDqoXReEVYoDoXhjk7A2efisERV5548mctqWyJa4iP-Kmbr6UZZ1GfgEZlmOU2CxUc0SXcXn6nqbQtz~GLJTeKNLJVlq-s~g0exEIpqBv7KttrgB8UcU8bs8YuFZUw__",
      },
      {
        id: "03",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/a88c/de0f/b98dd881eb5b493cbae459a7ad8ce6ed?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZuQgu3xpZD8myjcLfpJkcUacgAo3DeQJ9fB8fkSr1bPbFTdfju2q5LALkBQ~S25X6~I1oxsWYFWtcOFECMRiSIoz~fq-WHIYXCNSQw0vgC-UTv6snDjsDu8UzudGj1CmfHbLhUf6L09igB~b2i-T0eXsP3eaubSQsQhC9rLyMPwyxUC9r4OTCIZ1wDKk3NxdZjx1KzEevvy1MKnDw9wbSKE7a9mNulwvmMWfEWSPFrPZiFdpR4-p0NoMj4cQAFySG-1cQvNeAOME8rcceEBL587xM95avNyPQXrULOWNqISNnyqA9DmcV4vYGsbJj1tfmG5OzQ2bJb1qxzPYbVFY0Q__",
      },
    ],
    interest: [],
    destination_members: []
  },
  {
    id: "02",
    name: "iii Points Festival",
    location: "Lisbon, Portugal",
    description: "I’m planning a sunrise stroll through Alfama to explore Lisbon’s most charming streets and viewpoints. Let’s meet at Miradouro de Santa Luzia for some amazing morning views, then wander through the neighborhood, stopping at spots like the Lisbon Cathedral and Portas do Sol.",
    hashTags: ["#locals"],
    imageUrl: "https://s3-alpha-sig.figma.com/img/9687/bcc7/57be46847b3a553778fb405c06ce65e1?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SwCVuN81ZTfug-2Gw7HWyHnXFB1o8cLscUEA05Vzzz-wKJu3lEXcRogwEKn61DzFYXUoY9u8zMp-L8d1NK6Q3tql43JsaS3L65~uJpK4av756riyxjRM~vsn545gnKJtQIwl0YOc3f-2GKAtuE6ifXhud6UWvSx~Es4MtY3WKt79npGzzvu3hxH6MSUpQEjOVfcVxB9d~iET6RCxVSudpOw47Dxf9tnNES3M6ldQqk8GccRzswzsgwcEJvPR4RH675wLTR2bPDnaMcKy-73so54AZfoEh0AJ5NWSSKPdKgl47Xa8T-UNTEOFjFRgV9tG~WTmAw05P2AbKoQXbYG3gA__",
    members: [
      {
        id: "01",
        name: "Beerbal",
        profileUrl: "https://s3-alpha-sig.figma.com/img/c0fe/d1ca/98c2c8d54647a00cf39393ac3e23e11a?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=grhfJaun7b8jqVGBh7dDzjf9vtO4iLDg07J86iXkQ4mTaGIHLHnem021~0dH4fzcgKMopkum8IB1GuukuU~wnk81oysLwjuYp~wNRmg9J2rzCKfkE-vMQym44vWR1pLdW4E4kMJqC~ngKcX6FqETw~hCaQPiOtsh8zTDTDhP-mg-eF~BAlYFDjsTVJ2HZnM2ZN5Mt2CpjCENXWDVTI7UD3D1vqSOEwYy9SN0WqQEUVrNGgUGWTNkYSJcHb5CtucHc4HLyppFrLmJ5L-lApdAOaiFu6jQwANHh7t8lQH8WG5zeKzCqONwR6hoCiUaHd3tKOho-5H3hiq0c9h3GpTSSw__",
      },
      {
        id: "02",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/5062/ad85/fa5095badbfe0c87131327ae115df8c1?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RZvcUdGK~MzKmACq5Zqk9asnCPuDizwQS1J9FRa4V1qaKG9xVZYHqRAkzKHQO-~oILzYiHI10p-o4j5pULKA8we4z9TLX7CsPBhb4mCqsy~1cjgCmb~hlR2YtF4J9CGFI4rMmKgjqDV45Lln3XXZ9~ByMCuFFK6czlvzmlN2T4pqiNuZMD1TpmhqWsJ6h2iwd6c69Ps2Qcpg0QVloqfYlWoDXDqoXReEVYoDoXhjk7A2efisERV5548mctqWyJa4iP-Kmbr6UZZ1GfgEZlmOU2CxUc0SXcXn6nqbQtz~GLJTeKNLJVlq-s~g0exEIpqBv7KttrgB8UcU8bs8YuFZUw__",
      },
      {
        id: "03",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/a88c/de0f/b98dd881eb5b493cbae459a7ad8ce6ed?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZuQgu3xpZD8myjcLfpJkcUacgAo3DeQJ9fB8fkSr1bPbFTdfju2q5LALkBQ~S25X6~I1oxsWYFWtcOFECMRiSIoz~fq-WHIYXCNSQw0vgC-UTv6snDjsDu8UzudGj1CmfHbLhUf6L09igB~b2i-T0eXsP3eaubSQsQhC9rLyMPwyxUC9r4OTCIZ1wDKk3NxdZjx1KzEevvy1MKnDw9wbSKE7a9mNulwvmMWfEWSPFrPZiFdpR4-p0NoMj4cQAFySG-1cQvNeAOME8rcceEBL587xM95avNyPQXrULOWNqISNnyqA9DmcV4vYGsbJj1tfmG5OzQ2bJb1qxzPYbVFY0Q__",
      },
    ],
    interest: [],
    destination_members: []
  },
  {
    id: "03",
    name: "Miami Food Wine Festival",
    location: "Lisbon, Portugal",
    description: "I’m planning a sunrise stroll through Alfama to explore Lisbon’s most charming streets and viewpoints. Let’s meet at Miradouro de Santa Luzia for some amazing morning views, then wander through the neighborhood, stopping at spots like the Lisbon Cathedral and Portas do Sol.",
    hashTags: ["#locals"],
    imageUrl: "https://s3-alpha-sig.figma.com/img/9687/bcc7/57be46847b3a553778fb405c06ce65e1?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SwCVuN81ZTfug-2Gw7HWyHnXFB1o8cLscUEA05Vzzz-wKJu3lEXcRogwEKn61DzFYXUoY9u8zMp-L8d1NK6Q3tql43JsaS3L65~uJpK4av756riyxjRM~vsn545gnKJtQIwl0YOc3f-2GKAtuE6ifXhud6UWvSx~Es4MtY3WKt79npGzzvu3hxH6MSUpQEjOVfcVxB9d~iET6RCxVSudpOw47Dxf9tnNES3M6ldQqk8GccRzswzsgwcEJvPR4RH675wLTR2bPDnaMcKy-73so54AZfoEh0AJ5NWSSKPdKgl47Xa8T-UNTEOFjFRgV9tG~WTmAw05P2AbKoQXbYG3gA__",
    members: [
      {
        id: "01",
        name: "Beerbal",
        profileUrl: "https://s3-alpha-sig.figma.com/img/c0fe/d1ca/98c2c8d54647a00cf39393ac3e23e11a?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=grhfJaun7b8jqVGBh7dDzjf9vtO4iLDg07J86iXkQ4mTaGIHLHnem021~0dH4fzcgKMopkum8IB1GuukuU~wnk81oysLwjuYp~wNRmg9J2rzCKfkE-vMQym44vWR1pLdW4E4kMJqC~ngKcX6FqETw~hCaQPiOtsh8zTDTDhP-mg-eF~BAlYFDjsTVJ2HZnM2ZN5Mt2CpjCENXWDVTI7UD3D1vqSOEwYy9SN0WqQEUVrNGgUGWTNkYSJcHb5CtucHc4HLyppFrLmJ5L-lApdAOaiFu6jQwANHh7t8lQH8WG5zeKzCqONwR6hoCiUaHd3tKOho-5H3hiq0c9h3GpTSSw__",
      },
      {
        id: "02",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/5062/ad85/fa5095badbfe0c87131327ae115df8c1?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RZvcUdGK~MzKmACq5Zqk9asnCPuDizwQS1J9FRa4V1qaKG9xVZYHqRAkzKHQO-~oILzYiHI10p-o4j5pULKA8we4z9TLX7CsPBhb4mCqsy~1cjgCmb~hlR2YtF4J9CGFI4rMmKgjqDV45Lln3XXZ9~ByMCuFFK6czlvzmlN2T4pqiNuZMD1TpmhqWsJ6h2iwd6c69Ps2Qcpg0QVloqfYlWoDXDqoXReEVYoDoXhjk7A2efisERV5548mctqWyJa4iP-Kmbr6UZZ1GfgEZlmOU2CxUc0SXcXn6nqbQtz~GLJTeKNLJVlq-s~g0exEIpqBv7KttrgB8UcU8bs8YuFZUw__",
      },
      {
        id: "03",
        name: "Suneel",
        profileUrl: "https://s3-alpha-sig.figma.com/img/a88c/de0f/b98dd881eb5b493cbae459a7ad8ce6ed?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZuQgu3xpZD8myjcLfpJkcUacgAo3DeQJ9fB8fkSr1bPbFTdfju2q5LALkBQ~S25X6~I1oxsWYFWtcOFECMRiSIoz~fq-WHIYXCNSQw0vgC-UTv6snDjsDu8UzudGj1CmfHbLhUf6L09igB~b2i-T0eXsP3eaubSQsQhC9rLyMPwyxUC9r4OTCIZ1wDKk3NxdZjx1KzEevvy1MKnDw9wbSKE7a9mNulwvmMWfEWSPFrPZiFdpR4-p0NoMj4cQAFySG-1cQvNeAOME8rcceEBL587xM95avNyPQXrULOWNqISNnyqA9DmcV4vYGsbJj1tfmG5OzQ2bJb1qxzPYbVFY0Q__",
      },
    ],
    interest: [],
    destination_members: []
  },
];

export const locations: ILocations[] = [
  {
    id: "1",
    flag: "https://s3-alpha-sig.figma.com/img/0628/ff32/1324cb4c46601f5c8f549738092d9582?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mvYDyymdAGLtQLBRyMk2JztcxaAfUOSn7R7MgngD1u~Koo9H-RDyXUXv-W2E~7E-OCfw3ypph8MINZxub3YksiOMSbjUa7JnDfx1mQusXb5FAzd8GZ29mmYLtHlOjNGHt5TIquyJ6MZ0LvoZ20AJrpMReQwUyo3ocDMga~eNqDAQnrua4wa4WG72sUdO58lrvZgZUkrq8ExxLtP512xkjYdsmxUDfaQ4nRv0kH7zGrgQ0eZsIxWSLABGZTTFs2OI0v1rSOUjP5hndWydkmd-b6bRaMjtc-t5tNHiE9eH1dM0oPbjmdPnW4~7~SaI~9QTaFG2Twzu3VsyvE2UmZZNwA__",
    name: "Miami",
    fullName: "Miami, FL - USA",
  },
  {
    id: "2",
    flag: "https://s3-alpha-sig.figma.com/img/0628/ff32/1324cb4c46601f5c8f549738092d9582?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mvYDyymdAGLtQLBRyMk2JztcxaAfUOSn7R7MgngD1u~Koo9H-RDyXUXv-W2E~7E-OCfw3ypph8MINZxub3YksiOMSbjUa7JnDfx1mQusXb5FAzd8GZ29mmYLtHlOjNGHt5TIquyJ6MZ0LvoZ20AJrpMReQwUyo3ocDMga~eNqDAQnrua4wa4WG72sUdO58lrvZgZUkrq8ExxLtP512xkjYdsmxUDfaQ4nRv0kH7zGrgQ0eZsIxWSLABGZTTFs2OI0v1rSOUjP5hndWydkmd-b6bRaMjtc-t5tNHiE9eH1dM0oPbjmdPnW4~7~SaI~9QTaFG2Twzu3VsyvE2UmZZNwA__",
    name: "Miami",
    fullName: "Miami, FL - USA",
  },
  {
    id: "3",
    flag: "https://s3-alpha-sig.figma.com/img/0628/ff32/1324cb4c46601f5c8f549738092d9582?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mvYDyymdAGLtQLBRyMk2JztcxaAfUOSn7R7MgngD1u~Koo9H-RDyXUXv-W2E~7E-OCfw3ypph8MINZxub3YksiOMSbjUa7JnDfx1mQusXb5FAzd8GZ29mmYLtHlOjNGHt5TIquyJ6MZ0LvoZ20AJrpMReQwUyo3ocDMga~eNqDAQnrua4wa4WG72sUdO58lrvZgZUkrq8ExxLtP512xkjYdsmxUDfaQ4nRv0kH7zGrgQ0eZsIxWSLABGZTTFs2OI0v1rSOUjP5hndWydkmd-b6bRaMjtc-t5tNHiE9eH1dM0oPbjmdPnW4~7~SaI~9QTaFG2Twzu3VsyvE2UmZZNwA__",
    name: "Miami",
    fullName: "Miami, FL - USA",
  },
  {
    id: "4",
    flag: "https://s3-alpha-sig.figma.com/img/0628/ff32/1324cb4c46601f5c8f549738092d9582?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mvYDyymdAGLtQLBRyMk2JztcxaAfUOSn7R7MgngD1u~Koo9H-RDyXUXv-W2E~7E-OCfw3ypph8MINZxub3YksiOMSbjUa7JnDfx1mQusXb5FAzd8GZ29mmYLtHlOjNGHt5TIquyJ6MZ0LvoZ20AJrpMReQwUyo3ocDMga~eNqDAQnrua4wa4WG72sUdO58lrvZgZUkrq8ExxLtP512xkjYdsmxUDfaQ4nRv0kH7zGrgQ0eZsIxWSLABGZTTFs2OI0v1rSOUjP5hndWydkmd-b6bRaMjtc-t5tNHiE9eH1dM0oPbjmdPnW4~7~SaI~9QTaFG2Twzu3VsyvE2UmZZNwA__",
    name: "Miami",
    fullName: "Miami, FL - USA",
  },
];

export const chats: IChats[] = [
  {
    id: "1",
    title: "Madrid in November",
    lastMessage: "Hey Guys. I am traveling to Madrid this Wednesday",
    isLastMessageRead: false,
    imageUrl:
      "https://i.pinimg.com/736x/75/56/b0/7556b0031ff82f5b7ed763416905a2c2.jpg",
    chatType: "Groups",
    lastMessageTime: new Date(),
    active: true,
  },
  {
    id: "2",
    title: "Hanging out in Barcelona Solo Trip",
    lastMessage: "Hey Guys. I am traveling to Madrid this Wednesday",
    isLastMessageRead: false,
    imageUrl:
      "https://i.pinimg.com/736x/ca/16/90/ca16905e274d030cf97e5667810612dc.jpg",
    chatType: "Groups",
    lastMessageTime: new Date(),
    active: false,
  },
  {
    id: "3",
    title: "Erlan Sadewa",
    lastMessage: "Hey sure I will be in town!",
    isLastMessageRead: true,
    imageUrl:
      "https://i.pinimg.com/736x/71/c4/70/71c47070122d9fb32b6f55b917afc6e5.jpg",
    chatType: "single",
    lastMessageTime: new Date(),
    active: true,
  },
  {
    id: "4",
    title: "Midala Huera",
    lastMessage: "Hey sure I will be in town!",
    isLastMessageRead: true,
    imageUrl:
      "https://i.pinimg.com/736x/67/ec/87/67ec875c42acdfcab757460abc00d3a6.jpg",
    chatType: "single",
    lastMessageTime: new Date(),
    active: false,
  },
  {
    id: "5",
    title: "Nafisa Gitari",
    lastMessage: "Hey sure I will be in town!",
    isLastMessageRead: true,
    imageUrl:
      "https://i.pinimg.com/736x/81/a1/33/81a1331ddad1f7e8cb159ade85d09ea7.jpg",
    chatType: "single",
    lastMessageTime: new Date(),
    active: true,
  },
];

export const socialsLinks: ISocialsLinks[] = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/",
    icon: <AntDesign name="instagram" size={15} color={COLORS.TEXT_COLOR} />,
  },
  {
    name: "Tiktok",
    // link: "https://www.tiktok.com/en/",
    icon: <MaterialIcons name="tiktok" size={15} color={COLORS.TEXT_COLOR} />,
  },
];

export const activities: activitiesTypes[] = [
  {
    title: "Track Training Session",
    date: new Date(),
    id: "1",
  },
  {
    title: "5K Charity Run",
    date: new Date(),
    id: "2",
  },
];


export const notifications: activitiesTypes[] = [
  {
    title: "Track Training Session",
    date: new Date(),
    id: "1",
  },
  {
    title: "5K Charity Run",
    date: new Date(),
    id: "2",
  },
  {
    title: "Track Training Session",
    date: new Date(),
    id: "3",
  },
  {
    title: "5K Charity Run",
    date: new Date(),
    id: "4",
  },
  {
    title: "Track Training Session",
    date: new Date(),
    id: "5",
  },
  {
    title: "5K Charity Run",
    date: new Date(),
    id: "6",
  },
  {
    title: "Track Training Session",
    date: new Date(),
    id: "7",
  },
  {
    title: "5K Charity Run",
    date: new Date(),
    id: "8",
  },
];
