import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    GridItem,
    Icon,
    Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { MdUpdate } from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import TataSteel from "../../public/tata steel.png";
type Props = {};

const TurnirCard = (props: Props) => {
    return (
        <Box w="17rem" backgroundColor="gray.900" borderRadius="xl">
            <Box as={Image} src={TataSteel} borderTopRadius="xl" />
            <Text fontSize="xl" textAlign="center" mb={4} fontWeight="bold">
                Tata Steel Chess Tournament 2022
            </Text>
            <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(3, 1fr)"
                justifyItems="center"
                mb={2}
                p={2}
            >
                <GridItem
                    as={MdUpdate}
                    rowSpan={1}
                    colSpan={1}
                    w={12}
                    h={12}
                    backgroundColor="gray.700"
                    borderRadius="50%"
                    fill="orange.200"
                    p={2}
                    mb={2}
                />
                <GridItem
                    as={AiOutlineFieldNumber}
                    rowSpan={1}
                    colSpan={1}
                    w={12}
                    h={12}
                    backgroundColor="gray.700"
                    borderRadius="50%"
                    fill="orange.200"
                    p={2}
                    mb={2}
                />
                <GridItem
                    as={ImLocation2}
                    rowSpan={1}
                    colSpan={1}
                    w={12}
                    h={12}
                    backgroundColor="gray.700"
                    borderRadius="50%"
                    fill="orange.200"
                    p={2}
                    mb={2}
                />
                <GridItem
                    as={Text}
                    rowSpan={1}
                    colSpan={1}
                    textAlign="center"
                    color="orange.200"
                >
                    12.1.2022. 12.2.2022.
                </GridItem>
                <GridItem
                    as={Text}
                    rowSpan={1}
                    colSpan={1}
                    textAlign="center"
                    fontSize="xl"
                    color="orange.200"
                >
                    7
                </GridItem>
                <GridItem
                    as={Text}
                    rowSpan={1}
                    colSpan={1}
                    textAlign="center"
                    color="orange.200"
                >
                    Norway
                </GridItem>
            </Grid>
            <Center>
                <Button colorScheme="orange" mb={4}>
                    Prikaži turnir
                </Button>
            </Center>
        </Box>
    );
};

export default TurnirCard;
