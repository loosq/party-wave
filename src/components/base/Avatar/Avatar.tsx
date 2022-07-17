import React, {ImgHTMLAttributes} from 'react';

type Props = ImgHTMLAttributes<unknown> & {
    isEditable?: boolean
};

export const Avatar: React.FC<Props> = (
    {
        isEditable,
        ...restProps
    },
) => (
    isEditable
        ? (
            <input
                {...restProps}
                alt={restProps.alt}
                type='image'
            >
                <form id="my-avatar-form">
                    <input
                        name="avatar"
                        type="file"
                        accept="image/*"
                        id="my-avatar"
                        style={{display: 'none'}}
                    />
                    <input
                        id="upload-my-avatar"
                        type="submit"
                    />
                </form>
            </input>
        )
        : (
            <img
                {...restProps}
                alt={restProps.alt}
            />
        )
);
