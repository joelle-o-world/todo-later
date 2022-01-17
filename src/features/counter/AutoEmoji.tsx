import { FunctionComponent, useMemo } from "react";
import keywordsByEmoji from "emojilib";
const emojiByKeyword: { [keyword: string]: string[] } = {};
for (let emoji in keywordsByEmoji) {
  // @ts-ignore
  for (let keyword of keywordsByEmoji[emoji])
    if (!emojiByKeyword[keyword]) emojiByKeyword[keyword] = [emoji];
    else emojiByKeyword[keyword].push(emoji);
}
console.log(emojiByKeyword);

export const AutoEmoji: FunctionComponent<{ search: string }> = ({
  search,
}) => {
  const emoji = useMemo(() => {
    for (let word of search.toLowerCase().split(/\s/))
      if (emojiByKeyword[word]) return emojiByKeyword[word][0];
  }, [search]);
  return <span className="AutoEmoji">{emoji}</span>;
};
