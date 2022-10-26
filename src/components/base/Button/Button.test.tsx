import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '../../../utils/test';
import {Button} from './Button';

describe('Component working correctly', () => {
    test('Component rendered and working correctly', () => {
        const textMock = 'Test button';
        const mockedOnClick = jest.fn();

        render(<Button onClick={mockedOnClick}>{textMock}</Button>);

        const result = screen.getByTestId('button');

        expect(result).toBeInTheDocument();
        expect(result).toHaveTextContent(textMock);

        fireEvent.click(result);

        expect(mockedOnClick).toBeCalled();
    });
});
