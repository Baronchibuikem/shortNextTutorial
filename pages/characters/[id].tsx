import { Character, GetCharacterResults } from "../../types";
import { GetServerSideProps } from "next";
import Image from "next/image";
import imageLoader from "../../imageLoader";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import characterStyles from "../../styles/Character.module.css";

function CharacterPage({ character }: { character: Character }) {
  const router = useRouter();

  console.log(router.query.id);

  return (
    <div className={characterStyles.container}>
      {character.name}
      <Image
        src={character.image}
        alt={character.name}
        width="200px"
        height="200px"
        loader={imageLoader}
        unoptimized
      />
    </div>
  );
}

CharacterPage.getLayout = function getLayout(page: typeof CharacterPage) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${context.query.id}`
  );
  const character = await res.json();
  return {
    props: { character },
  };
};

export default CharacterPage;
