import {
  Button,
  ChakraProvider,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';

export default function BottomMenu() {
  // const [game, setGame] = useState<Game>();

  useEffect(() => {
    console.log(window.electron.ipcRenderer);
    const mainViewUrl = window.electron.electronStore.get('main-view-url');
    const url = new URL(mainViewUrl);
    console.log(url);
  }, []);

  return (
    <ChakraProvider>
      <HStack bgColor="blackAlpha.900" height="150px" gap={4}>
        <Image
          src="http://localhost:3333/files/download?fileName=4b7bf9a9-1b4c-4b01-b022-33794772202d.jpg&type=GAME_COVER_IMAGE"
          height="full"
          width="230px"
          bgColor="white"
        />
        <VStack flexGrow={1} textColor="white" alignItems="start">
          <Text>Game Name</Text>
          <HStack>
            <Text>A game for </Text>
            <Icon />
          </HStack>
          <Text>Free download</Text>
        </VStack>
        <Button mr={6} bgColor="red" height="50px" textColor="white">
          Download
        </Button>
      </HStack>
    </ChakraProvider>
  );
}
