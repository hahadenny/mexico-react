import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Box, AppShell, Navbar, Header } from "@mantine/core";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import voca from "voca";
import { useIntl } from "react-intl";
import removeAccents from "remove-accents";
import bbox from "@turf/bbox";

import {
  GeneralFillColors,
  TurnoutColor,
  MarginFillColors,
  PartyStrFillColors,
  PartyColors
} from "./mapbox/colors";
import { Urls } from "./mapbox/urls";
import { StatesAccents } from "./mapbox/states";
//import { Titles } from "./mapbox/titles";
import {
  StateOlWidth,
  MunFillOpacity,
  MunDisFillOpacity,
  DisFillOpacity,
  StateFillOpacity,
  ForceMunFillOpacity,
  ForceDisFillOpacity,
  MunOutlineColor,
  DisOutlineColor,
  StateOutlineColor,
  PresMunCircleRadius,
  CongMunCircleRadius,
  DisCircleRadius
} from "./mapbox/rules";

import NavbarNested from "./NavBar/Navbar";
import Login from "./components/Auth/LogIn";
import AuthorizedComponent from "./components/AuthorizedComponent";
import BookmarksListing from "./components/Widgets/Bookmarks/Listing/BookmarksListing";
import CreateBookmarkModal from "./components/Widgets/Bookmarks/Create/CreateBookmarkModal";
import Raceboard from "./components/Widgets/Raceboard/Raceboard";
import TopBar from "./components/Widgets/TopBar/TopBar";
import Telestrator from "./components/Widgets/Telestrator/Telestrator";
import { appSelector, getOpenModal } from "./redux/app/selectors";
import {
  setOpenModal,
  setShowRaceboard,
  setRaceLayer,
  setRaceState,
  setRaceMun,
  setRaceMunId,
  setRaceParty,
  //setRaceColor,
  setRaceName,
  //setRaceTitle,
  setRaceTotalVote,
  setRaceVote,
  setRacePercent
} from "./redux/app/slice";
import { DefaultLng, DefaultLat, DefaultZoom } from "./mapbox/settings";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Home = () => {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const popup = useRef(null);
  const canvas = useRef(null);
  const firstLayerId = useRef(null);
  const stateSourceId = useRef(null);
  const stateLayerId = useRef(null);
  const stateOlSourceId = useRef(null);
  const stateOlLayerId = useRef(null);  
  const disSourceId = useRef(null);
  const disLayerId = useRef(null);
  const munSourceId = useRef(null);
  const munLayerId = useRef(null);
  const stateColorExpression = useRef(null);

  const [lng /*, setLng*/] = useState(DefaultLng);
  const [lat /*, setLat*/] = useState(DefaultLat);
  const [zoom /*, setZoom*/] = useState(DefaultZoom);
  const [mapReady, setMapReady] = useState(false);

  const year = useSelector((state) => state.year.value);
  const raceType = useSelector((state) => state.raceType.value);
  const party = useSelector((state) => state.party.value);
  const forceMun = useSelector((state) => state.forceMun.value);
  const forceDis = useSelector((state) => state.forceDis.value);
  const voteCircle = useSelector((state) => state.voteCircle.value);
  const turnout = useSelector((state) => state.turnout.value);
  const margin = useSelector((state) => state.margin.value);

  const modal = useSelector(getOpenModal);
  const app = useSelector(appSelector);

  const intl = useIntl();

  const onCloseModal = useCallback(() => {
    dispatch(setOpenModal(false));
  }, [dispatch]);

  const onCloseRaceboard = useCallback(() => {
    dispatch(setShowRaceboard(false));
  }, [dispatch]);

  const getMapboxUrl = (raceType, year, voteCircle, level) => {
    if (Urls[`${raceType}-${year}`]) {
      if (
        Urls[`${raceType}-${year}`][
          `${level}${voteCircle && level !== "state" ? "-centroids" : ""}`
        ]
      ) {
        return Urls[`${raceType}-${year}`][
          `${level}${voteCircle && level !== "state" ? "-centroids" : ""}`
        ];
      }
    }
    return "";
  };

  const zoomToFeat = (feature, padding) => {
    const bounds = bbox(feature);

    if (feature?.geometry?.type === "Point") {
      map.current.flyTo({
        center: feature.geometry.coordinates
      });
    } else {
      map.current.fitBounds(bounds, {
        padding: padding
      });
    }
  };

  const loadRaceBoard = useCallback(
    (e) => {
      if (e.features[0].sourceLayer === "states") {
        dispatch(setRaceMun(""));
        dispatch(setRaceMunId(""));
      } else if (e.features[0].sourceLayer === "municipals") {
        dispatch(setRaceState(""));
        dispatch(
          setRaceMun(voca.titleCase(e.features[0].properties.MUNICIPIO))
        );
        dispatch(
          setRaceMunId(voca.titleCase(e.features[0].properties.UNIQUE_ID))
        );
        dispatch(
          setRaceState(voca.titleCase(e.features[0].properties.STATE_NAME))
        );
      } else if (e.features[0].sourceLayer === "districts") {
        dispatch(setRaceState(""));
        dispatch(
          setRaceMun(voca.titleCase(e.features[0].properties.DISTRICT_DISPLAY))
        );
        dispatch(
          setRaceMunId(
            voca.titleCase(e.features[0].properties.ID_DISTRITO_FEDERAL)
          )
        );
      } else return false;

      const first_party = e.features[0].properties.FIRST_DISPLAY
        ? e.features[0].properties.FIRST_DISPLAY
        : e.features[0].properties.FIRST_PARTY
        ? e.features[0].properties.FIRST_PARTY
        : e.features[0].properties.FIRST
        ? e.features[0].properties.FIRST
        : "";
      dispatch(setRaceParty({ payload: first_party, i: 1 }));
      //dispatch(setRaceColor({payload: PartyColors[e.features[0].properties.FIRST_PARTY]?.high, i: 1}));
      const p1Name = e.features[0].properties.FIRST
        ? e.features[0].properties.FIRST
        : e.features[0].properties.FIRST_DISPLAY
        ? e.features[0].properties.FIRST_DISPLAY
        : "";
      dispatch(setRaceName({ payload: p1Name, i: 1 }));
      //dispatch(setRaceTitle({payload: Titles[e.features[0].properties.FIRST] ? Titles[e.features[0].properties.FIRST] : 'Candidatura '+e.features[0].properties.FIRST_PARTY, i: 1}));

      let total_votes = "";
      if (typeof e.features[0].properties.TOTAL_VOTOS !== "undefined")
        total_votes = e.features[0].properties.TOTAL_VOTOS;
      dispatch(setRaceTotalVote(total_votes));

      let first_votes = "";
      if (typeof e.features[0].properties.FIRST_votes !== "undefined")
        first_votes = e.features[0].properties.FIRST_votes;
      else if (typeof e.features[0].properties.FIRST_VOTES !== "undefined")
        first_votes = e.features[0].properties.FIRST_VOTES;
      else if (
        typeof e.features[0].properties[e.features[0].properties.FIRST] !==
        "undefined"
      )
        first_votes = e.features[0].properties[e.features[0].properties.FIRST];
      else if (
        typeof e.features[0].properties[e.features[0].properties.SECOND] !==
        "undefined"
      ) {
        //Tie
        first_votes = e.features[0].properties[e.features[0].properties.SECOND];
        for (const [key, value] of Object.entries(e.features[0].properties)) {
          //console.log(`${key}: ${value}`);
          if (value === first_votes && e.features[0].properties.SECOND !== key)
            dispatch(setRaceName({ payload: key, i: 1 }));
        }
      }
      dispatch(setRaceVote({ payload: first_votes, i: 1 }));
      dispatch(
        setRacePercent({
          payload: Math.round(e.features[0].properties.FIRST_Sh),
          i: 1
        })
      );

      const second_party = e.features[0].properties.SECOND_DISPLAY
        ? e.features[0].properties.SECOND_DISPLAY
        : e.features[0].properties.SECOND_PARTY
        ? e.features[0].properties.SECOND_PARTY
        : e.features[0].properties.SECOND
        ? e.features[0].properties.SECOND
        : "";
      dispatch(setRaceParty({ payload: second_party, i: 2 }));
      //dispatch(setRaceColor({payload: PartyColors[e.features[0].properties.SECOND_PARTY]?.high, i: 2}));
      const p2Name = e.features[0].properties.SECOND
        ? e.features[0].properties.SECOND
        : e.features[0].properties.SECOND_DISPLAY
        ? e.features[0].properties.SECOND_DISPLAY
        : "";
      dispatch(setRaceName({ payload: p2Name, i: 2 }));
      //dispatch(setRaceTitle({payload: Titles[e.features[0].properties.SECOND] ? Titles[e.features[0].properties.SECOND] : 'Candidatura '+e.features[0].properties.SECOND_PARTY, i: 2}));
      let second_votes = "";
      if (typeof e.features[0].properties.SECOND_votes !== "undefined")
        second_votes = e.features[0].properties.SECOND_votes;
      else if (typeof e.features[0].properties.SECOND_VOTES !== "undefined")
        second_votes = e.features[0].properties.SECOND_VOTES;
      else if (
        typeof e.features[0].properties[e.features[0].properties.SECOND] !==
        "undefined"
      )
        second_votes =
          e.features[0].properties[e.features[0].properties.SECOND];
      dispatch(setRaceVote({ payload: second_votes, i: 2 }));
      dispatch(
        setRacePercent({
          payload: Math.round(e.features[0].properties.SECOND_Sh),
          i: 2
        })
      );

      const third_party = e.features[0].properties.THIRD_DISPLAY
        ? e.features[0].properties.THIRD_DISPLAY
        : e.features[0].properties.THIRD_PARTY
        ? e.features[0].properties.THIRD_PARTY
        : e.features[0].properties.THIRD
        ? e.features[0].properties.THIRD
        : "";
      dispatch(setRaceParty({ payload: third_party, i: 3 }));
      //dispatch(setRaceColor({payload: PartyColors[e.features[0].properties.THIRD_PARTY]?.high, i: 3}));
      const p3Name = e.features[0].properties.THIRD
        ? e.features[0].properties.THIRD
        : e.features[0].properties.THIRD_DISPLAY
        ? e.features[0].properties.THIRD_DISPLAY
        : "";
      dispatch(setRaceName({ payload: p3Name, i: 3 }));
      //dispatch(setRaceTitle({payload: Titles[e.features[0].properties.THIRD] ? Titles[e.features[0].properties.THIRD] : 'Candidatura '+e.features[0].properties.THIRD_PARTY, i: 3}));
      let third_votes = "";
      if (typeof e.features[0].properties.THIRD_votes !== "undefined")
        third_votes = e.features[0].properties.THIRD_votes;
      else if (typeof e.features[0].properties.THIRD_VOTES !== "undefined")
        third_votes = e.features[0].properties.THIRD_VOTES;
      else if (
        typeof e.features[0].properties[e.features[0].properties.THIRD] !==
        "undefined"
      )
        third_votes = e.features[0].properties[e.features[0].properties.THIRD];
      dispatch(setRaceVote({ payload: third_votes, i: 3 }));
      dispatch(
        setRacePercent({
          payload: Math.round(e.features[0].properties.THIRD_Sh),
          i: 3
        })
      );

      const fourth_party = e.features[0].properties.FOURTH_DISPLAY
        ? e.features[0].properties.FOURTH_DISPLAY
        : e.features[0].properties.FOURTH_PARTY
        ? e.features[0].properties.FOURTH_PARTY
        : e.features[0].properties.FOURTH
        ? e.features[0].properties.FOURTH
        : "";
      dispatch(setRaceParty({ payload: fourth_party, i: 4 }));
      //dispatch(setRaceColor({payload: PartyColors[e.features[0].properties.FOURTH_PARTY]?.high, i: 4}));
      const p4Name = e.features[0].properties.FOURTH
        ? e.features[0].properties.FOURTH
        : e.features[0].properties.FOURTH_DISPLAY
        ? e.features[0].properties.FOURTH_DISPLAY
        : "";
      dispatch(setRaceName({ payload: p4Name, i: 4 }));
      //dispatch(setRaceTitle({payload: Titles[e.features[0].properties.FOURTH] ? Titles[e.features[0].properties.FOURTH] : 'Candidatura '+e.features[0].properties.FOURTH_PARTY, i: 4}));
      let fourth_votes = "";
      if (typeof e.features[0].properties.FOURTH_votes !== "undefined")
        fourth_votes = e.features[0].properties.FOURTH_votes;
      else if (typeof e.features[0].properties.FOURTH_VOTES !== "undefined")
        fourth_votes = e.features[0].properties.FOURTH_VOTES;
      else if (
        typeof e.features[0].properties[e.features[0].properties.FOURTH] !==
        "undefined"
      )
        fourth_votes =
          e.features[0].properties[e.features[0].properties.FOURTH];
      dispatch(setRaceVote({ payload: fourth_votes, i: 4 }));
      dispatch(
        setRacePercent({
          payload: Math.round(e.features[0].properties.FOURTH_Sh),
          i: 4
        })
      );

      dispatch(setShowRaceboard(true));
    },
    [dispatch]
  );

  const loadMarker = useCallback(
    (e) => {
      const first_party =
        e.features[0].properties.FIRST_DISPLAY ||
        e.features[0].properties.FIRST_PARTY ||
        e.features[0].properties.FIRST ||
        "";

      let markerColor = "#111111";
      if (PartyColors[first_party]) markerColor = PartyColors[first_party].high;
      if (marker.current) marker.current.remove();
      marker.current = new mapboxgl.Marker({
        color: markerColor,
        draggable: false
      })
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map.current);
      if (popup.current) popup.current.remove();
      let popup_txt = '<div class="mapPopup">';
      let winner_msg = intl.formatMessage({ id: "WinnerPopup" });
      if (e.features[0].properties.ESTADO)
        winner_msg = voca.titleCase(e.features[0].properties.ESTADO);
      else if (e.features[0].properties.NOMBRE_ESTADO)
        winner_msg = voca.titleCase(e.features[0].properties.NOMBRE_ESTADO);
      else if (e.features[0].properties.STATE_NAME)
        winner_msg = voca.titleCase(e.features[0].properties.STATE_NAME);
      popup_txt += `<div class="mapPopupTitle" style="background-color: ${markerColor}">${winner_msg.toUpperCase()}</div>`;
      popup_txt += '<div class="mapPopupLocation">';
      if (e.features[0].sourceLayer === "states") {
        if (e.features[0].properties.ESTADO)
          popup_txt += voca.titleCase(e.features[0].properties.ESTADO);
        else if (e.features[0].properties.NOMBRE_ESTADO)
          popup_txt += voca.titleCase(e.features[0].properties.NOMBRE_ESTADO);
        else 
          popup_txt += voca.titleCase(e.features[0].properties.STATE_NAME);
      } else {
        popup_txt += voca.titleCase(e.features[0].properties.MUNICIPIO);
      }
      popup_txt += "</div>";
      popup_txt += `<div class="mapPopupParty" style="color: ${markerColor}">${first_party}</div>`;

      if (e.features[0].properties.TOTAL_VOTOS) {
        const vote_msg = intl.formatMessage(
          { id: "Votes" },
          {
            votes: e.features[0].properties.TOTAL_VOTOS.toLocaleString(intl.locale)
          }
        );
        popup_txt += '<div class="mapPopupVotes">' + vote_msg + "</div>";
      }

      popup_txt += "</div>";

      if (!["states", "districts"].includes(e.features[0].sourceLayer)) {
        popup.current = new mapboxgl.Popup({ offset: 40 })
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .setHTML(popup_txt)
          .addTo(map.current);
      }
    },
    [intl]
  );

  const selectLocation = useCallback(
    (e) => {
      console.log(e.features[0]);

      if (document.getElementById("raceboard")) {
        document.getElementById("raceboard").classList.remove("board-opened");
        setTimeout(
          () =>
            document.getElementById("raceboard").classList.add("board-opened"),
          0
        );
      }

      dispatch(setRaceLayer(e.features[0].sourceLayer));

      let stateName = "";

      if (e.features[0].properties.ESTADO) {
        dispatch(setRaceState(voca.titleCase(e.features[0].properties.ESTADO)));
        stateName = e.features[0].properties.ESTADO;
      } else if (e.features[0].properties.NOMBRE_ESTADO) {
        dispatch(
          setRaceState(voca.titleCase(e.features[0].properties.NOMBRE_ESTADO))
        );
        stateName = e.features[0].properties.NOMBRE_ESTADO;
      } else if (e.features[0].properties.STATE_NAME) {
        dispatch(
          setRaceState(voca.titleCase(e.features[0].properties.STATE_NAME))
        );
        stateName = e.features[0].properties.STATE_NAME;
      } else {
        dispatch(setRaceState(""));
        stateName = "";
      }

      if (stateName) {
        addFilter(stateName);
        loadRaceBoard(e);
        loadMarker(e);

        zoomToFeat(e.features[0], 100);
      } else {
        removeFilter();
      }
    },
    [dispatch, loadRaceBoard, loadMarker]
  );

  const addFilter = (stateName) => {
    const stateName1 =
      StatesAccents[stateName.toUpperCase()] || stateName.toUpperCase();
    const stateName2 = removeAccents(stateName.toUpperCase());

    if (map.current.getLayer(munLayerId.current)) {
      map.current.setFilter(munLayerId.current, [
        "any",
        ["==", ["get", "STATE_NAME"], stateName1],
        ["==", ["get", "NOMBRE_ESTADO"], stateName1],
        ["==", ["get", "ESTADO"], stateName1],
        ["==", ["get", "STATE_NAME"], stateName2],
        ["==", ["get", "NOMBRE_ESTADO"], stateName2],
        ["==", ["get", "ESTADO"], stateName2]
      ]);
    }

    if (map.current.getLayer(disLayerId.current)) {
      map.current.setFilter(disLayerId.current, [
        "any",
        ["==", ["get", "STATE_NAME"], stateName1],
        ["==", ["get", "NOMBRE_ESTADO"], stateName1],
        ["==", ["get", "ESTADO"], stateName1],
        ["==", ["get", "STATE_NAME"], stateName2],
        ["==", ["get", "NOMBRE_ESTADO"], stateName2],
        ["==", ["get", "ESTADO"], stateName2]
      ]);
    }

    if (map.current.getLayer(stateLayerId.current)) {
      map.current.setFilter(stateLayerId.current, [
        "any",
        ["==", ["get", "STATE_NAME"], stateName1],
        ["==", ["get", "NOMBRE_ESTADO"], stateName1],
        ["==", ["get", "ESTADO"], stateName1],
        ["==", ["get", "STATE_NAME"], stateName2],
        ["==", ["get", "NOMBRE_ESTADO"], stateName2],
        ["==", ["get", "ESTADO"], stateName2]
      ]);
    }
  };

  const removeFilter = () => {
    if (map.current.getLayer(munLayerId.current)) {
      map.current.setFilter(munLayerId.current, null);
    }

    if (map.current.getLayer(disLayerId.current)) {
      map.current.setFilter(disLayerId.current, null);
    }

    if (map.current.getLayer(stateLayerId.current)) {
      map.current.setFilter(stateLayerId.current, null);
    }
  };

  const removeLayers = useCallback(() => {
    if (map.current) {
      if (map.current.getLayer(munLayerId.current)) {
        map.current.off("click", munLayerId.current, selectLocation);
        map.current.removeLayer(munLayerId.current);
      }

      if (map.current.getLayer(disLayerId.current)) {
        map.current.off("click", disLayerId.current, selectLocation);
        map.current.removeLayer(disLayerId.current);
      }

      

      if (map.current.getLayer(stateLayerId.current)) {
        map.current.off("click", stateLayerId.current, selectLocation);
        map.current.removeLayer(stateLayerId.current);
      }

      if (map.current.getLayer(stateOlLayerId.current)) {
        map.current.off("click", stateOlLayerId.current, selectLocation);
        map.current.removeLayer(stateOlLayerId.current);
      }

      if (map.current.getSource(stateOlSourceId.current)) {
        map.current.removeSource(stateOlSourceId.current);
      }

      if (map.current.getSource(munSourceId.current)) {
        map.current.removeSource(munSourceId.current);
      }

      if (map.current.getSource(disSourceId.current)) {
        map.current.removeSource(disSourceId.current);
      }

      if (map.current.getSource(stateSourceId.current)) {
        map.current.removeSource(stateSourceId.current);
      }
    }
  }, [selectLocation]);

  const loadSingleLayer = useCallback(
    (src, vectorId, layerName, dataType, url, drawType, options) => {
      if (!map.current.getSource(src)) {
        map.current.addSource(src, {
          type: "vector",
          url: url
        });
      }

      const vectorLayerOutline = {
        id: vectorId,
        source: src,
        "source-layer": layerName,
        type: drawType,
        ...options
      };
      map.current.addLayer(vectorLayerOutline, firstLayerId.current);

      map.current.on("click", vectorLayerOutline.id, selectLocation);
      map.current.on("mouseenter", vectorLayerOutline.id, () => {
        map.current.getCanvas().style.cursor = "pointer";
      });
      map.current.on("mouseleave", vectorLayerOutline.id, () => {
        map.current.getCanvas().style.cursor = "";
      });

      switch (dataType) {
        case "district":
          disSourceId.current = src;
          disLayerId.current = vectorLayerOutline.id;
          break;
        case "municipal":
          munSourceId.current = src;
          munLayerId.current = vectorLayerOutline.id;
          break;
        case "state-outline":
          stateOlSourceId.current = src;
          stateOlLayerId.current = vectorLayerOutline.id;
          break;
        case "state":
          stateSourceId.current = src;
          stateLayerId.current = vectorLayerOutline.id;
          break;
        default:
          break;
      }

      return vectorLayerOutline.id;
    },
    [selectLocation]
  );

  const getColorExpression = (
    showPartyStr,
    raceType,
    year,
    party,
    turnout,
    margin
  ) => {
    if (turnout) {
      return TurnoutColor;
    } else if (showPartyStr && party) {
      //return ["concat", "#", ["get", Parties[`${raceType}-${year}`][party]]];
      return PartyStrFillColors(raceType, year, party);
    } else if (margin) {
      const marginFillColors = MarginFillColors(year);
      return marginFillColors[`${raceType}`];
      //return ["to-color", ["concat", "#", ["get", "MARGIN_HEX"]], "#000000"];
    } else {
      return GeneralFillColors[`${raceType}`];
    }
  };

  const loadLayers = useCallback(
    (
      raceType,
      year,
      party,
      forceMun,
      forceDis,
      voteCircle,
      turnout,
      margin
    ) => {
      removeLayers();

      const stateUrl = getMapboxUrl(raceType, year, false, "state");

      if (!party && !voteCircle) {
        stateColorExpression.current = getColorExpression(
          false,
          raceType,
          year,
          party,
          turnout,
          margin
        );

        const statePaint = {
          "fill-color": stateColorExpression.current,
          "fill-opacity": StateFillOpacity,
          "fill-outline-color": StateOutlineColor(stateColorExpression.current)
        };

        loadSingleLayer(
          `${raceType}-mx-${year}-state`,
          `${raceType}-mx-${year}-state`,
          "states",
          "state",
          stateUrl,
          "fill",
          {
            minzoom: 1,
            maxzoom: 22,
            paint: statePaint
          }
        );
      }

      if ((!forceMun && raceType === "cong") || forceDis) {
        const disColorExpression = getColorExpression(
          true,
          raceType,
          year,
          party,
          turnout,
          margin
        );

        const disPaint = voteCircle
          ? {
              "circle-color": disColorExpression,
              "circle-radius": DisCircleRadius,
              "circle-opacity": DisFillOpacity(0.5)
            }
          : {
              "fill-color": disColorExpression,
              "fill-opacity": forceDis
                ? ForceDisFillOpacity(1.0)
                : DisFillOpacity(1.0),
              "fill-outline-color": DisOutlineColor(disColorExpression)
              // "fill-extrusion-color": disColorExpression,
              // "fill-extrusion-opacity": 1.0,
              // "fill-extrusion-height": 5000
            };
        const disUrl = getMapboxUrl(raceType, year, voteCircle, "dis");

        loadSingleLayer(
          `${raceType}-mx-${year}-dis`,
          `${raceType}-mx-${year}-dis`,
          "districts",
          "district",
          disUrl,
          voteCircle ? "circle" : "fill",
          {
            minzoom: forceDis || voteCircle ? 1 : 6,
            maxzoom: 22,
            paint: disPaint
          }
        );
      }

      if (!forceDis) {
        const munColorExpression = getColorExpression(
          true,
          raceType,
          year,
          party,
          turnout,
          margin
        );

        const munPaint = voteCircle
          ? {
              "circle-color": munColorExpression,
              "circle-radius":
                raceType === "cong" ? CongMunCircleRadius : PresMunCircleRadius,
              "circle-opacity":
                raceType === "cong"
                  ? MunDisFillOpacity(0.5)
                  : MunFillOpacity(0.5)
            }
          : {
              "fill-color": munColorExpression,
              "fill-opacity":
                forceMun || party
                  ? ForceMunFillOpacity(1.0)
                  : raceType === "cong"
                  ? MunDisFillOpacity(1.0)
                  : MunFillOpacity(1.0),
              "fill-outline-color": MunOutlineColor(munColorExpression)
              // "fill-extrusion-color": munColorExpression,
              // "fill-extrusion-opacity": 1.0,
              // "fill-extrusion-height": 5000
            };
        const munUrl = getMapboxUrl(raceType, year, voteCircle, "mun");

        loadSingleLayer(
          `${raceType}-mx-${year}-mun`,
          `${raceType}-mx-${year}-mun`,
          "municipals",
          "municipal",
          munUrl,
          voteCircle ? "circle" : "fill",
          {
            minzoom:
              forceMun || party || voteCircle ? 1 : raceType === "cong" ? 8 : 6,
            maxzoom: 22,
            paint: munPaint
          }
        );
      }

      const stateOlPaint = {
        "line-color": "white",
        "line-width": StateOlWidth
      };

      loadSingleLayer(
        `${raceType}-mx-${year}-state`,
        `${raceType}-mx-${year}-state-ol`,
        "states",
        "state-outline",
        stateUrl,
        "line",
        {
          minzoom: 1,
          maxzoom: 22,
          paint: stateOlPaint
        }
      );
    },
    [removeLayers, loadSingleLayer]
  );

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.REACT_APP_MAPBOX_STYLE_URL,
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on("load", () => {
      firstLayerId.current = "states";

      // Find the index of the first symbol layer in the map style.
      // const layers = map.current.getStyle().layers;
      // for (const layer of layers) {
      //   if (layer.type === "symbol") {
      //     firstSymbolId.current = layer.id;
      //     break;
      //   }
      // }

      loadLayers(raceType, year, party, forceMun, forceDis);
      setMapReady(true);

      map.current.on("click", (e) => {
        removeFilter();
      });
    });
  });

  /*useEffect(() => {
    if (!map.current || !mapReady) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });*/

  useEffect(() => {
    if (!app.showRaceboard) {
      if (marker.current) marker.current.remove();
      if (popup.current) popup.current.remove();
    }
  }, [app.showRaceboard]);

  useEffect(() => {
    if (!map.current || !mapReady) return;
    loadLayers(
      raceType,
      year,
      party,
      forceMun,
      forceDis,
      voteCircle,
      turnout,
      margin
    );
  }, [
    year,
    raceType,
    party,
    forceMun,
    forceDis,
    voteCircle,
    turnout,
    margin,
    mapReady,
    loadLayers
  ]);

  useEffect(() => {
    if (document.getElementById("react-sketch-canvas__stroke-group-0"))
      document
        .getElementById("react-sketch-canvas__stroke-group-0")
        .setAttribute("mask", "");
  }, []);

  return (
    <AppShell
      padding={0}
      layout="alt"
      navbar={
        <Navbar width={{ base: 300 }} sx={{ backgroundColor: "transparent" }}>
          <NavbarNested
            mapRef={map}
            markerRef={marker}
            popupRef={popup}
            canvasRef={canvas}
            addFilter={addFilter}
          />
        </Navbar>
      }
      header={
        <Header height={70} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      })}
    >
      <TopBar />
      <Box
        style={{
          width: "100%",
          height: "calc(100vh - 102px)",
          display: "flex",
          position: "absolute",
          left: "0px",
          top: 102
        }}
      >
        {0 && app.showBookmarks && <BookmarksListing mapRef={map} />}
        <div ref={mapContainer} className="map-container" />
      </Box>
      <CreateBookmarkModal
        mapRef={map}
        markerRef={marker}
        open={modal === "MODAL_CREATE_BOOKMARK"}
        onClose={onCloseModal}
      />
      <Raceboard
        open={app.showRaceboard}
        onClose={onCloseRaceboard}
        app={app}
      />
      <Telestrator innerRef={canvas} />
    </AppShell>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthorizedComponent />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
