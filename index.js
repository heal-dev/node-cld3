/***
* Copyright (c) Qualitilt 2023-2023 - All Rights Reserved
*/
import cld3 from './index.cjs';

/**

 * @param {string} txt
 * @return {
 *     null | {
 *      language: import('common/data/i18n/laguagesData').ISO939_1,
 *      probability: number,
 *      proportion: number,
 *      is_reliable: boolean
 *     }[]
 * }
 */
export const getLanguage = function (txt) {
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
