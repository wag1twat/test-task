import { Box, BoxProps } from "@chakra-ui/layout";

export const Card: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius={4}
      padding={4}
      cursor="pointer"
      width="100%"
      {...props}
    >
      {children}
    </Box>
  );
};
