import React, {PropsWithChildren, useCallback} from 'react';
import {createPortal} from 'react-dom';
import {CrossIcon} from 'components/modal';
import {useFocusTrap} from 'hooks/use-focus-trap/use-focus-trap';

import bemCn from 'libs/bemCn';

import './modal.scss';

type Props = {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
};

const bemBlock = bemCn('modal-window');

export const Modal = ({
    className, children, isOpen, onClose,
}: PropsWithChildren<Props>) => {
    const [trapRef] = useFocusTrap();

    const handleClick = useCallback(() => {
        onClose?.();
    }, []);

    const renderModal = () => (
        <div>
            {isOpen && <div className={bemBlock('overlay')}>
                <article ref={trapRef} className={bemBlock(null, className)}>
                    <button className={bemBlock('close-button')} onClick={handleClick}>
                        <CrossIcon />
                    </button>
                    <div className={bemBlock('content')}>{children}</div>
                </article>
            </div>}
        </div>);

    return createPortal(
        renderModal(),
        document.body,
    );
};
