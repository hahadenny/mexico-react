import { Box, Text } from "@mantine/core";
import mx_logo from "../../../assets/img/mx_logo.png";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

const TopBar = () => {
  const year = useSelector((state) => state.year.value);
  const raceType = useSelector((state) => state.raceType.value);
  const raceTypeTxt = {
    pres: "Presidential",
    gov: "Gubernational",
    cong: "Congressional"
  };

  return (
    <Box
      className={"topBar"}
      style={{
        fontFmaily: "inherit",
        width: "100%",
        display: "flex",
        position: "absolute",
        left: "0px",
        top: "0px",
        backgroundColor: "#fff",
        color: "#000",
        zIndex: "201",
        //maxHeight: "10%"
      }}
    >
      <Box style={{ backgroundColor: "#D0CCCB" }}>
        <img
          className={"topLogo"}
          style={{ height: "100%", maxWidth: "171px" }}
          src={mx_logo}
          alt="MX Election 2023"
        />
      </Box>
      <Box
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Text
          className={"topTitleText"}
          sx={{
            marginLeft: "1%",
            fontWeight: "bold",
            fontSize: "4rem",
            whiteSpace: "nowrap"
          }}
        >
          {/*<FormattedMessage id="topTitle" values={{raceType: raceTypeTxt[raceType]}} />*/}
          <FormattedMessage id={"TopTitle" + raceTypeTxt[raceType]} /> {year}
        </Text>
      </Box>
    </Box>
  );
};

export default TopBar;
