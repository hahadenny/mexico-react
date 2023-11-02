import React, { useEffect } from "react";
import { Dialog, Box, Text } from "@mantine/core";
import { IconCheck, IconCircleCheckFilled } from "@tabler/icons-react";
//import { useSelector } from "react-redux";
import { Titles /*, Names*/ } from "../../../mapbox/titles";
import { PartyColors } from "../../../mapbox/colors";
import CandidateImgs from "../../../mapbox/candidates";
import CongressWinners from "../../../mapbox/congressWinners";
//import variables from "../../../_variables.scss";
import { FormattedMessage/*, useIntl*/ } from "react-intl";
import removeAccents from "remove-accents";

const RaceboardCong = ({ open, onClose, app }) => {
  //const year = useSelector((state) => state.year.value);
  //const intl = useIntl();

  let checkSize = 17;
  let checkStroke = 3;
  let partyBorderBottom = 8;
  if (window.screen.availWidth > 3000) {
    //checkSize = 60;
    //checkStroke = 3;
    partyBorderBottom = 16;
  }

  let showDistrictWinner = "none";
  if (app.raceboard.layer === "districts") {
    showDistrictWinner = "block";
  }

  const party1_imgs = app.raceboard.p1Party.split("-");
  const party2_imgs = app.raceboard.p2Party.split("-");
  const party3_imgs = app.raceboard.p3Party.split("-");
  const party4_imgs = app.raceboard.p4Party.split("-");
  
  const p1Party = app.raceboard.colorFirstPary ? app.raceboard.colorFirstPary : app.raceboard.p1Party;
  
  const runAfterRender = () => {
    if (document.getElementById("raceboardCheckBoxCong")) {
      document.getElementById("raceboardCheckBoxCong").style.height =
        document.getElementById("raceboardRow1Cong").offsetHeight + "px";
    }
  };
  
  useEffect(() => {
    runAfterRender();
  }, [app.raceboard.state, app.raceboard.mun]);

  return (
    <Dialog
      id={"raceboard"}
      className={"raceboard"}
      opened={open}
      withCloseButton
      onClose={onClose}
      radius="unset"
      position={{
        bottom: "0px",
        left: app.reverse ? "0px" : "auto",
        right: app.reverse ? "auto" : "0px"
      }}
      transition="slide-left"
      transitionDuration={20}
      sx={{
        width: "450px",
        height: "calc(100vh - 102px)",
        backgroundColor: "rgba(238,238,238,0.7)",
        backdropFilter: "blur(3px)",
        borderLeft: "solid 0px " + PartyColors[p1Party]?.high,
        padding: "0px !important",
        fontSize: "16px",
        color: "#111111"
      }}
      onLoad={runAfterRender}
    >
      <Box
        className={"raceboardTitleBox"}
        sx={{
          marginLeft: "5%",
          fontWeight: "bold",
          //borderBottom: "solid 3px #111",
          paddingBottom: "4px",
          marginBottom: "10px"
        }}
      >
        <Box
          className={"raceboardTitle"}
          sx={{
            fontSize: "39px",
            lineHeight: "39px",
            paddingBottom: "3px",
            paddingTop: "9px",
            textAlign: "center"
          }}
        >
          {app.raceboard.state || ""}
        </Box>
        <Box
          className={"raceboardSubtitle"}
          sx={{
            fontSize: "25px",
            lineHeight: "25px",
            paddingBottom: "3px",
            paddingTop: "0px",
            fontWeight: "normal",
            textAlign: "center"
          }}
        >
          {app.raceboard.mun || ""}
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        <Box
          className={"partyBox"}
          sx={{
            display: "flex",
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.8)",
            paddingTop: "0.6rem",
            marginBottom: "0.5rem"
          }}
        >
          <Box
            id={"raceboardCheckBoxCong"}
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "0px 0px 0px 0px",
              width: "3.5%",
              marginRight: "1%",
              backgroundColor:
                !app.raceboard.tie
                  ? PartyColors[p1Party]?.high
                  : "transparent",
              color: "#fff",
              fontWeight: "bold",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <IconCheck
              className={"raceCheckCong"}
              strokeWidth={checkStroke}
              size={checkSize}
              style={{ marginLeft: "0rem", display: !app.raceboard.tie ? "block" : "none" }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "95.5%" }}>
            <Box
              id={"raceboardRow1Cong"}
              className={"partySubBox"}
              sx={{
                display: "flex",
                borderBottom:
                  "solid " +
                  partyBorderBottom +
                  "px " +
                  PartyColors[p1Party]?.high,
                marginRight: "4%",
                paddingBottom: "0rem",
                marginBottom: "0.5rem"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "top",
                  width: "74%"
                }}
              >
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Box
                    className={"raceboardWinnerImgBox"}
                    sx={{
                      width: "27%",
                      marginRight: "3%",
                      display: CongressWinners[removeAccents(app.raceboard.p1Name.replaceAll(/\s/g,'')).toUpperCase() + '2021'] ? showDistrictWinner : 'none'
                    }}
                  >
                    <img
                      id={"raceboardImg1Cong"}
                      src={CongressWinners[removeAccents(app.raceboard.p1Name.replaceAll(/\s/g,'')).toUpperCase() + '2021'] ? CongressWinners[removeAccents(app.raceboard.p1Name.replaceAll(/\s/g,'')).toUpperCase() + '2021'] : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                      style={{ width: "100%", marginTop: "0.2rem", minWidth: "4.7rem" }}
                      alt=""
                    />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ width: "95%" }}>
                      <div
                        className={"racePartyName"}
                        style={{
                          color: PartyColors[p1Party]?.boardText || PartyColors[p1Party]?.high,
                          display: "inline-block",
                          width: "auto",
                          padding: "2px 7px 6px 0px",
                          marginLeft: "0px",
                          whiteSpace: "nowrap",
                          fontSize: "20px",
                          lineHeight: "25px",
                          fontWeight: "800"
                        }}
                      >
                        {app.raceboard.p1Party}
                      </div>
                    </Box>
                    <Box>
                      {party1_imgs.map((img, index) => {
                        return (
                          <img
                            key={index}
                            className={"raceboardImgCong"}
                            src={
                              CandidateImgs[img]
                                ? CandidateImgs[img]
                                : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                            }
                            style={{
                              width: "3rem",
                              height: "3rem",
                              marginRight: "0.5rem"
                            }}
                            alt=""
                          />
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
                <Box
                  className={"raceboardWinnerCong"}
                  sx={{
                    fontSize: "0.9rem",
                    marginTop: "0.4rem",
                    marginBottom: "0.3rem",
                    width: "100%",
                    display: showDistrictWinner
                  }}
                >
                  {app.raceboard.p1Name}                  
                  {app.raceboard.reelected === 1 && (
                  <IconCircleCheckFilled
                    className={"raceElectCheckCong"}
                    strokeWidth={9}
                    size={17}
                    style={{ position: "absolute", color: "green", marginLeft: "5px" }}
                  />)}
                </Box>
                <Box
                  className={"raceTitle"}
                  sx={{
                    marginTop: "0.2rem",
                    marginBottom: "10px",
                    fontSize: "12px",
                    color: "#777",
                    whiteSpace: "nowrap",
                    display: "none"
                  }}
                >
                  {Titles[app.raceboard.p1Name]
                    ? Titles[app.raceboard.p1Name]
                    : "Candidatura " + app.raceboard.p1Party}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  paddingLeft: "3%"
                }}
              >
                <Text
                  className={"percentNumCong"}
                  sx={{ fontSize: "4.5rem", marginTop: "-1rem" }}
                >
                  {(app.raceboard.p1Percent && app.raceboard.p1Percent < 10) ||
                  app.raceboard.p1Percent === 0
                    ? "\u00A0\u00A0"
                    : ""}
                  {app.raceboard.p1Percent || app.raceboard.p1Percent === 0
                    ? app.raceboard.p1Percent
                    : ""}
                  <span className={"percent"} style={{ fontSize: "1.6rem" }}>
                    {app.raceboard.p1Percent || app.raceboard.p1Percent === 0
                      ? "%"
                      : ""}
                  </span>
                </Text>
                <Text
                  className={"voteNum"}
                  sx={{
                    fontSize: "1rem",
                    marginTop: "-1.8rem",
                    width: "78%"
                  }}
                >
                  {(app.raceboard.p1Vote || app.raceboard.p1Vote === 0) && (
                    <FormattedMessage
                      id={"Votes2"}
                      values={{
                        votes: app.raceboard.p1Vote.toLocaleString('en')
                      }}
                    />
                  )}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          className={"partyBox"}
          sx={{
            display: "flex",
            flex: 1,
            marginTop: "2px",
            backgroundColor: "rgba(255,255,255,0.8)",
            paddingTop: "0.6rem",
            marginBottom: "0.5rem"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "4.5%",
              marginRight: "0%"
            }}
          ></Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "95.5%" }}>
            <Box
              className={"partySubBox"}
              sx={{
                display: "flex",
                borderBottom:
                  "solid " +
                  partyBorderBottom +
                  "px " +
                  PartyColors[app.raceboard.p2Party]?.high,
                marginRight: "4%",
                paddingBottom: "0rem",
                marginBottom: "0.5rem"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "top",
                  width: "74%"
                }}
              >
                <Box sx={{ width: "95%" }}>
                  <div
                    className={"racePartyName"}
                    style={{
                      color: PartyColors[app.raceboard.p2Party]?.boardText || PartyColors[app.raceboard.p2Party]?.high,
                      display: "inline-block",
                      width: "auto",
                      padding: "2px 7px 6px 0px",
                      marginLeft: "0px",
                      whiteSpace: "nowrap",
                      fontSize: "21px",
                      lineHeight: "25px",
                      fontWeight: "800"
                    }}
                  >
                    {app.raceboard.p2Party}
                  </div>
                </Box>
                <Box>
                  {party2_imgs.map((img, index) => {
                    return (
                      <img
                        key={index}
                        className={"raceboardImgCong"}
                        src={
                          CandidateImgs[img]
                            ? CandidateImgs[img]
                            : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                        }
                        style={{
                          width: "3rem",
                          height: "3rem",
                          marginRight: "0.5rem"
                        }}
                        alt=""
                      />
                    );
                  })}
                </Box>
                <Box
                  className={"raceTitle"}
                  sx={{
                    marginTop: "0.2rem",
                    marginBottom: "10px",
                    fontSize: "12px",
                    color: "#777",
                    whiteSpace: "nowrap",
                    display: "none"
                  }}
                >
                  {Titles[app.raceboard.p2Name]
                    ? Titles[app.raceboard.p2Name]
                    : "Candidatura " + app.raceboard.p2Party}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  paddingLeft: "3%"
                }}
              >
                <Text
                  className={"percentNumCong"}
                  sx={{ fontSize: "4.5rem", marginTop: "-1rem" }}
                >
                  {(app.raceboard.p2Percent && app.raceboard.p2Percent < 10) ||
                  app.raceboard.p2Percent === 0
                    ? "\u00A0\u00A0"
                    : ""}
                  {app.raceboard.p2Percent || app.raceboard.p2Percent === 0
                    ? app.raceboard.p2Percent
                    : ""}
                  <span className={"percent"} style={{ fontSize: "1.6rem" }}>
                    {app.raceboard.p2Percent || app.raceboard.p2Percent === 0
                      ? "%"
                      : ""}
                  </span>
                </Text>
                <Text
                  className={"voteNum"}
                  sx={{
                    fontSize: "1rem",
                    marginTop: "-1.8rem",
                    width: "78%"
                  }}
                >
                  {(app.raceboard.p2Vote || app.raceboard.p2Vote === 0) && (
                    <FormattedMessage
                      id={"Votes2"}
                      values={{
                        votes: app.raceboard.p2Vote.toLocaleString('en')
                      }}
                    />
                  )}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          className={"partyBox"}
          sx={{
            display: "flex",
            flex: 1,
            marginTop: "2px",
            backgroundColor: "rgba(255,255,255,0.8)",
            paddingTop: "0.6rem",
            marginBottom: "0.5rem"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "4.5%",
              marginRight: "0%"
            }}
          ></Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "95.5%" }}>
            <Box
              className={"partySubBox"}
              sx={{
                display: "flex",
                borderBottom:
                  "solid " +
                  partyBorderBottom +
                  "px " +
                  PartyColors[app.raceboard.p3Party]?.high,
                marginRight: "4%",
                paddingBottom: "0rem",
                marginBottom: "0.5rem"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "top",
                  width: "74%"
                }}
              >
                <Box sx={{ width: "95%" }}>
                  <div
                    className={"racePartyName"}
                    style={{
                      color: PartyColors[app.raceboard.p3Party]?.boardText || PartyColors[app.raceboard.p3Party]?.high,
                      display: "inline-block",
                      width: "auto",
                      padding: "2px 7px 6px 0px",
                      marginLeft: "0px",
                      whiteSpace: "nowrap",
                      fontSize: "21px",
                      lineHeight: "25px",
                      fontWeight: "800"
                    }}
                  >
                    {app.raceboard.p3Party}
                  </div>
                </Box>
                <Box>
                  {party3_imgs.map((img, index) => {
                    return (
                      <img
                        key={index}
                        className={"raceboardImgCong"}
                        src={
                          CandidateImgs[img]
                            ? CandidateImgs[img]
                            : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                        }
                        style={{
                          width: "3rem",
                          height: "3rem",
                          marginRight: "0.5rem"
                        }}
                        alt=""
                      />
                    );
                  })}
                </Box>
                <Box
                  className={"raceTitle"}
                  sx={{
                    marginTop: "0.2rem",
                    marginBottom: "10px",
                    fontSize: "12px",
                    color: "#777",
                    whiteSpace: "nowrap",
                    display: "none"
                  }}
                >
                  {Titles[app.raceboard.p3Name]
                    ? Titles[app.raceboard.p3Name]
                    : "Candidatura " + app.raceboard.p3Party}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  paddingLeft: "3%"
                }}
              >
                <Text
                  className={"percentNumCong"}
                  sx={{ fontSize: "4.5rem", marginTop: "-1rem" }}
                >
                  {(app.raceboard.p3Percent && app.raceboard.p3Percent < 10) ||
                  app.raceboard.p3Percent === 0
                    ? "\u00A0\u00A0"
                    : ""}
                  {app.raceboard.p3Percent || app.raceboard.p3Percent === 0
                    ? app.raceboard.p3Percent
                    : ""}
                  <span className={"percent"} style={{ fontSize: "1.6rem" }}>
                    {app.raceboard.p3Percent || app.raceboard.p3Percent === 0
                      ? "%"
                      : ""}
                  </span>
                </Text>
                <Text
                  className={"voteNum"}
                  sx={{
                    fontSize: "1rem",
                    marginTop: "-1.8rem",
                    width: "78%"
                  }}
                >
                  {(app.raceboard.p3Vote || app.raceboard.p3Vote === 0) && (
                    <FormattedMessage
                      id={"Votes2"}
                      values={{
                        votes: app.raceboard.p3Vote.toLocaleString('en')
                      }}
                    />
                  )}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          className={"partyBox"}
          sx={{
            display: "flex",
            flex: 1,
            marginTop: "2px",
            backgroundColor: "rgba(255,255,255,0.8)",
            paddingTop: "0.6rem",
            marginBottom: "0.5rem"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "4.5%",
              marginRight: "0%"
            }}
          ></Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "95.5%" }}>
            <Box
              className={"partySubBox party4SubBox"}
              sx={{
                display: "flex",
                borderBottom:
                  "solid " +
                  partyBorderBottom +
                  "px " +
                  PartyColors[app.raceboard.p4Party]?.high,
                marginRight: "4%",
                paddingBottom: "0rem",
                marginBottom: "0.5rem"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "top",
                  width: "74%"
                }}
              >
                <Box sx={{ width: "95%" }}>
                  <div
                    className={"racePartyName"}
                    style={{
                      color: PartyColors[app.raceboard.p4Party]?.boardText || PartyColors[app.raceboard.p4Party]?.high,
                      display: "inline-block",
                      width: "auto",
                      padding: "2px 7px 6px 0px",
                      marginLeft: "0px",
                      whiteSpace: "nowrap",
                      fontSize: "21px",
                      lineHeight: "25px",
                      fontWeight: "800"
                    }}
                  >
                    {app.raceboard.p4Party}
                  </div>
                </Box>
                <Box>
                  {party4_imgs.map((img, index) => {
                    return (
                      <img
                        key={index}
                        className={"raceboardImgCong"}
                        src={
                          CandidateImgs[img]
                            ? CandidateImgs[img]
                            : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                        }
                        style={{
                          width: "3rem",
                          height: "3rem",
                          marginRight: "0.5rem"
                        }}
                        alt=""
                      />
                    );
                  })}
                </Box>
                <Box
                  className={"raceTitle"}
                  sx={{
                    marginTop: "0.2rem",
                    marginBottom: "10px",
                    fontSize: "12px",
                    color: "#777",
                    whiteSpace: "nowrap",
                    display: "none"
                  }}
                >
                  {Titles[app.raceboard.p4Name]
                    ? Titles[app.raceboard.p4Name]
                    : "Candidatura " + app.raceboard.p4Party}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  paddingLeft: "3%"
                }}
              >
                <Text
                  className={"percentNumCong"}
                  sx={{ fontSize: "4.5rem", marginTop: "-1rem" }}
                >
                  {(app.raceboard.p4Percent && app.raceboard.p4Percent < 10) ||
                  app.raceboard.p4Percent === 0
                    ? "\u00A0\u00A0"
                    : ""}
                  {app.raceboard.p4Percent || app.raceboard.p4Percent === 0
                    ? app.raceboard.p4Percent
                    : ""}
                  <span className={"percent"} style={{ fontSize: "1.6rem" }}>
                    {app.raceboard.p4Percent || app.raceboard.p4Percent === 0
                      ? "%"
                      : ""}
                  </span>
                </Text>
                <Text
                  className={"voteNum"}
                  sx={{
                    fontSize: "1rem",
                    marginTop: "-1.8rem",
                    width: "78%"
                  }}
                >
                  {(app.raceboard.p4Vote || app.raceboard.p4Vote === 0) && (
                    <FormattedMessage
                      id={"Votes2"}
                      values={{
                        votes: app.raceboard.p4Vote.toLocaleString('en')
                      }}
                    />
                  )}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default RaceboardCong;
