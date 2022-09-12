import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtTierCard from "../ArtCard/ArtTierCard";
import ArtCardFB from "../Skeletons/ArtCardFB";
import { Typography } from "@mui/material";
// Gradient buttons
import {
    GradientButtonPrimary,
    GradientButtonSecondary,
} from "../../Utils/GradientButtons/GradientButtons";
import { MdAddToPhotos } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import BaseUrl from "../../Utils/urls";
const AllTierCards = ({ darkMode }) => {
    const [artWorks, setArtWorks] = useState([]);
    const { interventionId } = useParams();
    const navigate = useNavigate(); // navigation
    // Loading data from API
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(
                BaseUrl + `/api/tier/${interventionId}`
            );
            const artWorkData = res.data.tiers;
            setArtWorks(artWorkData);
        }
        fetchData();
    }, []);
    const { t } = useTranslation();
    // Handler for navigating to the details
    const handleDetails = (id) => {
        navigate(`/Intervention/${interventionId}/${id}`);
    };
    const ViewDetails = (e, _id) => {
        e.stopPropagation();
        console.log(_id);
        navigate(`/Intervention/${interventionId}/details/${_id}`);
    };
    return (
        <>
            <Box
                mt={10}
                mb={3}
                style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "flex-end",
                    marginRight: "2.8rem",
                }}
            >
                <GradientButtonPrimary
                    onClick={() => navigate(`/${interventionId}/create-tier`)}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Typography color="#ffffff" component="span" mt={0.8}>
                        <MdAddToPhotos />
                    </Typography>
                    <Typography variant="subtitle1" component="span">
                        {t("ADD_TIER")}
                    </Typography>
                </GradientButtonPrimary>
                <GradientButtonPrimary
                    onClick={() => navigate("/Intervention")}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Typography color="#ffffff" component="span" mt={0.8}>
                        <MdAddToPhotos />
                    </Typography>
                    <Typography variant="subtitle1" component="span">
                        {t("PREVIEW")}
                    </Typography>
                </GradientButtonPrimary>
            </Box>
            <Box>
                <Grid
                    container
                    spacing={{ xs: 4, md: 6 }}
                    columns={{ xs: 1, sm: 12, md: 12 }}
                >
                    {artWorks.length === 0 ? (
                        [1, 2, 3, 4, 5, 6].map((n) => (
                            <ArtCardFB darkMode={darkMode} key={n} />
                        ))
                    ) : (
                        <>
                            {artWorks.map((artWork) => (
                                <ArtTierCard
                                    darkMode={darkMode}
                                    key={artWork._id}
                                    artWork={artWork}
                                    handleDetails={handleDetails}
                                    ViewDetails={ViewDetails}
                                />
                            ))}
                        </>
                    )}
                </Grid>
            </Box>
        </>
    );
};

export default AllTierCards;
