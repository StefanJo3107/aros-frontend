import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormLabel,
    Input,
    InputGroup,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Stack,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/Turnir.module.css";

type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    turniri: Turnir[];
    igraci: Igrac[];
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

const CreatePartija = (props: Props) => {
    let turnirOptions = props.turniri.map((turnir, _) => {
        return (
            <option value={`${turnir.turnir_id}`} key={`${turnir.turnir_id}`}>
                {turnir.turnir_naziv}
            </option>
        );
    });
    let igracOptions = props.igraci.map((igrac, _) => {
        return (
            <option value={`${igrac.sahista_id}`} key={`${igrac.sahista_id}`}>
                {igrac.ime + " " + igrac.prezime}
            </option>
        );
    });

    const toast = useToast();
    const router = useRouter();

    const [pgnInput, setPgnInput] = useState("");
    const handlePgnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setPgnInput(e.target.value);

    const [dateInput, setDateInput] = useState("");
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDateInput(e.target.value);

    const [openingInput, setOpeningInput] = useState("");
    const handleOpeningChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setOpeningInput(e.target.value);

    const [turnirInput, setTurnirInput] = useState(props.turniri[0].turnir_id);
    const handleTurnirChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setTurnirInput(parseInt(e.target.value));

    const [beliInput, setBeliInput] = useState(props.igraci[0].sahista_id);
    const handleBeliChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setBeliInput(parseInt(e.target.value));

    const [crniInput, setCrniInput] = useState(props.igraci[0].sahista_id);
    const handleCrniChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setCrniInput(parseInt(e.target.value));

    const [resultInput, setResultInput] = useState("1 - 0");
    const handleResultChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setResultInput(e.target.value);

    const [roundsInput, setRoundsInput] = useState(1);
    const handleRoundsChange = (s: string, v: number) => setRoundsInput(v);

    return (
        <>
            <Drawer
                isOpen={props.isOpen}
                placement="right"
                onClose={props.onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                        Dodaj partiju
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel htmlFor="name">Turnir</FormLabel>

                                <Select
                                    id="tournament"
                                    value={turnirInput}
                                    onChange={handleTurnirChange}
                                >
                                    {turnirOptions}
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="rounds">Runda</FormLabel>
                                <NumberInput
                                    defaultValue={10}
                                    min={1}
                                    value={roundsInput}
                                    onChange={handleRoundsChange}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="name">
                                    Beli šahista
                                </FormLabel>

                                <Select
                                    id="white"
                                    value={beliInput}
                                    onChange={handleBeliChange}
                                >
                                    {igracOptions}
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="name">
                                    Crni šahista
                                </FormLabel>

                                <Select
                                    id="black"
                                    value={crniInput}
                                    onChange={handleCrniChange}
                                >
                                    {igracOptions}
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="name">Rezultat</FormLabel>

                                <Select
                                    id="result"
                                    value={resultInput}
                                    onChange={handleResultChange}
                                >
                                    <option value="1 - 0">1 - 0</option>
                                    <option value="1/2 - 1/2">1/2 - 1/2</option>
                                    <option value="0 - 1">0 - 1</option>
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="date">Datum</FormLabel>
                                <InputGroup>
                                    <input
                                        className={styles.datum}
                                        type="date"
                                        id="date"
                                        value={dateInput}
                                        onChange={handleDateChange}
                                    />
                                </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="location">PGN</FormLabel>

                                <Textarea
                                    placeholder="Portable game notation"
                                    value={pgnInput}
                                    onChange={handlePgnChange}
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="image">Otvaranje</FormLabel>

                                <Input
                                    id="opening"
                                    placeholder="Unesite otvaranje"
                                    value={openingInput}
                                    onChange={handleOpeningChange}
                                />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button
                            variant="outline"
                            mr={3}
                            onClick={props.onClose}
                        >
                            Otkaži
                        </Button>
                        <Button
                            colorScheme="orange"
                            onClick={async () => {
                                try {
                                    let res = await axios.post(
                                        `http://localhost:1207/partija`,
                                        {
                                            pgn: pgnInput,
                                            turnir_id: turnirInput,
                                            beli_id: beliInput,
                                            crni_id: crniInput,
                                            runda: roundsInput,
                                            rezultat: resultInput,
                                            otvaranje: openingInput,
                                            datum: dateInput,
                                        },
                                        {
                                            headers: {
                                                "Access-Control-Allow-Origin":
                                                    "*",
                                            },
                                        }
                                    );

                                    if ("err" in res) {
                                        toast({
                                            title: "Greška",
                                            description:
                                                "Došlo je do greške prilikom dodavanja partije!",
                                            status: "error",
                                            duration: 5000,
                                            isClosable: true,
                                        });
                                    } else {
                                        toast({
                                            title: "Uspešno dodata partija",
                                            description: `Partija je uspešno dodata u bazu!`,
                                            status: "success",
                                            duration: 5000,
                                            isClosable: true,
                                        });

                                        router.replace(router.asPath);
                                    }
                                } catch (err) {
                                    toast({
                                        title: "Greška",
                                        description:
                                            "Došlo je do greške prilikom dodavanja partije!",
                                        status: "error",
                                        duration: 5000,
                                        isClosable: true,
                                    });
                                    console.log(err);
                                }
                            }}
                        >
                            Potvrdi
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default CreatePartija;
