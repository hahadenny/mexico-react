import React, {useMemo} from "react";
import useTableGridSettings from "../useTableGridSettings";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ActionButton from "../../components/Grid/ActionButton";
//import {useGetCompaniesQuery} from "../../api/companies";
//import {useSelector} from "react-redux";
//import {userSelector} from "../../redux/auth/selectors";
//import {ROLE_ADMIN} from "../../const/app";

const useBookmarksTableGrid = (data, edited = false, onEdit, onDelete, onGo) => {
    //const {data: companies} = useGetCompaniesQuery();
    //const currentUser = useSelector(userSelector);
    const {
        defaultColDef,
        getRowId,
        onGridReady
    } = useTableGridSettings(data, true);

    const convertedData = useMemo(() => {
        if (!data) {
            return;
        }
        return data.map(el => ({
            ...el,
            _type: 'item',
            item_id: el.id,
        }));
    }, [data]);

    const columnDefs = useMemo(() => {
        return [
            /*{
                field: 'id',
                headerName: '#',
                sortable: false,
                checkboxSelection: true
            },*/
            {
                field: 'name',
                headerName: 'Bookmark',
                sortable: false,
                rowDrag: true,
                suppressMovable:true,
                valueFormatter: function (params) {
                    return `${params.data.name}`;
                },
                //width: 169 
            },
            /*{
                field: 'email',
                sortable: false,
                headerName: 'Email'
            },
            {
                field: 'role',
                headerName: 'Role',
            },
            {
                field: 'company_id',
                editable: false,
                lockVisible: currentUser.role === ROLE_ADMIN,
                hide: currentUser.role === ROLE_ADMIN,
                headerName: 'Company',
                cellEditorParams: {
                    values: companies?.data.map(el => el.name),
                },
                valueFormatter: function (params) {
                    return params.value ? (companies?.data.find(el => el.id === params.value))?.name : null;
                },
            },*/
            {
                field: 'id',
                headerName: 'Actions',
                sortable: false,
                filter: false,
                editable: false,
                suppressMovable:true,
                cellRenderer: (props) => {
                    return (
                        <div className='bookmark_action' id={'bookmark_action_'+props.node.id} style={{display:'none', justifyContent:'left', alignItems:'center', height:'100%', marginLeft:'-28px'}}>
                            {onDelete && <ActionButton sx={{display:'flex', flexDirection:'column'}} icon={<DeleteIcon/>} title="Delete" data={props} onClick={onDelete}/>}
                            {onEdit && <ActionButton sx={{marginLeft:'0px', display:'flex', flexDirection:'column'}} icon={<EditIcon/>} title="Edit" data={props} onClick={onEdit}/>}
                            {onGo && <ActionButton sx={{marginLeft:'0px', display:'flex', flexDirection:'column'}} icon={<ExitToAppIcon/>} title="Go" data={props} onClick={onGo}/>}
                        </div>
                    );
                },
                //width: 92
            }
        ];
    }, [onEdit, onDelete, onGo/*, companies?.data, currentUser.role*/]);

    return {
        convertedData,
        defaultColDef,
        columnDefs,
        getRowId,
        onGridReady
    };
};

export default useBookmarksTableGrid;
