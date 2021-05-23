import { Flex, Grid, Stack } from "@chakra-ui/layout";
import { SmallTableRowProps } from "features/table/types";
import React, { useCallback } from "react";
import { Character } from "hooks/useCharacters";
import { SquareAvatar } from "features/SquareAvatar";
import { Card } from "features";
import { LabelText } from "features/LabelText";

interface SmCharacterTableCardProps extends SmallTableRowProps<Character> {}

export const SmCharacterTableCard: React.FC<SmCharacterTableCardProps> = ({
  data,
  onRowClick,
  ...props
}) => {
  const { name, thumbnail, description } = data;

  const handleCardClick = useCallback(
    (rowData: typeof data) =>
      (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if (typeof onRowClick === "function") {
          onRowClick(e, rowData);
        }
      },
    [onRowClick]
  );

  return (
    <Flex {...props} onClick={handleCardClick(data)}>
      <Grid as={Card} gap={4} gridTemplateColumns="150px 1fr">
        <SquareAvatar
          boxSize={150}
          src={`${thumbnail?.path}.${thumbnail?.extension}`}
          alt={name}
        />
        <Stack spacing={4}>
          <LabelText label="Name" text={name} />
          <LabelText
            direction="column"
            label="Description"
            text={description}
          />
        </Stack>
      </Grid>
    </Flex>
  );
};
