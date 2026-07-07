import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const tests = [];
const test = (name, fn) => tests.push({ name, fn });

test('AI assistant defines all required specialist roles', () => {
  const roles = read('src/services/ai/roles.ts');
  const prompts = read('src/services/ai/prompts/index.ts');

  const requiredRoles = [
    'citizen-query',
    'scheme-advisor',
    'complaint-draft',
    'document-advisor',
    'policy-simplifier',
    'multilingual',
  ];

  for (const role of requiredRoles) {
    assert.match(roles, new RegExp(`id:\\s*'${role}'`));
    assert.match(prompts, new RegExp(`'${role}'`));
  }
});

test('LLM prompts require language, context, simple explanations, and next actions', () => {
  const prompts = read('src/services/ai/prompts/index.ts');

  assert.match(prompts, /Always respond in the user's chosen language/);
  assert.match(prompts, /Maintain session context/);
  assert.match(prompts, /Use clear, simple language/);
  assert.match(prompts, /actions block MUST be a valid JSON array/);
  assert.match(prompts, /concrete next steps/);
});

test('production AI uses serverless provider instead of exposing browser API keys', () => {
  const config = read('src/services/ai/config.ts');
  const serverProvider = read('src/services/ai/providers/server.ts');
  const api = read('api/ai/chat.ts');

  assert.match(config, /import\.meta\.env\.PROD \? 'server' : 'mock'/);
  assert.match(serverProvider, /fetch\('\/api\/ai\/chat'/);
  assert.match(api, /process\.env\.GEMINI_API_KEY/);
  assert.doesNotMatch(api, /VITE_GEMINI_API_KEY/);
});

test('Vercel routes keep API requests on the serverless function', () => {
  const vercel = JSON.parse(read('vercel.json'));
  const rewrites = vercel.rewrites ?? [];

  assert.deepEqual(rewrites[0], {
    source: '/api/(.*)',
    destination: '/api/$1',
  });
});

test('README clearly maps the solution to evaluation criteria', () => {
  const readme = read('README.md');

  const requiredPhrases = [
    'Generative AI',
    'Simplifying complex government policies',
    'Recommending relevant schemes',
    'Complaint center',
    'Multilingual support',
    'Vercel Deployment Checklist',
  ];

  for (const phrase of requiredPhrases) {
    assert.match(readme, new RegExp(phrase, 'i'));
  }
});

let passed = 0;

for (const { name, fn } of tests) {
  try {
    fn();
    passed += 1;
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

console.log(`${passed}/${tests.length} hackathon readiness tests passed`);
