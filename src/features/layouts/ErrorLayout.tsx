import { Flex, FlexProps } from "@chakra-ui/layout";

interface ErrorLayoutProps extends FlexProps {
  error?: string;
}

export const ErrorLayout: React.FC<ErrorLayoutProps> = ({
  error,
  children,
  ...props
}) => {
  if (Boolean(error)) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        border="1px solid"
        borderColor="red.200"
        borderRadius={4}
        padding={4}
        color="red.500"
        width="100%"
        {...props}
      >
        {error}
      </Flex>
    );
  }

  return <>{children}</>;
};
