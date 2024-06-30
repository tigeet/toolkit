import { AppDispatch } from "@app/store";
import { RootState } from "@app/store";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AsyncThunkConfig } from "./types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useDebouncedDispatch = () => {
  const dispatch = useAppDispatch();
  const promiseRef = useRef<{ abort: () => void } | null>(null);

  const handleDispatch = useCallback(
    <R, A>(action: AsyncThunkAction<R, A, AsyncThunkConfig>) => {
      if (promiseRef.current) {
        promiseRef.current.abort();
      }

      promiseRef.current = dispatch(action);
    },
    [dispatch]
  );

  return handleDispatch;
};
