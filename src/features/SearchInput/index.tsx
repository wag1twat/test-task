import {
  Input,
  InputGroup,
  InputProps,
  InputRightAddon,
} from "@chakra-ui/input";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";

interface SearchInputProps extends Omit<InputProps, "value" | "onChange"> {
  onInputChange?: (value: string) => void;
  onClickSearchButton?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onClickSearchButton,
  onInputChange,
  ...props
}) => {
  const [value, setValue] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setValue(e.target.value);
  }, []);

  const handleClickSearchButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      if (typeof onClickSearchButton === "function") {
        onClickSearchButton(value);
      }
    },
    [onClickSearchButton, value]
  );

  useEffect(() => {
    if (typeof onInputChange === "function") {
      onInputChange(value);
    }
  }, [onInputChange, value]);

  useEffect(() => {
    return () => {
      setValue("");
    };
  }, []);
  return (
    <InputGroup>
      <Input value={value} onChange={handleChange} {...props} />
      <InputRightAddon p={0}>
        <Button onClick={handleClickSearchButton}>
          <SearchIcon />
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
};
