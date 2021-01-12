import { TwitterShareButton, TwitterIcon } from "react-share";

import "./SocialButtons.css";

const config = {
  size: 32,
};

interface SocialButtonProps {
  url: string;
  title: string;
  size?: number;
  via?: string;
}

export const SocialButtons = (props: SocialButtonProps) => {
  return (
    <div className="social">
      <TwitterShareButton
        url={props.url}
        title={props.title}
        hashtags={["notra"]}
        related={["jh"]}
      >
        <TwitterIcon size={props.size ? props.size : config.size} round />
      </TwitterShareButton>
    </div>
  );
};
