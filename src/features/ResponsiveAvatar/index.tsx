import { Avatar, AvatarProps } from "@chakra-ui/avatar";
import { useBreakpoint } from "@chakra-ui/media-query";

export const ResponsiveAvatar: React.FC<AvatarProps> = (props) => {
  const size = useBreakpoint();

  return <Avatar {...props} size={size} />;
};
