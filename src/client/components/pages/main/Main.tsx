import React from 'react';
import styles from './main.module.css';

export const Main: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Мы — комьюнити страстно преданное морским волнам</h1>
    <p className={styles.description}>
      Мы организуем групповые и индивидуальные занятия,
      соревнования, и мероприятия для наших учеников. Открытость, дружелюбие и уважение
      к природе — это ценности, которые мы призываем в нашем клубе.
    </p>
  </div>
);
