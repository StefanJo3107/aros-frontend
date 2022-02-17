import {
    Box,
    Button,
    Center,
    Grid,
    GridItem,
    Text,
    Image,
    Icon,
    IconButton,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { MdDelete, MdUpdate } from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import axios from "axios";
import { useRouter } from "next/router";
import UpdateTurnir from "./UpdateTurnir";
import Link from "next/link";

type Props = {
    turnir: Turnir;
    locations: Location[];
};

type Turnir = {
    turnir_id: number;
    turnir_naziv: string;
    turnir_datum: string;
    broj_rundi: number;
    lokacija: string;
    turnir_slika: string;
};

type Location = {
    id: number;
    naziv: string;
};

const TurnirCard = (props: Props) => {
    let toast = useToast();
    let router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box
            w="20rem"
            backgroundColor="gray.900"
            borderRadius="xl"
            boxShadow="dark-lg"
            position="relative"
        >
            <Box
                as={Image}
                src={props.turnir.turnir_slika}
                borderTopRadius="xl"
            />

            <IconButton
                aria-label="Delete tournament"
                icon={<Icon as={MdDelete} w={6} h={6} />}
                mb={4}
                mr={2}
                position="absolute"
                top="2"
                right="0"
                onClick={async () => {
                    try {
                        await axios.delete(
                            `http://localhost:1207/turnir/${props.turnir.turnir_id}`
                        );

                        toast({
                            title: "Uspešno obrisan turnir",
                            description: `Turnir je uspešno obrisan iz baze!`,
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                        });

                        router.replace(router.asPath);
                    } catch (err) {
                        toast({
                            title: "Greška prilikom brisanja turnira",
                            description: `Turnir nije obrisan iz baze!`,
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        });

                        console.log(err);
                    }
                }}
            />
            <Text
                fontSize="xl"
                textAlign="center"
                mb={4}
                mt={4}
                fontWeight="bold"
            >
                {props.turnir.turnir_naziv}
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
                    {props.turnir.turnir_datum}
                </GridItem>
                <GridItem
                    as={Text}
                    rowSpan={1}
                    colSpan={1}
                    textAlign="center"
                    fontSize="xl"
                    color="orange.200"
                >
                    {props.turnir.broj_rundi}
                </GridItem>
                <GridItem
                    as={Text}
                    rowSpan={1}
                    colSpan={1}
                    textAlign="center"
                    color="orange.200"
                >
                    {props.turnir.lokacija}
                </GridItem>
            </Grid>
            <Center>
                <Link href={`/turniri/${props.turnir.turnir_id}`}>
                    <Button colorScheme="orange" mb={4} mr={2}>
                        Prikaži turnir
                    </Button>
                </Link>
                <Button colorScheme="orange" mb={4} onClick={onOpen}>
                    Izmeni turnir
                </Button>
            </Center>

            <UpdateTurnir
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                locations={props.locations}
                turnir={props.turnir}
            />
        </Box>
    );
};

export default TurnirCard;
