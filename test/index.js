/***
* Copyright (c) Myia 2023-2023 - All Rights Reserved
*/
import Assert from 'node:assert';
import { it, describe } from 'node:test';

import { getLanguages } from '../index.js';


describe('getLanguages', () => {

    const samples = [
        // {
        //     text: 'Utilisez votre nom :',
        //     expected: ['fr']
        // },
        {
            text: 'This piece of text is in English. Този текст е на Български.',
            expected: ['bg', 'en']
        },
        {
            text: 'This is a test',
            expected: 'en'
        },
        {
            text: 'Dies ist ein Test',
            expected: 'de'
        },
        {
            text: 'Ceci est un test',
            expected: 'fr'
        },
        {
            text: 'Esto es una prueba',
            expected: 'es'
        },
        {
            text: 'Questo è un test',
            expected: 'it'
        },
        {
            text: 'Dit is een test',
            expected: 'nl'
        },
        {
            text: 'To jest test',
            expected: 'pl'
        },
        {
            text: 'ldkfhsfadksjhadfskjfhdiufgh',
            expected: null
        }
    ];

    for (const sample of samples) {
        it(`should return ${sample.expected} for "${sample.text}"`, () => {
            const result = getLanguages(sample.text);
            if (sample.expected === null) {
                Assert.strictEqual(result, null);
                return;
            }
            const languages = result.map(({ language }) => language);
            if (Array.isArray(sample.expected)) {
                Assert.deepStrictEqual(languages.sort(), sample.expected.sort());
            }
            else {
                Assert.strictEqual(languages[0], sample.expected);
            }
        });
    }
});
