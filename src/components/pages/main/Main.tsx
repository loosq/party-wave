import React from 'react';
import './Main.scss';

const Main: React.FC<unknown> = React.memo(() => (
    <div className={'main'}>
        <h1 className={'visually-hidden'}>Main</h1>
        <div className={'main__call'}>START TO PLAY!</div>
        <p className={'main__text'}>
            There are many variations of passages of Lorem Ipsum available, but the majority have
            suffered alteration in some form, by injected humour, or randomised words which don't
            look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the middle of text. All the
            Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
            making this the first true generator on the Internet.
        </p>
    </div>
));

export default Main;
