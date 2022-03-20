import { useEffect, useState } from "react";
import { usePrevious } from "./use-previous";

/**
 * @param {function} serviceFunction Fetch function
 * @param {object} args Params passed to the function
 * @param {{ shouldFetch: boolean }} suspense If passed, hook won't try
 * to perform the fetch until shouldFetch property is true
 */
export function useService(
  serviceFunction,
  args = {},
  suspense = undefined
) {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  });

  const setLoading = (loading = false) => {
    setState(prevState => ({ ...prevState, loading }));
  };

  const setError = (error = null) => {
    setState(prevState => ({ ...prevState, error }));
  };

  const setData = (data = null) => {
    setState(prevState => ({ ...prevState, data }));
  };

  const performQuery = async newArgs => {
    setLoading(true);
    try {
      const data = await serviceFunction(newArgs || args);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Needed to check only once the suspense config to avoid
  // an infinite loop
  const initialShouldFetch = usePrevious(suspense?.shouldFetch);

  useEffect(() => {
    if (suspense === undefined)
      performQuery().then();
    else if (suspense?.shouldFetch !== initialShouldFetch
      && !!suspense?.shouldFetch) {
      performQuery().then();
    }
  }, [suspense]);

  const reset = () => {
    setState({
      loading: true,
      data: null,
      error: null
    })
  };

  return { ...state, refetch: performQuery, reset };
}
