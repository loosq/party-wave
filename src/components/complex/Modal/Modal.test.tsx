import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent} from '@testing-library/dom';
import {render, screen, cleanup} from '../../../utils/test';
import {Modal} from './Modal';

describe('Component working correctly', () => {
    afterEach(cleanup);
    test('Component rendered correctly when isOpen is false', () => {
        const isModalOpen = false;

        render(<Modal className='testClassName' isOpen={isModalOpen} />);

        const result = screen.getByTestId('modal');

        expect(result).toBeInTheDocument();
        expect(result.children.length).toBe(0);
    });
    test('Component rendered and working correctly when isOpen is true', () => {
        const isModalOpen = true;
        const onClose = jest.fn();
        const childrenMock = 'Some test text';

        render(<Modal isOpen={isModalOpen} onClose={onClose}>{childrenMock}</Modal>);

        const modal = screen.getByTestId('modal');
        const overlay = screen.getByTestId('modal-overlay');
        const button = screen.getByTestId('close-modal');
        const content = screen.getByTestId('modal-content');

        expect(modal).toBeInTheDocument();
        expect(overlay).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(content).toBeInTheDocument();
        expect(content).toHaveTextContent(childrenMock);

        fireEvent.click(button);

        expect(onClose).toHaveBeenCalled();
    });
});
