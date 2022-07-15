import {useCallback, useEffect, useRef} from 'react';

const FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

// eslint-disable-next-line max-len
const convertTabIndex = (tabIndex: number, highestTabIndex: number) => (tabIndex === 0 ? highestTabIndex + 1 : tabIndex);

const getTabIndex = (target: HTMLElement) => {
    const tabIndex = target.getAttribute('tabindex');

    if (tabIndex) {
        return parseInt(tabIndex, 10);
    }

    return 0;
};

const sortByTabIndex = (...elements: HTMLElement[]) => {
    const indexes = elements.map((node) => getTabIndex(node));
    return indexes
        .map((tabIndex) => convertTabIndex(tabIndex, Math.max(...indexes)))
        .reduce((prev, curr) => prev - curr);
};

export const useFocusTrap = () => {
    const trapRef = useRef<HTMLElement>(null);

    const selectNextFocusableElem = useCallback(
        (
            sortedFocusableElements: HTMLElement[],
            currentIndex: number | undefined,
            shiftKeyPressed = false,
            skipCount = 0,
        ) => {
            if (skipCount <= sortedFocusableElements.length) {
                const maxIndex = sortedFocusableElements.length - 1;

                if (!currentIndex && document.activeElement) {
                    // eslint-disable-next-line max-len
                    currentIndex = sortedFocusableElements.indexOf(document.activeElement as HTMLElement) ?? 0;
                }

                let nextIndex = 0;

                if (currentIndex || currentIndex === 0) {
                    if (shiftKeyPressed) {
                        nextIndex = currentIndex - 1;
                    } else {
                        nextIndex = currentIndex + 1;
                    }
                }

                if (nextIndex > maxIndex) {
                    nextIndex = 0;
                }

                if (nextIndex < 0) {
                    nextIndex = maxIndex;
                }

                const nextFocusedElement = sortedFocusableElements[nextIndex];

                nextFocusedElement.focus();

                if (document.activeElement !== nextFocusedElement) {
                    selectNextFocusableElem(
                        sortedFocusableElements,
                        nextIndex,
                        shiftKeyPressed,
                        skipCount + 1,
                    );
                }
            } else {
                return false;
            }
        },
        [],
    );

    const trapFunc = useCallback((evt: KeyboardEvent) => {
        if (trapRef?.current) {
            if (evt.key === 'Tab') {
                evt.preventDefault();
                const focusableElements = Array.from<HTMLElement>(
                    trapRef.current.querySelectorAll(FOCUSABLE_ELEMENTS),
                ).filter((element) => getTabIndex(element) >= 0);

                const sortedElements = focusableElements.slice().sort(sortByTabIndex);

                selectNextFocusableElem(sortedElements, undefined, evt.shiftKey);
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', trapFunc);

        return () => {
            window.removeEventListener('keydown', trapFunc);
        };
    }, [trapFunc]);

    return [trapRef];
};
