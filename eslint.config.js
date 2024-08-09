import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
    { languageOptions: { globals: globals.browser } },
    { ignores: ['./dist/**/*'] },
    pluginJs.configs.recommended,
];
