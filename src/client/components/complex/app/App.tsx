import React, { useEffect, useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import './styles/reset.module.css';
import './styles/fonts.module.css';
import styles from './styles/app.module.css';
import { Navigation } from '../navigation/Navigation';
import { Main } from '../../pages/Main';
import { Footer } from '../footer/Footer';
import { SvgIcon } from '../../basic/svgIcon/SvgIcon';
import {useAppSelector} from '../../../../store/store';

const App: React.FC = () => {
  const {theme} = useAppSelector((state) => state.theme);

  useEffect(() => {
    document.body.classList.remove('theme--dark');
    document.body.classList.remove('theme--light');
    document.body.classList.add(`theme--${theme}`);
  }, [theme]);

  return (
    <div className={styles.container}>
      <Navigation />
      <Routes>
        <Route path='/' element={<>
          <SvgIcon name={`main-bg-${theme}`} width='1440' height='334' className={styles.mainBg} />
          <Main />
        </>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
