import React, { useEffect, useState } from "react";

import { Container, Typography } from "@mui/material";

import axios from "axios";

import { useParams } from "react-router-dom";

// Single Artwork components
import SingleArtWork from "./SingleArtWork";
import BaseUrl from "../../Utils/urls";
// Styles
import styles from "./ArtCardDetails.module.css";

const ArtTierDetails = ({ darkMode }) => {
    const { interventionId, tierId } = useParams(); // Read from url

    const [artWork, setArtWork] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(
                BaseUrl + `/api/tier/details/${tierId}`
            );
            const artWorkData = res.data.tier;
            console.log(tierId, artWorkData);
            setArtWork(artWorkData);
        }
        fetchData();
    }, []);

    return (
        <Container className={styles.artCardDetailsContainer}>
            <Typography variant="h3" color="secondary.main">
                <SingleArtWork
                    darkMode={darkMode}
                    key={artWork._id}
                    fa={artWork}
                />
            </Typography>
        </Container>
    );
};

export default ArtTierDetails;
