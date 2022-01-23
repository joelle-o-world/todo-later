import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSettings, toggleEmojiMode } from "./settingsSlice";

export const ToggleEmojiMode: FunctionComponent = () => {
  const { emojiMode } = useSelector(selectSettings);
  const dispatch = useDispatch();

  return (
    <span
      className="ToggleEmojiMode"
      onClick={() => dispatch(toggleEmojiMode())}
    >
      {emojiMode ? "emoji mode 😀" : "emoji mode :("}
    </span>
  );
};
