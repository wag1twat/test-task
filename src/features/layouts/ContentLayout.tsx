import { Flex, FlexProps } from "@chakra-ui/layout";

export const ContentLayout: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex maxWidth={1000} width="100%" {...props}>
      {children}
    </Flex>
  );
};
