import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CalenderIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M5.25.833c.46 0 .834.374.834.834V2.5h5.833v-.833a.833.833 0 1 1 1.667 0v.854a4.167 4.167 0 0 1 3.75 4.146v7.5a4.167 4.167 0 0 1-4.167 4.167H4.834a4.167 4.167 0 0 1-4.167-4.167v-7.5a4.167 4.167 0 0 1 3.75-4.146v-.854c0-.46.373-.834.833-.834Zm-2.774 5h13.049a2.501 2.501 0 0 0-2.358-1.666H4.834a2.501 2.501 0 0 0-2.358 1.667ZM15.667 7.5H2.334v6.667a2.5 2.5 0 0 0 2.5 2.5h8.333a2.5 2.5 0 0 0 2.5-2.5V7.5ZM4 10c0-.46.373-.833.834-.833h8.333a.833.833 0 0 1 0 1.667H4.834A.833.833 0 0 1 4 10Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CalenderIcon;
