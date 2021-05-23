import { Stack, StackProps, Text } from "@chakra-ui/layout";
import { ColorProps } from "@chakra-ui/styled-system";

interface LabelTextProps extends StackProps {
  labelColor?: ColorProps["color"];
  textColor?: ColorProps["color"];
  text?: string;
  label?: string;
}

export const LabelText: React.FC<LabelTextProps> = ({
  labelColor = "black",
  textColor = "blackAlpha.700",
  text = "",
  label = "",
  ...props
}) => {
  return (
    <Stack direction="row" spacing={1} {...props}>
      <Text color={labelColor}>{label}:</Text>
      <Text color={textColor}>{text}</Text>
    </Stack>
  );
};
