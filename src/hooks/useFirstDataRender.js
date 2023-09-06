import {useCallback} from "react";
import storage from "../helpers/storage";
//import {useDispatch} from "react-redux";

export function useFirstDataRender(tabName, importedData, playlistId, ref) {
    //const dispatch = useDispatch()

    return useCallback((event = {}) => {
        if (event?.type === 'modelUpdated') {
            return;
        }
        const columnState = storage.get(`${tabName}ColumnState`);

        if (!columnState || columnState.length === 0) {
            return;
        }

        event.columnApi.applyColumnState({state: columnState, applyOrder: true});

        const displayedColumns = event.columnApi.columnModel.displayedColumns;
        const columnWidths = columnState
            .filter(item => !item.hide)
            .map(item => ({key: item.colId.toString(), newWidth: item.width}))

        event.columnApi.setColumnWidths(columnWidths);

        const lastColumn = displayedColumns[displayedColumns.length - 1]

        if (lastColumn && ['firstDataRendered', 'gridReady'].includes(event.type)) {
            lastColumn.colDef.resizable = false
            lastColumn.resizable = false;
        }

        if (importedData) {
            event?.api.selectAll()
        }
    }, [tabName, importedData])
}