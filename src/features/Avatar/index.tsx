import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
} from "@chakra-ui/avatar";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { useBreakpoint } from "@chakra-ui/media-query";

export const Avatar: React.FC<ChakraAvatarProps> = (props) => {
  const size = useBreakpoint();

  return (
    <Wrap>
      <WrapItem>
        <ChakraAvatar {...props} size={size} />
      </WrapItem>
    </Wrap>
  );
};
