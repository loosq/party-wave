import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '../../../utils/test';
import {Loader} from './Loader';

describe('Component working correctly', () => {
    test('Component rendered correctly', () => {
        render(<Loader className='testClassName' />);

        expect(screen.getByTestId('loader')).toBeInTheDocument();
        expect(screen.getByTestId('loader')).toHaveClass('testClassName');
    });
});
