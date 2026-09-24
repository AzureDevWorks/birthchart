/**
 * AI provider registry — pluggable, extensible.
 * Add a new provider by appending to the PROVIDERS array.
 */

export interface AiModel {
  id: string;
  name: string;
  note?: string;
  tier?: 'cheap' | 'standard' | 'premium';
}

export interface GenerateOptions {
  prompt: string;
  modelId: string;
  apiKey: string;
  extras?: {
    tone?: string;
    numberOfWord?: number;
    numberOfSection?: number;
    keywords?: string;
    language?: string;
  };
}

export interface AiProvider {
  id: string;
  name: string;
  description: string;
  docsUrl: string;
  keyHint?: string;
  keyPrefix?: string;
  category?: 'free' | 'cheap' | 'direct';
  models: AiModel[];
  buildRequest: (opts: GenerateOptions) => { url: string; init: RequestInit };
  parseResponse: (json: any) => string;
  /**
   * Optional: some providers (1min.ai) process asynchronously.
   * If present, called with the initial POST response. Should resolve
   * to the final text once processing completes.
   */
  pollResult?: (apiKey: string, json: any) => Promise<string>;
}

// ═════════════════════════════════════════════════════════════
// 1. Google Gemini
// ═════════════════════════════════════════════════════════════

const gemini: AiProvider = {
  id: 'gemini',
  name: 'Google Gemini',
  description: 'Google AI Studio — generous free tier, fast responses.',
  docsUrl: 'https://aistudio.google.com/app/apikey',
  keyHint: 'AIza…',
  keyPrefix: 'AIza',
  category: 'free',
  models: [
    { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', note: 'Fastest', tier: 'cheap' },
    { id: 'gemini-3.7-flash', name: 'Gemini 3.7 Flash', tier: 'cheap' },
    { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', note: 'Highest quality', tier: 'premium' },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', tier: 'standard' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', tier: 'cheap' },
  ],
  buildRequest: ({ prompt, modelId, apiKey }) => ({
    url: `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`,
    init: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    },
  }),
  parseResponse: (j) => j?.candidates?.[0]?.content?.parts?.[0]?.text ?? '',
};

// ═════════════════════════════════════════════════════════════
// 2. Groq
// ═════════════════════════════════════════════════════════════

const groq: AiProvider = {
  id: 'groq',
  name: 'Groq',
  description: 'Ultra-fast inference on open models. Free tier included.',
  docsUrl: 'https://console.groq.com/keys',
  keyHint: 'gsk_…',
  keyPrefix: 'gsk_',
  category: 'free',
  models: [
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', note: 'Balanced', tier: 'cheap' },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', note: 'Very fast', tier: 'cheap' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', tier: 'cheap' },
    { id: 'gemma2-9b-it', name: 'Gemma 2 9B', tier: 'cheap' },
  ],
  buildRequest: ({ prompt, modelId, apiKey }) => ({
    url: 'https://api.groq.com/openai/v1/chat/completions',
    init: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: 'user', content: prompt }],
      }),
    },
  }),
  parseResponse: (j) => j?.choices?.[0]?.message?.content ?? '',
};

// ═════════════════════════════════════════════════════════════
// 3. Mistral AI
// ═════════════════════════════════════════════════════════════

const mistral: AiProvider = {
  id: 'mistral',
  name: 'Mistral AI',
  description: 'European models. Free tier available on the La Plateforme.',
  docsUrl: 'https://console.mistral.ai/api-keys/',
  category: 'free',
  models: [
    { id: 'mistral-small-latest', name: 'Mistral Small', note: 'Fast, cheap', tier: 'cheap' },
    { id: 'mistral-medium-latest', name: 'Mistral Medium', tier: 'standard' },
    { id: 'mistral-large-latest', name: 'Mistral Large', note: 'Highest quality', tier: 'premium' },
    { id: 'open-mistral-nemo', name: 'Mistral Nemo', tier: 'cheap' },
  ],
  buildRequest: ({ prompt, modelId, apiKey }) => ({
    url: 'https://api.mistral.ai/v1/chat/completions',
    init: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: 'user', content: prompt }],
      }),
    },
  }),
  parseResponse: (j) => j?.choices?.[0]?.message?.content ?? '',
};

