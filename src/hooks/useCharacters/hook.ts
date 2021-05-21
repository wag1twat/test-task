import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getMarvelsCharacters } from "./getCharactersSaga";
import { CharacterQueries } from "./types";

export const useCharacters = (queries: Partial<CharacterQueries> = {}) => {
  const {
    name,
    nameStartsWith,
    modifiedSince,
    comics,
    series,
    events,
    stories,
    orderBy,
    limit,
    offset,
  } = queries;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMarvelsCharacters({
        nameStartsWith,
        modifiedSince,
        comics,
        series,
        events,
        stories,
        orderBy,
        limit,
        offset,
      })
    );
  }, [
    dispatch,
    name,
    nameStartsWith,
    modifiedSince,
    comics,
    series,
    events,
    stories,
    orderBy,
    limit,
    offset,
  ]);

  return useSelector((state: RootState) => state.characters);
};
