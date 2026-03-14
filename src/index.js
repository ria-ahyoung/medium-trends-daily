import generateDynamicReadme from './utils/generateDynamicReadme.js';

async function main() {
  try {
    await generateDynamicReadme();
    console.log('✨ README generation completed.');
  } catch (error) {
    console.error('❌ Error occurred during README generation:', error);
    process.exit(1);
  }
}

main();
