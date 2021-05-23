import { CharacterCard } from "entities/CharacterCard";
import {
  ContentLayout,
  ErrorLayout,
  IBreadcrumbItem,
  LoaderLayout,
  NavigationLayout,
  PageLayout,
} from "features";
import { useCharacter } from "hooks/useCharacter";
import React, { useMemo } from "react";
import { useParams } from "react-router";
import { unknowVarInTemplateString } from "utils";

export const CharacterPage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();

  const { isLoading, error, data } = useCharacter(Number(characterId));

  const breadcrumbs = useMemo<IBreadcrumbItem[]>(() => {
    return [
      {
        label: "Home",
        url: "/",
      },
      { label: "Characters", url: "/characters" },
      {
        label: unknowVarInTemplateString(String(data.name), "Unknow character"),
        url: `/characters/${data.id}`,
        isLoading,
        isCurrentPage: true,
      },
    ];
  }, [data.id, data.name, isLoading]);

  return (
    <PageLayout>
      <NavigationLayout breadcrumbs={breadcrumbs} />
      <LoaderLayout isLoading={isLoading}>
        <ErrorLayout error={error?.message}>
          <ContentLayout>
            <CharacterCard {...data} />
          </ContentLayout>
        </ErrorLayout>
      </LoaderLayout>
    </PageLayout>
  );
};
