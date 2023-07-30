import { Box, Button, Center, Icon, Text, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';

type SideNavbarProps = {
  // selected: string;
  handleChange: Dispatch<SetStateAction<string>>;
};

export default function SideNavbar({ handleChange }: SideNavbarProps) {
  // const handleNavbarOption = (destination: string) => {
  //   window.electron.ipcRenderer.sendMessage(
  //     'side-menu-navigation',
  //     destination
  //   );
  // };

  return (
    <Box height="100vh" width="350px">
      <Center textColor="white" fontSize={30} height="100px">
        <Text as="b">LAUNCHER</Text>
      </Center>
      <VStack>
        <Button
          _hover={{ bgColor: 'none' }}
          bgColor="transparent"
          width="350px"
          height="80px"
          textColor="white"
          justifyContent="start"
          gap={4}
          fontSize={20}
          onClick={() => handleChange('explore')}
          // onClick={() => handleNavbarOption('explore')}
        >
          <Icon as={BiWorld} boxSize={7} />
          <Text>Explore</Text>
        </Button>
        <Button
          _hover={{ bgColor: 'none' }}
          bgColor="transparent"
          width="350px"
          height="80px"
          textColor="white"
          justifyContent="start"
          gap={4}
          fontSize={20}
          onClick={() => handleChange('library')}
          // onClick={() => handleNavbarOption('library')}
        >
          <Icon as={AiFillHeart} boxSize={7} />
          <Text>Library</Text>
        </Button>
      </VStack>
    </Box>
  );
}
