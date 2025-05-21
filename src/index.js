import generateDynamicReadme from './utils/generateDynamicReadme.js';

async function main() {
  try {
    await generateDynamicReadme();
    console.log('✨ README 생성이 완료되었습니다.');
  } catch (error) {
    console.error('❌ README 생성 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

main();