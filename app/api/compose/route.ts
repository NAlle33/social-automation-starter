import { NextRequest, NextResponse } from 'next/server';
import { findLatestArticle, generateImageVariants, editImageWithText, publishToInstagram } from '@/lib/tools';

function extractTopic(input: string) {
  const i = input.toLowerCase().indexOf('om ');
  return i >= 0 ? input.slice(i + 3).trim() : input.trim();
}

// Dummy caption (byt till LLM i produktion)
function makeCaption(article: any, topic: string) {
  const base = article
    ? `📣 Nytt om ${topic}: ${article.title} (${article.source}).`
    : `📣 Inlägg om ${topic}.`;
  const tags = `#${topic.replace(/\s+/g, '')} #nyheter #inspiration`;
  return `${base}\n\n${tags}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, action, selectedImageUrl, editInstruction } = body as {
    message?: string;
    action?: 'compose' | 'edit' | 'publish';
    selectedImageUrl?: string;
    editInstruction?: string;
  };

  if (action === 'edit' && selectedImageUrl && editInstruction) {
    const edited = await editImageWithText(selectedImageUrl, editInstruction);
    return NextResponse.json({ editedImage: edited });
  }

  if (action === 'publish' && selectedImageUrl && message) {
    const topic = extractTopic(message);
    const article = await findLatestArticle(topic);
    const caption = makeCaption(article, topic);
    const post = await publishToInstagram(caption, selectedImageUrl);
    return NextResponse.json({ postId: post?.id ?? null, caption });
  }

  // Standard: skapa förslag (artikel + 4 bilder + caption)
  const topic = extractTopic(message ?? 'inlägg');
  const article = await findLatestArticle(topic);
  const caption = makeCaption(article, topic);
  const images = await generateImageVariants(`Nyhetsinlägg om ${topic}. Sociala medier, hög energi, fotoestetik.`);

  return NextResponse.json({ article, caption, images });
}
