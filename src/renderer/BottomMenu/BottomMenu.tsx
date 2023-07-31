import {
  Button,
  ChakraProvider,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Game } from 'actions/gameTypes';
import { useEffect, useState } from 'react';

export default function BottomMenu() {
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const { data: gameData } = window.electron.electronStore.get('game');
    setGame(gameData);
  }, []);

  return (
    <ChakraProvider>
      {game && (
        <HStack bgColor="blackAlpha.900" height="150px" gap={4}>
          <Image
            src={game.coverImageUrl}
            height="full"
            width="230px"
            bgColor="white"
          />
          <VStack flexGrow={1} textColor="white" alignItems="start">
            <Text>{game.title}</Text>
            <HStack>
              <Text>{`A game for ${[
                ...new Set(game.builds.map((build) => build.operatingSystem)),
              ].join(', ')}`}</Text>
            </HStack>
            <Text>Free download</Text>
          </VStack>
          <Button mr={6} bgColor="red" height="50px" textColor="white">
            {game.hasBought ? (
              <Link href={game.builds[0].url}>
                <Text as="b">Download</Text>
              </Link>
            ) : (
              <Text as="b">Buy</Text>
            )}
          </Button>
        </HStack>
      )}
    </ChakraProvider>
  );
}
