export function formatPrice(price?: number, label?: string): string {
  if (!price && !label) return 'Бағасы келіседі';
  if (!price) return label || '';
  const formatted = price.toLocaleString('ru-RU');
  return label ? `${formatted} ${label}` : `${formatted} ₸`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return 'Бүгін';
  if (diffDays === 1) return 'Кеше';
  if (diffDays < 7) return `${diffDays} күн бұрын`;
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

export function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}к`;
  return String(views);
}
