import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '../../../utils/test';
import {AltUrl} from './AltUrl';

describe('Component working correctly', () => {
    test('Component rendered correctly', () => {
        render(<AltUrl className='testClassName' />);

        expect(screen.getByTestId('alt-url')).toBeInTheDocument();
        expect(screen.getByTestId('alt-url')).toHaveClass('testClassName');
    });
});
