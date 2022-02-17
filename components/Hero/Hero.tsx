import React from "react";
import Image from "next/image";
import Stfn1 from "../../public/stfnnn.svg";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
type Props = {};

const Hero = (props: Props) => {
    return (
        <div>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                ml={8}
                mr={8}
                mt={8}
            >
                <Box>
                    <Text
                        fontSize="5xl"
                        color="orange.200"
                        lineHeight={1}
                        mb={8}
                        bgGradient="linear(to-l, #FBD38D, #F6AD55)"
                        bgClip="text"
                        fontWeight="extrabold"
                    >
                        Jednostavna organizacija šahovskih turnira
                    </Text>
                    <Text fontSize="xl" textAlign="justify" pr={40} mb={8}>
                        <span style={{ color: "#fbcb74" }}>Fianchetto</span> je
                        platforma koja omogućava jednostavnu organizaciju
                        šahoviskih turnira. U samo nekoliko klikova napravite
                        turnir nakon čega možete za njega da dodate odigrane
                        partije. Još jedna mogućnost jeste dodavanje i izmena
                        postojećih igrača uz pomoć intuitivnog korisničkog
                        interfejsa. Isprobajte platformu već sada klikom na
                        dugme{" "}
                        <span style={{ color: "#fbcb74" }}>Kreiraj turnir</span>
                        !
                    </Text>
                    <Flex>
                        <Link href="/turniri">
                            <Button colorScheme="orange">
                                Pregledaj turnire
                            </Button>
                        </Link>

                        <Link href="/igraci">
                            <Button
                                colorScheme="orange"
                                variant="outline"
                                ml={4}
                            >
                                Pregledaj igrače
                            </Button>
                        </Link>
                    </Flex>
                </Box>
                <Box flexShrink={0}>
                    <Image src={Stfn1} width={550} height={550} />
                </Box>
            </Flex>
        </div>
    );
};

export default Hero;
