import {useCallback} from "react";
import storage from "../helpers/storage";

export function useColumnWidthCalculator(tabId) {
    return useCallback((e) => {
        const allColumns = e.columnApi.columnModel.displayedColumns

        const coefficient = e.clientWidth / allColumns.reduce((partialSum, el) => partialSum + el.actualWidth, 0);

        allColumns.forEach(el => {
            e.columnApi.setColumnWidth(el, el.actualWidth * coefficient)
        });
        storage.set(tabId + 'ColumnState', e.columnApi.getColumnState());
    }, [tabId]);
}
