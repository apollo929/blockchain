const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const Tier = require("../models/Tier");
const Company = require("../models/Company");
const multer = require("multer");

const upload = multer({ dest: "public/upload/" });

//@route    POST api/create
//@desc     Create a company
//@access   Private
router.post("/create", upload.single("company_image"), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const company_image = req.file.filename;
    const {
        company_name,
        company_description,
        company_token_amount,
        tier_id,
        company_wallet_address,
        company_is_claim,
        company_private_key,
    } = req.body;
    try {
        let company = await Company.findOne({ company_name });
        if (company) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Company already exists" }] });
        }
        let tier = await Tier.findById(tier_id);
        if (!tier) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Tier can not find" }] });
        } else if (tier.tier_token_amount < company_token_amount) {
            return res.status(400).send("Tier has not this amount of token");
        }
        company = new Company({
            tier_id,
            company_name,
            company_description,
            company_wallet_address,
            company_token_amount,
            company_is_claim,
            company_image,
            company_private_key,
        });
        company
            .save()
            .then((company) => {
                res.status(200).json({ company: company });
                tier.tier_token_amount -= Number(company_token_amount);
                tier.save();
            })
            .catch(() => {
                res.status(400).send("company does not save");
            });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

//@route    GET api/all
//@desc     get all companies
//@access   Private
router.get("/all", async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json({ companies });
    } catch (errors) {
        console.log(errors.message);
        res.status(500).send("Server error");
    }
});

//@route    GET api/:tier_id
//@desc     get tier_id Companies
//@access   Private
router.get("/:tier_id", async (req, res) => {
    const { tier_id } = req.params;
    try {
        const companies = await Company.find({ tier_id });
        if (!companies) {
            res.status(400).send("No company");
        } else {
            res.status(200).json({ companies });
        }
    } catch (errors) {
        console.log(errors.message);
        res.status(500).send("Server error");
    }
});

//@route    GET api/select/company_id
//@desc     get company_id
//@access   Private
router.get("/select/:company_id", async (req, res) => {
    const { company_id } = req.params;
    try {
        const company = await Company.findById(company_id);
        if (!company) {
            res.status(400).send("No company");
        } else {
            res.status(200).json({ company });
        }
    } catch (errors) {
        console.log(errors.message);
        res.status(500).send("Server error");
    }
});

//@route    GET api/transfer
//@desc     get company_id
//@access   Private
router.post("/transfer", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstTransfer, secondTransfer, transferAmount } = req.body;
    try {
        let firstCompany = await Company.findById(firstTransfer);
        let secondCompany = await Company.findById(secondTransfer);
        if (!firstCompany || !secondCompany) {
            return res.status(400).send("No Transfer");
        }
        if (firstCompany.company_token_amount < transferAmount) {
            return res.status(400).send("Don't enough token");
        }
        firstCompany.company_token_amount -= Number(transferAmount);
        secondCompany.company_token_amount += Number(transferAmount);
        console.log(secondCompany.company_token_amount);
        firstCompany.save();
        secondCompany
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
