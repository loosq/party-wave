import React, { ImgHTMLAttributes, useRef, useState } from 'react';
import { changeAvatar } from "slices/base";
import { ReactComponent as Loading } from 'images/loading.svg';
import { ReactComponent as AvatarDefault } from 'images/avatar.svg';
import { API_URL } from 'api/API';
import { useAppDispatch } from 'store';

type Props = ImgHTMLAttributes<unknown> & {
    isEditable?: boolean
};

export const Avatar: React.FC<Props> = (
    {
        isEditable,
        ...restProps
    },
) => {
    const inputAvatar = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null) {
            const formData = new FormData();
            formData.append('avatar', e.target.files[0]);

            setLoading(true);
                dispatch(changeAvatar(formData))
                    .unwrap()
                    .then(() => {
                        setTimeout(() => {
                            setLoading(false);
                        }, 2000);
                    })
                    .catch((e: Error) => {
                        console.error(e.message);
                        setLoading(false);
                    });
        }
    };

    const triggerFile = () => {
        inputAvatar.current?.click()
    };

    return (
        <div className="settings__container-avatar" onClick={triggerFile}>
            {loading && (<span className='button-loading'>
                        <Loading />
                    </span>)}
            {
                restProps.src ? (<img className="settings__photo" src={`${API_URL}/resources${restProps.src}`} />) : <AvatarDefault />
            }
            <input name='avatar' type='file' accept='image/*' id='my-avatar' style={{display: 'none'}} ref={inputAvatar} onInput={onChangeAvatar}/>
        </div>
    )
};
