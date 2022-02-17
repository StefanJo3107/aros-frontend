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

const CreateIgrac = (props: Props) => {
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

    const [surnameInput, setSurnameInput] = useState("");
    const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSurnameInput(e.target.value);

    const [eloInput, setEloInput] = useState(2800);
    const handleEloChange = (s: string, v: number) => setEloInput(v);

    const [locInput, setLocInput] = useState(props.locations[0].id);
    const handleLocChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setLocInput(parseInt(e.target.value));

    const [titleInput, setTitleInput] = useState("GM");
    const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setTitleInput(e.target.value);

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
                        Dodaj igrača
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel htmlFor="name">Ime</FormLabel>
                                <Input
                                    id="name"
                                    placeholder="Unesite ime"
                                    value={nameInput}
                                    onChange={handleNameChange}
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="surname">Prezime</FormLabel>
                                <Input
                                    id="surname"
                                    placeholder="Unesite prezime"
                                    value={surnameInput}
                                    onChange={handleSurnameChange}
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="elo">ELO</FormLabel>
                                <NumberInput
                                    defaultValue={2800}
                                    min={0}
                                    value={eloInput}
                                    onChange={handleEloChange}
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
                                    Zemlja porekla
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
                                <FormLabel htmlFor="title">Titula</FormLabel>
                                <Select
                                    id="title"
                                    defaultValue="GM"
                                    value={titleInput}
                                    onChange={handleTitleChange}
                                >
                                    <option value="GM">GM</option>
                                    <option value="IM">IM</option>
                                    <option value="FM">FM</option>
                                    <option value="CM">CM</option>
                                    <option value="WGM">WGM</option>
                                    <option value="WIM">WIM</option>
                                    <option value="WFM">WFM</option>
                                    <option value="WCM">WCM</option>
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="image">Slika</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children="URL" />
                                    <Input
                                        id="image"
                                        placeholder="Unesite sliku igrača"
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
                                        "http://localhost:1207/sahista",
                                        {
                                            titula_fide: titleInput,
                                            elo: eloInput,
                                            ime: nameInput,
                                            prezime: surnameInput,
                                            lokacija_id: locInput,
                                            sahista_slika: imageInput,
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
                                                "Došlo je do greške prilikom dodavanja igrača!",
                                            status: "error",
                                            duration: 5000,
                                            isClosable: true,
                                        });
                                    } else {
                                        toast({
                                            title: "Uspešno dodat igrač",
                                            description: `Igrač je uspešno dodat u bazu!`,
                                            status: "success",
                                            duration: 5000,
                                            isClosable: true,
                                        });

                                        router.replace(router.asPath);
                                    }
                                } catch (err) {
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

export default CreateIgrac;
