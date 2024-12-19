import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SearchIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      fillOpacity={0.6}
      d="M6.534 12.945a6.555 6.555 0 0 0 3.798-1.212l4.028 3.99a.974.974 0 0 0 .697.277c.552 0 .943-.42.943-.96a.91.91 0 0 0-.272-.673l-4.002-3.973a6.407 6.407 0 0 0 1.342-3.922c0-3.56-2.94-6.472-6.534-6.472C2.948 0 0 2.904 0 6.472c0 3.56 2.94 6.473 6.534 6.473Zm0-1.397c-2.804 0-5.123-2.298-5.123-5.076 0-2.777 2.32-5.075 5.123-5.075 2.804 0 5.124 2.298 5.124 5.075 0 2.778-2.32 5.076-5.124 5.076Z"
    />
  </Svg>
);
export default SearchIcon;
