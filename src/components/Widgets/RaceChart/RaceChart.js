import { useEffect, useState } from "react";
import Papa from 'papaparse';
import { Box, Text } from "@mantine/core";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { appSelector } from "../../../redux/app/selectors";
import RaceData from "../../../mapbox/racechart";
import { PartyColors } from "../../../mapbox/colors";

const RaceChart = () => {
  const app = useSelector(appSelector);
  const year = useSelector((state) => state.year.value);
  const raceType = useSelector((state) => state.raceType.value);
  const raceTypeTxt = {
    pres: "Presidential",
    gov: "Gubernational",
    cong: "Congressional"
  };
  const [party1, setParty1] = useState('');
  const [party2, setParty2] = useState('');
  const [party3, setParty3] = useState('');
  const [party4, setParty4] = useState('');
  const [partyPerc1, setPartyPerc1] = useState(0);
  const [partyPerc2, setPartyPerc2] = useState(0);
  const [partyPerc3, setPartyPerc3] = useState(0);
  //const [partyPerc4, setPartyPerc4] = useState(0);
  const [partySeat1, setPartySeat1] = useState(0);
  const [partySeat2, setPartySeat2] = useState(0);
  const [partySeat3, setPartySeat3] = useState(0);
  const [partySeat4, setPartySeat4] = useState(0);
  
  useEffect(() => {
    if (['pres', 'cong'].includes(raceType)) {
        Papa.parse(RaceData[raceType+year], {
          download: true,
          complete: function (input) {
            let records = input.data;
            if (raceType === 'cong') {
                records = records.sort(function(a, b) { return b[4] - a[4] });
                let other_seats = 0;
                records.forEach(function (data, i) {
                  if (i >= 4)
                    other_seats += parseInt(data[4]);
                });
                records.forEach(function (data, i) {
                  if (i === 1) {
                    setParty1(data[1]);          
                    setPartyPerc1(Math.round(data[3]));
                    setPartySeat1(data[4]);
                  }
                  else if (i === 2) {
                    setParty2(data[1]);       
                    setPartyPerc2(Math.round(data[3]));
                    setPartySeat2(data[4]);
                  }
                  else if (i === 3) {
                    setParty3(data[1]);
                    setPartyPerc3(Math.round(data[3]));
                    setPartySeat3(data[4]);
                  }
                  else if (i === 4) {
                    setParty4('OTHER');
                    //setPartyPerc4(Math.round(data[3]));
                    setPartySeat4(other_seats);
                  }
                });
            }
            else {
                records.forEach(function (data, i) {
                  if (i === 1) {
                    setParty1(data[2]);          
                    setPartyPerc1(Math.round(data[5]));
                    setPartySeat1(Math.round(data[5]));
                  }
                  else if (i === 2) {
                    setParty2(data[2]);       
                    setPartyPerc2(Math.round(data[5]));
                    setPartySeat2(Math.round(data[5]));
                  }
                  else if (i === 3) {
                    setParty3(data[2]);
                    setPartyPerc3(Math.round(data[5]));
                    setPartySeat3(Math.round(data[5]));
                  }
                  else if (i === 4) {
                    setParty4(data[2]);
                    //setPartyPerc4(Math.round(data[5]));
                    setPartySeat4(Math.round(data[5]));
                  }
                });
            }
          }
        });
    }
  }, [year, raceType]);
    
  return (
    <Box
      className={"raceChart"}
      style={{
        fontFmaily: "inherit",
        width: "calc(100% - 7.5% - 450px - 2.4%)",
        position: "absolute",
        left: app.reverse ? '450px' : '7.5%',
        bottom: "2.5rem",
        backgroundColor: "#fff",
        color: "#000",
        zIndex: "201",
        display: app.showRaceChart && ['pres', 'cong'].includes(raceType) ? 'flex' : 'none',
        flexDirection: "column",
        paddingLeft: "1.2%",
        paddingRight: "1.2%",
      }}
    >
        <Text
          className={"raceChartTitle"}
          sx={{            
            fontWeight: "bold",
            fontSize: "1.3rem",
            whiteSpace: "nowrap",
            marginTop: "0.4rem"
          }}
        >
          <FormattedMessage id={"TopTitle" + raceTypeTxt[raceType]} /> {year}
        </Text>
        <Box style={{ display: "flex", width: "100%" }}>
          <Box style={{ width: "calc("+partyPerc1+"% - 0.5%)", marginRight: "0.5%" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party1]?.high, fontSize: "1rem", overflow: "hidden", textOverflow: "ellipsis"}}>{party1}</Text>
          </Box>
          <Box style={{ width: "calc("+partyPerc2+"% - 0.5%)", marginRight: "0.5%" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party2]?.high, fontSize: "1rem", overflow: "hidden", textOverflow: "ellipsis"}}>{party2}</Text>
          </Box>
          <Box style={{ width: "calc("+partyPerc3+"% - 0.5%)", marginRight: "0.5%" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party3]?.high, fontSize: "1rem", overflow: "hidden", textOverflow: "ellipsis"}}>{party3}</Text>
          </Box>
          <Box style={{ width: "calc(100% - "+partyPerc1+"% - "+partyPerc2+"% - "+partyPerc3+"%)" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party4]?.high, fontSize: "1rem", overflow: "visible"/*, textOverflow: "ellipsis"*/}}>{party4.substring(0, 5)}</Text>
          </Box>
        </Box>
        <Box className={"raceChartBar"} style={{ display: "flex", width: "100%", marginBottom: "0.6rem" }}>
          <Box style={{ width: "calc("+partyPerc1+"% - 0.5%)", backgroundColor: PartyColors[party1]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: "white", margin: "0.1rem 0.5rem", fontSize: "1.3rem", overflow: "hidden", textOverflow: "ellipsis"}}>{partySeat1}{raceType === 'cong' ? '' : '%'}</Text>
          </Box>
          <Box style={{ width: "calc("+partyPerc2+"% - 0.5%)", backgroundColor: PartyColors[party2]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: "white", margin: "0.1rem 0.5rem", fontSize: "1.3rem", overflow: "hidden", textOverflow: "ellipsis"}}>{partySeat2}{raceType === 'cong' ? '' : '%'}</Text>
          </Box>
          <Box style={{ width: "calc("+partyPerc3+"% - 0.5%)", backgroundColor: PartyColors[party3]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: "white", margin: "0.1rem 0.5rem", fontSize: "1.3rem", overflow: "hidden", textOverflow: "ellipsis"}}>{partySeat3}{raceType === 'cong' ? '' : '%'}</Text>
          </Box>
          <Box style={{ width: "calc(100% - "+partyPerc1+"% - "+partyPerc2+"% - "+partyPerc3+"%)", backgroundColor: PartyColors[party4]?.high }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: "white", margin: "0.1rem 0.5rem", fontSize: "1.3rem", overflow: "visible"}}>{partySeat4}{raceType === 'cong' ? '' : '%'}</Text>
          </Box>
        </Box>
    </Box>
  );
};

export default RaceChart;