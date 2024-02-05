import type { MarkdownHeading } from "astro";

export interface TocItem extends MarkdownHeading {
  subheadings: Array<TocItem>;
}

function diveChildren(item: TocItem, depth: number): Array<TocItem> {
  if (depth >= 1 || !item.subheadings.length) {
    return item.subheadings;
  } else {
    // e.g., 2
    return diveChildren(item.subheadings[item.subheadings.length - 1] as TocItem, depth - 1);
  }
}

export function generateToc(headings: ReadonlyArray<MarkdownHeading>) {
  // this ignores/filters out h1 element(s)
  const bodyHeadings = [...headings.filter(({ depth }) => depth >= 1)];
  const toc: Array<TocItem> = [];

  bodyHeadings.forEach((h) => {
	const heading: TocItem = { ...h, subheadings: [] };
  
	// <=3的缩进
	if (heading.depth <= 3) {
	  toc.push(heading);
	} else {
	  const lastItemInToc = toc[toc.length - 1];
  
	  // Check if toc is not empty
	  if (lastItemInToc && heading.depth < lastItemInToc.depth) {
		throw new Error(`Orphan heading found: ${heading.text}.`);
	  }
  
	  // higher depth
	  // push into children, or children's children
	  const gap = heading.depth - (lastItemInToc ? lastItemInToc.depth : 1);
	  const target = diveChildren(lastItemInToc || { subheadings: [] }, gap);
	  target.push(heading);
	}
  });

  return toc;
}
