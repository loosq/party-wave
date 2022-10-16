import React, {useCallback} from 'react';
import bemCn from 'libs/bemCn';
import {useAppDispatch} from 'store';
import {CreateNewPostParams} from 'types';
import {createPost, getTopics} from 'slices/forum';
import {Modal} from 'components/complex/Modal/Modal';
import {
    Field, FieldProps, Form, Formik,
} from 'formik';
import {createPostSchema} from 'components/pages/Topic/PostModal/schema';

import './PostModal.scss';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    id?: string;
};

const bemBlock = bemCn('create-post-modal');

const TextArea = (field: FieldProps['field']) => (
    <textarea
        className={bemBlock('text-area')}
        placeholder='Текст сообщения'
        rows={5}
        wrap='hard'
        {...field}
    />
);

export const PostModal = ({isOpen, onClose, id}: Props) => {
    const dispatch = useAppDispatch();

    const onSubmit = useCallback((values: CreateNewPostParams) => {
        if (id) {
            dispatch(createPost(values))
                .unwrap()
                .then(() => {
                    dispatch(getTopics());
                    onClose?.();
                });
        }
    }, [id, onClose]);

    return (
        <Modal className={bemBlock()} isOpen={isOpen} onClose={onClose}>
            <div className={bemBlock('container')}>
                <p className={bemBlock('title')}>Создать новое сообщение</p>
                <Formik
                    initialValues={{
                        text: '',
                        topicId: parseInt(id ?? '', 10),
                    }}
                    validationSchema={createPostSchema}
                    onSubmit={onSubmit}
                >
                    {({
                        errors,
                        touched,
                    }) => (
                        <Form className={bemBlock('form')}>
                            <div className={bemBlock('text-area-container')}>
                                <Field
                                    name='text'
                                    as={TextArea}
                                />
                                {errors.text && touched.text && (
                                    <p className={bemBlock('error')}>{errors.text}</p>
                                )}
                            </div>
                            <button
                                className={bemBlock('submit-button')}
                                type='submit'
                            >
                                Создать
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};
