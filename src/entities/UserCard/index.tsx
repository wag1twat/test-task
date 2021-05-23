import { Flex, Stack } from "@chakra-ui/layout";
import { Avatar, Card } from "features";
import { User } from "hooks/useUsers";
import React from "react";

interface UserCardProps extends Partial<User> {}

export const UserCard: React.FC<UserCardProps> = ({
  avatar,
  first_name,
  last_name,
  email,
}) => {
  return (
    <Stack as={Card} spacing={4}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={8}
      >
        <Avatar name={avatar} src={avatar} />
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
