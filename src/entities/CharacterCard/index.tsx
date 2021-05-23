import { Stack } from "@chakra-ui/layout";
import { Card } from "features";
import { LabelList } from "features/LabelList";
import { LabelText } from "features/LabelText";
import { SquareAvatar } from "features/SquareAvatar";
import { Character } from "hooks/useCharacters";
import React from "react";

interface CharacterCardProps extends Partial<Character> {}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  comics,
  description,
  events,
  id,
  modified,
  name,
  resourceURI,
  series,
  stories,
  thumbnail,
  urls,
}) => {
  return (
    <Stack
      as={Card}
      spacing={4}
      direction={["column-reverse", "column-reverse", "column-reverse", "row"]}
      justifyContent="space-between"
    >
      <Stack spacing={4}>
        <LabelText label="Name" text={name} />
        <LabelText direction="column" label="Description" text={description} />
        {modified && (
          <LabelText
            direction="row"
            label="Last modified"
            text={new Date(modified).toLocaleDateString()}
          />
        )}
        <LabelList
          label="Events"
          items={events?.items.map((item) => item.name)}
        />
        <LabelList
          label="Comics"
          items={comics?.items.map((item) => item.name)}
        />
        <LabelList
          label="Series"
          items={series?.items.map((item) => item.name)}
        />
        <LabelList
          label="Stories"
          items={stories?.items.map((item) => item.name)}
        />
      </Stack>
      <SquareAvatar
        margin="auto"
        boxSize={[250, 250, 250, 200, 300]}
        src={`${thumbnail?.path}.${thumbnail?.extension}`}
        alt={name}
      />
    </Stack>
  );
};
