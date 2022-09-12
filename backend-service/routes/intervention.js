const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const Intervention = require("../models/Intervention");
const multer = require("multer");

const upload = multer({ dest: "public/upload" });
//@route    POST api/create
//@desc     Create a intervention
//@access   Private
const multiUpload = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 },
    { name: "nft_image", maxCount: 1 },
]);
router.post("/create", multiUpload, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const image = req.files["image"][0].filename;
    console.log(image);
    const file = req.files["file"][0].filename;
    const nft_image = req.files["nft_image"][0].filename;
    const {
        name,
        description,
        token_amount,
        wallet_address,
        nft_name,
        nft_description,
        nft_price,
    } = req.body;
    try {
        let intervention = await Intervention.findOne({ name });
        if (intervention) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Intervention already exists" }] });
        }
        intervention = new Intervention({
            name,
            description,
            image,
            token_amount,
            wallet_address,
            file,
            nft_name,
            nft_description,
            nft_price,
            nft_image,
        });
        await intervention
            .save()
            .then((intervention) => {
                res.status(200).json({ intervention: intervention });
            })
            .catch((error) => {
                console.error(error.message);
                res.status(400).send("Intervention does not save");
            });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});
//@route    GET api/all
//@desc     Get all interventions
//@access   Private
router.get("/all", async (req, res) => {
    try {
        const interventions = await Intervention.find();
        res.status(200).json({ interventions });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//@route    GET api/details/intervention_id
//@desc     get intervention_id
//@access   Private
router.get("/details/:intervention_id", async (req, res) => {
    const { intervention_id } = req.params;
    try {
        const intervention = await Intervention.findById(intervention_id);
        if (!intervention) {
            res.status(400).send("No intervention");
        } else {
            res.status(200).json({ intervention });
        }
    } catch (errors) {
        console.log(errors.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
