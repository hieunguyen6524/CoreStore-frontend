/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useApi<T, P = any>(apiFunc: (params: P) => Promise<T>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  const callApi = useCallback(
    async (params: P): Promise<T | null> => {
      setState((s) => ({ ...s, loading: true, error: null }));

      try {
        const res = await apiFunc(params);
        setState({ data: res, error: null, loading: false });
        return res;
      } catch (err: any) {
        setState({
          data: null,
          error: err?.message || "Có lỗi xảy ra",
          loading: false,
        });
        return null;
      }
    },
    [apiFunc]
  );

  return { ...state, callApi };
}
