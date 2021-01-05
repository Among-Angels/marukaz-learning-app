"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_1 = require("express");
const kuromojin_1 = require("kuromojin");
const translate_1 = require("@google-cloud/translate");
const constants_1 = require("../shared/constants");
const apiKey = process.env.GOOGLE_TRANSLATE_APIKEY;
const translate = new translate_1.v2.Translate({
    projectId: "quiet-dryad-138623",
    key: apiKey,
});
const router = express_1.Router();
const { BAD_REQUEST, OK } = http_status_codes_1.default;
const translate_nouns = (tokenized) => {
    const nouns = tokenized
        .filter((token) => token.pos === "名詞")
        .map((x) => x.surface_form);
    function translateText() {
        return __awaiter(this, void 0, void 0, function* () {
            // Translates the text into the target language. "text" can be a string for
            // translating a single piece of text, or an array of strings for translating
            // multiple texts.
            const translations = yield translate.translate(nouns, "en");
            const translatedWords = translations[0];
            const results = tokenized.map((x) => {
                var _a;
                if (x.pos === "名詞") {
                    const word = ((_a = translatedWords.shift()) !== null && _a !== void 0 ? _a : "").toLowerCase();
                    return { word: word, translated: true };
                }
                else {
                    return { word: x.surface_form, translated: false };
                }
            });
            return results;
        });
    }
    return translateText();
};
router.post("/", (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
    kuromojin_1.tokenize(text).then((results) => {
        translate_nouns(results)
            .then((translated) => {
            return res.status(OK).json({ translate: translated });
        })
            .catch((error) => {
            console.error(error);
            return res
                .status(BAD_REQUEST)
                .json({ translate: "translate api failed" });
        });
    });
});
exports.default = router;
