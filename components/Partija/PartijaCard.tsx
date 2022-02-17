import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    GridItem,
    Icon,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { GiChessKing } from "react-icons/gi";
import { AiOutlineTrophy } from "react-icons/ai";
import UpdatePartija from "./UpdatePartija";
import Link from "next/link";

type Props = {
    partija: Partija;
    igraci: Igrac[];
};

type Partija = {
    partija_id: number;
    beli: Igrac;
    crni: Igrac;
    pgn: string;
    rezultat: string;
    otvaranje: string;
    datum: string;
    turnir: Turnir;
    runda: number;
};

type Igrac = {
    sahista_id: number;
    ime: string;
    prezime: string;
    elo: number;
    titula_fide: string;
    lokacija_id: number;
    sahista_slika: string;
};

type Turnir = {
    turnir_id: number;
    turnir_naziv: string;
    turnir_datum: string;
    broj_rundi: number;
    lokacija_id: number;
    turnir_slika: string;
};

const PartijaCard = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box
            //w="28rem"
            backgroundColor="gray.900"
            borderRadius="xl"
            boxShadow="dark-lg"
            pr={2}
            pl={2}
        >
            <Flex
                justifyContent="space-between"
                p={2}
                pb={0}
                pl={4}
                pr={4}
                color="gray.500"
            >
                <Text>{props.partija.datum}</Text>
                <Text>Runda {props.partija.runda}</Text>
            </Flex>
            <Grid
                mt={4}
                justifyItems="center"
                alignContent="center"
                alignItems="center"
                templateColumns="repeat(6,1fr)"
                m="auto"
                gap={4}
                p={4}
            >
                <GridItem colSpan={2}>
                    <Text
                        fontSize="xl"
                        textAlign="center"
                        fontWeight="bold"
                        color="orange.200"
                    >
                        {props.partija.beli.ime +
                            " " +
                            props.partija.beli.prezime}
                    </Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <Text
                        fontSize="2xl"
                        textAlign="center"
                        fontWeight="bold"
                        color="orange.200"
                    >
                        {props.partija.rezultat}
                    </Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <Text
                        fontSize="xl"
                        textAlign="center"
                        fontWeight="bold"
                        color="orange.200"
                    >
                        {props.partija.crni.ime +
                            " " +
                            props.partija.crni.prezime}
                    </Text>
                </GridItem>
            </Grid>

            <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(2, 1fr)"
                justifyItems="center"
                p={2}
                pb={0}
            >
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
                    as={GiChessKing}
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
                <GridItem as={Text} rowSpan={1} colSpan={1} textAlign="center">
                    {props.partija.turnir.turnir_naziv}
                </GridItem>
                <GridItem as={Text} rowSpan={1} colSpan={1} textAlign="center">
                    {props.partija.otvaranje}
                </GridItem>
            </Grid>

            <Center>
                <Link href={"/partije/" + props.partija.partija_id}>
                    <Button colorScheme="orange" mb={4} mr={12}>
                        Prikaži partiju
                    </Button>
                </Link>
                <Button colorScheme="orange" mb={4} onClick={onOpen}>
                    Izmeni partiju
                </Button>
            </Center>

            <UpdatePartija
                igraci={props.igraci}
                partija={props.partija}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            />
        </Box>
    );
};

export default PartijaCard;
