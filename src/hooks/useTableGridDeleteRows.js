import {useCallback} from "react";
import {notifications} from '@mantine/notifications';
import {IconCheck, IconX} from '@tabler/icons-react';
import {modals} from '@mantine/modals';
import {useSelector} from "react-redux";
import {selectors} from "../redux/auth/selectors";
import {Title} from "@mantine/core";

export function useTableGridDeleteRows(grid, onDelete, onGroupDelete, title, onSuccessDeleted, idPropName = 'item_id', action = 'delete') {
    const {user} = useSelector(selectors);

    return useCallback((params) => {
        if (!grid) {
            return;
        }
        const rows = grid.current.api.getSelectedRows();
        if (rows.length === 0) {
            notifications.show({
                color: 'red',
                icon: <IconX size="1rem" />,
                message: 'Please select at least the one row.',
            });
            return;
        }

        const {parent} = params ?? {parent: null};

        const filterNames = (el, type) => {
            return el._type === type
        }

        const itemIds = rows.filter(el => el._type ? el._type === 'item' : el).map(el => el._type ? el[idPropName] : el.id);
        const groupIds = rows.filter(el => el._type === 'group').map(el => el[idPropName]);
        const itemsName = rows.filter(el => filterNames(el, 'item')).map(el => `"${el.name}"`).join(', ');
        const groupsName = rows.filter(el => filterNames(el, 'group')).map(el => `"${el.name}"`).join(', ');
        const isEnableDelete = itemIds.filter(el => el === user.id)
        if (itemIds.length === 0 && groupIds.length === 0) {
            return;
        }
        
        modals.openConfirmModal({
          centered: true,
          size: '35%',
          children: (
             <Title sx={{marginBottom: '20px', fontWeight: 'normal', fontSize: 20, textAlign: 'left', color:'#000000'}}>{`Are you sure you want to ${action}: ${itemIds.length > 0 ? itemsName : groupsName} ${itemIds.length > 0 ? title : `${title} Groups`}?`}</Title>
          ),
          labels: { confirm: 'Confirm', cancel: "Cancel" },
          confirmProps: { color: 'red' },
          onConfirm: () => confirmDelete(),
        });

        const confirmDelete = () => {
            if (itemIds.length > 0) {
                onDelete({
                    ids: itemIds,
                    id: itemIds,
                    parent
                }).then(rsp => {
                    if (rsp.error) {
                        if (isEnableDelete.length > 0) {
                            notifications.show({
                                color: 'red',
                                icon: <IconX size="1rem" />,
                                message: 'Unable to delete,this is active user account',
                            });
                        } else {
                            notifications.show({
                                color: 'red',
                                icon: <IconX size="1rem" />,
                                message: 'Error',                     
                            });
                        }
                    } else {
                        notifications.show({
                            color: 'teal',
                            icon: <IconCheck size="1rem" />,
                            message: `${title} successfully deleted`,
                        });  
                        onSuccessDeleted && onSuccessDeleted('item', itemIds);
                    }
                })
            }
            if (onGroupDelete && groupIds.length > 0) {
                console.log(`onGroupDelete`, {groupIds});
                onGroupDelete({ids: groupIds, parent}).then(rsp => {
                    if (rsp.error) {
                        notifications.show({
                            color: 'red',
                            icon: <IconX size="1rem" />,
                            message: 'Error',                 
                        });
                    } else {
                        notifications.show({
                            color: 'teal',
                            icon: <IconCheck size="1rem" />,
                            message: `${title} Group successfully deleted`,
                        }); 
                        onSuccessDeleted && onSuccessDeleted('group', groupIds);
                    }
                })
            }
        };
    }, [grid, onDelete, onGroupDelete, title, onSuccessDeleted, user.id, action, idPropName]);
}
