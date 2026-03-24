/**
 * Design contract for Chapter 3 mobile — sourced from docs/figma-cache-page3.json
 * (typography, layout keys, reference lists). Do not duplicate magic numbers in JSX.
 */
import figmaCache from '../../docs/figma-cache-page3.json';

/** @type {readonly string[]} Accordion section titles from Figma — should match CMS `sessionStructure.items[].title` order */
export const REFERENCE_SESSION_ACCORDION_TITLES =
    figmaCache.sections?.gapsVsChapter3?.referenceAccordionTitles?.order ?? [];

export { figmaCache as chapter3FigmaCache };
