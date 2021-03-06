import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getUser } from "./getUserSaga";

export const useUser = (id: number) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return useSelector((state: RootState) => state.user);
};
