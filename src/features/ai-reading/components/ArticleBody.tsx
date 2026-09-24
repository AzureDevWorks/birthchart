import {
  parseInline,
  type ArticleSection,
  type ArticleBlock,
  type InlineToken,
} from '../markdown';

interface ArticleBodyProps {
  sections: ArticleSection[];
  ornament: string;
  fontScale: number;
}

export function ArticleBody({ sections, ornament, fontScale }: ArticleBodyProps) {
  return (
    <div className="space-y-20">
      {sections.map((s, idx) => (
        <SectionRenderer
          key={s.slug}
          section={s}
          index={idx}
          ornament={ornament}
          fontScale={fontScale}
        />
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────── */

function SectionRenderer({
  section,
  index,
  ornament,
  fontScale,
}: {
  section: ArticleSection;
  index: number;
  ornament: string;
  fontScale: number;
}) {
  const isFirst = index === 0;
  const headingSize = isFirst
    ? 'clamp(1.65rem, 3vw, 2.2rem)'
    : 'clamp(1.3rem, 2.4vw, 1.65rem)';

  return (
    <section id={section.slug} className="scroll-mt-40">
      {section.isBlessing ? (
        <div className="text-center mb-10 space-y-4">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '11px',
              color: ornament,
              letterSpacing: '0.5em',
              fontWeight: 600,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
              fontSize: headingSize,
              fontWeight: 600,
              color: '#2E1F14',
              lineHeight: 1.25,
            }}
          >
            {section.title}
          </h2>
          <Ornament ornament={ornament} />
        </div>
      ) : (
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '14px',
                fontWeight: 600,
                color: ornament,
                letterSpacing: '0.05em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, ${ornament}66, transparent)` }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
              fontSize: headingSize,
              fontWeight: 600,
              color: '#2E1F14',
              lineHeight: 1.2,
              letterSpacing: '0.005em',
            }}
          >
            {section.title}
          </h2>
        </header>
      )}

      <div className="space-y-6">
        {section.blocks.map((b, i) => (
          <BlockRenderer
            key={i}
            block={b}
            ornament={ornament}
            fontScale={fontScale}
            dropCap={isFirst && i === 0 && !section.isBlessing}
            isBlessing={section.isBlessing}
          />
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────── */

function BlockRenderer({
  block,
  ornament,
  fontScale,
  dropCap,
  isBlessing,
}: {
  block: ArticleBlock;
  ornament: string;
  fontScale: number;
  dropCap: boolean;
  isBlessing: boolean;
}) {
  if (block.type === 'rule') {
    return <Ornament ornament={ornament} />;
  }

  if (block.type === 'list' && block.items) {
    const ListTag = (block.ordered ? 'ol' : 'ul') as 'ol' | 'ul';
    return (
      <ListTag
        className={block.ordered ? 'list-decimal list-outside pl-6 space-y-2.5' : 'space-y-2.5'}
        style={{
          fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
          fontSize: `${16.5 * fontScale}px`,
          lineHeight: 1.7,
          color: '#2E1F14',
        }}
      >
        {block.items.map((it, i) => (
          <li key={i} className={block.ordered ? 'pl-1 marker:text-[#8B7659]' : 'flex gap-3'}>
            {!block.ordered && (
              <span
                aria-hidden="true"
                className="shrink-0 mt-[0.55em]"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: ornament,
                  opacity: 0.7,
                }}
              />
            )}
            <span>{renderInline(it)}</span>
          </li>
        ))}
      </ListTag>
    );
  }

  if (block.type === 'shloka' && block.text) {
    return (
      <p
        className="text-center py-3"
        style={{
          fontFamily: "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
          fontSize: `${18 * fontScale}px`,
          lineHeight: 1.9,
          color: '#8A2B22',
          letterSpacing: '0.005em',
        }}
      >
        {block.text}
      </p>
    );
  }

  if (block.type === 'paragraph' && block.text) {
    if (isBlessing) {
      return (
        <p
          className="text-center py-2"
          style={{
            fontFamily: "'Noto Serif Devanagari', 'Cormorant Garamond', serif",
            fontSize: `${18 * fontScale}px`,
            lineHeight: 1.8,
            color: '#8A2B22',
            fontStyle: 'italic',
          }}
        >
          {block.text}
        </p>
      );
    }

    return (
      <p
        className={
          dropCap
            ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-[3.75rem] first-letter:text-[#8A2B22]"
            : undefined
        }
        style={{
          fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
          fontSize: `${17 * fontScale}px`,
          lineHeight: 1.8,
          color: '#2E1F14',
        }}
      >
        {renderInline(block.text)}
      </p>
    );
  }

  return null;
}

/* ───────────────────────────────────────────────────────────────── */

function renderInline(text: string) {
  const tokens: InlineToken[] = parseInline(text);
  return tokens.map((t, i) => {
    if (t.type === 'bold')
      return (
        <strong key={i} style={{ fontWeight: 600, color: '#2E1F14' }}>
          {t.content}
        </strong>
      );
    if (t.type === 'italic')
      return (
        <em key={i} style={{ fontStyle: 'italic', color: '#4A3423' }}>
          {t.content}
        </em>
      );
    if (t.type === 'code')
      return (
        <code
          key={i}
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.9em',
            background: 'rgba(139, 118, 89, 0.12)',
            padding: '1px 5px',
            borderRadius: 4,
          }}
        >
          {t.content}
        </code>
      );
    return <span key={i}>{t.content}</span>;
  });
}

function Ornament({ ornament }: { ornament: string }) {
  return (
    <div className="flex items-center justify-center gap-4 py-6" aria-hidden="true">
      <span
        className="h-px"
        style={{ width: 64, background: `linear-gradient(to right, transparent, ${ornament}99)` }}
      />
      <span style={{ fontSize: '11px', color: ornament, lineHeight: 1, opacity: 0.85 }}>✦</span>
      <span
        className="h-px"
        style={{ width: 64, background: `linear-gradient(to left, transparent, ${ornament}99)` }}
      />
    </div>
  );
}