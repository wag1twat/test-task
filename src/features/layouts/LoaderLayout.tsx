import { Flex, FlexProps } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

interface LoaderLayoutProps extends FlexProps {
  isLoading: boolean;
}

export const LoaderLayout: React.FC<LoaderLayoutProps> = ({
  isLoading,
  children,
  ...props
}) => {
  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" {...props}>
        <Spinner size="md" />
      </Flex>
    );
  }

  return <>{children}</>;
};
