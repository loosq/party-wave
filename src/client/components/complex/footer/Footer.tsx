import React from 'react';
import styles from './footer.module.css';
import { SvgIcon } from '../../basic/svgIcon/SvgIcon';

const socialIcons = ['telegram', 'instagram'];

const socialCard = (icon: string, index: number) => {
    return (
        <div className={styles.card} key={index}>
            <SvgIcon name={icon} sizes={[30]}/>
            <p>{'Подписаться на телеграм и быть в курсе новостей'}</p>
        </div>
    )
}

export const Footer: React.FC = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.socialWrapper}>
                {socialIcons.map((icon, index) => socialCard(icon, index))}
            </div>
            <span className={styles.copyRight}>{`© ${new Date().getFullYear()} Party Wave`}</span>
        </footer>
    )
}