import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, ScrollArea, createStyles, rem } from "@mantine/core";
import {
  /*IconList,
  IconChartCircles,
  IconVideo,
  IconSettings,
  IconBuildingMonument,
  IconBuildingArch,
  IconBuildingCommunity,
  IconChartTreemap,
  IconLogout2,
  IconBookmark,*/
  IconHome,
} from "@tabler/icons-react";
import { LinksGroup } from "./NavbarLinksGroup";
import { DefaultLng, DefaultLat, DefaultZoom } from "../mapbox/settings";
import {FormattedMessage} from 'react-intl';
import {
  setShowRaceboard,
} from "../redux/app/slice";
import { appSelector } from "../redux/app/selectors";

const menuData = [
  {
    label: <FormattedMessage id={'Presidential'} />,
    key: 'Presidential',
    //icon: IconBuildingMonument,
    initiallyOpened: true,
    links: [
      { key: "2018", label: "2018", year: "2018", raceType: "pres" },
      { key: "2012", label: "2012", year: "2012", raceType: "pres" },
      { key: "2006", label: "2006", year: "2006", raceType: "pres" }
    ]
  },
  {
    label: <FormattedMessage id={'Gubernatorial'} />,
    key: 'Gubernatorial',
    //icon: IconBuildingArch,
    initiallyOpened: false,
    links: [
      { key: "2018", label: "2018", year: "2018", raceType: "gov" },
      { key: "2012", label: "2012", year: "2012", raceType: "gov" },
      { key: "2006", label: "2006", year: "2006", raceType: "gov" }
    ]
  },
  {
    label: <FormattedMessage id={'Congressional'} />,
    key: 'Congressional',
    //icon: IconBuildingCommunity,
    initiallyOpened: false,
    links: [
      { key: "2021", label: "2021", year: "2021", raceType: "cong" },
      { key: "2015", label: "2015", year: "2015", raceType: "cong" },
      { key: "2009", label: "2009", year: "2009", raceType: "cong" }
    ]
  },
  {
    label: <FormattedMessage id={'AddBookmark'} />,
    key: 'AddBookmark',
    //icon: IconBookmark,
  },
  {
    label: <FormattedMessage id={'Bookmarks'} />,
    key: 'Bookmarks',
    //icon: IconList,
  },
  {
    label: <FormattedMessage id={'VoteCircles'} />,
    key: 'VoteCircles',
    //icon: IconChartCircles,
    toggle: true
  },
  // {
  //   label: "Media",
  //   key: 'Media',
  //   //icon: IconVideo,
  //   toggle: true
  // },
  {
    label: <FormattedMessage id={'ForceMunicipals'} />,
    key: 'ForceMunicipals',
    //icon: IconChartTreemap,
    toggle: true
  },
  {
    label: <FormattedMessage id={'ForceDistricts'} />,
    key: 'ForceDistricts',
    //icon: IconChartTreemap,
    toggle: true
  },  
  /*{
    label: <FormattedMessage id={'Settings'} />,
    key: 'Settings',
    //icon: IconSettings
  },*/
  {
    label: 'Race Chart',
    key: 'RaceChart',
    toggle: true
  },
  {
    label: 'Telestrator',
    key: 'Telestrator',
    toggle: true
  },
  {
    label: 'Reverse',
    key: 'Reverse',
    toggle: true
  },
  {
    label: <FormattedMessage id={'Logout'} />,
    key: 'Logout',
    //icon: IconLogout2
  }
];

const useStyles = createStyles((theme) => ({
  navbar: {
    //backgroundColor:
      //theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    backgroundColor: 'rgba(237,237,237,0.5)',
    backdropFilter:'blur(5px)',
    paddingBottom: 0,
    marginTop: '50px',
    overflowX: "hidden"
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -0.75)`
  },

  linksInner: {
    //paddingTop: theme.spacing.md,
    paddingTop: '15px',
    paddingBottom: theme.spacing.xl
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`
  }
}));

export default function NavbarNested({mapRef, markerRef, popupRef, canvasRef, addFilter, removeFilter}) {
  const { classes } = useStyles();
  const raceType = useSelector((state) => state.raceType.value);
  const dispatch = useDispatch();
  
  const app = useSelector(appSelector);

  const links = menuData.map((item) =>
    item.key === "ForceDistricts" && raceType !== "cong" ? undefined : (
      <LinksGroup
        {...item}
        itemKey={item.key}
        mapRef={mapRef}
        markerRef={markerRef}
        popupRef={popupRef}
        canvasRef={canvasRef}
        addFilter={addFilter}
      />
    )
  );
  
  const goHome = useCallback(() => {
    mapRef.current.flyTo({
        center: [DefaultLng, DefaultLat],
        zoom: DefaultZoom,
        bearing: 0,
        pitch: 0,         
        duration: 3000, // Animate over 3 seconds
        essential: true // This animation is considered essential with respect to prefers-reduced-motion
    });
    dispatch(setShowRaceboard(false));
    removeFilter();
  }, [mapRef, dispatch, removeFilter]);
  
  let homeIconSize = '1.2rem';
  //if (window.screen.availWidth > 3000)
    //homeIconSize = '2.4rem';

  return (
    <Navbar width={{ sm: 250 }} p="sm" className={classes.navbar} sx={{ right: app.reverse ? '0px' : 'auto', left: app.reverse ? 'auto' : '0px' }}>
      <Navbar.Section className={classes.header}></Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={'home'} style={{marginTop:'20px', width:'100%', textAlign:'center', backgroundColor:'#000', fontWeight:'600', padding:'5px 0px', fontSize:'18px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}} onClick={goHome}><IconHome size={homeIconSize} strokeWidth="2.3" /> &nbsp;Home</div>
        {links && <div className={classes.linksInner}>{links}</div>}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}></Navbar.Section>
    </Navbar>
  );
}
