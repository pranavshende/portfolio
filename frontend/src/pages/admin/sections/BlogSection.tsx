import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Edit2, Trash2, BookOpen, ExternalLink, Loader2, X, Eye, 
  Upload, Image as ImageIcon, Sparkles, CheckCircle2, Clock, Tag, 
  Search, Filter, FileText, ArrowUpRight, Key, Zap, TrendingUp
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from '@/lib/api';

import jarvisBanner from '@/photo/jarvis_banner.webp';
import electropathyBanner from '@/photo/electropathy_banner.webp';
import tastifyyBanner from '@/photo/tastifyy_banner.webp';
import attritionBanner from '@/photo/attrition_banner.webp';
import jansamparkBanner from '@/photo/jansampark.webp';
import solarBanner from '@/photo/solar_analytics.webp';
import pashurakshakBanner from '@/photo/pashurakshak.webp';

const resolveBlogCover = (url?: string, slug?: string): string => {
  if (!url && !slug) return jarvisBanner;
  if (url && (url.startsWith('data:image/') || url.startsWith('http://') || url.startsWith('https://'))) {
    return url;
  }
  const target = (url || slug || '').toLowerCase();
  if (target.includes('forgerag') || target.includes('electropathy')) return electropathyBanner;
  if (target.includes('attrition') || target.includes('workforce')) return attritionBanner;
  if (target.includes('solar')) return solarBanner;
  if (target.includes('tastifyy') || target.includes('fullstack') || target.includes('scalable')) return tastifyyBanner;
  if (target.includes('jansampark') || target.includes('civic') || target.includes('hackathon')) return jansamparkBanner;
  if (target.includes('pashu') || target.includes('agriculture')) return pashurakshakBanner;
  if (target.includes('jarvis')) return jarvisBanner;

  if (url && url.startsWith('/src/photo/')) {
    return url.replace('/src/photo/', '/photo/');
  }
  return url || jarvisBanner;
};

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category?: string;
  tags?: string[];
  coverImageUrl?: string;
  author?: string;
  readingTimeMinutes?: number;
  published?: boolean;
  isPublished?: boolean;
  publishedAt?: string;
  createdAt?: string;
  viewCount?: number;
  impressionCount?: number;
  seoTitle?: string;
  seoDescription?: string;
}

