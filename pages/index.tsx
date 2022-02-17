import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Stfn1 from "../public/stfnnn.svg";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import StackedWaves from "../public/stacked-waves-haikei.png";
import { Box } from "@chakra-ui/react";
import axios from "axios";

type Props = {
    locations: Location[];
};

type Location = {
    id: number;
    naziv: string;
};

const Home = (props: Props) => {
    return (
        <Box className={styles.container}>
            <Navbar locations={props.locations} />
            <Hero />
        </Box>
    );
};

export async function getServerSideProps() {
    const locations = await axios.get("http://localhost:1207/lokacija");

    return {
        props: {
            locations: locations.data,
        },
    };
}
export default Home;
