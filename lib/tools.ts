import { composio, USER_ID } from './composio';

// Hjälp: lista tillgängliga verktyg (för felsökning)
export async function listTools() {
  const tools = await (composio as any).tools.get(USER_ID, { limit: 25 });
  console.log('[composio] available tools:', tools);
  return tools;
}

// 1) Hitta senaste intressanta artikel om ett ämne (Zenserp Google News)
export async function findLatestArticle(topic: string) {
  const res = await (composio as any).tools.execute('ZENSERP_GOOGLE_NEWS_SEARCH', {
    user_id: USER_ID,
    arguments: {
      q: topic,
      num: 5,
      timeframe: '7d',
      hl: 'sv',
      gl: 'se'
    }
  });
  const items = (res?.data?.data?.news_results ?? []) as any[];
  const best = items[0] || null;
  return best ? {
    title: best.title,
    url: best.link,
    source: best.source,
    published: best.date
  } : null;
}

// 2) Generera 4 bilder via Replicate/FLUX.1
export async function generateImageVariants(prompt: string) {
  const jobs = Array.from({ length: 4 }).map(() =>
    (composio as any).tools.execute('REPLICATE_CREATE_PREDICTION', {
      user_id: USER_ID,
      arguments: {
        deployment_owner: 'black-forest-labs',
        deployment_name: 'flux-schnell',
        input: { prompt, width: 1024, height: 1024 },
        wait_for: 120
      }
    })
  );
  const results = await Promise.all(jobs);
  return results.map((r: any) => {
    const out = r?.data?.output;
    const url = Array.isArray(out) ? out[0] : out;
    return { url };
  });
}

// 3) Textstyrd editering (inpainting) med FLUX Fill
export async function editImageWithText(imageUrl: string, instruction: string, maskUrl?: string) {
  const res = await (composio as any).tools.execute('REPLICATE_CREATE_PREDICTION', {
    user_id: USER_ID,
    arguments: {
      deployment_owner: 'black-forest-labs',
      deployment_name: 'flux-fill-dev',
      input: { image: imageUrl, mask: maskUrl ?? undefined, prompt: instruction },
      wait_for: 120
    }
  });
  const out = res?.data?.output;
  const url = Array.isArray(out) ? out[0] : out;
  return { url };
}

// 4) Publicera till Instagram (server-side lookup av IG_USER_ID)
export async function publishToInstagram(caption: string, imageUrl: string) {
  const igUserId = process.env.IG_USER_ID!;
  if (!igUserId) throw new Error('IG_USER_ID is missing');

  // 4.1 Skapa media container
  const container = await (composio as any).tools.execute('INSTAGRAM_CREATE_MEDIA_CONTAINER', {
    user_id: USER_ID,
    arguments: {
      ig_user_id: igUserId,
      image_url: imageUrl,
      media_type: 'IMAGE',
      caption
    }
  });

  const creationId = container?.data?.data?.id || container?.data?.id;

  // 4.2 (Valfritt) kontrollera status tills klar
  await (composio as any).tools.execute('INSTAGRAM_GET_POST_STATUS', {
    user_id: USER_ID,
    arguments: { creation_id: creationId }
  });

  // 4.3 Publicera
  const publish = await (composio as any).tools.execute('INSTAGRAM_CREATE_POST', {
    user_id: USER_ID,
    arguments: { ig_user_id: igUserId, creation_id: creationId }
  });

  return publish?.data ?? { id: null };
}
