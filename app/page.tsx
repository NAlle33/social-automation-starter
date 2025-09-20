'use client';
import { useEffect, useRef, useState } from 'react';

type Img = { url: string };

export default function Page() {
  const [input, setInput] = useState('gör ett inlägg till instagram om apor');
  const [images, setImages] = useState<Img[]>([]);
  const [article, setArticle] = useState<any>(null);
  const [caption, setCaption] = useState<string>('');
  const [selected, setSelected] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  async function compose() {
    const res = await fetch('/api/compose', {
      method: 'POST',
      body: JSON.stringify({ message: input, action: 'compose' })
    });
    const data = await res.json();
    setImages(data.images ?? []);
    setArticle(data.article ?? null);
    setCaption(data.caption ?? '');
  }

  async function editSelected() {
    if (!selected || !editText) return;
    const res = await fetch('/api/compose', {
      method: 'POST',
      body: JSON.stringify({ action: 'edit', selectedImageUrl: selected, editInstruction: editText })
    });
    const data = await res.json();
    if (data?.editedImage?.url) {
      setImages([{ url: data.editedImage.url }, ...images]);
      setSelected(data.editedImage.url);
      setEditText('');
    }
  }

  async function publish() {
    if (!selected) return;
    const res = await fetch('/api/compose', {
      method: 'POST',
      body: JSON.stringify({ action: 'publish', selectedImageUrl: selected, message: input })
    });
    const data = await res.json();
    alert(data.postId ? `Publicerat! Post-ID: ${data.postId}` : 'Förhandsvisning klar (koppla Instagram-auth för att publicera).');
  }

  useEffect(() => { compose(); }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', height: '100dvh' }}>
      <div style={{ borderRight: '1px solid #eee', position: 'relative' }}>
        <div style={{ padding: 16 }}>
          <h3>Chat</h3>
          <p style={{ color: '#666' }}>Skriv vad du vill posta. Ex: “gör ett inlägg till instagram om apor”.</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, borderTop: '1px solid #eee', background: '#fff' }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={3} style={{ width: '100%', resize: 'vertical' }} />
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button onClick={compose}>Skapa förslag</button>
            <button onClick={publish} disabled={!selected}>Publicera valt</button>
          </div>
          {selected && (
            <div style={{ marginTop: 12 }}>
              <input placeholder="Skriv hur bilden ska ändras…" value={editText} onChange={e => setEditText(e.target.value)} style={{ width: '100%' }} />
              <button onClick={editSelected} style={{ marginTop: 8 }}>Redigera vald bild</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: 16, overflow: 'auto' }}>
        <h3>Förhandsvisning</h3>
        {article && (
          <div style={{ marginBottom: 16, fontSize: 14, color: '#333' }}>
            <div><strong>Artikel:</strong> {article.title}</div>
            <div style={{ color: '#666' }}>{article.source} • {article.published}</div>
          </div>
        )}
        <div style={{ whiteSpace: 'pre-wrap', background: '#fafafa', border: '1px solid #eee', padding: 12, borderRadius: 8, marginBottom: 16 }}>
          {caption || '—'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
          {images.map((img, idx) => (
            <div key={idx} onClick={() => setSelected(img.url)} style={{ border: selected === img.url ? '3px solid #000' : '1px solid #ddd', borderRadius: 8, cursor: 'pointer', overflow: 'hidden' }}>
              <img src={img.url} alt={`variant-${idx}`} style={{ width: '100%', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
