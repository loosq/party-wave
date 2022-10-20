import * as yup from 'yup';

export const createPostSchema = yup.object().shape({
    text: yup.string()
        .min(10, 'Не меньше 10 символов!')
        .max(500, 'Не больше 500 символов!')
        .required('Поле должно быть заполнено!'),
});
