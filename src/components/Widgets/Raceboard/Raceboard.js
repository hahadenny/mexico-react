import React from "react";
import { Dialog, Box, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Titles, Names } from "../../../mapbox/titles";
import { PartyColors } from "../../../mapbox/colors";
import CandidateImgs from "../../../mapbox/candidates";
import variables from "../../../_variables.scss";
import { FormattedMessage, useIntl } from "react-intl";

const Raceboard = ({ open, onClose, app }) => {
  const year = useSelector((state) => state.year.value);
  const intl = useIntl();

  let checkSize = 30;
  let checkStroke = 3;
  let partyBorderLeft = 3;
  if (window.screen.availWidth > 3000) {
    //checkSize = 60;
    //checkStroke = 3;
    partyBorderLeft = 9;
  }

  const runAfterRender = () => {
    if (document.getElementById("raceboardImg1")) {
      document.getElementById("raceboardCheckBox").style.height =
        document.getElementById("raceboardImg1").height + "px";
    }
  };

  return (
    <Dialog
      id={"raceboard"}
      className={"raceboard"}
      opened={open}
      withCloseButton
      onClose={onClose}
      radius="unset"
      position={{ bottom: "0px", right: "0px" }}
      transition="slide-up"
      sx={{
        width: "510px",
        height: "calc(100vh - 102px)",
        backgroundColor: "rgba(238,238,238,0.7)",
        backdropFilter: "blur(3px)",
        borderLeft: "solid 6px " + variables.primaryHex,
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
          borderBottom: "solid 3px #111",
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
            paddingTop: "9px"
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
            fontWeight: "normal"
          }}
        >
          {app.raceboard.mun || app.raceboard.mun}
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        <Box className={"partyBox"} sx={{ display: "flex", flex: 1 }}>
          <Box
            id={"raceboardCheckBox"}
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "0px 0px 0px 0px",
              width: "5%",
              marginRight: "0%",
              backgroundColor: variables.primaryHex,
              color: "#fff",
              fontWeight: "bold",
              justifyContent: "center",
              alignItems: "left"
            }}
          >
            <IconCheck
              className={"raceCheck"}
              strokeWidth={checkStroke}
              size={checkSize}
              style={{ marginLeft: "-6px" }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "95%" }}>
            <Box
              className={"partySubBox"}
              sx={{
                display: "flex",
                borderBottom: "solid 1px #111",
                marginRight: "4%",
                paddingBottom: "5px",
                marginBottom: "5px"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "top",
                  width: "24%"
                }}
              >
                <img
                  id={"raceboardImg1"}
                  src={
                    CandidateImgs[
                      app.raceboard.p1Party?.replaceAll("-", "") + year
                    ]
                  }
                  style={{ width: "100%" }}
                  alt=""
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "0.5%",
                  width: "48%",
                  marginTop: "0px",
                  fontWeight: "bold"
                }}
              >
                <Box sx={{ width: "95%" }}>
                  <div
                    className={"racePartyName"}
                    style={{
                      backgroundColor: PartyColors[app.raceboard.p1Party]?.high,
                      color: "#fff",
                      display: "inline-block",
                      width: "auto",
                      padding: "2px 7px 3px 6px",
                      marginLeft: "0px",
                      fontSize: "30px",
                      lineHeight: "25px"
                    }}
                  >
                    {app.raceboard.p1Party}
                  </div>
                </Box>
                <Box
                  className={"raceCandBox"}
                  sx={{
                    paddingTop: "15px",
                    paddingLeft: "5px",
                    borderLeft:
                      "solid " +
                      partyBorderLeft +
                      "px " +
                      (PartyColors[app.raceboard.p1Party]
                        ? PartyColors[app.raceboard.p1Party].high
                        : "#111111")
                  }}
                >
                  <Box
                    className={"raceName"}
                    sx={{ height: "120px", fontSize: "20px", width: "84%" }}
                  >
                    {Names[app.raceboard.p1Name]
                      ? Names[app.raceboard.p1Name]
                      : app.raceboard.p1Name}
                  </Box>
                  <Box
                    className={"raceTitle"}
                    sx={{
                      marginTop: "0px",
                      marginBottom: "10px",
                      fontSize: "12px",
                      color: "#777"
                    }}
                  >
                    {Titles[app.raceboard.p1Name]
                      ? Titles[app.raceboard.p1Name]
                      : "Candidatura " + app.raceboard.p1Party}
                  </Box>
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
                <Text className={"percentNum"} sx={{ fontSize: "80px" }}>
                  {(app.raceboard.p1Percent && app.raceboard.p1Percent < 10) ||
                  app.raceboard.p1Percent === 0
                    ? "\u00A0\u00A0"
                    : ""}
                  {app.raceboard.p1Percent || app.raceboard.p1Percent === 0
                    ? app.raceboard.p1Percent
                    : ""}
                  <span className={"percent"} style={{ fontSize: "25px" }}>
                    {app.raceboard.p1Percent || app.raceboard.p1Percent === 0
                      ? "%"
                      : ""}
                  </span>
                </Text>
                <Text
                  className={"voteNum"}
                  sx={{
                    fontSize: "20px",
                    marginTop: "-18px",
                    marginRight: "23px"
                  }}
                >
                  {(app.raceboard.p1Vote || app.raceboard.p1Vote === 0) && (
                    <FormattedMessage
                      id={"Votes2"}
                      values={{
                        votes: app.raceboard.p1Vote.toLocaleString(intl.locale)
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
          sx={{ display: "flex", flex: 1, marginTop: "2px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "5%",
              marginRight: "0%"
            }}
          ></Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "95%" }}>
            <Box
              className={"partySubBox"}
              sx={{
                display: "flex",
                borderBottom: "solid 1px #111",
                marginRight: "4%",
                paddingBottom: "5px",
                marginBottom: "5px"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "top",
                  width: "24%"
                }}
              >
                <img
                  src={
                    CandidateImgs[
                      app.raceboard.p2Party?.replaceAll("-", "") + year
                    ]
                  }
                  style={{ width: "100%" }}
                  alt=""
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "0.5%",
                  width: "48%",
                  marginTop: "0px",
                  fontWeight: "bold"
                }}
              >
                <Box sx={{ width: "95%" }}>
                  <div
                    className={"racePartyName"}
                    style={{
                      backgroundColor: PartyColors[app.raceboard.p2Party]?.high,
                      color: "#fff",
                      display: "inline-block",
                      width: "auto",
                      padding: "2px 7px 3px 6px",
                      marginLeft: "0px",
                      fontSize: "30px",
                      lineHeight: "25px"
                    }}
                  >
                    {app.raceboard.p2Party}
                  </div>
                </Box>
                <Box
                  className={"raceCandBox"}
                  sx={{
                    paddingTop: "15px",
                    paddingLeft: "5px",
                    borderLeft:
                      "solid " +
                      partyBorderLeft +
                      "px " +
                      (PartyColors[app.raceboard.p2Party]
                        ? PartyColors[app.raceboard.p2Party].high
                        : "#111111")
                  }}
                >
                  <Box
                    className={"raceName"}
                    sx={{ height: "120px", fontSize: "20px", width: "84%" }}
                  >
                    {Names[app.raceboard.p2Name]
                      ? Names[app.raceboard.p2Name]
                      : app.raceboard.p2Name}
                  </Box>
                  <Box
                    className={"raceTitle"}
                    sx={{
                      marginTop: "0px",
                      marginBottom: "10px",
                      fontSize: "12px",
                      color: "#777"
                    }}
                  >
                    {Titles[app.raceboard.p2Name]
                      ? Titles[app.raceboard.p2Name]
                      : "Candidatura " + app.raceboard.p2Party}
                  </Box>
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
                <Text className={"percentNum"} sx={{ fontSize: "80px" }}>
                  {(app.raceboard.p2Percent && app.raceboard.p2Percent < 10) ||
                  app.raceboard.p2Percent === 0
                    ? "\u00A0\u00A0"
                    : ""}
                  {app.raceboard.p2Percent || app.raceboard.p2Percent === 0
                    ? app.raceboard.p2Percent
                    : ""}
                  <span className={"percent"} style={{ fontSize: "25px" }}>
                    {app.raceboard.p2Percent || app.raceboard.p2Percent === 0
                      ? "%"
                      : ""}
                  </span>
                </Text>
                <Text
                  className={"voteNum"}
                  sx={{
                    fontSize: "20px",
                    marginTop: "-18px",
                    marginRight: "23px"
                  }}
                >
                  {(app.raceboard.p2Vote || app.raceboard.p2Vote === 0) && (
                    <FormattedMessage
                      id={"Votes2"}
                      values={{
                        votes: app.raceboard.p2Vote.toLocaleString(intl.locale)
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
          sx={{ display: "flex", flex: 1, marginTop: "2px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "5%",
              marginRight: "0%"
            }}
          ></Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "95%" }}>
            <Box
              className={"partySubBox"}
              sx={{
                display: "flex",
                borderBottom: "solid 1px #111",
                marginRight: "4%",
                paddingBottom: "5px",
                marginBottom: "5px"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "top",
                  width: "24%"
                }}
              >
                <img
                  src={
                    CandidateImgs[
                      app.raceboard.p3Party?.replaceAll("-", "") + year
                    ]
                  }
                  style={{ width: "100%" }}
                  alt=""
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "0.5%",
                  width: "48%",
                  marginTop: "0px",
                  fontWeight: "bold"
                }}
              >
                <Box sx={{ width: "95%" }}>
                  <div
                    className={"racePartyName"}
                    style={{
                      backgroundColor: PartyColors[app.raceboard.p3Party]?.high,
                      color: "#fff",
                      display: "inline-block",
                      width: "auto",
                      padding: "2px 7px 3px 6px",
                      marginLeft: "0px",
                      fontSize: "30px",
                      lineHeight: "25px"
                    }}
                  >
                    {app.raceboard.p3Party}
                  </div>
                </Box>
                <Box
                  className={"raceCandBox"}
                  sx={{
                    paddingTop: "15px",
                    paddingLeft: "5px",
                    borderLeft:
                      "solid " +
                      partyBorderLeft +
                      "px " +
                      (PartyColors[app.raceboard.p3Party]
                        ? PartyColors[app.raceboard.p3Party].high
                        : "#111111")
                  }}
                >
                  <Box
                    className={"raceName"}
                    sx={{ height: "120px", fontSize: "20px", width: "84%" }}
                  >
                    {Names[app.raceboard.p3Name]
                      ? Names[app.raceboard.p3Name]
                      : app.raceboard.p3Name}
                  </Box>
                  <Box
                    className={"raceTitle"}
                    sx={{
                      marginTop: "0px",
                      marginBottom: "10px",
                      fontSize: "12px",
                      color: "#777"
                    }}
                  >
                    {Titles[app.raceboard.p3Name]
                      ? Titles[app.raceboard.p3Name]
                      : "Candidatura " + app.raceboard.p3Party}
                  </Box>
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
                <Text className={"percentNum"} sx={{ fontSize: "80px" }}>
                  {(app.raceboard.p3Percent && app.raceboard.p3Percent < 10) ||
                  app.raceboard.p3Percent === 0
                    ? "\u00A0\u00A0"
                    : ""}
                  {app.raceboard.p3Percent || app.raceboard.p3Percent === 0
                    ? app.raceboard.p3Percent
                    : ""}
                  <span className={"percent"} style={{ fontSize: "25px" }}>
                    {app.raceboard.p3Percent || app.raceboard.p3Percent === 0
                      ? "%"
                      : ""}
                  </span>
                </Text>
                <Text
                  className={"voteNum"}
                  sx={{
                    fontSize: "20px",
                    marginTop: "-18px",
                    marginRight: "23px"
                  }}
                >
                  {(app.raceboard.p3Vote || app.raceboard.p3Vote === 0) && (
                    <FormattedMessage
                      id={"Votes2"}
                      values={{
                        votes: app.raceboard.p3Vote.toLocaleString(intl.locale)
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
          sx={{ display: "flex", flex: 1, marginTop: "2px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "5%",
              marginRight: "0%"
            }}
          ></Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "95%" }}>
            <Box
              className={"partySubBox party4SubBox"}
              sx={{
                display: "flex",
                borderBottom: "solid 1px #111",
                marginRight: "4%",
                paddingBottom: "5px",
                marginBottom: "5px"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "top",
                  width: "24%"
                }}
              >
                <img
                  src={
                    CandidateImgs[
                      app.raceboard.p4Party?.replaceAll("-", "") + year
                    ]
                  }
                  style={{ width: "100%" }}
                  alt=""
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "0.5%",
                  width: "48%",
                  marginTop: "0px",
                  fontWeight: "bold"
                }}
              >
                <Box sx={{ width: "95%" }}>
                  <div
                    className={"racePartyName"}
                    style={{
                      backgroundColor: PartyColors[app.raceboard.p4Party]?.high,
                      color: "#fff",
                      display: "inline-block",
                      width: "auto",
                      padding: "2px 7px 3px 6px",
                      marginLeft: "0px",
                      fontSize: "30px",
                      lineHeight: "25px"
                    }}
                  >
                    {app.raceboard.p4Party}
                  </div>
                </Box>
                <Box
                  className={"raceCandBox"}
                  sx={{
                    paddingTop: "15px",
                    paddingLeft: "5px",
                    borderLeft:
                      "solid " +
                      partyBorderLeft +
                      "px " +
                      (PartyColors[app.raceboard.p4Party]
                        ? PartyColors[app.raceboard.p4Party].high
                        : "#111111")
                  }}
                >
                  <Box
                    className={"raceName"}
                    sx={{ height: "120px", fontSize: "20px", width: "90%" }}
                  >
                    {Names[app.raceboard.p4Name]
                      ? Names[app.raceboard.p4Name]
                      : app.raceboard.p4Name}
                  </Box>
                  <Box
                    className={"raceTitle"}
                    sx={{
                      marginTop: "0px",
                      marginBottom: "10px",
                      fontSize: "12px",
                      color: "#777"
                    }}
                  >
                    {Titles[app.raceboard.p4Name]
                      ? Titles[app.raceboard.p4Name]
                      : "Candidatura " + app.raceboard.p4Party}
                  </Box>
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
                <Text className={"percentNum"} sx={{ fontSize: "80px" }}>
                  {(app.raceboard.p4Percent && app.raceboard.p4Percent < 10) ||
                  app.raceboard.p4Percent === 0
                    ? "\u00A0\u00A0"
                    : ""}
                  {app.raceboard.p4Percent || app.raceboard.p4Percent === 0
                    ? app.raceboard.p4Percent
                    : ""}
                  <span className={"percent"} style={{ fontSize: "25px" }}>
                    {app.raceboard.p4Percent || app.raceboard.p4Percent === 0
                      ? "%"
                      : ""}
                  </span>
                </Text>
                <Text
                  className={"voteNum"}
                  sx={{
                    fontSize: "20px",
                    marginTop: "-18px",
                    marginRight: "23px"
                  }}
                >
                  {(app.raceboard.p4Vote || app.raceboard.p4Vote === 0) && (
                    <FormattedMessage
                      id={"Votes2"}
                      values={{
                        votes: app.raceboard.p4Vote.toLocaleString(intl.locale)
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

export default Raceboard;
