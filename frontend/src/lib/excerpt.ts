/**
 * Clean Excerpt Generator for Pranav Shende Portfolio
 * Safely extracts human-readable text from markdown/HTML content
 * Guarantees that 'undefined', 'null', or raw formatting is never displayed.
 */

export function getCleanExcerpt(
  excerpt?: string | null,
  content?: string | null,
  maxLength = 175
): string {
  // 1. Prefer manually written excerpt if valid and non-empty
  if (
    excerpt &&
    typeof excerpt === 'string' &&
    excerpt.trim().length > 0 &&
    excerpt.trim().toLowerCase() !== 'undefined' &&
    excerpt.trim().toLowerCase() !== 'null'
  ) {
    const trimmed = excerpt.trim();
    if (trimmed.length <= maxLength) return trimmed;
    const truncated = trimmed.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 80 ? truncated.slice(0, lastSpace) : truncated).trim() + '...';
  }

  // 2. Fall back to extracting text from markdown content
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return 'Technical engineering deep-dive, system architecture breakdown, and implementation insights by Pranav Shende.';
  }

  let text = content
    // Strip fenced code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Strip inline code
    .replace(/`([^`]+)`/g, '$1')
    // Strip HTML tags
    .replace(/<[^>]*>/g, '')
    // Strip markdown images ![alt](url)
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Strip markdown links [anchor](url) -> anchor
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    // Strip headings (# Heading)
    .replace(/^#+\s+/gm, '')
    // Strip blockquotes (> Quote)
    .replace(/^>\s+/gm, '')
    // Strip list bullets and numbering
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    // Strip bold and italic (**bold**, *italic*, __bold__, _italic_)
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    // Strip horizontal rules
    .replace(/^(?:---|\*\*\*|___)\s*$/gm, '')
    // Normalize multiple spaces and linebreaks
    .replace(/\s+/g, ' ')
    .trim();

  if (!text || text.length === 0) {
    return 'Technical engineering deep-dive, system architecture breakdown, and implementation insights by Pranav Shende.';
  }

  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const cleanStr = lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated;

  return cleanStr.trim() + '...';
}

export default getCleanExcerpt;
