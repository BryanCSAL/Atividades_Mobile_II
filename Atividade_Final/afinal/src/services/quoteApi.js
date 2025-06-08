export async function fetchRandomQuote() {
  const res = await fetch('https://api.quotable.io/random');
  const json = await res.json();
  return `${json.content} — ${json.author}`;
}