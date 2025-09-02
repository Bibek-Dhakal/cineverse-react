import {type RefObject, useEffect} from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

const useClickOutside = <T extends HTMLElement | null>(
    ref: RefObject<T>,
    handler: Handler,
) => {
    useEffect(() => {
        const listener: Handler = (event) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]); // Re-run if ref or handler changes
};

export default useClickOutside;
