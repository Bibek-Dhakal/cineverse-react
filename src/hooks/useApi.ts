// src/hooks/useApi.ts (Updated and Simplified)

import {useEffect, useState} from 'react';

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

// The hook now only takes one argument: the memoized API function.
export const useApi = <T, >(apiFunc: () => Promise<T>): UseApiState<T> => {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    // The useEffect will now re-run ONLY when the apiFunc reference itself changes.
    useEffect(() => {
        // We define and call the async function inside the effect
        const fetchData = async () => {
            setState((prevState) => ({...prevState, loading: true, error: null}));
            try {
                const data = await apiFunc();
                setState({data, loading: false, error: null});
            } catch (err) {
                console.error('Error fetching data:', err);
                setState({data: null, loading: false, error: 'Failed to fetch data'});
            }
        };

        fetchData().catch(console.error);
    }, [apiFunc]); // The dependency array now correctly depends on the function's identity.

    return state;
};
