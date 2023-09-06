/**
 * Functions to return redux state values of the app
 */
 
export const appSelector = (state) => state.app;
 
export const getOpenModal = (state) => state.app.openModal;
export const getShowBookmarks = (state) => state.app.showBookmarks;
export const getShowRaceboard = (state) => state.app.showRaceboard;