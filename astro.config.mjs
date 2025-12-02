// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
// https://astro.build/config
import fs from 'node:fs';

const neuroscriptGrammar = JSON.parse(fs.readFileSync('./neuroscript.tmLanguage.json', 'utf-8'));

export default defineConfig({
	site: 'https://severeon.github.io',
	markdown: {
		shikiConfig: {
			langs: [neuroscriptGrammar],
			theme: 'github-dark',
		},
	},
	integrations: [mdx(), sitemap()],
});
