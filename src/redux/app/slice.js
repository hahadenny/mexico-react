import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    openModal: false,    
    showBookmarks: false,  
    showRaceboard: false,
    showRaceChart: false,
    showTelestrator: false,
    telestratorStroke: 4,
    telestratorColor: 'red',
    showColorPicker: false,
    reverse: false,
    raceboard: {
        layer: '',
        state: '',
        mun: '',
        munId: '',
        totalVote: '',
        turnoutPercent: '',
        p1Party: '',
        p1Name: '',
        //p1Title: '',
        p1Vote: '',
        p1Percent: '',
        //p1Color: '',
        p2Party: '',
        p2Name: '',
        //p2Title: '',
        p2Vote: '',
        p2Percent: '',
        //p2Color: '',
        p3Party: '',
        p3Name: '',
        //p3Title: '',
        p3Vote: '',
        p3Percent: '',
        //p3Color: '',
        p4Party: '',
        p4Name: '',
        //p4Title: '',
        p4Vote: '',
        p4Percent: '',
        //p4Color: '',
    }
};

export const app = createSlice({
    name: 'app',
    initialState,
    /**
     * Functions to change the app state
     */
    reducers: {   
        setOpenModal: (state, {payload}) => {
            state.openModal = payload;
        },
        setShowBookmarks: (state, {payload}) => {
            state.showBookmarks = payload;
        },
        setShowRaceboard: (state, {payload}) => {
            state.showRaceboard = payload;
        },
        setShowRaceChart: (state, {payload}) => {
            state.showRaceChart = payload;
        },
        setShowTelestrator: (state, {payload}) => {
            state.showTelestrator = payload;
        },
        setTelestratorStroke: (state, {payload}) => {
            state.telestratorStroke = payload;
        },
        setTelestratorColor: (state, {payload}) => {
            state.telestratorColor = payload;
        },
        setShowColorPicker: (state, {payload}) => {
            state.showColorPicker = payload;
        },
        setReverse: (state, {payload}) => {
            state.reverse = payload;
        },
        setRaceboard: (state, {payload}) => {
            for (const [key, value] of Object.entries(payload)) {
                if (typeof state.raceboard[key] !== 'undefined') {
                    state.raceboard[key] = value;
                }
            }
        },
        setRaceLayer: (state, {payload}) => {
            state.raceboard.layer = payload;
        },
        setRaceState: (state, {payload}) => {
            state.raceboard.state = payload;
        },
        setRaceMun: (state, {payload}) => {
            state.raceboard.mun = payload;
        },
        setRaceMunId: (state, {payload}) => {
            state.raceboard.munId = payload;
        },
        setRaceTotalVote: (state, {payload}) => {
            state.raceboard.totalVote = payload;
        },     
        setRaceTurnoutPercent: (state, {payload}) => {
            state.raceboard.turnoutPercent = payload;
        },  
        setRaceParty: (state, {payload}) => {
            state.raceboard['p'+payload.i+'Party'] = payload.payload;
        },
        setRaceColor: (state, {payload}) => {
            state.raceboard['p'+payload.i+'Color'] = payload.payload;
        },
        setRaceName: (state, {payload}) => {
            state.raceboard['p'+payload.i+'Name'] = payload.payload;
        },
        setRaceTitle: (state, {payload}) => {
            state.raceboard['p'+payload.i+'Title'] = payload.payload;
        },
        setRaceVote: (state, {payload}) => {
            state.raceboard['p'+payload.i+'Vote'] = payload.payload;
        },
        setRacePercent: (state, {payload}) => {
            state.raceboard['p'+payload.i+'Percent'] = payload.payload;
        },
    }
});

export const {
    setOpenModal,
    setShowBookmarks,   
    setShowRaceboard,
    setShowRaceChart,
    setShowTelestrator,
    setReverse,
    setTelestratorStroke,
    setTelestratorColor,
    setShowColorPicker,
    setRaceboard,
    setRaceLayer,
    setRaceState,
    setRaceMun,
    setRaceMunId,
    setRaceParty,
    setRaceColor,
    setRaceName,
    setRaceTitle,    
    setRaceTotalVote,
    setRaceTurnoutPercent,
    setRaceVote,
    setRacePercent,
} = app.actions;
export default app.reducer;