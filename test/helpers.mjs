import { ESLint } from 'eslint';

export function createLinter(config) {
  return new ESLint({
    overrideConfigFile: true,
    overrideConfig: config,
  });
}

export async function lint(config, code, filePath = 'Component.tsx') {
  const [result] = await createLinter(config).lintText(code, { filePath });
  return result;
}

export async function calculatedConfig(config, filePath = 'Component.tsx') {
  return createLinter(config).calculateConfigForFile(filePath);
}

export function messagesFor(result, ruleId) {
  return result.messages.filter((message) => message.ruleId === ruleId);
}

export function severity(configuredRule) {
  return Array.isArray(configuredRule) ? configuredRule[0] : configuredRule;
}
