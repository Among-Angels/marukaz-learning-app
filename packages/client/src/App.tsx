import React, { useState } from "react";
import urlJoin from "proper-url-join";
import fancify from "fancify";
import { Button, Layout, message } from "antd";

import "./App.css";
import { InputArea } from "./component/InputArea/InputArea";
import { StyleTabs } from "./component/StyleTabs/StyleTabs";
import { SocialButtons } from "./component/SocialButtons/SocialButtons";
import { Token } from "../../shared";
import { TabContent } from "./types";

const { Footer, Content } = Layout;

const SentenceTransformer = (tokens: Token[]): TabContent[] => {
  const sets = [
    { style: "circled", letter: "both" },
    { style: "negative circled", letter: "upper" },
    { style: "fullwidth", letter: "both" },
    { style: "math bold", letter: "both" },
    { style: "math bold fraktur", letter: "both" },
    { style: "math bold italic", letter: "both" },
    { style: "math bold script", letter: "both" },
    { style: "math double struck", letter: "lower" },
    { style: "math mono", letter: "both" },
    { style: "math sans", letter: "both" },
    { style: "math sans bold", letter: "both" },
    { style: "math sans italic", letter: "both" },
    { style: "math sans bold italic", letter: "both" },
    { style: "parenthesized", letter: "both" },
    { style: "regional indicator", letter: "upper" },
    { style: "squared", letter: "upper" },
    { style: "negative squared", letter: "upper" },
  ] as const;
  const TokensJoinReducer = (sentence: string, currToken: Token) => {
    if (currToken.translated) {
      if (!sentence.endsWith(" ")) {
        sentence += " ";
      }
      sentence = sentence + currToken.word + " ";
    } else {
      sentence += currToken.word;
    }
    return sentence;
  };
  const sentence = tokens.reduce(TokensJoinReducer, "");
  if (!sentence) {
    return [];
  }
  const transformedSentences: TabContent[] = sets.map((x, index) => {
    let tabName = "Tab";
    let casedSentence = sentence;
    if (x.letter === "lower") {
      tabName = tabName.toLowerCase();
      casedSentence = sentence.toLowerCase();
    } else if (x.letter === "upper") {
      tabName = tabName.toUpperCase();
      casedSentence = sentence.toUpperCase();
    }
    const key = index + 1;
    return {
      tabName: fancify({ input: tabName + key, set: x.style }),
      value: fancify({
        input: casedSentence,
        set: x.style,
      }),
      key: key,
    };
  });
  const defaultSentence: TabContent[] = [
    {
      tabName: "Tab0",
      value: sentence,
      key: 0,
    },
  ];
  return defaultSentence.concat(transformedSentences);
};

function App() {
  const [textAreaValue, setTextArea] = useState("");
  const [transformed, setTransformed] = useState<TabContent[]>([
    { tabName: "Initial", value: "", key: 0 },
  ]);
  const [selected, setSelected] = useState("0");
  const baseUrl = new URL(window.location.href).pathname;

  const translate_noun = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: textAreaValue }),
    };
    fetch(urlJoin(baseUrl, "api/translate"), requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        if ("error" in data) {
          if (data.error === "translate api failed") {
            message.error(
              "翻訳に失敗しました。API制限に達した可能性があります。"
            );
          }
        } else {
          const result = data.translate;
          const transformed_result = SentenceTransformer(result);
          setTransformed(transformed_result);
          setSelected("0");
        }
      })
      .catch((reason) => console.log(reason));
  };
  const tabs =
    transformed[0].tabName === "Initial" ? null : (
      <StyleTabs
        options={transformed}
        onChange={(value) => setSelected(value)}
      ></StyleTabs>
    );
  return (
    <div className="App">
      <Layout>
        <Content className="Content">
          <div className="title">
            <h1>notra</h1>
            <p>文章の名詞を変換します</p>
          </div>
          <InputArea
            value={textAreaValue}
            onChange={(e) => setTextArea(e.target.value)}
          ></InputArea>
          <Button
            className="Button"
            type="primary"
            onClick={(e) => translate_noun()}
          >
            変換
          </Button>
          {tabs}
          <SocialButtons
            url={"https://notra.herokuapp.com/"}
            title={transformed[Number(selected)].value}
          ></SocialButtons>
        </Content>
        <Footer>
          notra ©2021 Created by
          <a href="https://twitter.com/jh"> Kazuki Matsumaru </a>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
