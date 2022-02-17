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
    InputLeftAddon,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Stack,
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
    locations: Location[];
};

type Location = {
    id: number;
    naziv: string;
};

const CreateTurnir = (props: Props) => {
    let locationOptions = props.locations.map((loc, _) => {
        return (
            <option value={`${loc.id}`} key={`${loc.id}`}>
                {loc.naziv}
            </option>
        );
    });

    const toast = useToast();
    const router = useRouter();

    const [nameInput, setNameInput] = useState("");
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setNameInput(e.target.value);

    const [dateStart, setDateStartInput] = useState("");
    const handleDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDateStartInput(e.target.value);

    const [dateEnd, setDateEndInput] = useState("");
    const handleDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDateEndInput(e.target.value);

    const [locInput, setLocInput] = useState(props.locations[0].id);
    const handleLocChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setLocInput(parseInt(e.target.value));

    const [roundsInput, setRoundsInput] = useState(1);
    const handleRoundsChange = (s: string, v: number) => setRoundsInput(v);

    const [imageInput, setImageInput] = useState("");
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setImageInput(e.target.value);

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
                        Kreiraj turnir
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel htmlFor="name">Naziv</FormLabel>
                                <Input
                                    id="name"
                                    placeholder="Unesite naziv turnira"
                                    value={nameInput}
                                    onChange={handleNameChange}
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="dateStart">
                                    Datum početka
                                </FormLabel>
                                <InputGroup>
                                    <input
                                        className={styles.datum}
                                        type="date"
                                        id="dateStart"
                                        value={dateStart}
                                        onChange={handleDateStartChange}
                                    />
                                </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="dateEnd">
                                    Datum završetka
                                </FormLabel>
                                <InputGroup>
                                    <input
                                        className={styles.datum}
                                        type="date"
                                        id="dateEnd"
                                        value={dateEnd}
                                        onChange={handleDateEndChange}
                                    />
                                </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="rounds">
                                    Broj rundi
                                </FormLabel>
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
                                <FormLabel htmlFor="location">
                                    Lokacija održavanja
                                </FormLabel>

                                <Select
                                    id="location"
                                    defaultValue="Norveška"
                                    value={locInput}
                                    onChange={handleLocChange}
                                >
                                    {locationOptions}
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="image">Slika</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children="URL" />
                                    <Input
                                        id="image"
                                        placeholder="Unesite sliku turnira"
                                        value={imageInput}
                                        onChange={handleImageChange}
                                    />
                                </InputGroup>
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
                                        "http://localhost:1207/turnir",
                                        {
                                            turnir_naziv: nameInput,
                                            turnir_datum: `${dateStart} ${dateEnd}`,
                                            broj_rundi: roundsInput,
                                            lokacija_id: locInput,
                                            turnir_slika: imageInput,
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
                                                "Došlo je do greške prilikom kreiranja turnira!",
                                            status: "error",
                                            duration: 5000,
                                            isClosable: true,
                                        });
                                    } else {
                                        toast({
                                            title: "Uspešno kreiran turnir",
                                            description: `Turnir je uspešno dodat u bazu!`,
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
                                            "Došlo je do greške prilikom kreiranja turnira!",
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

export default CreateTurnir;
