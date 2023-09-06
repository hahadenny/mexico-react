import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    password: yup.string().min(4, 'Password is too short (minimum is 4 characters).').required('Password is required.'),
    email: yup.string().email('Email format is incorrect.').required('E-mail is required.')
});

export const createBookmarkSchema = yup.object().shape({
    name: yup.string().required('Name is required')
});

export const updateBookmarkSchema = yup.object().shape({
    name: yup.string().required('Name is required')
});