/**
 * Composes a prompt from a pack, a situation, data, and a language.
 *
 * Layer order (system):  safety â†’ domain
 * Layer order (user):    situation â†’ format â†’ language â†’ data
 *
 * The layers are returned separately so the UI can show them side by
 * side and so provenance can store exactly what was sent.
 */
import type {
  ComposedPrompt,
  Language,
  PromptPack,
  SituationDef,
} from './types';

export interface ComposeOptions {
  pack: PromptPack;
  situation: SituationDef;
  data: unknown;
  language: Language;
}

const RULE = 'â”€'.repeat(60);

export function compose(opts: ComposeOptions): ComposedPrompt {
  const { pack, situation, data, language } = opts;

  const languageLine =
    pack.languages[language] ?? pack.languages.en ?? 'Write in English.';
  const dataBlock =
    typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const situationBlock = (situation.situation ?? '').trim();
  const formatBlock = (situation.format ?? '').trim();

  const system = [pack.safety, pack.domain]
    .filter((s) => s && s.trim())
    .join('\n\n' + RULE + '\n\n');

  const userParts: string[] = [];
  userParts.push(`SITUATION\n${RULE}\n${situationBlock}`);
  if (formatBlock) {
    userParts.push(`FORMAT\n${RULE}\n${formatBlock}`);
  }
  userParts.push(`LANGUAGE\n${RULE}\n${languageLine}`);
  userParts.push(`DATA\n${RULE}\n<data>\n${dataBlock}\n</data>`);
  const user = userParts.join('\n\n');

  return {
    system,
    user,
    layers: {
      safety: pack.safety,
      domain: pack.domain,
      language: languageLine,
      situation: situationBlock,
      data: dataBlock,
      format: formatBlock,
    },
    meta: {
      packId: pack.id,
      packVersion: pack.version,
      situationId: situation.id,
      language,
    },
  };
}