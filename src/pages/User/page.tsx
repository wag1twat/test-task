import { UserCard } from "entities/UserCard";
import {
  IBreadcrumbItem,
  NavigationLayout,
  PageLayout,
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

  const { id, first_name, last_name, avatar, email, isLoading, error } =
    useUser(Number(userId));

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
              id={id}
              avatar={avatar}
              first_name={first_name}
              last_name={first_name}
              email={email}
            />
          </ContentLayout>
        </ErrorLayout>
      </LoaderLayout>
    </PageLayout>
  );
};
