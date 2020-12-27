import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";
import { KuromojiToken, tokenize } from "kuromojin";
import { v2 } from "@google-cloud/translate";

import { paramMissingError, TranslateRequest } from "@shared/constants";

const apiKey = process.env.GOOGLE_TRANSLATE_APIKEY;

const translate = new v2.Translate({
  projectId: "quiet-dryad-138623",
  key: apiKey,
});

const router = Router();
const { BAD_REQUEST, OK } = StatusCodes;

const translate_nouns = (tokenized: KuromojiToken[]) => {
  const nouns = tokenized
    .filter((token) => token.pos === "名詞")
    .map((x) => x.surface_form);
  async function translateText() {
    // Translates the text into the target language. "text" can be a string for
    // translating a single piece of text, or an array of strings for translating
    // multiple texts.
    const translations = await translate.translate(nouns, "en");
    const translatedWords: string[] = translations[0];
    const results = tokenized.map((x) => {
      if (x.pos === "名詞") {
        return translatedWords.shift()?.toLowerCase() + " ";
      } else {
        return x.surface_form;
      }
    });
    return results.join("");
  }
  return translateText();
};

router.post("/", async (req: TranslateRequest, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  tokenize(text).then((results) => {
    translate_nouns(results).then((translated) => {
      return res.status(OK).json({ translate: translated });
    });
  });
});

export default router;
