import React, {useEffect} from 'react';
import {Box, Modal, Title, TextInput, Button} from "@mantine/core";
import style from '../../../../assets/styles/modal.module.scss';
import {transformErrors} from "../../../../helpers/global";
import {notifications} from '@mantine/notifications';
import {IconCheck, IconX} from '@tabler/icons-react';
import {useFormik} from "formik";
import {updateBookmarkSchema} from "../../../../yupSchemas/shemas";
import {useUpdateBookmarkMutation} from "../../../../api/bookmarks";
import {useSelector} from "react-redux";
import {appSelector, getShowRaceboard} from "../../../../redux/app/selectors";
import variables from "../../../../_variables.scss";

const UpdateBookmarkModal = ({mapRef, markerRef, page, open, onClose, onSuccess}) => {
    const [updateBookmark] = useUpdateBookmarkMutation();
    
    const year = useSelector((state) => state.year.value);
    const raceType = useSelector((state) => state.raceType.value);
    const party = useSelector((state) => state.party.value);
    const forceMun = useSelector((state) => state.forceMun.value);
    const forceDis = useSelector((state) => state.forceDis.value);
    const voteCircle = useSelector((state) => state.voteCircle.value);
    const turnout = useSelector((state) => state.turnout.value);
    const margin = useSelector((state) => state.margin.value);
    const showRaceboard = useSelector(getShowRaceboard);
    const app = useSelector(appSelector);

    const {
        values, touched, errors, handleChange, handleSubmit, setValues
    } = useFormik({
        initialValues: {
            name: page.name
        },
        validationSchema: updateBookmarkSchema,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            const data = {
                'year': year,
                'raceType': raceType,
                'party': party,
                'forceMun': forceMun,
                'forceDis': forceDis,
                'voteCircle': voteCircle,
                'turnout': turnout,
                'margin': margin,
                'lng': mapRef.current.getCenter().lng.toFixed(4),
                'lat': mapRef.current.getCenter().lat.toFixed(4),
                'zoom': mapRef.current.getZoom().toFixed(2),
                'bearing': mapRef.current.getBearing().toFixed(4),
                'pitch': mapRef.current.getPitch().toFixed(4),
                'showRaceboard': showRaceboard,
            };
            if (showRaceboard) {
                data.raceboard = app.raceboard;
                data.markerLng = markerRef.current?._lngLat.lng;
                data.markerLat = markerRef.current?._lngLat.lat;
                //data.markerColor = markerRef.current?._color;
            }
            values.data = data;   
            console.log(values);
            updateBookmark({
                ...values,
                id: page.id,
            }).then(rsp => {
                if (rsp.error) {
                    notifications.show({
                        color: 'red',
                        icon: <IconX size="1rem" />,
                        message: Object.values(transformErrors(rsp.error))[0][0] || 'Error',
                    });
                } else {
                    onClose();
                    notifications.show({
                        color: 'teal',
                        icon: <IconCheck size="1rem" />,
                        message: 'Bookmark updated successfully',
                    });                    
                    resetForm({values: ''});
                    onSuccess && onSuccess(rsp.data);
                }
            })
        }
    });

    useEffect(() => {
        setValues(prev => ({...prev, name: page.name}));
    }, [setValues, page.name])

    return (
        <Modal
            opened={open}
            onClose={onClose}
            centered
            size="38%"
        >
            <Box sx={{height: '100%'}}>
                <Title sx={{marginBottom: '20px', fontWeight: 'normal', fontSize: 25, textAlign: 'center', color:variables.primaryHex}}>Update Bookmark</Title>
                <form onSubmit={handleSubmit}>
                    <Box>
                        <TextInput sx={{width: '100%'}} radius="unset"
                            placeholder={'Bookmark Name...'}
                            label="Bookmark Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            error={touched.name && errors.name}/>
                    </Box>
                    <Box sx={{mt: 10, display: 'flex', justifyContent: 'space-between'}}
                        className={style.buttonGroup}>
                        <Button className={style.cancelButton} onClick={onClose}>Cancel</Button>
                        <Button className={style.saveButton} type="submit">Save</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default UpdateBookmarkModal;
