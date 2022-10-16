import { FormikValues, useFormik } from 'formik';
import {REQUEST_STATUS} from '../constants';

export type Nullable<T> = T | null;
export type Constructable<T = any> = new (...args: Array<any>) => T;
export type FormikType = ReturnType<typeof useFormik<FormikValues>>;

export type RequestStatus = keyof typeof REQUEST_STATUS;

export type CreateNewTopicParams = {
    title: string;
    text: string;
}

export type CreateNewPostParams = {
    topicId: number;
    text: string;
}

export type Topic = {
    author: UserShortInfo,
    date: string;
    id: number;
    posts: PostType[];
    title: string;
}

export type PostType = {
    author: UserShortInfo,
    date: string;
    id: number;
    text: string;
    topicId: number;
}

export type UserShortInfo = {
    avatar: Nullable<string>;
    displayName: Nullable<string>;
    firstName: string;
    secondName: string;
}
