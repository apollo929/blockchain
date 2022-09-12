import {
    Button,
    Grid,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import axios from "axios";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

// Icons
import { TiTimes } from "react-icons/ti";
import { MdAddToPhotos } from "react-icons/md";
import { RiAddBoxFill } from "react-icons/ri";
import { ImImage } from "react-icons/im";
import { BiMenuAltLeft } from "react-icons/bi";

import { GradientButtonPrimary } from "../../Utils/GradientButtons/GradientButtons";
import AssetProperModal from "../../components/AssetPropertiesModal/AssetProperModal";

import { useTranslation } from "react-i18next";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AssetProperModalMobile from "../../components/AssetPropertiesModal/AssetProperModalMobile";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import BaseUrl from "../../Utils/urls";
import { ethers } from "ethers";

const Input = styled("input")({
    display: "none",
});

// const propertiesData = { id: Math.random(), color: "black" };

const CreateAssets = ({ darkMode }) => {
    const wallet = ethers.Wallet.createRandom();
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { interventionId } = useParams();
    const [formData, setFormData] = useState({
        tier_name: "",
        tier_description: "",
        tier_image: {},
        intervention_id: interventionId,
        tier_token_amount: "",
        tier_is_claim: false,
        tier_wallet_address: wallet.address,
        tier_private_key: wallet.privateKey,
    });
    const { t } = useTranslation();

    const [openButtonToggler, setOpenButtonToggler] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [dateValueFrom, setDateValueFrom] = useState(new Date());
    const [dateValueTo, setDateValueTo] = useState(new Date());

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [propertiesDataState, setPropertiesDataState] = useState([
        { key: "", value: "" },
    ]);

    const [savedProperties, setSavedProperties] = useState([]);

    const handlePropertiesChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...propertiesDataState];
        list[index][name] = value;
        setPropertiesDataState(list);
    };

    const handlePropertiesRemove = (id) => {
        const filteredRemaining = propertiesDataState.filter(
            (pds) => pds.id !== id
        );
        setPropertiesDataState(filteredRemaining);
    };

    const handlePropertiesAdd = () => {
        setPropertiesDataState([
            ...propertiesDataState,
            { key: "", value: "", id: Math.random() },
        ]);
    };

    const handleSavePropeties = () => {
        setSavedProperties([...propertiesDataState]);
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleImageUpload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const Create_tier = (e) => {
        console.log(formData);
        e.preventDefault();
        const fd = new FormData();
        fd.append("tier_name", formData.tier_name);
        fd.append("tier_description", formData.tier_description);
        fd.append("tier_image", formData.tier_image);
        fd.append("intervention_id", formData.intervention_id);
        fd.append("tier_token_amount", formData.tier_token_amount);
        fd.append("tier_is_claim", formData.tier_is_claim);
        fd.append("tier_wallet_address", formData.tier_wallet_address);
        fd.append("tier_private_key", formData.tier_private_key);

        async function fetchData() {
            await axios
                .post(BaseUrl + "/api/tier/create", fd)
                .then((res) => {
                    alert("success");
                    navigate(`/intervention/${interventionId}`);
                })
                .catch((error) => {
                    alert(error);
                });
        }
        fetchData();
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Box>
                {!isMobile ? (
                    <AssetProperModal
                        handlePropertiesChange={handlePropertiesChange}
                        darkMode={darkMode}
                        propertiesDataState={propertiesDataState}
                        savedProperties={savedProperties}
                        handlePropertiesAdd={handlePropertiesAdd}
                        openModal={openModal}
                        handleCloseModal={handleCloseModal}
                        handlePropertiesRemove={handlePropertiesRemove}
                        handleSavePropeties={handleSavePropeties}
                    />
                ) : (
                    <AssetProperModalMobile
                        handlePropertiesChange={handlePropertiesChange}
                        darkMode={darkMode}
                        propertiesDataState={propertiesDataState}
                        savedProperties={savedProperties}
                        handlePropertiesAdd={handlePropertiesAdd}
                        openModal={openModal}
                        handleCloseModal={handleCloseModal}
                        handlePropertiesRemove={handlePropertiesRemove}
                        handleSavePropeties={handleSavePropeties}
                    />
                )}
            </Box>
            {!isMobile ? (
                <Box zIndex={1000}>
                    <Box sx={{ mt: 10.5, mb: 4 }}>
                        <Typography
                            component="div"
                            sx={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Typography
                                component="span"
                                color="secondary"
                                fontSize={20}
                                mt={1}
                            >
                                <MdAddToPhotos />
                            </Typography>
                            <Typography
                                variant="h6"
                                component="p"
                                color="secondary"
                                sx={{
                                    zIndex: 2,
                                    cursor: "pointer",
                                    borderBottom: `2px solid ${
                                        darkMode ? "#ffffff" : "#171c26"
                                    }`,
                                }}
                            >
                                {t("ADD_TIER")}
                            </Typography>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: `${
                                darkMode ? "#171C26" : "#ffffff"
                            }`,
                            pr: 6,
                            pl: 4,
                            py: 4,
                            borderRadius: "16px",
                        }}
                    >
                        <Box component="form" sx={{ mt: 5 }}>
                            <Grid
                                zIndex={1000}
                                container
                                columns={{ md: 12 }}
                                spacing={{ md: 15 }}
                            >
                                <Grid item md={6}>
                                    <Box>
                                        <Stack
                                            direction="column"
                                            spacing={2}
                                            sx={{ mt: 3 }}
                                        >
                                            <label
                                                style={{
                                                    color: `${
                                                        darkMode
                                                            ? "#ffffff"
                                                            : "#121212"
                                                    }`,
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                }}
                                                htmlFor="tier_name"
                                            >
                                                {t("TIER_NAME")} *
                                            </label>
                                            <input
                                                className={
                                                    darkMode
                                                        ? "inputField"
                                                        : null
                                                }
                                                type="text"
                                                placeholder={t(
                                                    "CREATE_ASSET_PLACEHOLDER_ENTER_TIER_NAME_HERE"
                                                )}
                                                name="tier_name"
                                                onChange={onChange}
                                                required
                                                style={{
                                                    fontSize: "14px",
                                                    border: "1px solid #c4c4c4",
                                                    borderRadius: "6px",
                                                    padding: "1rem 1.5rem",
                                                    color: `${
                                                        darkMode
                                                            ? "#ffffff"
                                                            : "#121212"
                                                    }`,
                                                    backgroundColor: `${
                                                        darkMode
                                                            ? "#171c26"
                                                            : "#ffffff"
                                                    }`,
                                                    width: "90%",
                                                    zIndex: 1000,
                                                }}
                                            />
                                        </Stack>
                                        <Stack
                                            direction="column"
                                            spacing={2}
                                            sx={{ mt: 3 }}
                                        >
                                            <label
                                                style={{
                                                    color: `${
                                                        darkMode
                                                            ? "#ffffff"
                                                            : "#121212"
                                                    }`,
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                }}
                                                htmlFor="tier_description"
                                            >
                                                {t("DESCRIPTION")} *
                                            </label>
                                            <textarea
                                                placeholder={t(
                                                    "CREATE_ASSET_PLACEHOLDER_PROVIDE_A_DETAILED_DESCRIPTION_OF_THE_ITEM"
                                                )}
                                                name="tier_description"
                                                onChange={onChange}
                                                required
                                                style={{
                                                    fontFamily:
                                                        "Poppins, sans-serif",
                                                    fontSize: "14px",
                                                    border: "1px solid #c4c4c4",
                                                    borderRadius: "6px",
                                                    padding: "1rem 1.5rem",
                                                    color: `${
                                                        darkMode
                                                            ? "#ffffff"
                                                            : "#121212"
                                                    }`,
                                                    backgroundColor: `${
                                                        darkMode
                                                            ? "#171c26"
                                                            : "#ffffff"
                                                    }`,
                                                    width: "90%",
                                                    row: 5,
                                                    resize: "vertical",
                                                    zIndex: 1000,
                                                }}
                                            />
                                        </Stack>
                                        <Stack
                                            direction="column"
                                            spacing={2}
                                            sx={{ mt: 3 }}
                                        >
                                            <label
                                                style={{
                                                    color: `${
                                                        darkMode
                                                            ? "#ffffff"
                                                            : "#121212"
                                                    }`,
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                }}
                                                htmlFor="tier_token_amount"
                                            >
                                                {t("TOKEN_AMOUNT")} *
                                            </label>
                                            <Stack
                                                direction="row"
                                                spacing={-9.5}
                                            >
                                                <input
                                                    className={
                                                        darkMode
                                                            ? "inputField"
                                                            : null
                                                    }
                                                    type="number"
                                                    placeholder={t(
                                                        "CREATE_ASSET_PLACEHOLDER_ENTER_TIER_TOKEN_AMOUNT"
                                                    )}
                                                    name="tier_token_amount"
                                                    onChange={onChange}
                                                    style={{
                                                        fontSize: "14px",
                                                        border: "1px solid #c4c4c4",
                                                        borderRadius: "6px",
                                                        padding: "1rem 1.5rem",
                                                        color: `${
                                                            darkMode
                                                                ? "#ffffff"
                                                                : "#121212"
                                                        }`,
                                                        backgroundColor: `${
                                                            darkMode
                                                                ? "#171c26"
                                                                : "#ffffff"
                                                        }`,
                                                        width: "90%",
                                                        zIndex: 1000,
                                                    }}
                                                />
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box>
                                        <Typography
                                            color="secondary"
                                            variant="body2"
                                            component="p"
                                            fontWeight={500}
                                        >
                                            {t("UPLOAD_IMAGE(PNG,JPEG/SVG)")}
                                        </Typography>
                                        <Box>
                                            <Box>
                                                {!image ? (
                                                    <Box
                                                        sx={{
                                                            my: 2,
                                                            width: "60%",
                                                            height: "150px",
                                                            border: "1px solid #c4c4c4",
                                                            borderStyle:
                                                                "dashed",
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            borderRadius: "4px",
                                                            p: 3,
                                                        }}
                                                    >
                                                        <label htmlFor="icon-button-file-front">
                                                            <Input
                                                                accept="image/*"
                                                                id="icon-button-file-front"
                                                                type="file"
                                                                name="tier_image"
                                                                onChange={
                                                                    handleImageUpload
                                                                }
                                                            />
                                                            <IconButton
                                                                color="primary"
                                                                aria-label="upload picture"
                                                                component="span"
                                                            >
                                                                <Typography
                                                                    component="span"
                                                                    color="secondary"
                                                                    fontSize={
                                                                        30
                                                                    }
                                                                >
                                                                    <ImImage />
                                                                </Typography>
                                                            </IconButton>
                                                        </label>
                                                    </Box>
                                                ) : (
                                                    <Box
                                                        sx={{
                                                            my: 2,
                                                            position:
                                                                "relative",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                position:
                                                                    "absolute",
                                                                left: "1%",
                                                                top: "4%",
                                                            }}
                                                        >
                                                            <IconButton
                                                                sx={{
                                                                    backgroundColor: `${
                                                                        darkMode
                                                                            ? "#fff2f8"
                                                                            : "#171c26"
                                                                    }`,
                                                                }}
                                                                onClick={() =>
                                                                    setImage(
                                                                        null
                                                                    )
                                                                }
                                                            >
                                                                <TiTimes
                                                                    fontSize={
                                                                        "1rem"
                                                                    }
                                                                    color={
                                                                        darkMode
                                                                            ? "#171c26"
                                                                            : "#ffffff"
                                                                    }
                                                                />
                                                            </IconButton>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                border: "1px solid #c4c4c4",
                                                                borderStyle:
                                                                    "dashed",
                                                                padding: "5px",
                                                                width: "315px",
                                                                height: "200px",
                                                            }}
                                                        >
                                                            <img
                                                                style={{
                                                                    height: "200px",
                                                                    width: "315px",
                                                                }}
                                                                src={image}
                                                                alt="Uploaded"
                                                            />
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                            <GradientButtonPrimary
                                type="submit"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    mt: 5,
                                }}
                                onClick={(e) => Create_tier(e)}
                            >
                                <Typography component="span" color="#ffffff">
                                    <MdAddToPhotos />
                                </Typography>
                                <Typography variant="body2" component="span">
                                    {t("ADD_TIER")}
                                </Typography>
                            </GradientButtonPrimary>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                position: "fixed",
                                top: "0%",
                                left: "44%",
                                transform: "translate(-50%, -50%)",
                                zIndex: "10000",
                                mt: 6,
                            }}
                        >
                            <Box
                                pb={2}
                                ml={7}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                gap={2}
                            >
                                <Typography
                                    variant="subtitle1"
                                    color="secondary"
                                    mt={1.2}
                                >
                                    <MdAddToPhotos fontSize={20} />
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="secondary"
                                    component="div"
                                    sx={{
                                        borderBottom: `${
                                            darkMode
                                                ? "2px solid #ffffff"
                                                : "1px solid #171c26"
                                        }`,
                                    }}
                                >
                                    {t("CREATE_ASSET")}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            mt: 1,
                            // backgroundColor: `${darkMode ? "#171C26" : "#fff2f8"}`,
                            py: 2,
                            borderRadius: "16px",
                        }}
                    >
                        <Box component="form">
                            <Typography
                                color="secondary"
                                sx={{ mt: 5 }}
                                variant="body2"
                                component="p"
                            >
                                {t("UPLOAD_IMAGE(PNG,JPEG/SVG)")}
                            </Typography>
                            <Box>
                                {!image ? (
                                    <Box
                                        sx={{
                                            my: 2,
                                            border: "1px solid #c4c4c4",
                                            borderStyle: "dashed",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "4px",
                                            p: 5,
                                        }}
                                    >
                                        <label htmlFor="icon-button-file-front">
                                            <Input
                                                accept="image/*"
                                                id="icon-button-file-front"
                                                type="file"
                                                name="tier_image"
                                                onChange={handleImageUpload}
                                            />
                                            <IconButton
                                                color="primary"
                                                aria-label="upload picture"
                                                component="span"
                                            >
                                                <Typography
                                                    component="span"
                                                    color="secondary"
                                                >
                                                    <ImImage />
                                                </Typography>
                                            </IconButton>
                                        </label>
                                    </Box>
                                ) : (
                                    <Box sx={{ my: 2, position: "relative" }}>
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                left: "1%",
                                                top: "4%",
                                            }}
                                        >
                                            <IconButton
                                                sx={{
                                                    backgroundColor: `${
                                                        darkMode
                                                            ? "#fff2f8"
                                                            : "#171c26"
                                                    }`,
                                                }}
                                                onClick={() => setImage(null)}
                                            >
                                                <Typography
                                                    component="span"
                                                    color="secondary"
                                                >
                                                    <TiTimes />
                                                </Typography>
                                            </IconButton>
                                        </Box>
                                        <img
                                            style={{
                                                border: "1px solid #c4c4c4",
                                                borderStyle: "dashed",
                                                width: "97%",
                                                height: "136px",
                                                padding: "5px",
                                            }}
                                            src={image}
                                            alt="Uploaded"
                                        />
                                    </Box>
                                )}
                            </Box>
                            <Stack
                                direction="column"
                                spacing={2}
                                sx={{ mt: 3 }}
                            >
                                <label
                                    style={{
                                        color: `${
                                            darkMode ? "#ffffff" : "#121212"
                                        }`,
                                        fontSize: "14px",
                                    }}
                                    htmlFor="tier_name"
                                >
                                    {t("TIER_NAME")} *
                                </label>
                                <input
                                    className={
                                        darkMode ? "inputFieldMobile" : null
                                    }
                                    type="text"
                                    placeholder={t(
                                        "CREATE_ASSET_PLACEHOLDER_ENTER_TIER_NAME_HERE"
                                    )}
                                    name="tier_name"
                                    onChange={onChange}
                                    required
                                    style={{
                                        fontSize: "14px",
                                        border: "1px solid #c4c4c4",
                                        borderRadius: "6px",
                                        padding: "1rem 1.5rem",
                                        color: `${
                                            darkMode ? "#ffffff" : "#121212"
                                        }`,
                                        backgroundColor: `${
                                            darkMode ? "#040404" : "#ffffff"
                                        }`,
                                    }}
                                />
                            </Stack>
                            <Stack
                                direction="column"
                                spacing={2}
                                sx={{ mt: 3 }}
                            >
                                <label
                                    style={{
                                        color: `${
                                            darkMode ? "#ffffff" : "#121212"
                                        }`,
                                        fontSize: "14px",
                                    }}
                                    htmlFor="tier_description"
                                >
                                    {t("DESCRIPTION")} *
                                </label>
                                <textarea
                                    placeholder={t(
                                        "CREATE_ASSET_PLACEHOLDER_PROVIDE_A_DETAILED_DESCRIPTION_OF_THE_ITEM"
                                    )}
                                    name="tier_description"
                                    onChange={onChange}
                                    required
                                    style={{
                                        fontFamily: "Poppins, sans-serif",
                                        fontSize: "14px",
                                        border: "1px solid #c4c4c4",
                                        borderRadius: "6px",
                                        padding: "1rem 1.5rem",
                                        color: `${
                                            darkMode ? "#ffffff" : "#121212"
                                        }`,
                                        backgroundColor: `${
                                            darkMode ? "#040404" : "#ffffff"
                                        }`,
                                        row: 5,
                                        resize: "vertical",
                                    }}
                                />
                            </Stack>
                            <Stack
                                direction="column"
                                spacing={2}
                                sx={{ mt: 3 }}
                            >
                                <label
                                    style={{
                                        color: `${
                                            darkMode ? "#ffffff" : "#121212"
                                        }`,
                                        fontSize: "14px",
                                    }}
                                    htmlFor="tier_token_amount"
                                >
                                    {t("TOKEN_AMOUNT")} *
                                </label>
                                <Stack direction="row" spacing={-9.5}>
                                    <input
                                        className={
                                            darkMode ? "inputFieldMobile" : null
                                        }
                                        type="number"
                                        placeholder={t(
                                            "CREATE_ASSET_PLACEHOLDER_ENTER_TIER_TOKEN_AMOUNT"
                                        )}
                                        name="tier_token_amount"
                                        onChange={onChange}
                                        style={{
                                            fontSize: "14px",
                                            border: "1px solid #c4c4c4",
                                            borderRadius: "6px",
                                            padding: "1rem 1.5rem",
                                            color: `${
                                                darkMode ? "#ffffff" : "#121212"
                                            }`,
                                            backgroundColor: `${
                                                darkMode ? "#040404" : "#ffffff"
                                            }`,
                                        }}
                                    />
                                </Stack>
                            </Stack>
                            <GradientButtonPrimary
                                type="submit"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    mt: 5,
                                }}
                                onClick={(e) => Create_tier(e)}
                            >
                                <Typography component="span" color="secondary">
                                    <MdAddToPhotos />
                                </Typography>
                                <Typography variant="body2" component="span">
                                    {t("ADD_TIER")}
                                </Typography>
                            </GradientButtonPrimary>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default CreateAssets;
