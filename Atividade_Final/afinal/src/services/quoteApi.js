export async function fetchRandomQuote() {
  // 1) Chama o endpoint ZenQuotes
  const res = await fetch('https://zenquotes.io/api/random');
  // 2) A resposta vem como um array com um objeto:
  //    [ { q: "texto da citação", a: "autor" } ]
  const json = await res.json();
  const { q, a } = json[0];
  // 3) Formata a string igual antes
  return `${q} — ${a}`;
}