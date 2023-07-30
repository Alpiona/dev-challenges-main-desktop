import { Box, Center, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Game } from 'actions/gameTypes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type LibraryProps = {
  handleSideMenuChange: Dispatch<SetStateAction<string>>;
};

export default function Library({ handleSideMenuChange }: LibraryProps) {
  const [games, setGames] = useState<Game[]>([]);

  const handleGameClick = (gamePathname: string) => {
    handleSideMenuChange('explore');

    window.electron.ipcRenderer.sendMessage(
      'main-view-url',
      `game/${gamePathname}`
    );
  };

  useEffect(() => {
    const { data: gamesData } = window.electron.electronStore.get('all-games');
    setGames(gamesData);
  }, []);

  return (
    <VStack alignItems="start" width="100%">
      <Text textColor="white" fontSize={30} as="b">
        Biblioteca
      </Text>
      <HStack width="auto">
        <HStack
          flexGrow="1"
          whiteSpace="nowrap"
          overflow="hidden"
          width="calc(100vw - 550px)"
        >
          {games.map((game) => (
            <Image
              width="250px"
              height="200px"
              display="inline-block"
              src={game.coverImageUrl}
              onClick={() => handleGameClick(game.platformUrlPath!)}
            />
          ))}
          {...Array(10 - games.length).fill(
            <Box
              minWidth="250px"
              height="200px"
              bgColor="blackAlpha.50"
              borderWidth={1}
              borderColor="gray.700"
            />
          )}
        </HStack>
        <Center width="200px">
          <Text as="b" textColor="white">
            View all...
          </Text>
        </Center>
      </HStack>
    </VStack>
  );
}
