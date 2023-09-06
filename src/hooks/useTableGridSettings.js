import {useCallback, useMemo} from "react";

import FolderNameRenderer from "../components/Grid/FolderNameRenderer";

const useTableGridSettings = (data, edited = false, editable = false) => {

    const defaultColDef = useMemo(() => {
        return {
            // flex: 1,
            filter: true,
            sortable: true,
            resizable: true,
            editable: true,
            readOnlyEdit: true
        };
    }, []);

    const autoGroupColumnDef = useMemo(() => {
        return {
            headerName: 'Name',
            rowDrag: edited,
            editable: editable,
            sortable: false,
            // singleClickEdit: editable,
            cellRendererParams: {
                checkbox: edited,
                // The renderer to use for inside the cell
                // (after grouping functions are added)
                // @see https://www.ag-grid.com/react-data-grid/group-cell-renderer/#reference-GroupCellRendererParams-innerRenderer
                innerRenderer: FolderNameRenderer
            },
        };
    }, [edited, editable]);

    const getDataPath = useCallback(function (data) {
        return data.tree;
    }, []);

    const getRowId = useCallback(function (params) {
        return params.data.id;
    }, []);

    return {
        defaultColDef,
        autoGroupColumnDef,
        getDataPath,
        getRowId
    };
};

export default useTableGridSettings;