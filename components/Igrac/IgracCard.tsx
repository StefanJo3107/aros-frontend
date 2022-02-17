import {
    Box,
    Button,
    Center,
    Grid,
    GridItem,
    Text,
    Image,
    IconButton,
    Icon,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineTrophy } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import UpdateIgrac from "./UpdateIgrac";

type Props = {
    igrac: Igrac;
    locations: Lokacija[];
};

type Lokacija = {
    id: number;
    naziv: string;
};

type Igrac = {
    sahista_id: number;
    ime: string;
    prezime: string;
    elo: number;
    titula_fide: string;
    lokacija: string;
    sahista_slika: string;
};
const IgracCard = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box
            w="17rem"
            backgroundColor="gray.900"
            borderRadius="xl"
            boxShadow="dark-lg"
            pt={4}
        >
            <Box
                as={Image}
                src={props.igrac.sahista_slika}
                width="10rem"
                height="10rem"
                objectFit="cover"
                borderRadius="50%"
                margin="auto"
            />
            <Text
                fontSize="xl"
                textAlign="center"
                mb={4}
                fontWeight="bold"
                mt={4}
            >
                {props.igrac.ime + " " + props.igrac.prezime}
            </Text>
            <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(3, 1fr)"
                justifyItems="center"
                p={2}
                pb={0}
            >
                <GridItem
                    as={Text}
                    rowSpan={1}
                    colSpan={1}
                    w={12}
                    h={12}
                    backgroundColor="gray.700"
                    borderRadius="50%"
                    fill="orange.200"
                    p={2}
                    mb={2}
                    textAlign="center"
                    pt="11px"
                    fontWeight="bold"
                    color="orange.200"
                >
                    ELO
                </GridItem>
                <GridItem
                    as={AiOutlineTrophy}
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
                    {props.igrac.elo}
                </GridItem>
                <GridItem
                    as={Text}
                    rowSpan={1}
                    colSpan={1}
                    textAlign="center"
                    color="orange.200"
                >
                    {props.igrac.titula_fide}
                </GridItem>
                <GridItem
                    as={Text}
                    rowSpan={1}
                    colSpan={1}
                    textAlign="center"
                    color="orange.200"
                >
                    {props.igrac.lokacija}
                </GridItem>
            </Grid>
            <Center>
                <Button colorScheme="orange" mb={4} onClick={onOpen}>
                    Izmeni igrača
                </Button>
            </Center>
            <UpdateIgrac
                locations={props.locations}
                igrac={props.igrac}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            />
        </Box>
    );
};

export default IgracCard;
