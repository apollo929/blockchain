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

const ArtCard = ({ artWork, handleDetails, ViewDetails, darkMode }) => {
    const { _id, image, name, token_amount } = artWork; // Getting the data from the props

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
                                    src={BaseUrl + "/upload/" + image}
                                    alt={name}
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
                                    {name}
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
                                        {token_amount}
                                    </Typography>
                                </Box>
                                {/* <Divider
                                    style={{
                                        backgroundColor: "#8E8E8E",
                                        margin: "10px 0",
                                    }}
                                />
                                <Box className={styles.artCardInfo}>
                                    <Box className={styles.artCardCreator}>
                                        <Box>
                                            <Avatar
                                                sx={{
                                                    border: `2px solid ${
                                                        darkMode
                                                            ? "#ffffff"
                                                            : "#01D4FA"
                                                    }`,
                                                }}
                                                src={creatorImage}
                                                alt={creator}
                                            />
                                        </Box>
                                        <Stack direction="column">
                                            <Typography
                                                variant="caption"
                                                gutterBottom
                                                color="gray"
                                            >
                                                {t("CREATOR")}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                gutterBottom
                                                color="secondary.main"
                                            >
                                                {creator}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                    <Box className={styles.artCardOwner}>
                                        <Box>
                                            <Avatar
                                                sx={{
                                                    border: `2px solid ${
                                                        darkMode
                                                            ? "#ffffff"
                                                            : "#01D4FA"
                                                    }`,
                                                }}
                                                src={ownerImage}
                                                alt={owner}
                                            />
                                        </Box>
                                        <Stack direction="column">
                                            <Typography
                                                variant="caption"
                                                gutterBottom
                                                color="gray"
                                            >
                                                {t("OWNER")}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                gutterBottom
                                                color="secondary.main"
                                            >
                                                {owner}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Box> */}
                                <Divider
                                    sx={{ my: 2 }}
                                    className={styles.dividerStyle}
                                />
                                {/* <Box className={styles.artCardFooter}>
                                    <Stack
                                        direction="row"
                                        gap={2}
                                        alignItems="center"
                                    >
                                        <HiOutlineClock
                                            style={{
                                                color: `${
                                                    darkMode
                                                        ? "#ffffff"
                                                        : "#121212"
                                                }`,
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            component="span"
                                            color="gray"
                                        >
                                            {uploaded} {t("HOURS_AGO")}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        gap={2}
                                        alignItems="center"
                                    >
                                        <AiOutlineHeart
                                            style={{
                                                color: `${
                                                    darkMode
                                                        ? "#ffffff"
                                                        : "#121212"
                                                }`,
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            component="span"
                                            color="gray"
                                        >
                                            {likes}
                                        </Typography>
                                    </Stack>
                                </Box> */}
                                <GradientButtonPrimary
                                    onClick={(e) => ViewDetails(e, _id)}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <Typography
                                        color="#ffffff"
                                        component="span"
                                        mt={0.8}
                                    >
                                        <MdAddToPhotos />
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="span"
                                    >
                                        {t("VIEW_DETAIL")}
                                    </Typography>
                                </GradientButtonPrimary>
                            </Box>
                        </Box>
                    </Box>
                </div>
            </Grid>
        </Grow>
    );
};

export default ArtCard;
