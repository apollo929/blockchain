import React, { useState, useEffect } from "react";
import axios from "axios";
// From Material UI
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Backdrop,
    Button,
    Divider,
    Fade,
    IconButton,
    Modal,
    Stack,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

// Custom Gradient button
import { GradientButtonPrimary } from "../../Utils/GradientButtons/GradientButtons";

// Icons
import { FiChevronLeft } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";
import { BsFillBookmarkFill, BsBookmark, BsChevronDown } from "react-icons/bs";
import { HiTemplate } from "react-icons/hi";
import { IoCart } from "react-icons/io5";

import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";

import BaseUrl from "../../Utils/urls";
// Styles
import styles from "./SingleArtWork.module.css";

const SingleArtWork = ({ fa, darkMode }) => {
    const {
        _id,
        tier_id,
        name,
        description,
        wallet_address,
        token_amount,
        image,
        file,
        nft_name,
        nft_description,
        nft_price,
        nft_image,
    } = fa;

    // States
    const [openModal, setOpenModal] = React.useState(false);
    const [likeState, setLikeState] = useState(false);
    const [bookmarkState, setBookmarkState] = useState(false);
    const [tabValue, setTabValue] = useState(0); // setting tab value for changing
    const [intervention, setIntervention] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { t } = useTranslation();

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Tab handler
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Custom Mobile Tabs
    const MobileTabs = styled(Tabs)({
        border: "none",
        backgroundColor: `${darkMode ? "#040404" : "#ffffff"}`,
        "& .MuiTabs-indicator": {
            backgroundColor: "inherit",
        },
    });

    const MobileTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
        "&.Mui-selected": {
            color: "#ffffff",
            backgroundColor: "#01D4FA",
            borderRadius: "4px",
            fontWeight: theme.typography.fontWeightMedium,
        },
    }));

    useEffect(() => {
        if (_id) {
            async function fetchData() {
                const res = await axios.get(
                    BaseUrl + `/api/intervention/details/${_id}`
                );
                const artWorkData = res.data.intervention;
                setIntervention(artWorkData);
            }
            fetchData();
        }
    }, []);
    return (
        // Artwork details information
        <>
            <Modal
                sx={{ zIndex: 500000 }}
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box
                        bgcolor={darkMode ? "#171c26" : "#fff2f8"}
                        className={
                            !isMobile
                                ? styles.modalStyleWeb
                                : styles.modalStyleMobile
                        }
                    >
                        <Typography
                            className={styles.itemDetailsModalTitle}
                            color="secondary"
                            variant="h6"
                            component="div"
                        >
                            <Typography
                                component="span"
                                color="secondary"
                                sx={{ mt: 0.3 }}
                            >
                                <HiTemplate fontSize={"1.5rem"} />
                            </Typography>
                            <Typography variant="h6" component="span" mt={-0.2}>
                                {t("ITEM_DETAILS")}
                            </Typography>
                        </Typography>
                        <Typography
                            // This is global styles
                            className={
                                !isMobile
                                    ? styles.readMoreModalText
                                    : styles.readMoreModalTextMobile
                            }
                            variant="body2"
                            component="p"
                            color="secondary"
                            lineHeight={2}
                            height={250}
                            pr={2.5}
                        >
                            {description}
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
            <Box mt={11} className={styles.detailsContainerBox}>
                <Box>
                    {/* Top navigation */}
                    {!isMobile ? (
                        <Box className={styles.topNavigationBox}>
                            <FiChevronLeft fontSize={"1.5rem"} />
                            <Typography
                                className={styles.topNavigationTypo}
                                component="div"
                                borderBottom={`2px solid ${
                                    darkMode ? "#ffffff" : "#121212"
                                }`}
                            >
                                <Typography
                                    onClick={() => window.history.back()}
                                    variant="h6"
                                    component="p"
                                    sx={{ cursor: "pointer" }}
                                    zIndex={2}
                                >
                                    {t("ITEM_DETAILS")}
                                </Typography>
                                {darkMode && (
                                    <Typography
                                        variant="h1"
                                        component="p"
                                        ml={-3}
                                        className={styles.labelHighLighter}
                                    ></Typography>
                                )}
                            </Typography>
                        </Box>
                    ) : (
                        <Box className={styles.topNavigationBoxMobile}>
                            <Box
                                width={"70px"}
                                height={"60px"}
                                mt={-1}
                                bgcolor={`${darkMode ? "#040404" : "#ffffff"}`}
                            >
                                <FiChevronLeft
                                    onClick={() => window.history.back()}
                                    fontSize={"1.5rem"}
                                />
                            </Box>
                            <Box
                                sx={{
                                    position: "fixed",
                                    top: "3%",
                                    zIndex: "10000",
                                    width: "70%",
                                    display: "flex",
                                    justifyContent: "center",
                                    ml: 4,
                                }}
                            >
                                <Typography
                                    component="div"
                                    borderBottom={`2px solid ${
                                        darkMode ? "#ffffff" : "#121212"
                                    }`}
                                    position="relative"
                                    display="flex"
                                    alignItems="center"
                                    ml={4}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        component="p"
                                        sx={{ zIndex: 2 }}
                                    >
                                        {t("ITEM_DETAILS")}
                                    </Typography>
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    {/* Details container */}
                    {!isMobile ? (
                        <Box className={styles.detailsContainer}>
                            <Box zIndex={10}>
                                <img
                                    className={styles.artDisplayImage}
                                    src={BaseUrl + "/upload/" + image}
                                    alt={name}
                                />
                            </Box>
                            <Box
                                className={styles.detailsContainerContentBox}
                                bgcolor={`${darkMode ? "#171C26" : "#FFF2F8"}`}
                            >
                                <Box>
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        color="secondary.main"
                                        mb={4}
                                        fontWeight={500}
                                    >
                                        {name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="div"
                                        lineHeight={1.5}
                                        mb={2}
                                        textAlign="justify"
                                    >
                                        {/* {description.slice(0, 200)} */}
                                        {description}
                                        <Button
                                            variant="text"
                                            onClick={handleOpenModal}
                                            sx={{
                                                color: "#01D4FA",
                                                textTransform: "lowercase",
                                            }}
                                        >
                                            ...{t("READ_MORE")}
                                        </Button>
                                    </Typography>
                                    <Box
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="p"
                                            color={
                                                darkMode ? "#FFFFFF" : "#121212"
                                            }
                                            mb={2}
                                            fontWeight={500}
                                        >
                                            {t("TOKEN_AMOUNT")}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            component="p"
                                            color="secondary.main"
                                            mb={3}
                                            fontWeight={500}
                                        >
                                            {token_amount}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            component="p"
                                            color={
                                                darkMode ? "#FFFFFF" : "#121212"
                                            }
                                            mb={2}
                                            fontWeight={500}
                                        >
                                            {t("WALLET_ADDRESS")}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            component="p"
                                            color="secondary.main"
                                            mb={3}
                                            fontWeight={500}
                                        >
                                            {wallet_address}
                                        </Typography>
                                    </Box>
                                    <Divider className={styles.dividerBox} />
                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        <Box className={styles.detailsContainerMobile}>
                            <Box zIndex={10}>
                                <img
                                    className={styles.artDisplayImageMobile}
                                    src={BaseUrl + "/upload/" + image}
                                    alt={name}
                                />
                            </Box>
                            <Box>
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        component="h2"
                                        color="secondary.main"
                                        mb={2}
                                    >
                                        {name}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        component="div"
                                        lineHeight={1.8}
                                        mb={2}
                                        textAlign="left"
                                    >
                                        {description
                                            ? description.slice(0, 20)
                                            : ""}
                                        <Button
                                            variant="text"
                                            onClick={handleOpenModal}
                                            sx={{
                                                fontSize: "11px",
                                                color: "#01D4FA",
                                            }}
                                        >
                                            ...{t("READ_MORE")}
                                        </Button>
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        component="p"
                                        color={darkMode ? "#FFFFFF" : "#121212"}
                                        mb={1}
                                    >
                                        {t("TOKEN_AMOUNT")}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="p"
                                        color="secondary.main"
                                        mb={1}
                                        fontWeight={500}
                                    >
                                        {token_amount}
                                    </Typography>
                                </Box>
                                {/* <Box
                                    className={
                                        styles.footerButtonContainerMobile
                                    }
                                >
                                    <GradientButtonPrimary
                                        variant="contained"
                                        className={styles.gradientButtonClass}
                                    >
                                        <Typography
                                            color="#ffffff"
                                            component="span"
                                        >
                                            <IoCart
                                                className={styles.footerIcons}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            component="span"
                                        >
                                            {t("BUY_NOW")}
                                        </Typography>
                                    </GradientButtonPrimary>
                                </Box> */}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default SingleArtWork;
