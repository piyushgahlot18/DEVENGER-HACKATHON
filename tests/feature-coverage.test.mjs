import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const tests = [];
const test = (name, fn) => tests.push({ name, fn });

function listFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (fullPath.includes(`${join('node_modules')}`) || fullPath.includes(`${join('dist')}`)) {
      continue;
    }
    if (statSync(fullPath).isDirectory()) {
      listFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

test('landing page visibly explains hackathon impact and winning criteria', () => {
  const landing = read('src/pages/LandingPage.tsx');

  assert.match(landing, /Hackathon Demo \/ Impact/);
  assert.match(landing, /Why Civic AI Wins/);
  assert.match(landing, /Generative AI/);
  assert.match(landing, /Transparent recommendations/);
  assert.match(landing, /Built for digital inclusion/);
});

test('assistant page exposes role switching, language selection, actions, and warnings', () => {
  const assistant = read('src/pages/AssistantPage.tsx');

  assert.match(assistant, /RoleSelector/);
  assert.match(assistant, /LanguagePicker/);
  assert.match(assistant, /ActionCards/);
  assert.match(assistant, /Civic AI may make errors/);
  assert.match(assistant, /Verify important information/);
});

test('complaint center supports filing, AI summary, tracking timeline, priority, and status', () => {
  const complaints = read('src/pages/ComplaintsPage.tsx');

  assert.match(complaints, /File a Complaint/);
  assert.match(complaints, /Generate AI Summary/);
  assert.match(complaints, /Status Timeline/);
  assert.match(complaints, /priorityBadge/);
  assert.match(complaints, /statusBadge/);
});

test('document assistant supports document readiness, missing documents, expiry, and AI insight', () => {
  const documents = read('src/pages/DocumentsPage.tsx');

  assert.match(documents, /AI Document Analysis/);
  assert.match(documents, /Document Health Score/);
  assert.match(documents, /Missing/);
  assert.match(documents, /Expired/);
  assert.match(documents, /Commonly Required/);
});

test('services page provides search, categories, recommendations, documents, eligibility, and official portal action', () => {
  const services = read('src/pages/ServicesPage.tsx');

  assert.match(services, /Search services/);
  assert.match(services, /Categories/);
  assert.match(services, /Recommended For You/);
  assert.match(services, /Required Documents/);
  assert.match(services, /Eligibility Criteria/);
  assert.match(services, /Apply on Official Portal/);
});

test('source files avoid corrupted replacement-character text', () => {
  const sourceFiles = listFiles(join(root, 'src'))
    .filter(file => /\.(ts|tsx|css)$/.test(file));

  for (const file of sourceFiles) {
    const content = readFileSync(file, 'utf8');
    assert.doesNotMatch(content, /\uFFFD/, `${file} contains replacement characters`);
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

console.log(`${passed}/${tests.length} feature coverage tests passed`);
