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
//import voca from "voca";
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
import { update as updateForceDis } from "../../../../actions/forceMunSlice";
import { update as updateVoteCircle } from "../../../../actions/voteCircleSlice";
import { update as updateTurnout } from "../../../../actions/turnoutSlice";
import { update as updateMargin } from "../../../../actions/marginSlice";
import { update as updateFeature } from "../../../../actions/featureSlice";
import {
    setOpenModal,
    setShowBookmarks, 
    setShowRaceboard,
    setRaceboard,
    setShowRaceChart,
    setReverse,
    setClickedMarker,
    setMarkerLng,
    setMarkerLat
} from "../../../../redux/app/slice";
import {PartyColors} from "../../../../mapbox/colors";
import ActionButton from "../../../Grid/ActionButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useIntl } from "react-intl";

const MenuBookmarksListing = ({mapRef, markerRef, popupRef, addFilter, zoomAndReveal, hideLayer, showLayer}) => {
    const [page/*, setPage*/] = useState(1);
    const gridRef = useRef();
    const dispatch = useDispatch();
    const intl = useIntl();
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
    
    const revealLayer = useCallback((data) => {
        if (data['feature'].sourceLayer === "states") {
            if (data['clickedMarker']) {
                if (data['stateLayerId'])
                    hideLayer(data['stateLayerId']);
                if (data['raceType'] === "cong") {
                    if (data['munLayerId'])
                        hideLayer(data['munLayerId']);
                    if (data['disLayerId'])
                        showLayer(data['disLayerId']);
                }
                else {                    
                    if (data['munLayerId'])
                        showLayer(data['munLayerId']);
                }
            }
            else {
                if (data['stateLayerId'])
                    showLayer(data['stateLayerId'])
            }
        }
        else if (data['feature'].sourceLayer === "districts") {
            if (data['stateLayerId'])
                hideLayer(data['stateLayerId']);
            if (data['disLayerId'])
                showLayer(data['disLayerId']);
            if (data['munLayerId'])
                hideLayer(data['munLayerId']);
        }
        else if (data['feature'].sourceLayer === "municipals") {
            if (data['stateLayerId'])
                hideLayer(data['stateLayerId']);
            if (data['munLayerId'])
                showLayer(data['munLayerId']);
        }
    }, [hideLayer, showLayer]);
    
    const onGo = useCallback((params) => {       
        if (document.getElementById('raceboard')) {
            document.getElementById('raceboard').classList.remove('board-opened');
            setTimeout(()=> document.getElementById('raceboard').classList.add('board-opened'),0);
        }
    
        const data = JSON.parse(params.data.data);    
        dispatch(updateYear(data['year']));
        dispatch(updateRaceType(data['raceType']));        
        dispatch(updateParty(data['party']));
        dispatch(updateForceMun(data['forceMun']));
        dispatch(updateForceDis(data['forceDis']));
        dispatch(updateVoteCircle(data['voteCircle']));
        dispatch(updateTurnout(data['turnout']));
        dispatch(updateMargin(data['margin']));
        dispatch(updateFeature(data['feature']));
        dispatch(setShowRaceChart(data['showRaceChart']));
        dispatch(setReverse(data['reverse']));
        dispatch(setClickedMarker(data['clickedMarker']));
        if (data['lng']) {
            mapRef.current.flyTo({
                center: [data['lng'], data['lat']],
                zoom: data['zoom'],
                bearing: data['bearing'],
                pitch: data['pitch'],         
                duration: 3000, // Animate over 3 seconds
                essential: true // This animation is considered essential with respect to prefers-reduced-motion
            });
        }
        if (data['raceboard']['state']) {
            setTimeout(() => {
                addFilter(data['raceboard']['state']);
            }, 100);
        }
        setTimeout(() => {
            revealLayer(data);
        }, 100);
        if (data['showRaceboard']) {
            dispatch(setShowRaceboard(true));
            dispatch(setRaceboard(data['raceboard']));
            dispatch(setMarkerLng(data['markerLng']));
            dispatch(setMarkerLat(data['markerLat']));
            let markerColor = "#111111";
            let textColor = "#fff";
            if (data['turnout'])
                markerColor = PartyColors['INE'].high;
            else if (data['raceboard']['colorFirstPary'] && PartyColors[data['raceboard']['colorFirstPary']]) {
                markerColor = PartyColors[data['raceboard']['colorFirstPary']].high;
                textColor = PartyColors[data['raceboard']['colorFirstPary']].contrast;
            }
            else if (PartyColors[data['raceboard']['p1Party']]) {
                markerColor = PartyColors[data['raceboard']['p1Party']].high;
                textColor = PartyColors[data['raceboard']['p1Party']].contrast;
            }
            if (markerRef.current) {
                markerRef.current.remove();
                markerRef.current
                  .getElement()
                  .removeEventListener("click", zoomAndReveal.bind(this, data['feature']));
            }
            markerRef.current = new mapboxgl.Marker({
                //color: data['markerColor'],
                color: markerColor,
                draggable: false
            }).setLngLat([data['markerLng'], data['markerLat']])
            .addTo(mapRef.current);
            markerRef.current
              .getElement()
              .addEventListener("click", zoomAndReveal.bind(this, data['feature']));
            if (popupRef.current)
                popupRef.current.remove();
            let popup_txt = '<div class="mapPopup">';
            let winner_msg = intl.formatMessage({ id: "WinnerPopup" });
            if (data['raceboard']['state'])
                winner_msg = data['raceboard']['state'];
            popup_txt += `<div class="mapPopupTitle" style="background-color:#fff;color:#000;">${winner_msg}</div>`;
            popup_txt += '<div class="mapPopupLocation">';
            if (data['raceboard']['mun']) {
              popup_txt += (data['raceboard']['mun'] ? data['raceboard']['mun'] : '')+'<!--<br><span>(Municipal ID: '+data['raceboard']['munId']+')</span>-->'; 
            }              
            //else
              //popup_txt += data['raceboard']['state'];          
            popup_txt += "</div>";
            popup_txt += `<div class="mapPopupParty" style="background-color:${markerColor};color:${textColor};white-space:nowrap;">`;
            if (data['turnout'])
              popup_txt += Math.round(data['raceboard']['turnoutPercent']) + "%";
            else
              popup_txt += data['raceboard']['p1Party'];
            popup_txt += `</div>`;
              
            /*popup_txt += '<br><span style="color:'+PartyColors[data['raceboard']['p1Party']]?.high+';">';
            if (['Tie', 'No cómputo'].includes(data['raceboard']['p1Party'])) {
              popup_txt += data['raceboard']['p1Party']+'</b>';
            }
            else {
              popup_txt += data['raceboard']['p1Party'] ? data['raceboard']['p1Party']+'</span> WINS!<br>' : '';
              popup_txt += (data['raceboard']['p1Name'] ? data['raceboard']['p1Name'] : '') + '</b>';
            }
            if (data['raceboard']['p1Vote'])
              popup_txt += '<br>('+data['raceboard']['p1Vote'].toLocaleString(intl.locale)+' Votes)';*/
          
            if (data['raceboard']['totalVote']) {
              const vote_msg = intl.formatMessage({id: 'Votes'}, {votes: data['raceboard']['totalVote'].toLocaleString('en')});
              popup_txt += '<div class="mapPopupVotes">' + vote_msg;
              if (data['raceboard']['layer'] === 'states' && data['raceboard']['turnoutPercent'])
                popup_txt += ' - ' + Math.round(data['raceboard']['turnoutPercent']) + '% ' + intl.formatMessage({ id: "Turnout" });;
              popup_txt += "</div>";
            }
            
            popup_txt += '</div>';
            
            if (1 || !['districts'].includes(data['raceboard']['layer'])) {
                popupRef.current = new mapboxgl.Popup({offset: 40})
                    .setLngLat([data['markerLng'], data['markerLat']])
                    .setHTML(popup_txt)
                    .addTo(mapRef.current);
            }
        }
        else {
            dispatch(setShowRaceboard(false));
            if (markerRef.current)
                markerRef.current.remove();
        }
        //dispatch(setShowBookmarks(false));
    }, [dispatch, mapRef, markerRef, popupRef, intl, addFilter, zoomAndReveal, revealLayer]);
    
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
    
    let table_height = 0;
    if (convertedData) {
        table_height = convertedData.length * 42;
    }
    
    const onRowClicked = useCallback(e => {
        document.getElementById('bookmark_action_'+e.node.id).style.display='flex';
        document.querySelectorAll('.bookmark_action').forEach(function(el) {
            if (el.id !== 'bookmark_action_'+e.node.id)
                el.style.display = 'none';
        });        
    }, []);
    
    return (
        <>
            <div style={{width: '100%', height: table_height + 'px', display: 'flex', flexDirection: 'column', position: 'relative', left: '0px', textAligh: 'left'}}>
                {/*<HeaderOfTabs onSearch={onSearch} tabId={tab.id} isGearShown={false}/>*/}
                <div id="menuBookmarkslisting" className="ag-theme-alpine" style={{height: '100%', overflowX: 'hidden', backgroundColor: 'transparent'}}>
                    <ActionButton icon={<ArrowBackIcon/>} sx={{display: 'none', position: 'absolute', zIndex: '1', top: '65px', left: '307px'}} title="Back" onClick={onBack}/>
                    <TableGrid
                        ref={gridRef}
                        rowData={convertedData}
                        rowSelection="single"
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
                        onRowClicked={onRowClicked}
                    />
                </div>
            </div>
            {modal === 'MODAL_UPDATE_BOOKMARK' && <UpdateBookmarkModal
                mapRef={mapRef}
                markerRef={markerRef}
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

export default MenuBookmarksListing;