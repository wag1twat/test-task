import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getMarvelsCharacters } from "./getCharactersSaga";
import { CharacterQueries } from "./types";

export const useCharacters = (queries: Partial<CharacterQueries> = {}) => {
  const {
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

  const get = useCallback(() => {
    if (nameStartsWith) {
      return dispatch(
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
    }

    return dispatch(
      getMarvelsCharacters({
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
    comics,
    dispatch,
    events,
    limit,
    modifiedSince,
    nameStartsWith,
    offset,
    orderBy,
    series,
    stories,
  ]);

  useEffect(() => {
    get();
  }, [get]);

  return useSelector((state: RootState) => state.characters);
};
