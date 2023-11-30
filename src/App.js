import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Box, AppShell, Navbar, Header } from "@mantine/core";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import L from "leaflet";
import voca from "voca";
import { useIntl } from "react-intl";
import removeAccents from "remove-accents";
import * as turf from "@turf/turf";

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
  CongMunCircleRadius
} from "./mapbox/rules";

import NavbarNested from "./NavBar/Navbar";
import Login from "./components/Auth/LogIn";
import AuthorizedComponent from "./components/AuthorizedComponent";
//import BookmarksListing from "./components/Widgets/Bookmarks/Listing/BookmarksListing";
import CreateBookmarkModal from "./components/Widgets/Bookmarks/Create/CreateBookmarkModal";
import Raceboard from "./components/Widgets/Raceboard/Raceboard";
import RaceboardCong from "./components/Widgets/Raceboard/RaceboardCong";
import TopBar from "./components/Widgets/TopBar/TopBar";
import Telestrator from "./components/Widgets/Telestrator/Telestrator";
import RaceChart from "./components/Widgets/RaceChart/RaceChart";
import { appSelector, getOpenModal } from "./redux/app/selectors";
import {
  setOpenModal,
  setShowRaceboard,
  setShowBookmarks,
  setRaceLayer,
  setRaceState,
  setRaceMun,
  setRaceMunId,
  setColorFirstParty,
  setRaceParty,
  //setRaceColor,
  setRaceName,
  //setRaceTitle,
  setRaceTotalVote,
  setRaceTurnoutPercent,
  setRaceVote,
  setRacePercent,
  setRaceTie,
  setReelected,
  setClickedMarker,
  setStateLayerId,
  setMunLayerId,
  setDisLayerId,
  setMarkerLng,
  setMarkerLat
} from "./redux/app/slice";
import { update as updateParty } from "./actions/partySlice";
import { update as updateTurnout } from "./actions/turnoutSlice";
import { update as updateMargin } from "./actions/marginSlice";
import { update as updateFeature } from "./actions/featureSlice";
import { update as updateForceDis } from "./actions/forceDisSlice";
import { update as updateYear } from "./actions/yearSlice";
import { update as updateRaceType } from "./actions/raceTypeSlice";
import {
  DefaultLng,
  DefaultLat,
  DefaultZoom,
  MaxBounds
} from "./mapbox/settings";
import { ZOOM_DIR_ENUM } from "./enums/zoomDir";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Home = () => {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const leafletMapContainer = useRef(null);
  const leafletMap = useRef(null);
  const marker = useRef(null);
  const popup = useRef(null);
  const canvas = useRef(null);
  const firstLayerId = useRef(null);
  const stateSourceId = useRef(null);
  const stateLayerId = useRef(null);
  const stateOlSourceId = useRef(null);
  const stateOlLayerId = useRef(null);
  const stateFillSourceId = useRef(null);
  const stateFillLayerId = useRef(null);
  const disSourceId = useRef(null);
  const disLayerId = useRef(null);
  const munSourceId = useRef(null);
  const munLayerId = useRef(null);
  const stateName = useRef(null);
  const lastStateFeature = useRef(null);
  const lastDisFeature = useRef(null);
  const lastMunFeature = useRef(null);
  const currentLayer = useRef("states");
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
  const lastFeature = useSelector((state) => state.feature.value);

  const modal = useSelector(getOpenModal);
  const app = useSelector(appSelector);

  const prevForceMun = usePrevious(forceMun);
  const prevForceDis = usePrevious(forceDis);
  const prevVoteCircle = usePrevious(voteCircle);

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

  const loadRaceBoard = useCallback(
    (feature) => {
      if (feature.sourceLayer === "states") {
        dispatch(setColorFirstParty(false));
        dispatch(setRaceMun(""));
        dispatch(setRaceMunId(""));
      } else if (feature.sourceLayer === "municipals") {
        dispatch(setColorFirstParty(false));
        dispatch(setRaceState(""));
        dispatch(setRaceMun(voca.titleCase(feature.properties.MUNICIPIO)));
        dispatch(setRaceMunId(voca.titleCase(feature.properties.UNIQUE_ID)));
        dispatch(setRaceState(voca.titleCase(feature.properties.STATE_NAME)));
      } else if (feature.sourceLayer === "districts") {
        dispatch(setColorFirstParty(feature.properties.FIRST));
        dispatch(
          setRaceMun(voca.titleCase(feature.properties.DISTRICT_DISPLAY))
        );
        dispatch(
          setRaceMunId(voca.titleCase(feature.properties.ID_DISTRITO_FEDERAL))
        );
      } else return false;

      dispatch(
        setRaceTie(
          feature.properties.TIE === true || feature.properties.TIE === "TRUE"
        )
      );

      let reelected = 0;
      if (feature.properties.reelected)
        reelected = feature.properties.reelected;
      dispatch(setReelected(reelected));

      const first_party = feature.properties.FIRST_DISPLAY
        ? feature.properties.FIRST_DISPLAY
        : feature.properties.FIRST_PARTY
        ? feature.properties.FIRST_PARTY
        : feature.properties.FIRST
        ? feature.properties.FIRST
        : "";
      dispatch(setRaceParty({ payload: first_party, i: 1 }));
      //dispatch(setRaceColor({payload: PartyColors[feature.properties.FIRST_PARTY]?.high, i: 1}));
      const p1Name = feature.properties.ELECTED_CANDIDATE
        ? feature.properties.ELECTED_CANDIDATE
        : feature.properties.CANDIDATO
        ? feature.properties.CANDIDATO
        : feature.properties.FIRST
        ? feature.properties.FIRST
        : feature.properties.FIRST_DISPLAY
        ? feature.properties.FIRST_DISPLAY
        : "";
      dispatch(setRaceName({ payload: p1Name, i: 1 }));
      //dispatch(setRaceTitle({payload: Titles[feature.properties.FIRST] ? Titles[feature.properties.FIRST] : 'Candidatura '+feature.properties.FIRST_PARTY, i: 1}));

      let total_votes = "";
      if (typeof feature.properties.TOTAL_VOTOS !== "undefined")
        total_votes = feature.properties.TOTAL_VOTOS;
      dispatch(setRaceTotalVote(total_votes));

      let turnout_percent = "";
      if (typeof feature.properties.TURNOUT !== "undefined")
        turnout_percent = feature.properties.TURNOUT;
      dispatch(setRaceTurnoutPercent(turnout_percent));

      let first_votes = "";
      if (typeof feature.properties.FIRST_votes !== "undefined")
        first_votes = feature.properties.FIRST_votes;
      else if (typeof feature.properties.FIRST_VOTES !== "undefined")
        first_votes = feature.properties.FIRST_VOTES;
      else if (
        typeof feature.properties[feature.properties.FIRST] !== "undefined"
      )
        first_votes = feature.properties[feature.properties.FIRST];
      else if (
        typeof feature.properties[feature.properties.SECOND] !== "undefined"
      ) {
        //Tie
        first_votes = feature.properties[feature.properties.SECOND];
        for (const [key, value] of Object.entries(feature.properties)) {
          //console.log(`${key}: ${value}`);
          if (value === first_votes && feature.properties.SECOND !== key)
            dispatch(setRaceName({ payload: key, i: 1 }));
        }
      }
      dispatch(setRaceVote({ payload: first_votes, i: 1 }));
      dispatch(
        setRacePercent({
          payload: Math.round(feature.properties.FIRST_Sh),
          i: 1
        })
      );

      const second_party = feature.properties.SECOND_DISPLAY
        ? feature.properties.SECOND_DISPLAY
        : feature.properties.SECOND_PARTY
        ? feature.properties.SECOND_PARTY
        : feature.properties.SECOND
        ? feature.properties.SECOND
        : "";
      dispatch(setRaceParty({ payload: second_party, i: 2 }));
      //dispatch(setRaceColor({payload: PartyColors[feature.properties.SECOND_PARTY]?.high, i: 2}));
      const p2Name = feature.properties.SECOND
        ? feature.properties.SECOND
        : feature.properties.SECOND_DISPLAY
        ? feature.properties.SECOND_DISPLAY
        : "";
      dispatch(setRaceName({ payload: p2Name, i: 2 }));
      //dispatch(setRaceTitle({payload: Titles[feature.properties.SECOND] ? Titles[feature.properties.SECOND] : 'Candidatura '+feature.properties.SECOND_PARTY, i: 2}));
      let second_votes = "";
      if (typeof feature.properties.SECOND_votes !== "undefined")
        second_votes = feature.properties.SECOND_votes;
      else if (typeof feature.properties.SECOND_VOTES !== "undefined")
        second_votes = feature.properties.SECOND_VOTES;
      else if (
        typeof feature.properties[feature.properties.SECOND] !== "undefined"
      )
        second_votes = feature.properties[feature.properties.SECOND];
      dispatch(setRaceVote({ payload: second_votes, i: 2 }));
      dispatch(
        setRacePercent({
          payload: Math.round(feature.properties.SECOND_Sh),
          i: 2
        })
      );

      const third_party = feature.properties.THIRD_DISPLAY
        ? feature.properties.THIRD_DISPLAY
        : feature.properties.THIRD_PARTY
        ? feature.properties.THIRD_PARTY
        : feature.properties.THIRD
        ? feature.properties.THIRD
        : "";
      dispatch(setRaceParty({ payload: third_party, i: 3 }));
      //dispatch(setRaceColor({payload: PartyColors[feature.properties.THIRD_PARTY]?.high, i: 3}));
      const p3Name = feature.properties.THIRD
        ? feature.properties.THIRD
        : feature.properties.THIRD_DISPLAY
        ? feature.properties.THIRD_DISPLAY
        : "";
      dispatch(setRaceName({ payload: p3Name, i: 3 }));
      //dispatch(setRaceTitle({payload: Titles[feature.properties.THIRD] ? Titles[feature.properties.THIRD] : 'Candidatura '+feature.properties.THIRD_PARTY, i: 3}));
      let third_votes = "";
      if (typeof feature.properties.THIRD_votes !== "undefined")
        third_votes = feature.properties.THIRD_votes;
      else if (typeof feature.properties.THIRD_VOTES !== "undefined")
        third_votes = feature.properties.THIRD_VOTES;
      else if (
        typeof feature.properties[feature.properties.THIRD] !== "undefined"
      )
        third_votes = feature.properties[feature.properties.THIRD];
      dispatch(setRaceVote({ payload: third_votes, i: 3 }));
      dispatch(
        setRacePercent({
          payload: Math.round(feature.properties.THIRD_Sh),
          i: 3
        })
      );

      const fourth_party = feature.properties.FOURTH_DISPLAY
        ? feature.properties.FOURTH_DISPLAY
        : feature.properties.FOURTH_PARTY
        ? feature.properties.FOURTH_PARTY
        : feature.properties.FOURTH
        ? feature.properties.FOURTH
        : "";
      dispatch(setRaceParty({ payload: fourth_party, i: 4 }));
      //dispatch(setRaceColor({payload: PartyColors[feature.properties.FOURTH_PARTY]?.high, i: 4}));
      const p4Name = feature.properties.FOURTH
        ? feature.properties.FOURTH
        : feature.properties.FOURTH_DISPLAY
        ? feature.properties.FOURTH_DISPLAY
        : "";
      dispatch(setRaceName({ payload: p4Name, i: 4 }));
      //dispatch(setRaceTitle({payload: Titles[feature.properties.FOURTH] ? Titles[feature.properties.FOURTH] : 'Candidatura '+feature.properties.FOURTH_PARTY, i: 4}));
      let fourth_votes = "";
      if (typeof feature.properties.FOURTH_votes !== "undefined")
        fourth_votes = feature.properties.FOURTH_votes;
      else if (typeof feature.properties.FOURTH_VOTES !== "undefined")
        fourth_votes = feature.properties.FOURTH_VOTES;
      else if (
        typeof feature.properties[feature.properties.FOURTH] !== "undefined"
      )
        fourth_votes = feature.properties[feature.properties.FOURTH];
      dispatch(setRaceVote({ payload: fourth_votes, i: 4 }));
      dispatch(
        setRacePercent({
          payload: Math.round(feature.properties.FOURTH_Sh),
          i: 4
        })
      );

      dispatch(setShowRaceboard(true));
    },
    [dispatch]
  );

  const hideLayer = useCallback(
    (layerId, ms = 250) => {
      if (voteCircle && layerId.endsWith("-mun")) {
        map.current.setPaintProperty(layerId, "circle-opacity", 0, {
          duration: ms,
          easing: "ease-in-out"
        });
      } else {
        map.current.setPaintProperty(layerId, "fill-opacity", 0, {
          duration: ms,
          easing: "ease-in-out"
        });
      }

      if (map.current.getLayer(layerId)) {
        map.current.setLayoutProperty(layerId, "visibility", "none");
      }
    },
    [voteCircle]
  );

  const showLayer = useCallback(
    (layerId, ms = 250) => {
      map.current.setLayoutProperty(layerId, "visibility", "visible");

      if (voteCircle && layerId.endsWith("-mun")) {
        map.current.setPaintProperty(layerId, "circle-opacity", 0.5, {
          duration: ms,
          easing: "ease-in-out"
        });
      } else {
        map.current.setPaintProperty(layerId, "fill-opacity", 1, {
          duration: ms,
          easing: "ease-in-out"
        });
      }
    },
    [voteCircle]
  );

  const zoomToFeat = useCallback((features, padding = 100) => {
    if (features[0]?.geometry?.type === "Point") {
      map.current.flyTo({
        center: features[0].geometry.coordinates
      });
    } else {
      const featureCollection = {
        type: "FeatureCollection",
        features: features
      };
      const bounds = turf.bbox(featureCollection);
      const leafletBounds = L.latLngBounds([
        [bounds[1], bounds[0]],
        [bounds[3], bounds[2]]
      ]);
      const newZoomLevel = leafletMap.current.getBoundsZoom(
        leafletBounds,
        false
      );

      map.current.easeTo({
        center: turf.center(
          turf.points([
            [bounds[0], bounds[1]],
            [bounds[2], bounds[3]]
          ])
        ).geometry.coordinates,
        zoom: newZoomLevel * 0.8,
        duration: 200
      });
    }
  }, []);

  const addFilter = useCallback(
    (stateNameStr) => {
      if (!stateNameStr) {
        stateNameStr = stateName.current;
        if (!stateNameStr) {
          return;
        }
      }

      const stateName1 =
        StatesAccents[stateNameStr.toUpperCase()] || stateNameStr.toUpperCase();
      const stateName2 = removeAccents(stateNameStr.toUpperCase());

      if (map.current.getLayer(munLayerId.current)) {
        map.current.setFilter(munLayerId.current, [
          "any",
          ["==", ["upcase", ["get", "STATE_NAME"]], stateName1],
          ["==", ["upcase", ["get", "NOMBRE_ESTADO"]], stateName1],
          ["==", ["upcase", ["get", "ESTADO"]], stateName1],
          ["==", ["upcase", ["get", "STATE_NAME"]], stateName2],
          ["==", ["upcase", ["get", "NOMBRE_ESTADO"]], stateName2],
          ["==", ["upcase", ["get", "ESTADO"]], stateName2]
        ]);
      }

      if (map.current.getLayer(disLayerId.current)) {
        map.current.setFilter(disLayerId.current, [
          "any",
          ["==", ["upcase", ["get", "STATE_NAME"]], stateName1],
          ["==", ["upcase", ["get", "NOMBRE_ESTADO"]], stateName1],
          ["==", ["upcase", ["get", "ESTADO"]], stateName1],
          ["==", ["upcase", ["get", "STATE_NAME"]], stateName2],
          ["==", ["upcase", ["get", "NOMBRE_ESTADO"]], stateName2],
          ["==", ["upcase", ["get", "ESTADO"]], stateName2]
        ]);
      }

      if (map.current.getLayer(stateLayerId.current)) {
        map.current.setFilter(stateLayerId.current, [
          "any",
          ["==", ["upcase", ["get", "STATE_NAME"]], stateName1],
          ["==", ["upcase", ["get", "NOMBRE_ESTADO"]], stateName1],
          ["==", ["upcase", ["get", "ESTADO"]], stateName1],
          ["==", ["upcase", ["get", "STATE_NAME"]], stateName2],
          ["==", ["upcase", ["get", "NOMBRE_ESTADO"]], stateName2],
          ["==", ["upcase", ["get", "ESTADO"]], stateName2]
        ]);
      }
    },
    [stateName]
  );

  const removeFilter = useCallback(() => {
    stateName.current = null;

    if (map.current.getLayer(munLayerId.current)) {
      map.current.setFilter(munLayerId.current, null);
      if (!forceMun && !party && !voteCircle) {
        hideLayer(munLayerId.current);
      }
    }

    if (map.current.getLayer(disLayerId.current)) {
      map.current.setFilter(disLayerId.current, null);
      if (!forceDis && !voteCircle) {
        hideLayer(disLayerId.current);
      }
    }

    if (map.current.getLayer(stateLayerId.current)) {
      map.current.setFilter(stateLayerId.current, null);
      if (!forceMun && !forceDis && !party && !voteCircle) {
        showLayer(stateLayerId.current);
      }
    }
  }, [showLayer, hideLayer, forceMun, forceDis, party, voteCircle]);

  const revealLayer = useCallback(
    (features, dir = ZOOM_DIR_ENUM.FORWARD) => {
      if (forceDis || forceMun) return;

      const feature = features[0];
      if (dir === ZOOM_DIR_ENUM.FORWARD) {
        if (feature.sourceLayer === "states") {
          hideLayer(stateLayerId.current);
          lastStateFeature.current = features;

          if (raceType === "cong") {
            if (munLayerId.current) {
              hideLayer(munLayerId.current);
            }

            if (disLayerId.current) {
              showLayer(disLayerId.current);
              currentLayer.current = "districts";
            }
          } else {
            if (munLayerId.current) {
              showLayer(munLayerId.current);
              currentLayer.current = "municipals";
            }

            if (disLayerId.current) {
              hideLayer(disLayerId.current);
            }
          }
        } else if (feature.sourceLayer === "districts") {
          if (disLayerId.current) {
            hideLayer(disLayerId.current);
            lastDisFeature.current = features;
          }

          if (munLayerId.current) {
            showLayer(munLayerId.current);
            currentLayer.current = "municipals";
          }
        } else if (feature.sourceLayer === "municipals") {
          lastMunFeature.current = features;
        }
      } else if (dir === ZOOM_DIR_ENUM.BACKWARD) {
        if (feature.sourceLayer === "states") {
          showLayer(stateLayerId.current);
          lastStateFeature.current = feature;
          currentLayer.current = "states";
          removeFilter();

          if (munLayerId.current) {
            hideLayer(munLayerId.current);
          }

          if (disLayerId.current) {
            hideLayer(disLayerId.current);
          }
        } else if (feature.sourceLayer === "districts") {
          if (disLayerId.current) {
            showLayer(disLayerId.current);
            lastDisFeature.current = features;
            currentLayer.current = "districts";
          }

          if (munLayerId.current) {
            hideLayer(munLayerId.current);
          }
        } else if (feature.sourceLayer === "municipals") {
          lastMunFeature.current = features;
        }
      }
    },
    [raceType, showLayer, hideLayer, removeFilter, forceDis, forceMun]
  );

  const zoomAndReveal = useCallback(
    (features) => {
      dispatch(setClickedMarker(true));
      revealLayer(features);
      zoomToFeat(features);
    },
    [revealLayer, zoomToFeat, dispatch]
  );

  const loadMarker = useCallback(
    (features, lng, lat) => {
      dispatch(setMarkerLng(lng));
      dispatch(setMarkerLat(lat));

      if ((!lng || !lat) && marker.current) {
        const lngLat = marker.current.getLngLat();
        lng = lngLat.lng;
        lat = lngLat.lat;
      }

      let color_first_party = false;
      if (features[0].sourceLayer === "districts") {
        color_first_party = features[0].properties.FIRST;
      }

      const first_party =
        features[0].properties.FIRST_DISPLAY ||
        features[0].properties.FIRST_PARTY ||
        features[0].properties.FIRST ||
        "";

      let markerColor = "#111111";
      let textColor = "#fff";
      if (turnout) markerColor = PartyColors["INE"].high;
      else if (
        features[0]?.properties?.TIE === "TRUE" ||
        features[0]?.properties?.TIE === true
      ) {
        markerColor = "#B4B4B4";
      } else if (color_first_party && PartyColors[color_first_party]) {
        markerColor = PartyColors[color_first_party].high;
        textColor = PartyColors[color_first_party].contrast;
      } else if (PartyColors[first_party]) {
        markerColor = PartyColors[first_party].high;
        textColor = PartyColors[first_party].contrast;
      }

      if (marker.current) {
        marker.current.remove();
        marker.current
          .getElement()
          .removeEventListener("click", zoomAndReveal.bind(this, features));
      }

      marker.current = new mapboxgl.Marker({
        color: markerColor,
        draggable: false
      })
        .setLngLat([lng, lat])
        .addTo(map.current);

      marker.current
        .getElement()
        .addEventListener("click", zoomAndReveal.bind(this, features));

      if (popup.current) popup.current.remove();
      let popup_txt = '<div class="mapPopup">';
      let winner_msg = intl.formatMessage({ id: "WinnerPopup" });
      if (features[0].properties.ESTADO)
        winner_msg = voca.titleCase(
          StatesAccents[features[0].properties.ESTADO.toUpperCase()] ||
            features[0].properties.ESTADO
        );
      else if (features[0].properties.NOMBRE_ESTADO)
        winner_msg = voca.titleCase(
          StatesAccents[features[0].properties.NOMBRE_ESTADO.toUpperCase()] ||
            features[0].properties.NOMBRE_ESTADO
        );
      else if (features[0].properties.STATE_NAME)
        winner_msg = voca.titleCase(
          StatesAccents[features[0].properties.STATE_NAME.toUpperCase()] ||
            features[0].properties.STATE_NAME
        );
      popup_txt += `<div class="mapPopupTitle" style="background-color:#fff;color:#000;">${winner_msg}</div>`;
      popup_txt += '<div class="mapPopupLocation">';
      if (features[0].sourceLayer === "states") {
        /*if (feature.properties.ESTADO)
          popup_txt += voca.titleCase(feature.properties.ESTADO);
        else if (feature.properties.NOMBRE_ESTADO)
          popup_txt += voca.titleCase(feature.properties.NOMBRE_ESTADO);
        else popup_txt += voca.titleCase(feature.properties.STATE_NAME);
        */
      } else {
        if (typeof features[0].properties.DISTRICT_DISPLAY !== "undefined")
          popup_txt += voca.titleCase(features[0].properties.DISTRICT_DISPLAY);
        else popup_txt += voca.titleCase(features[0].properties.MUNICIPIO);
      }
      popup_txt += "</div>";

      if (
        features[0]?.properties?.TIE === "TRUE" ||
        features[0]?.properties?.TIE === true
      ) {
        popup_txt += `<div class="mapPopupParty" style="background-color:#B4B4B4;color:#fff">`;
        popup_txt += intl.formatMessage({ id: "Tie" });
      } else {
        popup_txt += `<div class="mapPopupParty" style="background-color:${markerColor};color:${textColor};">`;
        if (turnout)
          popup_txt += Math.round(features[0].properties.TURNOUT) + "%";
        else popup_txt += `${first_party}`;
      }
      popup_txt += `</div>`;

      if (features[0].properties.TOTAL_VOTOS) {
        const vote_msg = intl.formatMessage(
          { id: "Votes" },
          {
            votes: features[0].properties.TOTAL_VOTOS.toLocaleString(
              //intl.locale
              "en"
            )
          }
        );
        popup_txt += '<div class="mapPopupVotes">' + vote_msg + "</div>";
        if (
          !turnout &&
          features[0].sourceLayer === "states" &&
          typeof features[0].properties.TURNOUT !== "undefined"
        )
          popup_txt +=
            '<div class="mapPopupTurnout">' +
            Math.round(features[0].properties.TURNOUT) +
            "% " +
            intl.formatMessage({ id: "Turnout" }) +
            "</div>";
      }

      popup_txt += "</div>";

      if (1 || !["districts"].includes(features[0].sourceLayer)) {
        popup.current = new mapboxgl.Popup({
          offset: window.innerWidth > 3000 ? 120 : 45
        })
          .setLngLat([lng, lat])
          .setHTML(popup_txt)
          .addTo(map.current);
      }
    },
    [intl, zoomAndReveal, turnout, dispatch]
  );

  const selectFeature = useCallback(
    (
      features,
      lng,
      lat,
      shouldReveal = false,
      shouldRevealDir = ZOOM_DIR_ENUM.BACKWARD,
      shouldZoom = false
    ) => {
      if (!features || !features[0]) return;

      if (document.getElementById("raceboard")) {
        document.getElementById("raceboard").classList.remove("board-opened");
        setTimeout(
          () =>
            document.getElementById("raceboard").classList.add("board-opened"),
          0
        );
      }

      dispatch(setRaceLayer(features[0].sourceLayer));
      dispatch(updateFeature(features[0]));

      let newStateName = "";

      if (features[0].properties.ESTADO) {
        dispatch(setRaceState(voca.titleCase(features[0].properties.ESTADO)));
        newStateName = features[0].properties.ESTADO;
      } else if (features[0].properties.NOMBRE_ESTADO) {
        dispatch(
          setRaceState(voca.titleCase(features[0].properties.NOMBRE_ESTADO))
        );
        newStateName = features[0].properties.NOMBRE_ESTADO;
      } else if (features[0].properties.STATE_NAME) {
        dispatch(
          setRaceState(voca.titleCase(features[0].properties.STATE_NAME))
        );
        newStateName = features[0].properties.STATE_NAME;
      } else {
        dispatch(setRaceState(""));
        newStateName = "";
      }

      if (newStateName) {
        if (currentLayer.current !== "states") {
          addFilter(newStateName);
        }
        stateName.current = newStateName;
        loadRaceBoard(features[0]);
        loadMarker(features, lng, lat);

        if (shouldReveal) {
          revealLayer(features, shouldRevealDir);
        }

        if (shouldZoom) {
          zoomToFeat(features);
        }
      }
    },
    [dispatch, loadRaceBoard, loadMarker, addFilter, zoomToFeat, revealLayer]
  );

  const selectFeatureEvent = useCallback(
    (e) => {
      console.log("Select Event", e);
      console.log("Selected Feature", e.features);

      const statesToOffset = ["31", "23", "4", "27", "7"];
      const statesToOffsetReverse = ["2", "3"];

      selectFeature(
        e.features,
        e.lngLat.lng,
        e.lngLat.lat,
        false,
        ZOOM_DIR_ENUM.FORWARD,
        false
      );

      if (e.features[0].layer.id === "pres-mx-2012-state-fill") return;

      if (app.reverse) {
        if (
          (statesToOffsetReverse.includes(e.features[0].properties.ID_ESTADO) ||
            statesToOffsetReverse.includes(e.features[0].properties.ESTADO)) &&
          e.features[0].sourceLayer === "states"
        ) {
          zoomToFeat(e.features);
        }
      } else {
        if (
          (statesToOffset.includes(e.features[0].properties.ID_ESTADO) ||
            statesToOffset.includes(e.features[0].properties.ESTADO)) &&
          e.features[0].sourceLayer === "states"
        ) {
          zoomToFeat(e.features);
        }
      }
    },
    [selectFeature, zoomToFeat, app.reverse]
  );

  const unselectFeature = useCallback(() => {
    dispatch(setShowRaceboard(false));
    dispatch(setClickedMarker(false));
    dispatch(updateFeature(null));
  }, [dispatch]);

  const removeLayers = useCallback(() => {
    if (map.current) {
      if (map.current.getLayer(munLayerId.current)) {
        map.current.off("click", munLayerId.current, selectFeatureEvent);
        map.current.removeLayer(munLayerId.current);
      }

      if (map.current.getLayer(disLayerId.current)) {
        map.current.off("click", disLayerId.current, selectFeatureEvent);
        map.current.removeLayer(disLayerId.current);
      }

      if (map.current.getLayer(stateLayerId.current)) {
        map.current.off("click", stateLayerId.current, selectFeatureEvent);
        map.current.removeLayer(stateLayerId.current);
      }

      if (map.current.getLayer(stateOlLayerId.current)) {
        map.current.off("click", stateOlLayerId.current, selectFeatureEvent);
        map.current.removeLayer(stateOlLayerId.current);
      }

      if (map.current.getLayer(stateFillLayerId.current)) {
        map.current.off("click", stateFillLayerId.current, selectFeatureEvent);
        map.current.removeLayer(stateFillLayerId.current);
      }

      if (map.current.getSource(stateOlSourceId.current)) {
        map.current.removeSource(stateOlSourceId.current);
      }

      if (map.current.getSource(stateFillSourceId.current)) {
        map.current.removeSource(stateFillSourceId.current);
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
  }, [selectFeatureEvent]);

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

      map.current.on("click", vectorLayerOutline.id, selectFeatureEvent);

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
          dispatch(setDisLayerId(disLayerId.current));
          break;
        case "municipal":
          munSourceId.current = src;
          munLayerId.current = vectorLayerOutline.id;
          dispatch(setMunLayerId(munLayerId.current));
          break;
        case "state-outline":
          stateOlSourceId.current = src;
          stateOlLayerId.current = vectorLayerOutline.id;
          break;
        case "state-fill":
          stateFillSourceId.current = src;
          stateFillLayerId.current = vectorLayerOutline.id;
          break;
        case "state":
          stateSourceId.current = src;
          stateLayerId.current = vectorLayerOutline.id;
          dispatch(setStateLayerId(stateLayerId.current));
          break;
        default:
          break;
      }

      return vectorLayerOutline.id;
    },
    [selectFeatureEvent, dispatch]
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

      const stateFillPaint = {
        "fill-color": "white",
        "fill-opacity": 0.1
      };

      loadSingleLayer(
        `${raceType}-mx-${year}-state`,
        `${raceType}-mx-${year}-state-fill`,
        "states",
        "state-fill",
        stateUrl,
        "fill",
        {
          minzoom: 1,
          maxzoom: 22,
          paint: stateFillPaint
        }
      );

      // if force district is enabled
      // and race type is not congressional
      // disable force district
      if (raceType !== "cong" && forceDis) {
        dispatch(updateForceDis(false));
      }

      // if race type is congressional
      // and force municipal is ehabled or force district is enabled
      // and vote circle is disabled
      // load districts
      if (
        raceType === "cong" &&
        (!forceMun || forceDis) &&
        !voteCircle &&
        !party
      ) {
        const disColorExpression = getColorExpression(
          true,
          raceType,
          year,
          party,
          turnout,
          margin
        );

        const disPaint = {
          "fill-color": disColorExpression,
          "fill-opacity": forceDis
            ? ForceDisFillOpacity(1.0)
            : DisFillOpacity(1.0),
          "fill-outline-color": DisOutlineColor(disColorExpression)
          // "fill-extrusion-color": disColorExpression,
          // "fill-extrusion-opacity": 1.0,
          // "fill-extrusion-height": 5000
        };
        const disUrl = getMapboxUrl(raceType, year, false, "dis");

        loadSingleLayer(
          `${raceType}-mx-${year}-dis`,
          `${raceType}-mx-${year}-dis`,
          "districts",
          "district",
          disUrl,
          "fill",
          {
            minzoom: 1,
            maxzoom: 22,
            paint: disPaint
          }
        );

        // if force district
        // or layer is districts
        // show districts
        const shouldShowDisLayer =
          forceDis || currentLayer.current === "districts";

        if (shouldShowDisLayer) {
          showLayer(`${raceType}-mx-${year}-dis`);
          currentLayer.current = "districts";
        } else {
          hideLayer(`${raceType}-mx-${year}-dis`);
        }
      }

      // if force district is not enabled
      // load municipals
      if (!forceDis || party) {
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
            minzoom: 1,
            maxzoom: 22,
            paint: munPaint
          }
        );

        // if force municipal is enabled
        // or vote circle is enabled
        // or party strength is enabled
        // show municipals
        const shouldShowMunLayer = forceMun || voteCircle || party;

        if (shouldShowMunLayer) {
          showLayer(`${raceType}-mx-${year}-mun`);
          currentLayer.current = "municipals";
        } else {
          hideLayer(`${raceType}-mx-${year}-mun`);
        }
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

      // if vote circle is disabled
      // load state
      if (!voteCircle) {
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

        const shouldHideStateLayer =
          forceMun || forceDis || voteCircle || party;

        const shouldShowStateLayer =
          (prevForceDis && !forceDis && !shouldHideStateLayer) ||
          (prevForceMun && !forceMun && !shouldHideStateLayer) ||
          (prevVoteCircle && !voteCircle && !shouldHideStateLayer) ||
          !shouldHideStateLayer;

        if (shouldShowStateLayer) {
          showLayer(`${raceType}-mx-${year}-state`);
          currentLayer.current = "states";
        } else {
          hideLayer(`${raceType}-mx-${year}-state`);
        }
      }

      if (currentLayer.current !== "states") {
        addFilter(stateName.current);
      }
    },
    [
      dispatch,
      removeLayers,
      loadSingleLayer,
      showLayer,
      hideLayer,
      addFilter,
      prevForceDis,
      prevForceMun,
      prevVoteCircle
    ]
  );

  const getStateFeatures = useCallback(
    (stateId) => {
      let source = `${raceType}-mx-${year}-state`;
      let filter = [
        "any",
        ["==", ["to-number", ["get", "ID_ESTADO"], 0], parseInt(stateId)],
        ["==", ["to-number", ["get", "ENTIDAD"], 0], parseInt(stateId)]
      ];
      let sourceLayer = "states";

      let stateFeatures = map.current.querySourceFeatures(source, {
        sourceLayer: sourceLayer,
        filter: filter
      });

      if (stateFeatures.length > 0) {
        stateFeatures[0].sourceLayer = sourceLayer;
      }

      return stateFeatures;
    },
    [raceType, year]
  );

  const getParallelFeatures = useCallback(
    (raceType, year) => {
      let source = `${raceType}-mx-${year}-`;
      let filter = [];
      let newFeatures = [];
      let sourceLayer = "states";

      if (lastFeature) {
        switch (lastFeature.sourceLayer) {
          case "states":
            source += "state";
            filter = [
              "any",
              [
                "==",
                ["to-number", ["get", "ID_ESTADO"], 0],
                parseInt(lastFeature.properties.ID_ESTADO)
              ],
              [
                "==",
                ["to-number", ["get", "ENTIDAD"], 0],
                parseInt(lastFeature.properties.ID_ESTADO)
              ],
              [
                "==",
                ["to-number", ["get", "ID_ESTADO"], 0],
                parseInt(lastFeature.properties.ENTIDAD)
              ],
              [
                "==",
                ["to-number", ["get", "ENTIDAD"], 0],
                parseInt(lastFeature.properties.ENTIDAD)
              ]
            ];
            sourceLayer = "states";
            break;
          case "municipals":
            source += "mun";
            filter = [
              "==",
              ["to-number", ["get", "UNIQUE_ID"], 0],
              parseInt(lastFeature.properties.UNIQUE_ID)
            ];
            sourceLayer = "municipals";
            break;
          case "districts":
            if (raceType !== "cong") {
              source += "state";
              filter = [
                "any",
                [
                  "==",
                  ["to-number", ["get", "ID_ESTADO"], 0],
                  parseInt(lastFeature.properties.ID_ESTADO)
                ],
                [
                  "==",
                  ["to-number", ["get", "ENTIDAD"], 0],
                  parseInt(lastFeature.properties.ID_ESTADO)
                ],
                [
                  "==",
                  ["to-number", ["get", "ID_ESTADO"], 0],
                  parseInt(lastFeature.properties.ENTIDAD)
                ],
                [
                  "==",
                  ["to-number", ["get", "ENTIDAD"], 0],
                  parseInt(lastFeature.properties.ENTIDAD)
                ]
              ];
              sourceLayer = "states";
            } else {
              source += "dis";
              filter = [
                "all",
                [
                  "==",
                  ["to-number", ["get", "ID_DISTRITO_FEDERAL"], 0],
                  parseInt(lastFeature.properties.ID_DISTRITO_FEDERAL)
                ],
                [
                  "==",
                  ["to-number", ["get", "ID_ESTADO"], 0],
                  parseInt(lastFeature.properties.ID_ESTADO)
                ]
              ];
              sourceLayer = "districts";
            }
            break;
          default:
            break;
        }

        newFeatures = map.current.querySourceFeatures(source, {
          sourceLayer: sourceLayer,
          filter: filter
        });
      }

      return newFeatures;
    },
    [lastFeature]
  );

  const goHome = useCallback(
    (shouldRemoveFilter = true) => {
      map.current.flyTo({
        center: [DefaultLng, DefaultLat],
        zoom: DefaultZoom,
        duration: 2000,
        essential: true
      });
      unselectFeature();
      dispatch(updateParty(""));
      dispatch(updateTurnout(false));
      dispatch(updateMargin(false));

      if (!forceMun && !forceDis && !voteCircle) {
        if (stateLayerId.current) {
          showLayer(stateLayerId.current);
        }

        if (munLayerId.current) {
          hideLayer(munLayerId.current);
        }

        if (disLayerId.current) {
          hideLayer(disLayerId.current);
        }

        currentLayer.current = "states";
        lastStateFeature.current = null;
        lastMunFeature.current = null;
        lastDisFeature.current = null;
      }

      if (shouldRemoveFilter) {
        removeFilter();
      }
    },
    [
      dispatch,
      removeFilter,
      hideLayer,
      showLayer,
      unselectFeature,
      forceMun,
      forceDis,
      voteCircle
    ]
  );

  const goBack = useCallback(() => {
    if (!lastFeature) {
      map.current.flyTo({
        center: [DefaultLng, DefaultLat],
        zoom: DefaultZoom,
        duration: 1000,
        essential: true
      });
      unselectFeature();

      if (!forceMun && !forceDis && !party && !voteCircle) {
        if (stateLayerId.current) {
          showLayer(stateLayerId.current);
        }

        if (munLayerId.current) {
          hideLayer(munLayerId.current);
        }

        if (disLayerId.current) {
          hideLayer(disLayerId.current);
        }

        currentLayer.current = "states";
        lastStateFeature.current = null;
        lastMunFeature.current = null;
        lastDisFeature.current = null;
      }

      removeFilter();
      return;
    }

    const stateFeatures = getStateFeatures(
      lastFeature.properties.ID_ESTADO || lastFeature.properties.ENTIDAD
    );

    if (forceMun || forceDis || voteCircle || party) {
      const featureCollection = {
        type: "FeatureCollection",
        features: stateFeatures
      };
      const bounds = turf.bbox(featureCollection);
      map.current.fitBounds(bounds, {
        padding: 100,
        center: turf.center(
          turf.points([
            [bounds[0], bounds[1]],
            [bounds[2], bounds[3]]
          ])
        ).geometry.coordinates
      });
      unselectFeature();
    } else {
      switch (lastFeature.sourceLayer) {
        case "municipals":
          if (
            raceType === "cong" &&
            lastDisFeature &&
            lastDisFeature.current &&
            (lastDisFeature.current[0].properties.ID_ESTADO !==
              lastFeature.properties.ID_ESTADO ||
              lastDisFeature.current[0].properties.ENTIDAD !==
                lastFeature.properties.ID_ESTADO)
          ) {
            selectFeature(
              lastDisFeature.current,
              null,
              null,
              true,
              ZOOM_DIR_ENUM.BACKWARD,
              true
            );
          } else {
            selectFeature(
              stateFeatures,
              null,
              null,
              true,
              ZOOM_DIR_ENUM.BACKWARD,
              true
            );
          }
          break;
        case "districts":
          selectFeature(
            stateFeatures,
            null,
            null,
            true,
            ZOOM_DIR_ENUM.BACKWARD,
            true
          );
          break;
        default:
          unselectFeature();
          break;
      }
    }
  }, [
    lastStateFeature,
    lastDisFeature,
    lastFeature,
    raceType,
    forceMun,
    forceDis,
    party,
    voteCircle,
    getStateFeatures,
    selectFeature,
    unselectFeature,
    hideLayer,
    showLayer,
    removeFilter
  ]);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.REACT_APP_MAPBOX_STYLE_URL,
      center: [lng, lat],
      zoom: zoom,
      projection: {
        name: "mercator"
      },
      maxBounds: [MaxBounds.sw, MaxBounds.ne],
      minZoom: 3,
      maxZoom: 16
    });

    leafletMap.current = L.map(leafletMapContainer.current, {
      center: [40, -74.5],
      zoom: 9,
      zoomControl: false,
      attributionControl: false
    });

    map.current.on("load", () => {
      firstLayerId.current = "states";

      map.current.on("move", () => {
        const bounds = map.current.getBounds();
        const mapPosition = {
          center: map.current.getCenter(),
          bounds: {
            sw: bounds.getSouthWest(),
            ne: bounds.getNorthEast()
          },
          zoom: map.current.getZoom()
        };

        // console.log("Map Position", mapPosition);
      });

      map.current.on("click", function (e) {
        // Prevent the map's default behavior of zooming
        e.preventDefault();
      });

      map.current.on("dblclick", function (e) {
        // Prevent the map's default behavior of zooming
        e.preventDefault();
      });

      // Disable tilting (pitching)
      map.current.dragRotate.disable();
      map.current.touchPitch.disable();
      map.current.touchZoomRotate.disableRotation();
      map.current.doubleClickZoom.disable();

      loadLayers(raceType, year, party, forceMun, forceDis);
      setMapReady(true);

      // size all text up by 150% if ~4k
      if (window.innerWidth >= 3000) {
        const layers = map.current.getStyle().layers;
        for (const layer of layers) {
          if (
            layer.type === "symbol" &&
            layer.layout &&
            "text-size" in layer.layout
          ) {
            const currentSize = map.current.getLayoutProperty(
              layer.id,
              "text-size"
            );
            // Scale up text size by a factor (e.g., 1.5)
            const newSize =
              (typeof currentSize === "number" ? currentSize : 12) * 2;
            map.current.setLayoutProperty(layer.id, "text-size", newSize);
          }
        }
      }

      map.current.resize();

      // Cleanup
      return () => {
        map.current.remove();
        leafletMap.current.remove();
      };
    });
  });

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
    if (app.showRaceboard && lastFeature) {
      let features = [];
      features[0] = lastFeature;
      loadMarker(features, app.markerLng, app.markerLat);
    }
  }, [
    turnout,
    lastFeature,
    loadMarker,
    app.markerLng,
    app.markerLat,
    app.showRaceboard
  ]);

  useEffect(() => {
    if (document.getElementById("react-sketch-canvas__stroke-group-0"))
      document
        .getElementById("react-sketch-canvas__stroke-group-0")
        .setAttribute("mask", "");
  }, []);
  
  const isJsonString = useCallback((str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }, []);
  
  const connection = useRef(null); 

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WS)

    // Connection opened
    socket.addEventListener("open", (event) => {
      //socket.send("Connection established")
    })

    // Listen for messages
    socket.addEventListener("message", (event) => {
      console.log("Message from server: ", event.data);
      if (isJsonString(event.data)) {
        let msg = JSON.parse(event.data);
        console.log(msg);
        if (msg.action === 'set_racetype_year' && msg.racetype && msg.year) {
          dispatch(updateYear(msg.year));
          dispatch(updateRaceType(msg.racetype));
        }
        else if (msg.action === 'set_bookmark' && msg.bookmark) {
          dispatch(setShowBookmarks(true));
          const bm = 'bm_' + msg.bookmark.replace(/[\W_]+/g, "_") + '_go';
          setTimeout(
          () => {
            if (document.getElementById(bm))
              document.getElementById(bm).click()
            },
            200
          );
        }
      }
      else {
        console.log('Invalid JSON Format.');
      }
    })

    connection.current = socket;

    return () => connection.current.close()
  }, [dispatch, isJsonString])

  return (
    <AppShell
      padding={0}
      layout="alt"
      navbar={
        <Navbar
          width={{ base: 300 }}
          sx={{
            backgroundColor: "transparent",
            right: app.reverse ? "0px" : "auto",
            left: app.reverse ? "auto" : "0px"
          }}
        >
          <NavbarNested
            mapRef={map}
            markerRef={marker}
            popupRef={popup}
            canvasRef={canvas}
            goHome={goHome}
            goBack={goBack}
            addFilter={addFilter}
            selectFeature={selectFeature}
            unselectFeature={unselectFeature}
            zoomAndReveal={zoomAndReveal}
            hideLayer={hideLayer}
            showLayer={showLayer}
            getParallelFeatures={getParallelFeatures}
          />
        </Navbar>
      }
      header={
        <Header height={70} p="xs">
          {/* Header content */}
        </Header>
      }
    >
      <TopBar app={app} />
      <Box
        className="map-root"
        style={{
          width: "100%",
          display: "flex",
          position: "absolute",
          left: "0px"
        }}
      >
        <div ref={mapContainer} className="map-container" />
        <div
          ref={leafletMapContainer}
          style={{
            width: "100%",
            height: "100%",
            visibility: "hidden",
            position: "absolute",
            zIndex: -1
          }}
        />
      </Box>
      <CreateBookmarkModal
        mapRef={map}
        markerRef={marker}
        open={modal === "MODAL_CREATE_BOOKMARK"}
        onClose={onCloseModal}
      />
      <Raceboard
        open={app.showRaceboard && !(raceType === "cong")}
        onClose={onCloseRaceboard}
        app={app}
      />
      <RaceboardCong
        open={app.showRaceboard && raceType === "cong"}
        onClose={onCloseRaceboard}
        app={app}
      />
      <Telestrator innerRef={canvas} />
      <RaceChart />
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
