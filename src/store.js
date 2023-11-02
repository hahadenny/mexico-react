import { combineReducers, configureStore } from "@reduxjs/toolkit";
import raceTypeReducer from "./actions/raceTypeSlice";
import partyReducer from "./actions/partySlice";
import yearReducer from "./actions/yearSlice";
import featureReducer from "./actions/featureSlice";
import forceMunReducer from "./actions/forceMunSlice";
import forceDisReducer from "./actions/forceDisSlice";
import voteCircleReducer from "./actions/voteCircleSlice";
import turnoutReducer from "./actions/turnoutSlice";
import marginReducer from "./actions/marginSlice";
import authReducer from "./redux/auth/slice";
import appReducer from "./redux/app/slice";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandler";
import { authApi } from "./api/auth";
import { bookmarksApi } from "./api/bookmarks";

const reducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [bookmarksApi.reducerPath]: bookmarksApi.reducer,
  auth: authReducer,
  app: appReducer,
  raceType: raceTypeReducer,
  party: partyReducer,
  year: yearReducer,
  feature: featureReducer,
  forceMun: forceMunReducer,
  forceDis: forceDisReducer,
  voteCircle: voteCircleReducer,
  turnout: turnoutReducer,
  margin: marginReducer
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      ErrorHandlerMiddleware,
      authApi.middleware,
      bookmarksApi.middleware
    )
});
