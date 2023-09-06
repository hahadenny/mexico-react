import React from 'react';

import {/*Link, */Navigate} from 'react-router-dom';

import {Box, Container, Text, TextInput, Button} from "@mantine/core";

import {useIsAuthenticated, useSignIn} from 'react-auth-kit';
import {useLoginMutation} from '../../api/auth';
import {loginSchema} from '../../yupSchemas/shemas';

//import logo from '../../assets/img/Porta_picto_3d.png';
//import disguiseLogo from '../../assets/img/Disguise_PH1_Logos-Porta_w.png'
//import '../../assets/fonts/Aeonik/Aeonik-Regular.ttf'
import style from './LogIn.module.css';
import variables from "../../_variables.scss";
import {useFormik} from "formik";
import {prepareAuthData, transformErrors} from "../../helpers/global";

const LogIn = () => {
    const isAuthenticated = useIsAuthenticated();
    const signIn = useSignIn();
    const [login] = useLoginMutation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: (values, {setErrors, setSubmitting}) => {
            setSubmitting(true);
            login(values).then((rsp) => {
                setSubmitting(false);
                if (rsp.error) {
                    setErrors(transformErrors(rsp.error));
                } else {
                    signIn(prepareAuthData(rsp.data));
                }
            });
        }
    });

    if (isAuthenticated()) {
        return <Navigate to="/"/>;
    }

    return (
        <Container id={'login'} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            width: '48%'
        }}>
            <Container sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: '#ffffff',
                border: '2px solid #ffffff',
                textAlign: 'center',
                color: '#414343',
                width: '100%'
            }}>
                <Box className={'loginBox'} sx={{width: '100%', maxWidth: '380px'}}>
                    <Box sx={{marginTop: '32px', marginBottom: '48px'}}>
                        {/*<img src={logo} style={{maxWidth: '170px', marginTop: '85px'}} alt={'Porta Logo'}/>*/}
                        <Text className={'title'} sx={{fontWeight:'bold', fontSize:'55px'}}>Chronos</Text>
                    </Box>
                    <form onSubmit={formik.handleSubmit}>
                        {/*<Box sx={{mb: 8}}>
                            <img src={disguiseLogo} style={{maxWidth: '200px'}} alt={'Disguise Logo'}/>
                        </Box>*/}
                        <Box sx={{marginBottom: '24px', paddingTop: '16px'}}>
                            <TextInput sx={{width: '100%', textAlign:'left'}} radius="unset"
                                placeholder={'Your Email'}
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && formik.errors.email}/>
                        </Box>
                        <Box sx={{marginBottom: '40px'}}>
                            <TextInput sx={{width: '100%', textAlign:'left'}} radius="unset"
                                type="password"
                                placeholder={'Your Password'}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && formik.errors.password}/>

                        </Box>
                        <Button type="submit"
                                color="primary" variant="contained"
                                className={style.loginButton}
                                sx={{width: '150px', height: 40, marginBottom: '56px', backgroundColor:variables.primaryHex, color:'#fff'}}>
                            Login
                        </Button>
                    </form>
                    <Box sx={{marginBottom: '40px'}} className={style.forgotBox}>
                        {/*<Typography color="textPrimary">*/}
                        {/*    Not a member? <Link className={style.linkStyling} to={'/registration'}>Sign Up</Link>*/}
                        {/*</Typography>*/}
                        {/*<Typography color="textPrimary">
                            Forgot <Link className={style.linkStyling} to={'/forgot-password'}>Password</Link>
                        </Typography>*/}
                    </Box>

                </Box>
            </Container>
        </Container>);
};

export default LogIn;
