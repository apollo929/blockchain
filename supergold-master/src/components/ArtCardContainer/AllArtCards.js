import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtCard from "../ArtCard/ArtCard";
import ArtCardFB from "../Skeletons/ArtCardFB";
import useQuery from "../../hooks/useQuery";

import { useTranslation } from "react-i18next";
import BaseUrl from "../../Utils/urls";
const AllArtCards = ({ darkMode }) => {
    const [artWorks, setArtWorks] = useState([]);

    const navigate = useNavigate(); // navigation

    // Loading data from API
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(BaseUrl + "/api/intervention/all");
            console.log("res.data:", res.data.interventions);
            const artWorkData = res.data.interventions;
            setArtWorks(artWorkData);
        }
        fetchData();
    }, []);
    const { t } = useTranslation();
    // Handler for navigating to the details
    const handleDetails = (id) => {
        navigate(`/Intervention/${id}`);
    };
    const ViewDetails = (e, _id) => {
        e.stopPropagation();
        console.log(_id);
        navigate(`/Intervention/details/${_id}`);
    };
    let query = useQuery();
    return (
        <>
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
                                <ArtCard
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

export default AllArtCards;
