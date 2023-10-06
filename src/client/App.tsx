import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/reset.module.css';
import './styles/fonts.module.css';
import styles from './styles/app.module.css';
import { Navigation } from './components/complex/navigation/Navigation';
import { Main } from './components/pages/main/Main';
import { Footer } from './components/complex/footer/Footer';
import { SvgIcon } from './components/basic/svgIcon/SvgIcon';
import { useAppSelector } from '../store/store';
import { Instructors } from './components/pages/instructors/Instructors';
import { Gallery } from './components/pages/gallery/Gallery';

const App: React.FC = () => {
  const { theme } = useAppSelector((state) => state.theme);

  useEffect(() => {
    document.body.classList.remove('theme--dark');
    document.body.classList.remove('theme--light');
    document.body.classList.add(`theme--${theme}`);
  }, [theme]);

  return (
    <div className={styles.container}>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <SvgIcon name={`main-bg-${theme}`} sizes={[1440, 334]} className={styles.mainBg} />
              <Main />
            </>
          )}
        />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
