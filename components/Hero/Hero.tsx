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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestias dolorem earum, tenetur, fugit impedit, at in
                        omnis eveniet quis aspernatur quibusdam quas
                        perspiciatis corrupti blanditiis fuga neque qui
                        repellendus odio?
                    </Text>
                    <Flex>
                        <Button colorScheme="orange" mr={4}>
                            Kreiraj turnir
                        </Button>
                        <Link href="/turnir">
                            <Button colorScheme="orange" variant="outline">
                                Pregledaj turnire
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
