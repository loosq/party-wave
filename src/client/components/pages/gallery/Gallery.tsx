import React from "react";
import { Button } from "../../basic/button/Button";
import styles from './gallery.module.css';
import card from './assets/card.png';

const Card = () => {
    return (
        <div className={styles.card}>
            <span className={styles.date}>13.09.23</span>
            <img className={styles.image} src={card} alt="pic" />
        </div>
    )
}

export const Gallery = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2>Галерея</h2>
                <button>По дате</button>
            </div>
            <div className={styles.cardsWrapper}>
                {[1, 2, 3, 4].map(item => <Card key={item}/>)}
            </div>
            <div className={styles.cardsWrapper}>
                {[1, 2, 3, 4].map(item => <Card key={item}/>)}
            </div>
            <div className={styles.buttonWrapper}>
                <Button text="Загрузить ещё" />
            </div>
        </div>
    )
}