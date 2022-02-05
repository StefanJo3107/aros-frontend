import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import TurnirCard from "../../components/TurnirCard/TurnirCard";
import styles from "../../styles/Home.module.css";

type Props = {};

const index = (props: Props) => {
    return (
        <Box className={styles.container}>
            <Navbar />
            <TurnirCard />
        </Box>
    );
};

export default index;
