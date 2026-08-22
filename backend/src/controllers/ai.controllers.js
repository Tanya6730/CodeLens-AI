const aiService = require("../services/ai.services");


// =========================
// GET CODE REVIEW
// =========================

module.exports.getReview = async (req, res) => {

    try {

        const code = req.body.code;

        if (!code) {
            return res.status(400).json({
                message: "Code is required"
            });
        }

        const response = await aiService.generateReview(code);

        res.status(200).send(response);

    } catch (error) {

        console.error("AI Review Error:", error);

        res.status(500).json({
            message: "Failed to get code review",
            error: error.message
        });
    }
};


// =========================
// FIX CODE
// =========================

module.exports.fixCode = async (req, res) => {

    try {

        const code = req.body.code;
        const language = req.body.language || "JavaScript";

        if (!code) {
            return res.status(400).json({
                message: "Code is required"
            });
        }

        const fixedCode = await aiService.fixCode(
            code,
            language
        );

        res.status(200).json({
            code: fixedCode
        });

    } catch (error) {

        console.error("AI Fix Error:", error);

        res.status(500).json({
            message: "Failed to fix code",
            error: error.message
        });
    }
};