// ═════════════════════════════════════════════════════════════
// 4. OpenRouter
// ═════════════════════════════════════════════════════════════

const openRouter: AiProvider = {
  id: 'openrouter',
  name: 'OpenRouter',
  description: 'One key, hundreds of models. Pay-per-use, generous free models.',
  docsUrl: 'https://openrouter.ai/keys',
  keyHint: 'sk-or-…',
  keyPrefix: 'sk-or-',
  category: 'cheap',
  models: [
    { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', tier: 'cheap' },
    { id: 'anthropic/claude-sonnet-4.5', name: 'Claude Sonnet 4.5', tier: 'standard' },
    { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', tier: 'cheap' },
    { id: 'openai/gpt-4o', name: 'GPT-4o', tier: 'standard' },
    { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3 70B', tier: 'cheap' },
    { id: 'deepseek/deepseek-chat', name: 'DeepSeek Chat', tier: 'cheap' },
  ],
  buildRequest: ({ prompt, modelId, apiKey }) => ({
    url: 'https://openrouter.ai/api/v1/chat/completions',
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
        'X-Title': 'KundaliYatra',
      },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: 'user', content: prompt }],
      }),
    },
  }),
  parseResponse: (j) => j?.choices?.[0]?.message?.content ?? '',
};

// ═════════════════════════════════════════════════════════════
// 5. DeepSeek (direct)
// ═════════════════════════════════════════════════════════════

const deepseek: AiProvider = {
  id: 'deepseek',
  name: 'DeepSeek',
  description: 'Very cheap, high quality. Direct API.',
  docsUrl: 'https://platform.deepseek.com/api_keys',
  keyHint: 'sk-…',
  keyPrefix: 'sk-',
  category: 'cheap',
  models: [
    { id: 'deepseek-chat', name: 'DeepSeek Chat', note: 'General purpose', tier: 'cheap' },
    { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner', note: 'Chain-of-thought', tier: 'standard' },
  ],
  buildRequest: ({ prompt, modelId, apiKey }) => ({
    url: 'https://api.deepseek.com/v1/chat/completions',
    init: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: 'user', content: prompt }],
      }),
    },
  }),
  parseResponse: (j) => j?.choices?.[0]?.message?.content ?? '',
};

// ═════════════════════════════════════════════════════════════
// 6. Anthropic (direct)
// ═════════════════════════════════════════════════════════════

const anthropic: AiProvider = {
  id: 'anthropic',
  name: 'Anthropic',
  description: 'Claude models. Direct API (no free tier).',
  docsUrl: 'https://console.anthropic.com/settings/keys',
  keyHint: 'sk-ant-…',
  keyPrefix: 'sk-ant-',
  category: 'direct',
  models: [
    { id: 'claude-haiku-4-5-20251001', name: 'Claude Haiku 4.5', note: 'Fast, cheap', tier: 'cheap' },
    { id: 'claude-sonnet-4-5-20250929', name: 'Claude Sonnet 4.5', note: 'Balanced', tier: 'standard' },
    { id: 'claude-opus-4-5-20251101', name: 'Claude Opus 4.5', note: 'Highest quality', tier: 'premium' },
  ],
  buildRequest: ({ prompt, modelId, apiKey }) => ({
    url: 'https://api.anthropic.com/v1/messages',
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: modelId,
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      }),
    },
  }),
  parseResponse: (j) => {
    const content = j?.content;
    if (Array.isArray(content)) {
      return content.map((c: any) => c?.text ?? '').join('');
    }
    return '';
  },
};

// ═════════════════════════════════════════════════════════════
// 7. OpenAI (direct)
// ═════════════════════════════════════════════════════════════

