import { stripHtml } from 'string-strip-html';
import { Version } from 'types';
import { bibleApi } from 'utils/axiosClient';
import { bibleVerseParser, verseReferenceRegex } from 'utils/verseParser';
import { BibleAPISearchResponse } from './types/bible';

export const bibleIds: { [version in Version]: string } = {
  KJV: 'de4e12af7f28f599-02',
  NKJV: 'de4e12af7f28f599-02',
  AMPC: 'de4e12af7f28f599-02',
  TPT: 'de4e12af7f28f599-02',
  ESV: 'de4e12af7f28f599-02',
  KRV: 'de4e12af7f28f599-02'
};

export const getConfessionMarkdown = async (
  content: string,
  version: Version
) => {
  if (content === '') {
    return '';
  }

  const bibleId = bibleIds[version];
  const verseReferences = content.match(verseReferenceRegex) ?? [];

  const requests = verseReferences.map((verseReference) =>
    bibleApi.get<BibleAPISearchResponse>(
      `/bibles/${bibleId}/search?query=${verseReference}`
    )
  );

  const responses = await Promise.all(requests);
  const verses: { [key: string]: string } = {};
  responses.forEach((response, index) => {
    verses[verseReferences[index]] = stripHtml(
      response.data.data.passages[0]?.content
    ).result;
  });

  const replacedString = bibleVerseParser(
    content,
    version,
    (link, matchedText) => `[${matchedText}--${verses[matchedText]}](${link})`
  );

  return replacedString;
};
