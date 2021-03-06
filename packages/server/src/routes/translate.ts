import StatusCodes from "http-status-codes";
import { Response, Router } from "express";
import { KuromojiToken, tokenize } from "kuromojin";
import { v2 } from "@google-cloud/translate";

import { paramMissingError, TranslateRequest } from "../shared/constants";
import { Token } from "@shared";

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
    const results: Token[] = tokenized.map((x) => {
      if (x.pos === "名詞") {
        const word = translatedWords.shift() ?? "";
        return { word: word, translated: true };
      } else {
        return { word: x.surface_form, translated: false };
      }
    });
    return results;
  }
  return translateText();
};

router.post("/", (req: TranslateRequest, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  tokenize(text).then((results) => {
    if (!results.some((x) => x.pos === "名詞")) {
      const no_noun_tokens: Token[] = results.map((x) => {
        return { word: x.surface_form, translated: false };
      });
      return res.status(OK).json({ translate: no_noun_tokens });
    }
    translate_nouns(results)
      .then((translated) => {
        return res.status(OK).json({ translate: translated });
      })
      .catch((error) => {
        console.error(error);
        return res.status(OK).json({ error: "translate api failed" });
      });
  });
});

export default router;
