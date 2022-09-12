const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const Tier = require("../models/Tier");
const Intervention = require("../models/Intervention");
const multer = require("multer");

const upload = multer({ dest: "public/upload/" });

//@route    POST api/create
//@desc     Create a tier
//@access   Private
router.post("/create", upload.single("tier_image"), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const tier_image = req.file.filename;
    const {
        tier_name,
        tier_description,
        tier_token_amount,
        intervention_id,
        tier_wallet_address,
        tier_is_claim,
        tier_private_key,
    } = req.body;
    try {
        let tier = await Tier.findOne({ tier_name });
        if (tier) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Tier already exists" }] });
        }
        let intervention = await Intervention.findById(intervention_id);
        if (!intervention) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Intervention can not find" }] });
        } else if (intervention.token_amount < tier_token_amount) {
            return res
                .status(400)
                .send("Intervention has not this amount of token");
        }
        tier = new Tier({
            intervention_id,
            tier_name,
            tier_description,
            tier_wallet_address,
            tier_token_amount,
            tier_is_claim,
            tier_image,
            tier_private_key,
        });
        console.log(tier);
        tier.save()
            .then((tier) => {
                res.status(200).json({ tier: tier });
                intervention.token_amount -= Number(tier_token_amount);
                intervention.save();
            })
            .catch(() => {
                res.status(400).send("tier does not save");
            });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//@route    GET api/all
//@desc     get all tiers
//@access   Private
router.get("/all", async (req, res) => {
    try {
        const tiers = await Tier.find();
        res.status(200).json({ tiers });
    } catch (errors) {
        console.log(errors.message);
        res.status(500).send("Server error");
    }
});
//@route    GET api/intervention_id
//@desc     get intevention_id tiers
//@access   Private
router.get("/:intervention_id", async (req, res) => {
    const intervention_id = req.params.intervention_id;
    console.log(intervention_id);
    try {
        const tiers = await Tier.find({ intervention_id });
        if (!tiers) {
            res.status(400).send("No tier");
        } else {
            res.status(200).json({ tiers });
        }
    } catch (errors) {
        console.log(errors.message);
        res.status(500).send("Server error");
    }
});

//@route    GET api/details/tier_id
//@desc     get tier_id
//@access   Private
router.get("/details/:tier_id", async (req, res) => {
    const { tier_id } = req.params;
    try {
        const tier = await Tier.findById(tier_id);
        if (!tier) {
            res.status(400).send("No tier");
        } else {
            res.status(200).json({ tier });
        }
    } catch (errors) {
        console.log(errors.message);
        res.status(500).send("Server error");
    }
});

//@route    GET api/transfer
//@desc     get tier_id
//@access   Private
router.post("/transfer", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstTransfer, secondTransfer, transferAmount } = req.body;
    try {
        let firstTier = await Tier.findById(firstTransfer);
        let secondTier = await Tier.findById(secondTransfer);
        if (!firstTier || !secondTier) {
            return res.status(400).send("No Transfer");
        }
        if (firstTier.company_token_amount < transferAmount) {
            return res.status(400).send("Don't enough token");
        }
        firstTier.tier_token_amount -= Number(transferAmount);
        secondTier.tier_token_amount += Number(transferAmount);
        console.log(secondTier.tier_token_amount);
        firstTier.save();
        secondTier
            .save()
            .then((data) => {
                res.status(200).send("Success");
            })
            .catch((error) => {
                res.status(400).send("Save Failed");
            });
    } catch (errors) {
        console.log(errors.message);
        res.status(500).send("Server error");
    }
});
module.exports = router;
