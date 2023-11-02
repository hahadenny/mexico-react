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
  
  let raceboardWidth = '450px';
  if (window.screen.availWidth > 3000) {
    raceboardWidth = '1000px';
  }
  
  const [party1, setParty1] = useState('');
  const [party2, setParty2] = useState('');
  const [party3, setParty3] = useState('');
  const [party4, setParty4] = useState('');  
  const [party5, setParty5] = useState('');  
  const [party6, setParty6] = useState('');  
  const [party7, setParty7] = useState('');  
  const [party8, setParty8] = useState('');  
  const [party9, setParty9] = useState('');  
  const [party10, setParty10] = useState('');  
  const [party11, setParty11] = useState('');  
  const [partyPerc1, setPartyPerc1] = useState(0);
  const [partyPerc2, setPartyPerc2] = useState(0);
  const [partyPerc3, setPartyPerc3] = useState(0);
  const [partyPerc4, setPartyPerc4] = useState(0);
  const [partyPerc5, setPartyPerc5] = useState(0);
  const [partyPerc6, setPartyPerc6] = useState(0);
  const [partyPerc7, setPartyPerc7] = useState(0);
  const [partyPerc8, setPartyPerc8] = useState(0);
  const [partyPerc9, setPartyPerc9] = useState(0);
  const [partyPerc10, setPartyPerc10] = useState(0);
  const [partyPerc11, setPartyPerc11] = useState(0);
  const [congParty1, setCongParty1] = useState('');
  const [congParty2, setCongParty2] = useState('');
  const [congParty3, setCongParty3] = useState('');
  const [congParty4, setCongParty4] = useState('');
  const [congParty5, setCongParty5] = useState('');
  const [congParty6, setCongParty6] = useState('');
  const [congParty7, setCongParty7] = useState('');
  const [congParty8, setCongParty8] = useState('');
  const [congParty9, setCongParty9] = useState('');
  const [congParty10, setCongParty10] = useState('');
  const [congParty11, setCongParty11] = useState('');
  const [congPartyPerc1, setCongPartyPerc1] = useState(0);
  const [congPartyPerc2, setCongPartyPerc2] = useState(0);
  const [congPartyPerc3, setCongPartyPerc3] = useState(0);
  const [congPartyPerc4, setCongPartyPerc4] = useState(0);
  const [congPartyPerc5, setCongPartyPerc5] = useState(0);
  const [congPartyPerc6, setCongPartyPerc6] = useState(0);
  const [congPartyPerc7, setCongPartyPerc7] = useState(0);
  const [congPartyPerc8, setCongPartyPerc8] = useState(0);
  const [congPartyPerc9, setCongPartyPerc9] = useState(0);
  const [congPartyPerc10, setCongPartyPerc10] = useState(0);
  const [congPartyPerc11, setCongPartyPerc11] = useState(0);
  const [congPartySeat1, setCongPartySeat1] = useState(0);
  const [congPartySeat2, setCongPartySeat2] = useState(0);
  const [congPartySeat3, setCongPartySeat3] = useState(0);
  const [congPartySeat4, setCongPartySeat4] = useState(0);
  const [congPartySeat5, setCongPartySeat5] = useState(0);
  const [congPartySeat6, setCongPartySeat6] = useState(0);
  const [congPartySeat7, setCongPartySeat7] = useState(0);
  const [congPartySeat8, setCongPartySeat8] = useState(0);
  const [congPartySeat9, setCongPartySeat9] = useState(0);
  const [congPartySeat10, setCongPartySeat10] = useState(0);
  const [congPartySeat11, setCongPartySeat11] = useState(0);
  
  useEffect(() => {
    if (['pres', 'cong'].includes(raceType)) {     
        setParty5('');
        setPartyPerc5(0);
        setCongParty5('');
        setCongPartyPerc5(0);
        setCongPartySeat5(0);    
        setParty6('');
        setPartyPerc6(0);
        setCongParty6('');
        setCongPartyPerc6(0);
        setCongPartySeat6(0);
        setParty7('');
        setPartyPerc7(0);
        setCongParty7('');
        setCongPartyPerc7(0);
        setCongPartySeat7(0);
        setParty8('');
        setPartyPerc8(0);
        setCongParty8('');
        setCongPartyPerc8(0);
        setCongPartySeat8(0);
        setParty9('');
        setPartyPerc9(0);
        setCongParty9('');
        setCongPartyPerc9(0);
        setCongPartySeat9(0);
        setParty10('');
        setPartyPerc10(0);
        setCongParty10('');
        setCongPartyPerc10(0);
        setCongPartySeat10(0);
        setParty11('');
        setPartyPerc11(0);
        setCongParty11('');
        setCongPartyPerc11(0);
        setCongPartySeat11(0);
        
        if (raceType === 'pres') {
            Papa.parse(RaceData['pres'+year], {
              download: true,
              complete: function (input) {
                let records = input.data;
                records.forEach(function (data, i) {
                  if (i === 1) {
                    setParty1(data[2]);          
                    setPartyPerc1(Math.round(data[5]));
                  }
                  else if (i === 2) {
                    setParty2(data[2]);       
                    setPartyPerc2(Math.round(data[5]));
                  }
                  else if (i === 3) {
                    setParty3(data[2]);
                    setPartyPerc3(Math.round(data[5]));
                  }
                  else if (i === 4) {
                    setParty4(data[2]);
                    setPartyPerc4(Math.round(data[5]));
                  }
                });
              }
            });
        }
        
        Papa.parse(RaceData['cong'+year], {
          download: true,
          complete: function (input) {
            let records = input.data;
            const seatRecords = records.sort(function(a, b) { 
                                  if (b[4] === a[4])
                                    return b[3] - a[3] 
                                  else
                                    return b[4] - a[4] 
                                });            
            /*let other_seats = 0;
            records.forEach(function (data, i) {
              if (i >= 4)
                other_seats += parseInt(data[4]);
            });*/
            seatRecords.forEach(function (data, i) {
              if (i === 1) {
                setCongParty1(data[1]);          
                setCongPartyPerc1(Math.round(data[3]));
                setCongPartySeat1(data[4]);
              }
              else if (i === 2) {
                setCongParty2(data[1]);       
                setCongPartyPerc2(Math.round(data[3]));
                setCongPartySeat2(data[4]);
              }
              else if (i === 3) {
                setCongParty3(data[1]);
                setCongPartyPerc3(Math.round(data[3]));
                setCongPartySeat3(data[4]);
              }
              else if (i === 4) {
                setCongParty4(data[1]);
                setCongPartyPerc4(Math.round(data[3]));
                setCongPartySeat4(data[4]);
              }
              else if (i === 5) {
                setCongParty5(data[1]);
                setCongPartyPerc5(Math.round(data[3]));
                setCongPartySeat5(data[4]);
              }
              else if (i === 6) {
                setCongParty6(data[1]);
                setCongPartyPerc6(Math.round(data[3]));
                setCongPartySeat6(data[4]);
              }
              else if (i === 7) {
                setCongParty7(data[1]);
                setCongPartyPerc7(Math.round(data[3]));
                setCongPartySeat7(data[4]);
              }
              else if (i === 8) {
                setCongParty8(data[1]);
                setCongPartyPerc8(Math.round(data[3]));
                setCongPartySeat8(data[4]);
              }
              else if (i === 9) {
                setCongParty9(data[1]);
                setCongPartyPerc9(Math.round(data[3]));
                setCongPartySeat9(data[4]);
              }
              else if (i === 10) {
                setCongParty10(data[1]);
                setCongPartyPerc10(Math.round(data[3]));
                setCongPartySeat10(data[4]);
              }
              else if (i === 11) {
                setCongParty11(data[1]);
                setCongPartyPerc11(Math.round(data[3]));
                setCongPartySeat11(data[4]);
              }
            });
            
            if (raceType === 'cong') {
                const percRecords = records.sort(function(a, b) { 
                                      if (b[3] === '-') 
                                        b[3] = 0; 
                                      if (a[3] === '-') 
                                        a[3] = 0; 
                                      return b[3] - a[3] 
                                    });
                percRecords.forEach(function (data, i) {
                  if (i === 1) {
                      setParty1(data[1]); 
                      setPartyPerc1(Math.round(data[3]));
                  }
                  else if (i === 2) {
                      setParty2(data[1]); 
                      setPartyPerc2(Math.round(data[3]));
                  }
                  else if (i === 3) {
                      setParty3(data[1]); 
                      setPartyPerc3(Math.round(data[3]));
                  }
                  else if (i === 4) {
                      setParty4(data[1]); 
                      setPartyPerc4(Math.round(data[3]));
                  }
                  else if (i === 5) {
                      setParty5(data[1]); 
                      setPartyPerc5(Math.round(data[3]) ? Math.round(data[3]) : 0);
                  }
                  else if (i === 6) {
                      setParty6(data[1]); 
                      setPartyPerc6(Math.round(data[3]) ? Math.round(data[3]) : 0);
                  }
                  else if (i === 7) {
                      setParty7(data[1]); 
                      setPartyPerc7(Math.round(data[3]) ? Math.round(data[3]) : 0);
                  }
                  else if (i === 8) {
                      setParty8(data[1]); 
                      setPartyPerc8(Math.round(data[3]) ? Math.round(data[3]) : 0);
                  }
                  else if (i === 9) {
                      setParty9(data[1]); 
                      setPartyPerc9(Math.round(data[3]) ? Math.round(data[3]) : 0);
                  }
                  else if (i === 10) {
                      setParty10(data[1]); 
                      setPartyPerc10(Math.round(data[3]) ? Math.round(data[3]) : 0);
                  }
                  else if (i === 11) {
                      setParty11(data[1]); 
                      setPartyPerc11(Math.round(data[3]) ? Math.round(data[3]) : 0);
                  }
                });
            }
          }
        });
    }
  }, [year, raceType]);
  
  useEffect(() => {
      if (!app.showRaceboard) {
        setTimeout(
          () =>
            document.getElementById("racechart").classList.add("board-opened"),
          0
        );
      }
      else {
          setTimeout(
          () =>
            document.getElementById("racechart").classList.remove("board-opened"),
          0
        );
      }
  }, [app.showRaceboard]);
    
  return (
    <Box
      id={"racechart"}
      className={"raceChart"}
      style={{
        fontFmaily: "inherit",
        width: "calc(100% - 7.5% - " + raceboardWidth + " - 2%)",
        position: "absolute",
        left: app.reverse ? (app.showRaceboard ? raceboardWidth : '0px') : '7.5%',
        bottom: "2.5rem",
        backgroundColor: "#fff",
        color: "#000",
        zIndex: "201",
        display: app.showRaceChart && ['pres', 'cong'].includes(raceType) ? 'flex' : 'none',
        paddingLeft: "1%",
        paddingRight: "1%",
      }}
    >
      <Box style={{display: ['pres', 'cong'].includes(raceType) ? "flex" : "none", flexDirection: "column", width: "48%", paddingRight: "2%", borderRight: "solid 3px #999", boxShadow: "6px 0 5px -2px #ccc"}}>
        <Text
          className={"raceChartTitle"}
          sx={{            
            fontWeight: "bold",
            fontSize: "1.3rem",
            whiteSpace: "nowrap",
            marginTop: "0.4rem",
            marginBottom: "0.3rem"
          }}
        >
          <FormattedMessage id={raceType === 'cong' ? 'ValidVote' : "TopTitle" + raceTypeTxt[raceType]} /> {year}
        </Text>
        <Box style={{ display: "flex", width: "100%" }}>
          <Box style={{ width: "calc("+partyPerc1+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party1]?.boardText || PartyColors[party1]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{party1}</Text>
          </Box>
          <Box style={{ width: "calc("+partyPerc2+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party2]?.boardText || PartyColors[party2]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{party2}</Text>
          </Box>
          <Box style={{ width: "calc("+partyPerc3+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party3]?.boardText || PartyColors[party3]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{party3}</Text>
          </Box>
          <Box style={{ width: "calc("+partyPerc4+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party4]?.boardText || PartyColors[party4]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"/*, textOverflow: "ellipsis"*/}}>{party4.substring(0, 5)}</Text>
          </Box>
          {party5 && (<Box style={{ width: "calc("+partyPerc5+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party5]?.boardText || PartyColors[party5]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"}}>{party5.substring(0, 5)}</Text>
          </Box>)}
          {party6 && (<Box style={{ width: "calc("+partyPerc6+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party6]?.boardText || PartyColors[party6]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"}}>{party6.substring(0, 5)}</Text>
          </Box>)}
          {party7 && (<Box style={{ width: "calc("+partyPerc7+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party7]?.boardText || PartyColors[party7]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"}}>{party7.substring(0, 5)}</Text>
          </Box>)}
          {party8 && (<Box style={{ width: "calc("+partyPerc8+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party8]?.boardText || PartyColors[party8]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"}}>{party8.substring(0, 5)}</Text>
          </Box>)}
          {party9 && (<Box style={{ width: "calc("+partyPerc9+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party9]?.boardText || PartyColors[party9]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"}}>{party9.substring(0, 5)}</Text>
          </Box>)}
          {party10 && (<Box style={{ width: "calc("+partyPerc10+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party10]?.boardText || PartyColors[party10]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"}}>{party10.substring(0, 5)}</Text>
          </Box>)}
          {party11 && (<Box style={{ width: "calc("+partyPerc11+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[party11]?.boardText || PartyColors[party11]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"}}>{party11.substring(0, 5)}</Text>
          </Box>)}
        </Box>
        <Box className={"raceChartBar"} style={{ display: "flex", width: "100%", marginBottom: "0.6rem" }}>
          <Box style={{ width: "calc("+partyPerc1+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[party1]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[party1]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem"/*, overflow: "hidden", textOverflow: "ellipsis"*/}}>{partyPerc1}%</Text>
          </Box>
          <Box style={{ width: "calc("+partyPerc2+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[party2]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[party2]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem"/*, overflow: "hidden", textOverflow: "ellipsis"*/}}>{partyPerc2}%</Text>
          </Box>
          <Box style={{ width: "calc("+partyPerc3+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[party3]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[party3]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem"/*, overflow: "hidden", textOverflow: "ellipsis"*/}}>{partyPerc3}%</Text>
          </Box>
          <Box style={{ width: "calc("+partyPerc4+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[party4]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[party4]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{partyPerc4}%</Text>
          </Box>
          {party5 && (<Box style={{ width: "calc("+partyPerc5+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[party5]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[party5]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{partyPerc5}%</Text>
          </Box>)}
          {party6 && (<Box style={{ width: "calc("+partyPerc6+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[party6]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[party6]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{partyPerc6}%</Text>
          </Box>)}
          {party7 && (<Box style={{ width: "calc("+partyPerc7+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[party7]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[party7]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{partyPerc7}%</Text>
          </Box>)}
          {party8 && (<Box style={{ width: "calc("+partyPerc8+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[party8]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[party8]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{partyPerc8}%</Text>
          </Box>)}
          {party9 && (<Box style={{ width: "calc("+partyPerc9+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[party9]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[party9]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{partyPerc9}%</Text>
          </Box>)}
          {party10 && (<Box style={{ width: "calc("+partyPerc10+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[party10]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[party10]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{partyPerc10}%</Text>
          </Box>)}
          {party11 && (<Box style={{ width: "calc("+partyPerc11+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[party11]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[party11]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{partyPerc11}%</Text>
          </Box>)}
        </Box>
      </Box>
      <Box style={{display: "flex", flexDirection: "column", width: ['pres', 'cong'].includes(raceType) ? "48%" : "100%", marginLeft: ['pres', 'cong'].includes(raceType) ? "2%" : "0%", marginRight: "0%"}}>
        <Text
          className={"raceChartTitle"}
          sx={{            
            fontWeight: "bold",
            fontSize: "1.3rem",
            whiteSpace: "nowrap",
            marginTop: "0.4rem",
            marginBottom: "0.3rem"
          }}
        >
          <FormattedMessage id={raceType === 'cong' ? 'Seats' : "TopTitle" + raceTypeTxt['cong']} /> {year}
        </Text>
        <Box style={{ display: "flex", width: "100%" }}>
          <Box style={{ width: "calc("+congPartyPerc1+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[congParty1]?.boardText || PartyColors[congParty1]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{congParty1}</Text>
          </Box>
          <Box style={{ width: "calc("+congPartyPerc2+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[congParty2]?.boardText || PartyColors[congParty2]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{congParty2}</Text>
          </Box>
          <Box style={{ width: "calc("+congPartyPerc3+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[congParty3]?.boardText || PartyColors[congParty3]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{congParty3}</Text>
          </Box>
          <Box style={{ width: "calc("+congPartyPerc4+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[congParty4]?.boardText || PartyColors[congParty4]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"/*, textOverflow: "ellipsis"*/}}>{congParty4.substring(0, 5)}</Text>
          </Box>
          {congParty5 && (<Box style={{ width: "calc("+congPartyPerc5+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[congParty5]?.boardText || PartyColors[congParty5]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"/*, textOverflow: "ellipsis"*/}}>{congParty5.substring(0, 5)}</Text>
          </Box>)}
          {congParty6 && (<Box style={{ width: "calc("+congPartyPerc6+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[congParty6]?.boardText || PartyColors[congParty6]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"/*, textOverflow: "ellipsis"*/}}>{congParty6.substring(0, 5)}</Text>
          </Box>)}
          {congParty7 && (<Box style={{ width: "calc("+congPartyPerc7+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[congParty7]?.boardText || PartyColors[congParty7]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"/*, textOverflow: "ellipsis"*/}}>{congParty7.substring(0, 5)}</Text>
          </Box>)}
          {congParty8 && (<Box style={{ width: "calc("+congPartyPerc8+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[congParty8]?.boardText || PartyColors[congParty8]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"/*, textOverflow: "ellipsis"*/}}>{congParty8.substring(0, 5)}</Text>
          </Box>)}
          {congParty9 && (<Box style={{ width: "calc("+congPartyPerc9+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[congParty9]?.boardText || PartyColors[congParty9]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"/*, textOverflow: "ellipsis"*/}}>{congParty9.substring(0, 5)}</Text>
          </Box>)}
          {congParty10 && (<Box style={{ width: "calc("+congPartyPerc10+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[congParty10]?.boardText || PartyColors[congParty10]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"/*, textOverflow: "ellipsis"*/}}>{congParty10.substring(0, 5)}</Text>
          </Box>)}
          {congParty11 && (<Box style={{ width: "calc("+congPartyPerc11+"% - 0.5%)", minWidth: "8%", marginRight: "0.5%", display: "flex", alignItems: "end" }}>
            <Text className={"raceChartParty"} sx={{fontWeight: "bold", color: PartyColors[congParty11]?.boardText || PartyColors[congParty11]?.high, fontSize: "0.8rem", lineHeight: "1.55", overflow: "visible"/*, textOverflow: "ellipsis"*/}}>{congParty11.substring(0, 5)}</Text>
          </Box>)}
        </Box>
        <Box className={"raceChartBar"} style={{ display: "flex", width: "100%", marginBottom: "0.6rem" }}>
          <Box style={{ width: "calc("+congPartyPerc1+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[congParty1]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[congParty1]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem"/*, overflow: "hidden", textOverflow: "ellipsis"*/}}>{congPartySeat1}</Text>
          </Box>
          <Box style={{ width: "calc("+congPartyPerc2+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[congParty2]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[congParty2]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem"/*, overflow: "hidden", textOverflow: "ellipsis"*/}}>{congPartySeat2}</Text>
          </Box>
          <Box style={{ width: "calc("+congPartyPerc3+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[congParty3]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[congParty3]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem"/*, overflow: "hidden", textOverflow: "ellipsis"*/}}>{congPartySeat3}</Text>
          </Box>
          <Box style={{ width: "calc("+congPartyPerc4+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[congParty4]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[congParty4]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{congPartySeat4}</Text>
          </Box>
          {congParty5 && (<Box style={{ width: "calc("+congPartyPerc5+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[congParty5]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[congParty5]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{congPartySeat5}</Text>
          </Box>)}
          {congParty6 && (<Box style={{ width: "calc("+congPartyPerc6+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[congParty6]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[congParty6]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{congPartySeat6}</Text>
          </Box>)}
          {congParty7 && (<Box style={{ width: "calc("+congPartyPerc7+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[congParty7]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[congParty7]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{congPartySeat7}</Text>
          </Box>)}
          {congParty8 && (<Box style={{ width: "calc("+congPartyPerc8+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[congParty8]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[congParty8]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{congPartySeat8}</Text>
          </Box>)}
          {congParty9 && (<Box style={{ width: "calc("+congPartyPerc9+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[congParty9]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[congParty9]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{congPartySeat9}</Text>
          </Box>)}
          {congParty10 && (<Box style={{ width: "calc("+congPartyPerc10+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[congParty10]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[congParty10]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{congPartySeat10}</Text>
          </Box>)}
          {congParty11 && (<Box style={{ width: "calc("+congPartyPerc11+"% - 0.5%)", minWidth: "8%", backgroundColor: PartyColors[congParty11]?.high, marginRight: "0.5%" }}>
            <Text className={"raceChartNum"} sx={{fontWeight: "bold", color: PartyColors[congParty11]?.contrast || "white", margin: "0.1rem 0.5rem", fontSize: "1.2rem", overflow: "visible"}}>{congPartySeat11}</Text>
          </Box>)}
        </Box>
      </Box>
    </Box>
  );
};

export default RaceChart;