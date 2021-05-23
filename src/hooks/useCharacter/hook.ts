import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getMarvelsCharacter } from "./getCharacterSaga";

export const useCharacter = (id: number) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMarvelsCharacter(id));
  }, [dispatch, id]);

  return useSelector((state: RootState) => state.character);
};