const openai: AiProvider = {
  id: 'openai',
  name: 'OpenAI',
  description: 'GPT models. Direct API (no free tier).',
  docsUrl: 'https://platform.openai.com/api-keys',
  keyHint: 'sk-…',
  keyPrefix: 'sk-',
  category: 'direct',
  models: [
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', note: 'Fast, cheap', tier: 'cheap' },
    { id: 'gpt-4o', name: 'GPT-4o', note: 'Balanced', tier: 'standard' },
    { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', tier: 'cheap' },
    { id: 'gpt-4.1', name: 'GPT-4.1', tier: 'standard' },
  ],
  buildRequest: ({ prompt, modelId, apiKey }) => ({
    url: 'https://api.openai.com/v1/chat/completions',
    init: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: 'user', content: prompt }],
      }),
    },
  }),
  parseResponse: (j) => j?.choices?.[0]?.message?.content ?? '',
};

// ═════════════════════════════════════════════════════════════
// 8. 1min.ai (aggregator)
// ═════════════════════════════════════════════════════════════

const oneMinAi: AiProvider = {
  id: '1minai',
  name: '1min.ai',
  description: 'Aggregator — one key unlocks GPT, Claude, Gemini, and more.',
  docsUrl: 'https://docs.1min.ai/docs/api/create-api-key',
  category: 'cheap',
  models: [
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', tier: 'cheap' },
    { id: 'gpt-4o', name: 'GPT-4o', tier: 'standard' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', tier: 'cheap' },
    { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', tier: 'cheap' },
    { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', tier: 'standard' },
    { id: 'deepseek-v4-pro', name: 'DeepSeek V4 Pro', tier: 'cheap' },
    { id: 'qwen-max', name: 'Qwen Max', tier: 'standard' },
  ],
  buildRequest: ({ prompt, modelId, apiKey, extras }) => ({
    url: 'https://api.1min.ai/api/features',
    init: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'API-KEY': apiKey },
      body: JSON.stringify({
        type: 'CONTENT_GENERATOR_BLOG_ARTICLE',
        model: modelId,
        conversationId: 'CONTENT_GENERATOR_BLOG_ARTICLE',
        promptObject: {
          tone: extras?.tone ?? 'informative',
          numberOfWord: extras?.numberOfWord ?? 1000,
          numberOfSection: extras?.numberOfSection ?? 5,
          keywords: extras?.keywords ?? '',
          language: extras?.language ?? 'English',
          prompt,
        },
      }),
    },
  }),
  parseResponse: (j) => {
    // Synchronous response — content is already there
    const r = j?.aiRecord?.aiRecordDetail?.resultObject;
    if (Array.isArray(r) && r.length > 0 && typeof r[0] === 'string') return r[0];
    if (typeof r === 'string') return r;
    return '';
  },
  pollResult: async (apiKey, initial) => {
    // 1min.ai is asynchronous. The POST returns a UUID with status PROCESSING.
    // We poll /api/results/{uuid} until status === SUCCESS or FAILURE.
    const uuid = initial?.aiRecord?.uuid;
    if (!uuid) return '';

    // First check: maybe the POST already returned the full result
    const initialContent = initial?.aiRecord?.aiRecordDetail?.resultObject;
    if (Array.isArray(initialContent) && initialContent.length > 0 && typeof initialContent[0] === 'string') {
      return initialContent[0];
    }

    const maxAttempts = 30;      // ~60 seconds worst case
    const delayMs = 2000;

    for (let i = 0; i < maxAttempts; i++) {
      await new Promise((res) => setTimeout(res, delayMs));
      try {
        const url = `https://api.1min.ai/api/results/${uuid}`;
        const res = await fetch(url, { headers: { 'API-KEY': apiKey } });
        if (!res.ok) continue;
        const json = await res.json();
        const status = json?.aiRecord?.status;
        if (status === 'SUCCESS') {
          const out = json?.aiRecord?.aiRecordDetail?.resultObject;
          if (Array.isArray(out) && out.length > 0 && typeof out[0] === 'string') return out[0];
          if (typeof out === 'string') return out;
          return '';
        }
        if (status === 'FAILURE') {
          throw new Error(json?.aiRecord?.aiRecordDetail?.resultObject?.[0] ?? 'Generation failed.');
        }
      } catch (e) {
        // Network glitch — keep polling
        if (i === maxAttempts - 1) throw e;
      }
    }
    throw new Error('Timed out waiting for 1min.ai response.');
  },
};

// ═════════════════════════════════════════════════════════════
// Registry
// ═════════════════════════════════════════════════════════════

export const PROVIDERS: AiProvider[] = [
  gemini,
  groq,
  mistral,
  openRouter,
  deepseek,
  openai,
  anthropic,
  oneMinAi,
];

export function getProvider(id: string): AiProvider | null {
  return PROVIDERS.find((p) => p.id === id) ?? null;
}

// ═════════════════════════════════════════════════════════════
// Single-provider call
// ═════════════════════════════════════════════════════════════

export interface GenerationResult {
  ok: boolean;
  text?: string;
  error?: string;
  providerId: string;
}

export async function generateWithProvider(
  providerId: string,
  opts: GenerateOptions
): Promise<GenerationResult> {
  const provider = getProvider(providerId);
  if (!provider) return { ok: false, error: `Unknown provider: ${providerId}`, providerId };
  if (!opts.apiKey) return { ok: false, error: 'API key is missing.', providerId };

  try {
    const { url, init } = provider.buildRequest(opts);
    const res = await fetch(url, init);
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg =
        json?.error?.message ?? json?.message ?? `HTTP ${res.status} ${res.statusText}`;
      return { ok: false, error: msg, providerId };
    }

    let text = provider.parseResponse(json);

    // Async providers (1min.ai) return a UUID with PROCESSING status.
    // Poll the result endpoint until we get the final text.
    if (!text && provider.pollResult) {
      try {
        text = await provider.pollResult(opts.apiKey, json);
      } catch (e) {
        return { ok: false, error: (e as Error).message, providerId };
      }
    }

    if (!text) return { ok: false, error: 'Response was empty.', providerId };
    return { ok: true, text, providerId };
  } catch (e) {
    return { ok: false, error: (e as Error).message, providerId };
  }
}

