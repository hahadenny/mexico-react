//import {localPreference} from "../../data/preference";

export const selectors = (state) => state.auth;
/*export const preferencesSelector = (state) => {
    const {preferences} = (state.auth.user?.settings || {});
    const preferenceKeys = new Set(preferences?.map(x => x.preference));
    const localPreferenceKeys =  new Set(localPreference.map(x => x.preference));
    const mergedLocalPreferences = [...localPreference];

    if (!preferences || (Array.isArray(preferences) && preferences.length === 0)) {
        return localPreference;
    }
    if (preferences.length !== localPreference.length) {
        return preferences.filter(newPr => !localPreference.find(defPr => newPr.preference === defPr.preference)).concat(localPreference)
    }

    if(![...preferenceKeys].every((x) => localPreferenceKeys.has(x))) {
        for (const item of preferences) {
            if (!localPreferenceKeys.has(item.preference)) {
                preferenceKeys.delete(item.preference)
                mergedLocalPreferences.concat(preferences);
            }
        }
        return  mergedLocalPreferences
    }

    return preferences;
}*/
export const userSelector = (state) => state.auth.user
