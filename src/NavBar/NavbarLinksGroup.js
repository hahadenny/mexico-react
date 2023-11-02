import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  Switch,
  createStyles,
  rem
} from "@mantine/core";
//import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import MenuBookmarksListing from "../components/Widgets/Bookmarks/Listing/MenuBookmarksListing";
import { Parties } from "../mapbox/parties";

import { update as updateParty } from "../actions/partySlice";
import { update as updateRaceType } from "../actions/raceTypeSlice";
import { update as updateYear } from "../actions/yearSlice";
import { update as updateForceMun } from "../actions/forceMunSlice";
import { update as updateForceDis } from "../actions/forceDisSlice";
import { update as updateVoteCircle } from "../actions/voteCircleSlice";
import { update as updateTurnout } from "../actions/turnoutSlice";
import { update as updateMargin } from "../actions/marginSlice";
import {
  setOpenModal,
  setShowBookmarks,
  setShowRaceboard,
  setClickedMarker,
  setShowRaceChart,
  setShowTelestrator,
  setReverse
} from "../redux/app/slice";
import { appSelector } from "../redux/app/selectors";
import { logout } from "../redux/auth/slice";
import { useLogOutMutation } from "../api/auth";
import { useSignOut } from "react-auth-kit";
import triangle from "../assets/img/triangle.png";
import { FormattedMessage } from "react-intl";
import TelestratorOptions from "../components/Widgets/Telestrator/TelestratorOptions";
import { ZOOM_DIR_ENUM } from "../enums/zoomDir";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    borderLeft: "25px solid #000",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingTop: "7px",
    paddingBottom: "7px",
    marginBottom: "2px",
    backgroundColor: "rgba(188,188,188,0.3)",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      /*backgroundColor: 
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],*/
      backgroundColor: "rgba(61,61,61,0.3)",
      color: theme.colorScheme === "dark" ? theme.white : theme.black
    }
  },
  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(44),
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black
    }
  },
  selected: {
    /*backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],*/
    backgroundColor: "rgba(61,61,61,0.3) !important",
    backgroundImage: "url(" + triangle + ")",
    backgroundSize: "6% 100%",
    backgroundRepeat: "no-repeat",
    borderBottom: "solid 1px #222222",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    "&:after": {
      //content: '"<<"',
      //paddingLeft: 10
    },
    fontWeight: "bold"
  },
  opened: {
    backgroundColor: "rgba(61,61,61,0.3)"
  },
  sublink: {
    //paddingLeft: "3.0rem",
    fontSize: "0.75rem",
    backgroundImage: "none !important",
    marginLeft: "16px !important",
    marginRight: "16px !important"
  },
  chevron: {
    transition: "transform 200ms ease"
  },
  toggle: {
    flexBasis: "100%",
    marginTop: 6,
    marginLeft: "1.6rem"
  }
}));

