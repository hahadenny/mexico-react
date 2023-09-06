import React, {useCallback} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const GROUP_COLUMN = 'ag-Grid-AutoColumn';

export const onCellEditingStarted = (e) => {
    if (e.data._type === 'group') {
        e.api.stopEditing();
    }
}

const TableGrid = ({onGridReady, ...props}, ref) => {
    const gridReady = useCallback((params) => {
        if (ref) {
           ref.current = params;
        }
        onGridReady && onGridReady(params);
    }, [onGridReady, ref])
    return (
        <AgGridReact onGridReady={gridReady} {...props} />
    );
};

export default React.forwardRef(TableGrid);