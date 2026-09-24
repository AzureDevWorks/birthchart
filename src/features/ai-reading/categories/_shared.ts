import type { SectionSpec } from './_types';

/**
 * The closing blessing. Every category ends with this section, verbatim.
 * Rendered centered, italic, in the accent's vermilion, without a drop cap.
 */
export const BLESSING: SectionSpec = {
  title: 'Closing Blessing',
  guide: 'One sentence beginning with ॐ. Nothing after it.',
  render: 'blessing',
};