import {useCallback} from 'react'
import storage from '../helpers/storage'

export const useGridColumnChanged = (prefix) => {
    return useCallback((event) => {
        if (
            (event?.finished && ['uiColumnDragged', 'toolPanelUi'].includes(event?.source))
            || ['sortChanged', 'dragStopped'].includes(event?.type)
        ) {

            let columnState = event.columnApi.getColumnState()
            const allColumns = event.columnApi.columnModel.displayedColumns

            if (event?.column) {
                if (event.type === 'columnVisible' && !event.visible) {

                } else {
                    const currentColDef = event.column.getColDef()
                    currentColDef.suppressSizeToFit = true
                    event.api?.sizeColumnsToFit()
                    event.column.setColDef(currentColDef)
                    event.column.suppressSizeToFit = true;
                    columnState = columnState.map(c => event.column.colId === c.colId ? {...c, suppressSizeToFit: true} : c);
                }
            }

            if (event.type === 'dragStopped' && !!event.target.ariaColIndex) {
                allColumns.forEach(el => {
                    el.colDef.resizable = el.colId !== allColumns[allColumns.length - 1].colId;
                    el.setColDef(el.colDef)
                })
            }
            storage.set(prefix + 'ColumnState', columnState)
        }
    }, [prefix]);
}
