import {
  ListItem,
  ListProps,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/layout";
import { ColorProps } from "@chakra-ui/styled-system";
import { LabelText } from "features/LabelText";
import React from "react";

interface LabelListProps extends ListProps {
  label: string;
  labelColor?: ColorProps["color"];
  items?: string[];
}

export const LabelList: React.FC<LabelListProps> = ({
  items,
  label,
  labelColor = "black",
  ...props
}) => {
  if (items) {
    if (items.length) {
      return (
        <Stack spacing={4}>
          <Text color={labelColor}>{label}:</Text>
          <UnorderedList {...props} stylePosition="inside">
            {items.map((item, i) => (
              <ListItem key={i}>{item}</ListItem>
            ))}
          </UnorderedList>
        </Stack>
      );
    }
  }

  return (
    <LabelText labelColor={labelColor} label={label} text="no data available" />
  );
};
