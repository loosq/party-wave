import React, { useState } from "react";
import { Button } from "../../basic/button/Button";
import styles from './gallery.module.css';

const data = [
    {
        date: '12.09.23',
        imgUrl: 'https://picsum.photos/305',
        images: [
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
        ]
    },
    {
        date: '11.09.23',
        imgUrl: 'https://picsum.photos/305',
        images: [
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
        ]
    },
    {
        date: '10.09.23',
        imgUrl: 'https://picsum.photos/305',
        images: [
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
        ]
    },
    {
        date: '09.09.23',
        imgUrl: 'https://picsum.photos/305',
        images: [
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
            'https://picsum.photos/305',
        ]
    },
];

const Card = ({ date, imgUrl, onClick }: { date?: string; imgUrl: string; onClick?: () => void }) => {
    return (
        <div className={styles.card} onClick={onClick ? onClick : () => {}}>
            {date && <span className={styles.date}>{date}</span>}
            <img className={styles.image} src={imgUrl} alt="pic" />
        </div>
    )
}

export const Gallery = () => {
    const [chosenSession, setChosenSession] = useState<{ date: string; images: string[] }>({ date: '', images: [] });
    const [allSessions, setAllSessions] = useState(data);
    
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2>Галерея</h2>
                {chosenSession?.date && <span className={styles.sessionDate}>{chosenSession?.date}</span>}
                <button>По дате</button>
            </div>
            <div className={styles.cardsWrapper}>
                {!chosenSession.date && allSessions.map((session : { date: string; imgUrl: string; images: string[] }) => (
                    <Card onClick={() => setChosenSession(session)} key={session.date} imgUrl={session.imgUrl} date={session.date} />
                ))}
                {chosenSession.images.map(imgUrl => (
                    <Card key={imgUrl} imgUrl={imgUrl} />
                ))}
            </div>
            <div className={styles.buttonWrapper}>
                <Button text="Загрузить ещё" />
            </div>
        </div>
    )
}