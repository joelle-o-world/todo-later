import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import keywordsByEmoji from "emojilib";
import Fuse from "fuse.js";

const emojiFuse = new Fuse(
  Object.keys(keywordsByEmoji).map((emoji) => ({
    emoji,
    // @ts-ignore
    keywords: keywordsByEmoji[emoji],
  })),
  { keys: ["keywords"] }
);

const emojiByKeyword: { [keyword: string]: string[] } = {};
for (let emoji in keywordsByEmoji) {
  // @ts-ignore
  for (let keyword of keywordsByEmoji[emoji])
    if (!emojiByKeyword[keyword]) emojiByKeyword[keyword] = [emoji];
    else emojiByKeyword[keyword].push(emoji);
}
console.log(emojiByKeyword);

export const AutoEmoji: FunctionComponent<{ pattern: string }> = ({
  pattern,
}) => {
  const timeout = useRef(null as null | NodeJS.Timeout);
  const [emoji, setEmoji] = useState(null as string | null);
  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setEmoji(emojiFuse.search(pattern)?.[0]?.item.emoji);
      timeout.current = null;
    }, 500);
  }, [pattern]);
  return <span className="AutoEmoji">{emoji}</span>;
};
