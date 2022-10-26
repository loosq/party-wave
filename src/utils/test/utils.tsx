import React, {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {RenderOptions, render} from '@testing-library/react';
import {configureStore, Store} from '@reduxjs/toolkit';
import {rootReducer, RootState} from 'store';

type Options = {
    preloadedState?: RootState;
    store?: Store;
    options?: RenderOptions;
};

export const renderWithStore = (
    jsxElement: JSX.Element,
    {
        preloadedState,
        store = configureStore({reducer: rootReducer, preloadedState}),
        ...options
    }: Options,
) => {
    const WithStore = (
        { children }: PropsWithChildren,
    ) => <Provider store={store}>{children}</Provider>;

    return render(jsxElement, { wrapper: WithStore, ...options });
};
