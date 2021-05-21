import { Flex, Stack } from "@chakra-ui/layout";
import { User } from "hooks/useUsers";
import React from "react";

interface UserCardProps extends Record<keyof User, React.ReactNode> {}

export const UserCard: React.FC<UserCardProps> = ({
  avatar,
  first_name,
  last_name,
  email,
}) => {
  return (
    <Stack
      spacing={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius={4}
      padding={4}
      cursor="pointer"
      width="100%"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={8}
      >
        <Flex>{avatar}</Flex>
        <Stack direction="row" spacing={2}>
          <Flex>{first_name}</Flex>
          <Flex>{last_name}</Flex>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Flex>Email:</Flex>
        <Flex>{email}</Flex>
      </Stack>
    </Stack>
  );
};
