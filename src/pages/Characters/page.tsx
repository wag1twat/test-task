import { PageLayout } from "features/layouts";
import { useCharacters } from "hooks/useCharacters";

export const CharactersPage: React.FC = () => {
  const data = useCharacters({ name: "Spider-man" });

  console.log(data);
  return <PageLayout></PageLayout>;
};