// ═════════════════════════════════════════════════════════════
// Fallback chain
// ═════════════════════════════════════════════════════════════

export interface FallbackOptions {
  prompt: string;
  extras?: GenerateOptions['extras'];
  /** Ordered list of provider IDs (primary first) */
  order: string[];
  /** Config lookup by provider ID */
  configs: Record<string, { apiKey: string; preferredModel?: string } | undefined>;
}

export interface FallbackResult extends GenerationResult {
  /** Which providers were tried, in order, with their outcomes */
  attempts: Array<{ providerId: string; ok: boolean; error?: string }>;
}

export async function generateWithFallback(opts: FallbackOptions): Promise<FallbackResult> {
  const attempts: FallbackResult['attempts'] = [];

  for (const providerId of opts.order) {
    const config = opts.configs[providerId];
    if (!config?.apiKey) continue;

    const provider = getProvider(providerId);
    if (!provider) continue;

    const modelId = config.preferredModel ?? provider.models[0]?.id ?? '';
    const res = await generateWithProvider(providerId, {
      prompt: opts.prompt,
      modelId,
      apiKey: config.apiKey,
      extras: opts.extras,
    });

    attempts.push({ providerId, ok: res.ok, error: res.error });

    if (res.ok) {
      return { ...res, attempts };
    }
  }

  return {
    ok: false,
    error:
      attempts.length === 0
        ? 'No provider is configured. Add an API key in AI Settings.'
        : `All ${attempts.length} provider(s) failed. See attempt log.`,
    providerId: '',
    attempts,
  };
}