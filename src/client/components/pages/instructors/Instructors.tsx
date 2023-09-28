import React from 'react';
import styles from './instructors.module.css';
import img1 from './assets/instructor1.png';
import img2 from './assets/instructor2.png';
import { Button } from '../../basic/button/Button';

export const Instructors: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.col}>
        <h2 className={styles.title}>Меня зовут Маша и я обожаю сёрфинг всей душой</h2>
        <p className={styles.description}>Мы организуем групповые и индивидуальные занятия, соревнования, и мероприятия для наших учеников. Открытость, дружелюбие и уважение к природе — это ценности, которые мы призываем в нашем клубе.Мы организуем групповые и индивидуальные занятия, соревнования, и мероприятия для наших учеников. Открытость, дружелюбие и уважение к природе — это ценности, которые мы призываем в нашем клубе.</p>
        <div className={styles.buttonWrapper}>
          <Button className={[styles.button]} text="Телеграм" />
          <Button text="Инстаграм" />
        </div>
      </div>
      <img src={img2} alt="pic" className={styles.col} />
    </div>
    <div className={styles.container}>
      <div className={styles.col}>
        <h2 className={styles.title}>Привет! Я Даня и сёрфинг это моя жизнь</h2>
        <p className={styles.description}>Мы организуем групповые и индивидуальные занятия, соревнования, и мероприятия для наших учеников. Открытость, дружелюбие и уважение к природе — это ценности, которые мы призываем в нашем клубе.Мы организуем групповые и индивидуальные занятия, соревнования, и мероприятия для наших учеников. Открытость, дружелюбие и уважение к природе — это ценности, которые мы призываем в нашем клубе.</p>
        <div className={styles.buttonWrapper}>
          <Button className={[styles.button]} text="Телеграм" />
          <Button text="Инстаграм" />
        </div>
      </div>
      <img src={img1} alt="pic" className={styles.col} />
    </div>
  </div>
);