const PRESET_CATEGORIES = [
  'Enterprise AI & Architecture',
  'LLMs & Retrieval-Augmented Generation',
  'Machine Learning & Predictive Analytics',
  'CleanTech & Big Data',
  'Full-Stack & System Design',
  'Civic-Tech & Digital Governance',
  'Edge AI & Computer Vision',
  'Hackathons & Achievements'
];

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPostItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isAiStructuring, setIsAiStructuring] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState(() => {
    return (
      (import.meta.env.VITE_GEMINI_API_KEY as string) ||
      (typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') || '' : '')
    );
  });

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Enterprise AI & Architecture',
    excerpt: '',
    content: '',
    tags: 'AI, Fastify, MCP, Architecture',
    coverImageUrl: '',
    author: 'Pranav Shende',
    readingTimeMinutes: 6,
    published: true,
    seoTitle: '',
    seoDescription: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchPosts = () => {
    setLoading(true);
    // Use getAdminBlogPosts to see drafts and published articles
    api.getAdminBlogPosts()
      .then((res: any) => {
        if (res && res.data && Array.isArray(res.data)) {
          setPosts(res.data);
        } else if (Array.isArray(res)) {
          setPosts(res);
        } else {
          return api.getBlogPosts().then((pub: any) => {
            if (pub && pub.data && Array.isArray(pub.data)) setPosts(pub.data);
          });
        }
      })
      .catch((err) => {
        console.warn('Admin blog fetch failed, falling back to public endpoint:', err);
        api.getBlogPosts()
          .then((pub: any) => {
            if (pub && pub.data && Array.isArray(pub.data)) setPosts(pub.data);
          })
          .catch((e) => console.error('Error fetching blog posts:', e));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !currentPost || !prev.slug ? generateSlug(val) : prev.slug,
    }));
  };

  // Image Upload with client-side canvas compression to WebP
  const handleCoverImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1280;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/webp', 0.84);
          setFormData((prev) => ({ ...prev, coverImageUrl: compressed }));
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleOpenCreate = () => {
    setCurrentPost(null);
    setActiveTab('write');
    setIsCustomCategory(false);
    setFormData({
      title: '',
      slug: '',
      category: 'Enterprise AI & Architecture',
      excerpt: '',
      content: '## Overview\n\nIn this article, I discuss the architectural principles and technical decisions behind...',
      tags: 'AI, Fastify, MCP, Architecture',
      coverImageUrl: '',
      author: 'Pranav Shende',
      readingTimeMinutes: 6,
      published: true,
      seoTitle: '',
      seoDescription: '',
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (post: BlogPostItem) => {
    setCurrentPost(post);
    setActiveTab('write');
    const cat = post.category || 'Enterprise AI & Architecture';
    setIsCustomCategory(!PRESET_CATEGORIES.includes(cat));
    setFormData({
      title: post.title || '',
      slug: post.slug || generateSlug(post.title || ''),
      category: cat,
      excerpt: post.excerpt || '',
      content: post.content || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      coverImageUrl: post.coverImageUrl || '',
      author: post.author || 'Pranav Shende',
      readingTimeMinutes: post.readingTimeMinutes ?? 6,
      published: post.published ?? post.isPublished ?? true,
      seoTitle: post.seoTitle || post.title || '',
      seoDescription: post.seoDescription || post.excerpt || '',
    });
    setIsEditing(true);
  };

  const applyFormatting = (
    formatType: 'h1' | 'h2' | 'h3' | 'bold' | 'italic' | 'code' | 'quote' | 'list' | 'link'
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const original = formData.content;
    const selectedText = original.substring(start, end);

    let replacement = '';
    let newCursorStart = start;
    let newCursorEnd = end;

    switch (formatType) {
      case 'h1': {
        if (selectedText) {
          replacement = `\n# ${selectedText.trim()}\n`;
          newCursorStart = start;
          newCursorEnd = start + replacement.length;
        } else {
          replacement = '\n# Main Article Title\n';
          newCursorStart = start + 3;
          newCursorEnd = start + 21;
        }
        break;
      }
      case 'h2': {
        if (selectedText) {
          replacement = `\n## ${selectedText.trim()}\n`;
          newCursorStart = start;
          newCursorEnd = start + replacement.length;
        } else {
          replacement = '\n## Section Heading\n';
          newCursorStart = start + 4;
          newCursorEnd = start + 19;
        }
        break;
      }
      case 'h3': {
        if (selectedText) {
          replacement = `\n### ${selectedText.trim()}\n`;
          newCursorStart = start;
          newCursorEnd = start + replacement.length;
        } else {
          replacement = '\n### Subheading\n';
          newCursorStart = start + 5;
          newCursorEnd = start + 15;
        }
        break;
      }
      case 'bold': {
        if (selectedText) {
          replacement = `**${selectedText}**`;
          newCursorStart = start;
          newCursorEnd = start + replacement.length;
        } else {
          replacement = '**bold text**';
          newCursorStart = start + 2;
          newCursorEnd = start + 11;
        }
        break;
      }
      case 'italic': {
        if (selectedText) {
          replacement = `*${selectedText}*`;
          newCursorStart = start;
          newCursorEnd = start + replacement.length;
        } else {
          replacement = '*italic text*';
          newCursorStart = start + 1;
          newCursorEnd = start + 12;
        }
        break;
      }
      case 'code': {
        if (selectedText) {
          if (selectedText.includes('\n')) {
            replacement = `\n\`\`\`typescript\n${selectedText}\n\`\`\`\n`;
          } else {
            replacement = `\`${selectedText}\``;
          }
          newCursorStart = start;
          newCursorEnd = start + replacement.length;
        } else {
          replacement = '\n```typescript\n// code snippet\n```\n';
          newCursorStart = start + 15;
          newCursorEnd = start + 29;
        }
        break;
      }
      case 'quote': {
        if (selectedText) {
          const quoted = selectedText
            .split('\n')
            .map((line) => (line.startsWith('> ') ? line : `> ${line}`))
            .join('\n');
          replacement = `\n${quoted}\n`;
          newCursorStart = start;
          newCursorEnd = start + replacement.length;
        } else {
          replacement = '\n> Highlighted callout or quote\n';
          newCursorStart = start + 3;
          newCursorEnd = start + 31;
        }
        break;
      }
      case 'list': {
        if (selectedText) {
          const listed = selectedText
            .split('\n')
            .map((line) => (line.trim().startsWith('- ') ? line : `- ${line}`))
            .join('\n');
          replacement = `\n${listed}\n`;
          newCursorStart = start;
          newCursorEnd = start + replacement.length;
        } else {
          replacement = '\n- Key point 1\n- Key point 2\n';
          newCursorStart = start + 3;
          newCursorEnd = start + 14;
        }
        break;
      }
      case 'link': {
        if (selectedText) {
          replacement = `[${selectedText}](https://)`;
          newCursorStart = start + selectedText.length + 3;
          newCursorEnd = start + replacement.length - 1;
        } else {
          replacement = '[link text](https://example.com)';
          newCursorStart = start + 1;
          newCursorEnd = start + 10;
        }
        break;
      }
    }

    const updatedContent = original.substring(0, start) + replacement + original.substring(end);
    setFormData((prev) => ({ ...prev, content: updatedContent }));

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorStart, newCursorEnd);
      }
    });
  };

  /**
   * Universal Raw Article Parser
   * Transforms unformatted plain text drafts (like copied text with numbers,
   * bylines, lists, and takeaway lines) directly into production-grade Markdown.
   */
  const parseRawArticleToMarkdown = (text: string) => {
    const rawLines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (rawLines.length === 0) return null;

    let title = '';
    let author = '';
    let category = '';
    let startIndex = 0;

    // 1. Detect Title (first non-empty line)
    if (rawLines[0]) {
      title = rawLines[0].replace(/^#+\s*/, '').trim();
      startIndex = 1;
    }

    // 2. Detect Byline (e.g. By Pranav Shende | 13 November 2026 | AI & Technology)
    let byline = '';
    if (rawLines[startIndex] && /^by\s+/i.test(rawLines[startIndex].replace(/^\*+|\*+$/g, ''))) {
      byline = rawLines[startIndex].replace(/^\*+|\*+$/g, '').trim();
      const parts = byline.split('|').map((p) => p.trim());
      const authorPart = parts[0].replace(/^by\s+/i, '').trim();
      if (authorPart) author = authorPart;
      if (parts.length >= 3) {
        category = parts[2];
      }
      startIndex++;
    }

    const resultBlocks: string[] = [];
    if (title) resultBlocks.push('# ' + title);
    if (byline) resultBlocks.push('**' + byline + '**');

    let listCount = 0;

    const isParagraphStart = (str: string) => {
      return /^(I |My |This |The |Companies |However|In my|Regardless|We |It |As |First|Second|Third|Some |NVIDIA|For |On |When |While )\b/i.test(str);
    };

    for (let i = startIndex; i < rawLines.length; i++) {
      const line = rawLines[i];

      // Check for Section Heading (e.g. '1. What Happened at NVIDIA?')
      const sectionMatch = line.match(/^(\d+[\.\)]\s+.+)$/);
      if (sectionMatch) {
        listCount = 0;
        resultBlocks.push('## ' + sectionMatch[1]);
        continue;
      }

      // Check for Subsection Heading (e.g. 'A. Semiconductor Industry: Opportunities for Competitors')
      const subMatch = line.match(/^([A-Z][\.\)]\s+.+)$/);
      if (subMatch) {
        listCount = 0;
        resultBlocks.push('### ' + subMatch[1]);
        continue;
      }

      // Check for common top-level keywords
      if (/^(references|disclaimer:|disclaimer|final thoughts|conclusion|summary)\b/i.test(line)) {
        listCount = 0;
        if (line.toLowerCase().startsWith('disclaimer')) {
          resultBlocks.push('> **' + line.replace(/^disclaimer:?\s*/i, 'Disclaimer: ') + '**');
        } else {
          resultBlocks.push('## ' + line);
        }
        continue;
      }

      // Check if line is a markdown link: [text](url)
      if (/^\[.+\]\(https?:\/\/.+\)$/.test(line)) {
        listCount = 0;
        resultBlocks.push('- ' + line);
        continue;
      }

      // Check for key-takeaway pattern e.g. "Reduce vendor dependency: Build solutions..."
      const takeawayMatch = line.match(/^([A-Z][a-zA-Z\s]{2,35}):\s+(.+)$/);
      if (takeawayMatch && !line.toLowerCase().startsWith('disclaimer') && !line.toLowerCase().startsWith('note')) {
        listCount = 0;
        resultBlocks.push(`- **${takeawayMatch[1]}:** ${takeawayMatch[2]}`);
        continue;
      }

      // Check if in list
      if (listCount > 0) {
        const isListItem = line.length < 85 && !isParagraphStart(line) && !line.endsWith(':');
        if (isListItem) {
          resultBlocks.push('- ' + line);
          listCount++;
          continue;
        } else {
          listCount = 0;
        }
      }

      if (line.endsWith(':') && line.length < 120) {
        listCount = 1;
        resultBlocks.push(line);
        continue;
      }

      // Check for 'raises an important question: <Question>'
      if (line.includes('raises an important question:')) {
        const qIndex = line.indexOf('raises an important question:');
        const intro = line.substring(0, qIndex + 'raises an important question:'.length);
        const question = line.substring(qIndex + 'raises an important question:'.length).trim();
        if (question) {
          resultBlocks.push(intro + ' **' + question + '**');
          continue;
        }
      }

      resultBlocks.push(line);
    }

    // Format list items so consecutive list items are joined with \n while paragraphs with \n\n
    const finalOutput: string[] = [];
    for (let i = 0; i < resultBlocks.length; i++) {
      const cur = resultBlocks[i];
      const prev = resultBlocks[i - 1];
      if (cur.startsWith('- ') && prev && prev.startsWith('- ')) {
        finalOutput[finalOutput.length - 1] += '\n' + cur;
      } else {
        finalOutput.push(cur);
      }
    }

    return {
      title,
      author,
      category,
      markdown: finalOutput.join('\n\n')
    };
  };

  const handleSmartParseRawText = () => {
    const rawContent = formData.content.trim();
    if (!rawContent) {
      alert('Please paste or write your draft text into the editor first.');
      return;
    }

    const parsed = parseRawArticleToMarkdown(rawContent);
    if (!parsed) return;

    setFormData((prev) => ({
      ...prev,
      title: parsed.title || prev.title,
      slug: !prev.slug && parsed.title ? generateSlug(parsed.title) : prev.slug,
      author: parsed.author || prev.author,
      category: parsed.category || prev.category,
      content: parsed.markdown
    }));

    if (parsed.category && !PRESET_CATEGORIES.includes(parsed.category)) {
      setIsCustomCategory(true);
    }

    showToast('⚡ Raw draft parsed & converted into structured Markdown!');
  };

  const handleAiAutoStructure = async (overrideKey?: string) => {
    const rawContent = formData.content.trim();
    if (!rawContent) {
      alert('Please paste or write your draft text into the editor before running the AI assistant.');
      return;
    }

    const effectiveKey = (
      overrideKey ||
      apiKeyInput ||
      (import.meta.env.VITE_GEMINI_API_KEY as string) ||
      (typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') || '' : '')
    ).trim();

    if (!effectiveKey) {
      setShowKeyModal(true);
      return;
    }

    setIsAiStructuring(true);
    try {
      const models = ['gemini-2.5-flash', 'gemini-1.5-flash'];
      let structuredMarkdown = '';
      let lastErrMsg = '';

      const promptSystem = `You are an elite technical editor and publication architect for Pranav Shende's blog.
Convert the given raw article text into a beautifully structured, highly readable, production-grade Markdown post.

Formatting Rules:
1. Title & Header:
   - If the first line is the article title, format it as '# <Title>'.
   - If there is an author, date, or category metadata line (e.g. 'By Pranav Shende | 13 November 2026 | AI & Technology'), format it in bold as: **By Pranav Shende | 13 November 2026 | AI & Technology**
2. Headings:
   - Convert all major topics/questions into '## ' section headings (e.g., '## 1. What Happened at NVIDIA?').
   - Use '### ' for detailed subsections.
3. Emphasis & Callouts:
   - Bold key concepts, names, industry stats, and critical thesis statements (e.g. **What happens to the AI industry when...**).
   - Format notable declarations, questions, or key takeaways into blockquotes ('> ').
4. Lists & Breakdown:
   - Turn lists, bullet points, or serialized items into neat Markdown lists ('- ' or '1. ').
5. Code & Technical Elements:
   - Use proper markdown backticks for system components, code snippets, and terminal commands.
6. Content Fidelity:
   - Preserve ALL factual statements, narrative flow, and analytical points without omitting paragraphs or inventing facts.
7. Output Format:
   - Return ONLY the clean formatted markdown. Do NOT wrap your whole response in outer \`\`\`markdown ... \`\`\` fences, and do not add conversational preamble or sign-offs.`;

      for (const model of models) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${effectiveKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    role: 'user',
                    parts: [
                      {
                        text: `${promptSystem}\n\n=== RAW ARTICLE DRAFT ===\n${rawContent}`
                      }
                    ]
                  }
                ],
                generationConfig: {
                  temperature: 0.25,
                  topP: 0.95
                }
              })
            }
          );

          if (!res.ok) {
            const errJson = await res.json().catch(() => ({}));
            throw new Error(errJson?.error?.message || `HTTP ${res.status}`);
          }

          const resData = await res.json();
          const candidateText = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText && typeof candidateText === 'string') {
            let cleaned = candidateText.trim();
            if (cleaned.startsWith('```markdown')) {
              cleaned = cleaned.replace(/^```markdown\s*/i, '').replace(/\s*```$/i, '');
            } else if (cleaned.startsWith('```')) {
              cleaned = cleaned.replace(/^```\w*\s*/i, '').replace(/\s*```$/i, '');
            }
            structuredMarkdown = cleaned;
            break;
          }
        } catch (mErr: any) {
          console.warn(`Model ${model} attempt failed:`, mErr);
          lastErrMsg = mErr.message || String(mErr);
          if (lastErrMsg.includes('API_KEY_INVALID') || lastErrMsg.includes('API key not valid')) {
            throw new Error('Gemini API key is invalid. Please update your key.');
          }
        }
      }

      if (!structuredMarkdown) {
        throw new Error(lastErrMsg || 'Could not structure markdown with Gemini.');
      }

      // If title is not set, extract first # heading
      let detectedTitle = formData.title;
      if (!detectedTitle.trim()) {
        const firstLine = structuredMarkdown.split('\n')[0];
        if (firstLine && firstLine.startsWith('# ')) {
          detectedTitle = firstLine.replace('# ', '').trim();
        }
      }

      // Also extract metadata from raw content if author/category are present
      const preParsed = parseRawArticleToMarkdown(rawContent);
      const detectedAuthor = preParsed?.author || formData.author;
      const detectedCategory = preParsed?.category || formData.category;

      if (detectedCategory && !PRESET_CATEGORIES.includes(detectedCategory)) {
        setIsCustomCategory(true);
      }

      setFormData((prev) => ({
        ...prev,
        title: detectedTitle || prev.title,
        slug: !prev.slug && detectedTitle ? generateSlug(detectedTitle) : prev.slug,
        author: detectedAuthor || prev.author,
        category: detectedCategory || prev.category,
        content: structuredMarkdown
      }));

      showToast('✨ Article structured successfully with Gemini AI!');
    } catch (err: any) {
      console.error('AI Structure error:', err);
      alert(`AI Assistant Error: ${err.message || 'Failed to communicate with Gemini.'}`);
    } finally {
      setIsAiStructuring(false);
    }
  };

  const executeSave = async (options?: { asDraft?: boolean; keepEditing?: boolean }) => {
    const asDraft = options?.asDraft ?? false;
    const keepEditing = options?.keepEditing ?? false;

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Article Title and Markdown Content are required.');
      return;
    }

    setSaving(true);
    const slug = formData.slug.trim() || generateSlug(formData.title);
    const parsedTags = formData.tags
      ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const isPub = asDraft ? false : Boolean(formData.published);

    const payload = {
      title: formData.title.trim(),
      slug,
      category: formData.category.trim() || 'General Engineering',
      excerpt: formData.excerpt.trim() || formData.content.slice(0, 160).replace(/[#*`_]/g, '').trim(),
      content: formData.content.trim(),
      tags: parsedTags,
      coverImageUrl: formData.coverImageUrl.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      coverImage: formData.coverImageUrl.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      author: formData.author.trim() || 'Pranav Shende',
      readingTimeMinutes: Number(formData.readingTimeMinutes) || 5,
      readTime: Number(formData.readingTimeMinutes) || 5,
      published: isPub,
      isPublished: isPub,
      seoTitle: formData.seoTitle.trim() || `${formData.title.trim()} | Pranav Shende`,
      seoDescription: formData.seoDescription.trim() || formData.excerpt.trim(),
    };

    try {
      let savedResult: any = null;
      if (currentPost) {
        savedResult = await api.updateBlogPost(currentPost.id, payload);
        const updatedItem = savedResult?.data || savedResult || { ...currentPost, ...payload };
        setCurrentPost(updatedItem);
        showToast(asDraft ? 'Article saved as draft.' : keepEditing ? 'Changes saved! Continue editing.' : 'Article updated successfully.');
      } else {
        savedResult = await api.createBlogPost(payload);
        const newItem = savedResult?.data || savedResult;
        if (newItem && (newItem.id || newItem._id)) {
          setCurrentPost({
            id: newItem.id || newItem._id,
            ...payload
          });
        }
        showToast(asDraft ? 'Article saved as draft.' : keepEditing ? 'Article saved! Continue editing.' : 'Article created and saved.');
      }

      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSavedTime(now);

      if (asDraft) {
        setFormData((prev) => ({ ...prev, published: false }));
      }

      fetchPosts();

      if (!keepEditing) {
        setIsEditing(false);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to save blog post.');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSave({ keepEditing: false });
  };

  // Keyboard shortcut: Ctrl+S / Cmd+S to save changes while editing
  useEffect(() => {
    if (!isEditing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        executeSave({ keepEditing: true });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditing, formData, currentPost]);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete article "${title}"? This cannot be undone.`)) return;
    try {
      await api.deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast('Article deleted.');
    } catch (err: any) {
      alert(err.message || 'Failed to delete blog post.');
    }
  };

  // Stats calculation
  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => (p.published ?? p.isPublished) !== false).length;
  const draftCount = totalPosts - publishedCount;
  const totalViews = posts.reduce((sum, p) => sum + (p.viewCount || 0), 0);
  const totalImpressions = posts.reduce((sum, p) => sum + (p.impressionCount || 0), 0);

  const filteredPosts = posts.filter((p) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xl border border-stone-700 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold">
              [技術ブログ]
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>Technical Blog & Knowledge Hub</span>
              <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-mono font-bold">
                {totalPosts} Articles
              </span>
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Publish architectural deep-dives, systems tutorials, project breakdowns, and technical achievements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/blog"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-700 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] text-stone-800 dark:text-stone-200 text-xs font-bold transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Blog</span>
          </a>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-bold border-2 border-stone-900 shadow-[2.5px_2.5px_0px_#1c1917] dark:shadow-[2.5px_2.5px_0px_#000000] transition-all cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Write Article</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Articles</span>
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-2">
            {totalPosts}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Published Live</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-2">
            {publishedCount}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Drafts</span>
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-600 dark:text-stone-400 mt-2">
            {draftCount}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Views</span>
            <Eye className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-2">
            {totalViews}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3px_3px_0px_#1c1917] dark:shadow-[3px_3px_0px_#000000] col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">Impressions</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-2">
            {totalImpressions}
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Filter articles by title, category, or tags..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#16171d] text-xs font-medium text-stone-900 dark:text-stone-100 placeholder:text-stone-400 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
        />
      </div>

      {/* Articles Table & Cards */}
      <div className="rounded-3xl bg-white dark:bg-[#16171d] border-2 border-stone-900 dark:border-stone-700 shadow-[3.5px_3.5px_0px_#1c1917] dark:shadow-[3.5px_3.5px_0px_#000000] overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Loading articles from database...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-stone-400 opacity-60" />
            <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300">No Articles Found</h4>
            <p className="text-xs text-stone-400">
              {searchFilter ? 'No articles match your search filter.' : 'Click "Write Article" to draft your first technical publication.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {filteredPosts.map((post) => {
              const isPub = (post.published ?? post.isPublished) !== false;
              const readTime = post.readingTimeMinutes ?? 5;
              const cover = post.coverImageUrl;

              return (
                <div 
                  key={post.id} 
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/60 dark:hover:bg-stone-900/40 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {cover && (
                      <img
                        src={resolveBlogCover(cover, post.slug)}
                        alt={post.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = jarvisBanner;
                        }}
                        className="w-20 h-14 sm:w-24 sm:h-16 rounded-xl object-cover bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shrink-0"
                      />
                    )}

                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isPub
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
                        }`}>
                          {isPub ? 'Published' : 'Draft'}
                        </span>

                        {post.category && (
                          <span className="px-2 py-0.5 rounded-md bg-[#8b2323]/10 text-[#8b2323] dark:text-rose-400 font-semibold text-[10px]">
                            {post.category}
                          </span>
                        )}

                        <span className="text-[11px] font-mono text-stone-400">
                          /{post.slug}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 line-clamp-1">
                        {post.title}
                      </h4>

                      <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                        {post.excerpt || post.content.slice(0, 150)}...
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{readTime} min read</span>
                        </span>
                        <span>•</span>
                        <span>By {post.author || 'Pranav Shende'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-[#8b2323] dark:text-rose-400" />
                          <span>{post.viewCount || 0} views</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <TrendingUp className="w-3 h-3" />
                          <span>{post.impressionCount || 0} imp</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                      title="View live article"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(post)}
                      className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                      title="Edit article"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id, post.title)}
                      className="p-2 rounded-xl hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                      title="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Blog Post Create / Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs select-auto overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92dvh] overflow-y-auto bg-[#faf7f0] dark:bg-[#16171d] rounded-2xl sm:rounded-3xl border-2 border-stone-900 dark:border-stone-700 shadow-[6px_6px_0px_#1c1917] dark:shadow-[6px_6px_0px_#000000] p-5 sm:p-8 space-y-5 my-auto">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 shadow-[2px_2px_0px_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pr-10">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded border border-[#8b2323] text-[#8b2323] dark:border-rose-400 dark:text-rose-400 font-mono text-[10px] font-bold">
                    [執筆]
                  </span>
                  <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                    {currentPost ? 'Edit Technical Article' : 'Write New Article'}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    formData.published
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}>
                    {formData.published ? 'Live / Published' : 'Draft Mode'}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Authored by {formData.author || 'Pranav Shende'}.{' '}
                  {lastSavedTime ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Last saved at {lastSavedTime}
                    </span>
                  ) : (
                    <span>Press Ctrl+S to save changes anytime while editing.</span>
                  )}
                </p>
              </div>

              {/* Quick Save Header Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => executeSave({ keepEditing: true })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-[#1d1f27] hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  title="Save progress to database without closing the editor (Shortcut: Ctrl+S)"
                >
                  {saving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8b2323]" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  )}
                  <span>Save Progress</span>
                  <kbd className="hidden sm:inline-block px-1 py-0.5 bg-stone-100 dark:bg-stone-800 text-[10px] font-mono rounded text-stone-500">
                    Ctrl+S
                  </kbd>
                </button>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Jarvis AI: Building an Enterprise Intelligence Platform with Fastify & MCP"
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs sm:text-sm shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="jarvis-enterprise-intelligence-mcp"
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>
              </div>

              {/* Row 2: Category, Reading Time, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                    <span>Category</span>
                    {isCustomCategory && (
                      <span className="text-[10px] text-[#8b2323] dark:text-rose-400 font-semibold">Custom Category</span>
                    )}
                  </label>
                  <select
                    value={PRESET_CATEGORIES.includes(formData.category) ? formData.category : 'Other'}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'Other') {
                        setIsCustomCategory(true);
                        if (PRESET_CATEGORIES.includes(formData.category)) {
                          setFormData((prev) => ({ ...prev, category: '' }));
                        }
                      } else {
                        setIsCustomCategory(false);
                        setFormData((prev) => ({ ...prev, category: val }));
                      }
                    }}
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  >
                    {PRESET_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="Other">Other / Custom</option>
                  </select>

                  {/* Custom Category Writer Box */}
                  {(isCustomCategory || (!PRESET_CATEGORIES.includes(formData.category) && formData.category !== '')) && (
                    <div className="mt-2 space-y-1 animate-in fade-in">
                      <input
                        type="text"
                        required
                        placeholder="Write custom category (e.g. AI & Technology)..."
                        value={formData.category === 'Other' ? '' : formData.category}
                        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                        className="w-full p-2.5 rounded-xl border-2 border-[#8b2323] dark:border-rose-500 bg-white dark:bg-[#1d1f27] text-xs font-semibold shadow-[2px_2px_0px_#8b2323] dark:shadow-[2px_2px_0px_#000000] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden"
                        autoFocus
                      />
                      <span className="text-[10px] text-stone-500 block">
                        Custom category will be saved and displayed on your blog.
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Estimated Reading Time (Minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.readingTimeMinutes}
                    onChange={(e) => setFormData({ ...formData, readingTimeMinutes: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-mono shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-2.5 rounded-xl border-2 border-stone-900/80 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                  />
                </div>
              </div>

              {/* Row 3: Cover Image Upload */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-stone-50/70 dark:bg-[#1d1f27]/70 border border-stone-200 dark:border-stone-800">
                <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#8b2323]" />
                    <span>Article Cover / Banner Image</span>
                  </span>
                  <span className="text-[10px] text-stone-400 font-normal">Supports PNG, JPG, WebP</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleCoverImageFile(file);
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Banner Image</span>
                  </button>

                  <div className="w-full flex-1">
                    <input
                      type="text"
                      value={formData.coverImageUrl}
                      onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                      placeholder="Or paste direct image URL (https://... or data:image/...)"
                      className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#16171d] text-xs font-mono"
                    />
                  </div>

                  {formData.coverImageUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImageUrl: '' })}
                      className="p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                      title="Clear image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {formData.coverImageUrl && (
                  <div className="mt-2 relative rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 max-h-48 bg-stone-900/5 flex items-center justify-center">
                    <img
                      src={formData.coverImageUrl}
                      alt="Cover preview"
                      className="max-h-44 w-auto object-contain rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Row 4: Excerpt */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Short Excerpt / Meta Description (SEO)
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A concise architectural summary that appears on social media shares, Google snippets, and blog index cards..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                />
              </div>

              {/* Row 5: Content Editor with Write vs Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                      Article Content (Markdown) *
                    </label>
                    <div className="flex items-center rounded-lg bg-stone-100 dark:bg-stone-800 p-0.5 text-[11px] font-semibold">
                      <button
                        type="button"
                        onClick={() => setActiveTab('write')}
                        className={`px-3 py-1 rounded-md transition-all ${
                          activeTab === 'write'
                            ? 'bg-white dark:bg-[#16171d] text-stone-900 dark:text-white shadow-xs'
                            : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                        }`}
                      >
                        Write
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('preview')}
                        className={`px-3 py-1 rounded-md transition-all ${
                          activeTab === 'preview'
                            ? 'bg-white dark:bg-[#16171d] text-stone-900 dark:text-white shadow-xs'
                            : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                        }`}
                      >
                        Live Preview
                      </button>
                    </div>
                  </div>

                  {/* Formatting quick buttons & AI Assistant */}
                  {activeTab === 'write' && (
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] w-full sm:w-auto">
                      <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-lg p-0.5 border border-stone-200 dark:border-stone-700">
                        <button
                          type="button"
                          title="Heading 1"
                          onClick={() => applyFormatting('h1')}
                          className="px-2 py-0.5 rounded font-bold hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
                        >
                          H1
                        </button>
                        <button
                          type="button"
                          title="Heading 2"
                          onClick={() => applyFormatting('h2')}
                          className="px-2 py-0.5 rounded font-bold hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          title="Heading 3"
                          onClick={() => applyFormatting('h3')}
                          className="px-2 py-0.5 rounded font-bold hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
                        >
                          H3
                        </button>
                      </div>

                      <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-lg p-0.5 border border-stone-200 dark:border-stone-700">
                        <button
                          type="button"
                          title="Bold Text"
                          onClick={() => applyFormatting('bold')}
                          className="px-2 py-0.5 rounded font-black hover:bg-white dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 transition-colors"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          title="Italic Text"
                          onClick={() => applyFormatting('italic')}
                          className="px-2 py-0.5 rounded italic hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
                        >
                          I
                        </button>
                        <button
                          type="button"
                          title="Code Snippet"
                          onClick={() => applyFormatting('code')}
                          className="px-2 py-0.5 rounded font-mono hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
                        >
                          Code
                        </button>
                        <button
                          type="button"
                          title="Quote Callout"
                          onClick={() => applyFormatting('quote')}
                          className="px-2 py-0.5 rounded italic hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
                        >
                          Quote
                        </button>
                        <button
                          type="button"
                          title="Bullet List"
                          onClick={() => applyFormatting('list')}
                          className="px-2 py-0.5 rounded hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
                        >
                          List
                        </button>
                        <button
                          type="button"
                          title="Hyperlink"
                          onClick={() => applyFormatting('link')}
                          className="px-2 py-0.5 rounded hover:bg-white dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
                        >
                          Link
                        </button>
                      </div>

                      {/* Smart Parser & Gemini AI Assistant */}
                      <div className="flex items-center gap-1.5 sm:ml-auto">
                        <button
                          type="button"
                          onClick={handleSmartParseRawText}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 border border-stone-300 dark:border-stone-600 shadow-xs active:scale-95 transition-all cursor-pointer"
                          title="Instant offline parser: auto-detects Title, Byline, Headings, Subheadings & Bullet Lists from raw draft"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>Smart Parse</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAiAutoStructure()}
                          disabled={isAiStructuring}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-purple-700 via-indigo-600 to-[#8b2323] hover:opacity-95 shadow-[2px_2px_0px_#1c1917] active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                          title="Structure and format raw text into clean Markdown with Google Gemini AI"
                        >
                          {isAiStructuring ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                          )}
                          <span>{isAiStructuring ? 'Structuring with AI...' : 'AI Auto-Structure'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setApiKeyInput(
                              (import.meta.env.VITE_GEMINI_API_KEY as string) ||
                              (typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') || '' : '')
                            );
                            setShowKeyModal(true);
                          }}
                          className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                          title="Configure Gemini API Key"
                        >
                          <Key className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {activeTab === 'write' ? (
                  <textarea
                    ref={textareaRef}
                    rows={14}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="## Introduction&#10;&#10;Paste your raw draft here and click 'AI Auto-Structure' or use formatting buttons..."
                    className="w-full p-3.5 rounded-2xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs font-mono leading-relaxed"
                  />
                ) : (
                  <div className="w-full max-h-[380px] overflow-y-auto p-4 sm:p-6 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-[#1d1f27]/50 prose prose-stone dark:prose-invert max-w-none text-xs sm:text-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content || '*No content written yet.*'}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Row 6: Tags & Published Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="AI, Fastify, MCP, Architecture, PostgreSQL"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="publishedCheckbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded text-[#8b2323] focus:ring-[#8b2323] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="publishedCheckbox" className="text-xs font-semibold cursor-pointer select-none">
                    Publish immediately to live portfolio blog
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t-2 border-stone-900/10 dark:border-stone-700 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Save as Draft Button */}
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => executeSave({ asDraft: true, keepEditing: false })}
                    className="px-4 py-2 rounded-xl border-2 border-amber-600 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-bold shadow-[2px_2px_0px_#b45309] dark:shadow-[2px_2px_0px_#000000] hover:bg-amber-100 dark:hover:bg-amber-900/50 hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                    title="Save article as an unpublished draft"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Save as Draft</span>
                  </button>

                  {/* Save Changes & Keep Editing */}
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => executeSave({ keepEditing: true })}
                    className="px-4 py-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-bold shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] hover:bg-stone-200 dark:hover:bg-stone-700 hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                    title="Save changes to database without closing the editor (Shortcut: Ctrl+S)"
                  >
                    {saving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    )}
                    <span>Save (Keep Editing)</span>
                  </button>

                  {/* Primary Save & Close / Publish Article */}
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>{formData.published ? (currentPost ? 'Save Changes' : 'Publish Article') : 'Save & Close'}</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Gemini API Key Configuration Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#181920] border-2 border-stone-900 dark:border-stone-700 rounded-2xl shadow-[6px_6px_0px_#1c1917] dark:shadow-[6px_6px_0px_#000000] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Gemini AI Assistant Key</h3>
                  <p className="text-[11px] text-stone-500">Google Gemini API Configuration</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-2 leading-relaxed">
              <p>
                To power the <strong>AI Auto-Structure</strong> feature, enter your Gemini API key below or set <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-[11px] font-mono text-[#8b2323]">VITE_GEMINI_API_KEY="..."</code> in your <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-[11px] font-mono">.env</code> file.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Gemini API Key</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] font-mono text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-[#8b2323]"
              />
              <p className="text-[10px] text-stone-400">
                You can obtain a free Gemini API key anytime at <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline">aistudio.google.com</a>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const cleaned = apiKeyInput.trim();
                  if (!cleaned) {
                    alert('Please enter a valid Gemini API Key.');
                    return;
                  }
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('gemini_api_key', cleaned);
                  }
                  setShowKeyModal(false);
                  showToast('Gemini API key saved!');
                  handleAiAutoStructure(cleaned);
                }}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#8b2323] hover:bg-[#721c1c] text-white shadow-[2px_2px_0px_#1c1917] active:scale-95 transition-all"
              >
                Save &amp; Structure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSection;