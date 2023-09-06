import React from 'react';
import {Box, Modal, Title, TextInput, Button} from "@mantine/core";
import {useFormik} from 'formik';
import {createBookmarkSchema} from '../../../../yupSchemas/shemas';
import {transformErrors} from '../../../../helpers/global';
import {useCreateBookmarkMutation} from '../../../../api/bookmarks';
import style from '../../../../assets/styles/modal.module.scss';
import {notifications} from '@mantine/notifications';
import {IconCheck} from '@tabler/icons-react';
import {/*useDispatch, */useSelector} from "react-redux";
import {appSelector, getShowRaceboard} from "../../../../redux/app/selectors";
import variables from "../../../../_variables.scss";

const CreateBookmarkModal = ({mapRef, markerRef, open, onClose}) => {
    const [createBookmark] = useCreateBookmarkMutation();
    //const dispatch = useDispatch();
    
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

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: createBookmarkSchema,
        onSubmit: (values, {setErrors, setSubmitting, resetForm}) => {
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
            createBookmark({
                ...values
            }).then((rsp) => {
                setSubmitting(false);
                if (rsp.error) {
                    setErrors(transformErrors(rsp.error));
                } else {
                    notifications.show({
                        color: 'teal',
                        icon: <IconCheck size="1rem" />,
                        message: 'Bookmark created successfully',    
                    }); 
                    resetForm({values: ''});
                    onClose();
                }
            });
        }
    });

    return (
        <Modal
            opened={open}
            onClose={onClose}
            centered
            size="38%"
        >
            <Box sx={{height: '100%'}}>
                <Title sx={{marginBottom: '20px', fontWeight: 'normal', fontSize: 25, textAlign: 'center', color:variables.primaryHex}}>Create New Bookmark</Title>
                <form onSubmit={formik.handleSubmit}>
                    <Box>
                        <TextInput sx={{width: '100%'}} radius="unset"
                            placeholder={'New Bookmark...'}
                            label="Bookmark Name"
                            name={'name'}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && formik.errors.name}/>
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

export default CreateBookmarkModal;