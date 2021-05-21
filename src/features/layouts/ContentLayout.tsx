import { Flex } from "@chakra-ui/layout";

export const ContentLayout: React.FC = ({ children }) => {
  return (
    <Flex maxWidth={1000} width="100%">
      {children}
    </Flex>
  );
};
