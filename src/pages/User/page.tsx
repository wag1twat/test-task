import { Text, Wrap, WrapItem } from "@chakra-ui/layout";
import {
  IBreadcrumbItem,
  NavigationLayout,
  PageLayout,
  ResponsiveAvatar,
  UserCard,
  LoaderLayout,
  ErrorLayout,
  ContentLayout,
} from "features";
import { useUser } from "hooks/useUser";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { unknowVarInTemplateString } from "utils";
import { clearUserSlice } from "./slice";

export const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const dispatch = useDispatch();

  const { first_name, last_name, avatar, email, isLoading, error } =
    useUser(userId);

  const breadcrumbs = useMemo<IBreadcrumbItem[]>(() => {
    return [
      { label: "Home", url: "/" },
      { label: "Users", url: "/users" },
      {
        label: unknowVarInTemplateString(
          `${first_name} ${last_name}`,
          "Unknow user"
        ),
        url: `/users/${userId}`,
        isCurrentPage: true,
        isLoading,
      },
    ];
  }, [first_name, userId, isLoading, last_name]);

  useEffect(() => {
    return () => {
      dispatch(clearUserSlice());
    };
  }, [dispatch]);

  return (
    <PageLayout>
      <NavigationLayout breadcrumbs={breadcrumbs} />
      <LoaderLayout isLoading={isLoading}>
        <ErrorLayout error={error?.message}>
          <ContentLayout>
            <UserCard
              id={null}
              avatar={
                <Wrap>
                  <WrapItem>
                    <ResponsiveAvatar name={first_name} src={avatar} />
                  </WrapItem>
                </Wrap>
              }
              first_name={<Text fontWeight="bold">{first_name}</Text>}
              last_name={<Text fontWeight="bold">{last_name}</Text>}
              email={email}
            />
          </ContentLayout>
        </ErrorLayout>
      </LoaderLayout>
    </PageLayout>
  );
};