export function LinksGroup({
  icon: Icon,
  label,
  itemKey,
  initiallyOpened,
  links,
  toggle,
  mapRef,
  markerRef,
  popupRef,
  canvasRef,
  addFilter,
  selectFeature,
  unselectFeature,
  zoomAndReveal,
  hideLayer,
  showLayer,
  getParallelFeatures
}) {
  const { classes /*, theme*/ } = useStyles();
  const hasLinks = Array.isArray(links);

  const [opened, setOpened] = useState(initiallyOpened || false);

  //const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;

  const dispatch = useDispatch();
  const year = useSelector((state) => state.year.value);
  const raceType = useSelector((state) => state.raceType.value);
  const party = useSelector((state) => state.party.value);
  const forceMun = useSelector((state) => state.forceMun.value);
  const forceDis = useSelector((state) => state.forceDis.value);
  const voteCircle = useSelector((state) => state.voteCircle.value);
  const turnout = useSelector((state) => state.turnout.value);
  const margin = useSelector((state) => state.margin.value);
  const lastFeature = useSelector((state) => state.feature.value);
  const app = useSelector(appSelector);
  let [toggleYear, setToggleYear] = useState(true);

  const [logOut] = useLogOutMutation();
  const signOut = useSignOut();

  const items = (hasLinks ? links : []).map((link) => {
    const yearLink = (
      <Text
        component="a"
        className={`${classes.link} ${
          year === link.year &&
          raceType === link.raceType /* && party === null*/
            ? classes.selected
            : ""
        }`}
        href={"/"}
        onClick={(event) => {
          event.preventDefault();  

          if (year !== link.year || raceType !== link.raceType) {
            //dispatch(setShowRaceboard(false));
            //dispatch(setClickedMarker(false));
            toggleYear = false;
          }
          setToggleYear(!toggleYear);
          dispatch(updateRaceType(link.raceType));
          dispatch(updateYear(link.year));
          dispatch(updateParty(null));

          unselectFeature();
          
          setTimeout(() => {            
            const newFeatures = getParallelFeatures(link.raceType, link.year);

            if (newFeatures.length > 0) {
              newFeatures[0].sourceLayer = lastFeature.sourceLayer;

              selectFeature(
                newFeatures,
                null,
                null,
                false,
                ZOOM_DIR_ENUM.FORWARD,
                false
              );
            }
          }, 1000);

          // dispatch(updateTurnout(false));
          // dispatch(updateMargin(false));
        }}
      >
        {link.label}
      </Text>
    );

    const partyLinks = (
      Parties[`${link.raceType}-${link.year}`]
        ? Object.keys(Parties[`${link.raceType}-${link.year}`])
        : []
    ).map((partyName) => (
      <Text
        component="a"
        className={`${classes.link} ${classes.sublink} ${
          year === link.year &&
          raceType === link.raceType &&
          party === partyName
            ? classes.selected
            : ""
        }`}
        key={partyName}
        href={"/"}
        onClick={(event) => {
          event.preventDefault();

          if (year !== link.year || raceType !== link.raceType) {
            dispatch(setShowRaceboard(false));
            dispatch(setClickedMarker(false));
          }            
          dispatch(updateRaceType(link.raceType));
          dispatch(updateYear(link.year));
          dispatch(updateParty(partyName));
          dispatch(updateTurnout(false));
          dispatch(updateMargin(false));
        }}
      >
        {partyName}
      </Text>
    ));

    const generalLink = (
      <Text
        component="a"
        className={`${classes.link} ${classes.sublink} ${
          year === link.year &&
          raceType === link.raceType &&
          !margin &&
          !turnout &&
          !party
            ? classes.selected
            : ""
        }`}
        key={"general"}
        href={"/"}
        onClick={(event) => {
          event.preventDefault();

          if (year !== link.year || raceType !== link.raceType) {
            dispatch(setShowRaceboard(false));
            dispatch(setClickedMarker(false));
          }
          dispatch(updateRaceType(link.raceType));
          dispatch(updateYear(link.year));
          dispatch(updateParty(null));
          dispatch(updateTurnout(false));
          dispatch(updateMargin(false));
        }}
      >
        <FormattedMessage id={"GeneralResults"} />
      </Text>
    );

    const turnoutLink = (
      <Text
        component="a"
        className={`${classes.link} ${classes.sublink} ${
          year === link.year && raceType === link.raceType && turnout
            ? classes.selected
            : ""
        }`}
        key={"turnout"}
        href={"/"}
        onClick={(event) => {
          event.preventDefault();

          if (year !== link.year || raceType !== link.raceType) {
            dispatch(setShowRaceboard(false));
            dispatch(setClickedMarker(false));
          }
          dispatch(updateRaceType(link.raceType));
          dispatch(updateYear(link.year));
          dispatch(updateParty(null));
          dispatch(updateTurnout(true));
          dispatch(updateMargin(false));
        }}
      >
        <FormattedMessage id={"Turnout"} />
      </Text>
    );

    const marginLink = (
      <Text
        component="a"
        className={`${classes.link} ${classes.sublink} ${
          year === link.year && raceType === link.raceType && margin
            ? classes.selected
            : ""
        }`}
        key={"margin"}
        href={"/"}
        onClick={(event) => {
          event.preventDefault();

          if (year !== link.year || raceType !== link.raceType) {
            dispatch(setShowRaceboard(false));
            dispatch(setClickedMarker(false));
          }
          dispatch(updateRaceType(link.raceType));
          dispatch(updateYear(link.year));
          dispatch(updateParty(null));
          dispatch(updateTurnout(false));
          dispatch(updateMargin(true));
        }}
      >
        <FormattedMessage id={"MarginResults"} />
      </Text>
    );

    return (
      <div key={link.key}>
        {yearLink}
        {toggleYear && (
        <div>
          {year === link.year && raceType === link.raceType
            ? generalLink
            : undefined}
          {year === link.year && raceType === link.raceType
            ? marginLink
            : undefined}
          {year === link.year && raceType === link.raceType
            ? turnoutLink
            : undefined}
          {year === link.year && raceType === link.raceType
            ? partyLinks
            : undefined}
        </div>
        )}
      </div>
    );
  });

  const getStoreValue = (itemKey) => {
    let storeVal = null;

    switch (itemKey) {
      case "ForceMunicipals":
        storeVal = forceMun;
        break;
      case "ForceDistricts":
        storeVal = forceDis;
        break;
      case "VoteCircles":
        storeVal = voteCircle;
        break;
      case "RaceChart":
        storeVal = app.showRaceChart;
        break;
      case "Telestrator":
        storeVal = app.showTelestrator;
        break;
      case "Reverse":
        storeVal = app.reverse;
        break;
      default:
        break;
    }

    return storeVal;
  };

  const setStoreValue = (itemKey, value) => {
    switch (itemKey) {
      case "ForceMunicipals":
        dispatch(updateForceMun(value));
        break;
      case "ForceDistricts":
        dispatch(updateForceDis(value));
        break;
      case "VoteCircles":
        dispatch(updateVoteCircle(value));
        break;
      case "RaceChart":
        dispatch(setShowRaceChart(value));
        break;
      case "Telestrator":
        dispatch(setShowTelestrator(value));
        break;
      case "Reverse":
        dispatch(setReverse(value));
        break;
      default:
        break;
    }
  };

  const itemClicked = () => {
    if (links) setOpened((o) => !o);
    else {
      if (itemKey === "Logout") {
        logOut().then((res) => {
          if (res.error) {
            console.log(res.error);
          } else {
            dispatch(logout());
            signOut();
          }
        });
      } else if (itemKey === "AddBookmark") {
        dispatch(setOpenModal("MODAL_CREATE_BOOKMARK"));
      } else if (itemKey === "Bookmarks") {
        setOpened(!app.showBookmarks);
        dispatch(setShowBookmarks(!app.showBookmarks));
      }
    }
  };

  return (
    <div>
      <UnstyledButton
        onClick={() => itemClicked()}
        className={`${classes.control} ${opened ? classes.opened : ""}`}
        id={itemKey + "_menubtn"}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {Icon && (
              <ThemeIcon variant="light" size={30}>
                <Icon size="1.1rem" />
              </ThemeIcon>
            )}
            <Box ml="md">{label}</Box>
          </Box>
          {/*hasLinks && (
              {<ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none"
              }}
            />
          )*/}
          {toggle && (
            <div className={classes.toggle}>
              <Switch
                size="md"
                onLabel={"On"}
                offLabel={"Off"}
                checked={getStoreValue(itemKey)}
                onChange={(event) =>
                  setStoreValue(itemKey, event.target.checked)
                }
              />
            </div>
          )}
        </Group>
      </UnstyledButton>
      {itemKey === "Bookmarks" && app.showBookmarks && (
        <MenuBookmarksListing
          mapRef={mapRef}
          markerRef={markerRef}
          popupRef={popupRef}
          addFilter={addFilter}
          zoomAndReveal={zoomAndReveal}
          hideLayer={hideLayer}
          showLayer={showLayer}
        />
      )}
      {itemKey === "Telestrator" && app.showTelestrator && (
        <TelestratorOptions canvasRef={canvasRef} />
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </div>
  );
}
