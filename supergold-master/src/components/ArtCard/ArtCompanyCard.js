import React from "react";
import {
    Avatar,
    Box,
    Divider,
    Grid,
    Grow,
    Stack,
    Typography,
} from "@mui/material";
import { HiOutlineClock } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { GradientButtonPrimary } from "../../Utils/GradientButtons/GradientButtons";
import { MdAddToPhotos } from "react-icons/md";
import BaseUrl from "../../Utils/urls";

import styles from "./ArtCard.module.css";

const ArtCompanyCard = ({ artWork, handleDetails, ViewDetails, darkMode }) => {
    const { _id, company_image, company_name, company_token_amount, tier_id } =
        artWork; // Getting the data from the props

    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }}>
            <Grid className={styles.artCard} item xs={1} sm={6} md={4}>
                <div className={styles.artCard}>
                    <Box className={styles.gradientBorderBox}>
                        <Box
                            className={styles.cardBody}
                            sx={{
                                boxShadow: `${
                                    !darkMode &&
                                    "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                }`,
                            }}
                            bgcolor={darkMode ? "#121212" : "#ffffff"}
                            onClick={() => handleDetails(_id)}
                        >
                            <Box>
                                <img
                                    className={styles.imageStyle}
                                    src={BaseUrl + "/upload/" + company_image}
                                    alt={company_name}
                                />
                            </Box>
                            <Box className={styles.artCardBody}>
                                <Typography
                                    variant="subtitle1"
                                    component="h2"
                                    color="secondary.main"
                                    mb={1}
                                    fontWeight={500}
                                >
                                    {company_name}
                                </Typography>
                                <Box className={styles.artCardInfo}>
                                    <Typography
                                        variant="subtitle2"
                                        component="p"
                                        color="gray"
                                    >
                                        {t("TOKEN_AMOUNT")}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="p"
                                        color="secondary.main"
                                        fontWeight={500}
                                    >
                                        {company_token_amount}
                                    </Typography>
                                </Box>

                                <Divider
                                    sx={{ my: 2 }}
                                    className={styles.dividerStyle}
                                />
                            </Box>
                        </Box>
                    </Box>
                </div>
            </Grid>
        </Grow>
    );
};

export default ArtCompanyCard;
