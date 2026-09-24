/**
 * Orchestrates one AI call.
 *
 *   1. resolve situation -> (pack, situation)
 *   2. select data       -> only the blocks the situation asked for
 *   3. compose prompt    -> the six layers
 *   4. call the AI       -> through the existing fallback chain
 *   5. return everything -> prompt, text, provenance
 *
 * The composed prompt is returned so callers can store it alongside
 * the output. That is how a reading stays reproducible even after the
 * pack is edited.
 */
import type { Language } from '../core/types';
import { compose } from '../core/composer';
import { resolve } from '../core/registry';
import { select, type SelectorSources } from '../core/selector';
import {
  generateWithFallback,
  type FallbackResult,
} from '@/features/ai-settings/providers';
import { getAiSettingsSnapshot } from '@/features/ai-settings/store';

export interface ExecuteOptions {
  situationId: string;
  language?: Language;
  sources: SelectorSources;
  extras?: Record<string, unknown>;
}

export interface ExecutionResult {
  ok: boolean;
  text?: string;
  error?: string;
  attempts?: FallbackResult['attempts'];
  composed: ReturnType<typeof compose>;
  providerId?: string;
  modelId?: string;
}

export async function execute(
  opts: ExecuteOptions
): Promise<ExecutionResult> {
  const { pack, situation } = resolve(opts.situationId);
  const language = opts.language ?? 'en';

  const data = select(situation.data, opts.sources);
  const composed = compose({ pack, situation, data, language });

  const snapshot = getAiSettingsSnapshot();
  const res = await generateWithFallback({
    system: composed.system,
    prompt: composed.user,
    order: snapshot.providerOrder,
    configs: snapshot.providers,
    extras: opts.extras as any,
  });

  const modelId = res.providerId
    ? snapshot.providers[res.providerId]?.preferredModel
    : undefined;

  return {
    ok: res.ok,
    text: res.text,
    error: res.error,
    attempts: res.attempts,
    composed,
    providerId: res.providerId,
    modelId,
  };
}