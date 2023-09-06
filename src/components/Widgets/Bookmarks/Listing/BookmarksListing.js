import React, {
    useCallback,
    //useContext,
    //useEffect,
    //useImperativeHandle,
    //useMemo,
    useRef,
    useState
} from 'react';
import {useDispatch, useSelector} from "react-redux";
//import {userSelector} from "../../../../redux/auth/selectors";
import TableGrid from "../../../Grid/TableGrid";
import useBookmarksTableGrid from '../../../../hooks/bookmarks/useBookmarksTableGrid';
import {useTableGridDeleteRows} from "../../../../hooks/useTableGridDeleteRows";
import {
    useDeleteBookmarksMutation, 
    useGetBookmarksQuery,
} from '../../../../api/bookmarks';
import {useFirstDataRender} from "../../../../hooks/useFirstDataRender";
import {useGridColumnChanged} from '../../../../hooks/useGridColumnChanged'
import {useColumnWidthCalculator} from "../../../../hooks/useColumnWidthCalculator";
import {
    useUpdateBookmarkMutation,
    useUpdateBookmarkOrdersMutation,
} from '../../../../api/bookmarks';
import UpdateBookmarkModal from "../Update/UpdateBookmarkModal";
import {getOpenModal} from "../../../../redux/app/selectors";
import { update as updateParty } from "../../../../actions/partySlice";
import { update as updateRaceType } from "../../../../actions/raceTypeSlice";
import { update as updateYear } from "../../../../actions/yearSlice";
import { update as updateForceMun } from "../../../../actions/forceMunSlice";
import { update as updateForceDis } from "../../../../actions/forceDisSlice";
import { update as updateVoteCircle } from "../../../../actions/voteCircleSlice";
import {
    setOpenModal,
    setShowBookmarks, 
} from "../../../../redux/app/slice";
import ActionButton from "../../../Grid/ActionButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BookmarksListing = ({mapRef}) => {
    const [page/*, setPage*/] = useState(1);
    const gridRef = useRef();
    const dispatch = useDispatch();
    const modal = useSelector(getOpenModal);
    const {data: bookmarks} = useGetBookmarksQuery(page);
    const [updateBookmark] = useUpdateBookmarkMutation();
    const [updateBookmarkOrders] = useUpdateBookmarkOrdersMutation();
    const [deleteBookmarks] = useDeleteBookmarksMutation();
    
    const prefix = 'bookmarks';
    const onFirstDataRendered = useFirstDataRender(prefix);
    const onGridSizeChanged = useColumnWidthCalculator(prefix);
    const onGridColumnChanged = useGridColumnChanged(prefix);
    
    const onEdit = useCallback((params) => {
        const {data} = params;
        if (data._type === 'group') {
            return;
        }
        dispatch(setOpenModal('MODAL_UPDATE_BOOKMARK'))
    }, [dispatch]);
    
    const deleteBookmarkGroups = useCallback(() => {
    }, []);
    
    const onDelete = useTableGridDeleteRows(gridRef, deleteBookmarks, deleteBookmarkGroups, 'Bookmark');
    
    const onGo = useCallback((params) => {
        const data = JSON.parse(params.data.data);        
        dispatch(updateRaceType(data['raceType']));        
        dispatch(updateParty(data['party']));
        dispatch(updateForceMun(data['forceMun']));
        dispatch(updateForceDis(data['forceDis']));
        dispatch(updateVoteCircle(data['voteCircle']));
        dispatch(updateYear(data['year']));
        if (data['lng']) {
            mapRef.current.flyTo({
                center: [data['lng'], data['lat']],
                zoom: data['zoom'],
                bearing: data['bearing'],
                pitch: data['pitch'],                
            });
        }
        dispatch(setShowBookmarks(false));
    }, [dispatch, mapRef]);
    
    const onBack = useCallback((params) => {
        dispatch(setShowBookmarks(false));        
        setTimeout(() => {
            //fixing weird resize issue
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }, [dispatch]);
    
    const onCloseBookmarkModal = useCallback((data) => {
        dispatch(setOpenModal(false));
    }, [dispatch]);
    
    const {
        convertedData, columnDefs, defaultColDef
    } = useBookmarksTableGrid(bookmarks?.data, true, onEdit, onDelete, onGo);
    
    const onCellEditingStopped = useCallback(e => {
        updateBookmark({
            id: e.data.id,
            name: e.data.name,
        }).then(rsp => {
        });
    }, [updateBookmark]);
    
    const onRowDragEnd = useCallback(e => {
        const rowOrders = [];
        gridRef.current?.api.forEachNodeAfterFilterAndSort((node) => {
            let rdata = {id: node.data.id, order: node.rowIndex};
            rowOrders.push(rdata);
        });
        updateBookmarkOrders({
            rowOrders: rowOrders
        }).then(rsp => {
        });
    }, [gridRef, updateBookmarkOrders]);
    
    return (
        <>
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
                {/*<HeaderOfTabs onSearch={onSearch} tabId={tab.id} isGearShown={false}/>*/}
                <div id="bookmarkslisting" className="ag-theme-alpine" style={{height: '100%', overflowX: 'hidden'}}>
                    <ActionButton icon={<ArrowBackIcon/>} sx={{position: 'absolute', zIndex: '1', top: '65px', left: '307px'}} title="Back" onClick={onBack}/>
                    <TableGrid
                        ref={gridRef}
                        rowData={convertedData}
                        rowSelection="multiple"
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        animateRows={true}
                        suppressContextMenu={true}
                        onDragStopped={onGridColumnChanged}
                        onGridReady={onFirstDataRendered}
                        onColumnResized={onGridColumnChanged}
                        onColumnVisible={onGridColumnChanged}
                        onGridSizeChanged={onGridSizeChanged}
                        onCellEditingStopped={onCellEditingStopped}
                        rowDragManaged={true}
                        suppressMoveWhenRowDragging={true}
                        onRowDragEnd={onRowDragEnd}
                    />
                </div>
            </div>
            {modal === 'MODAL_UPDATE_BOOKMARK' && <UpdateBookmarkModal
                page={{
                    id: gridRef.current?.api.getSelectedRows()[0]?.item_id,
                    name: gridRef.current?.api.getSelectedRows()[0]?.name,
                }}
                open={modal === 'MODAL_UPDATE_BOOKMARK'} 
                onClose={onCloseBookmarkModal}
                onSuccess={onCloseBookmarkModal}
            />}
        </>
    );
};

export default BookmarksListing;