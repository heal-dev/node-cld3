/***
* Copyright (c) Myia 2023-2023 - All Rights Reserved
*/
import cld3 from './index.cjs';

/**
 * Identify the languages in a text using the Compact Language Detector v3 neural network.
 * 
 * Identification is less reliable on short texts.
 * 
 * @example
 * getLanguage('This piece of text is in English. Този текст е на Български.');
 * [
 *  {
 *      language: 'bg',
 *      probability: 0.9173873066902161,
 *      is_reliable: true,
 *      proportion: 0.5853658318519592
 *  },
 *  {
 *      language: 'en',
 *      probability: 0.9999790191650391,
 *      is_reliable: true,
 *      proportion: 0.4146341383457184
 *  }
 * ]
 * @param {string} txt
 * 
 * @return {null|Array<{language: string, probability: number, is_reliable: boolean, proportion: number}>}
 */
export const getLanguages = function (txt) {
    const oracleResult = cld3.getLanguage(txt);
    const bestResults = oracleResult.filter(({ language, is_reliable }) => language !== 'und' && is_reliable);
    if (bestResults.length > 0) {
        return bestResults;
    }
    for (const result of oracleResult) {
        if (result.language !== 'und' && result.probability > 0.5 && result.proportion === 1) {
            return [result];
        }
    }
    return null;
};
