/**
 * Lowercases a label for use mid-sentence without breaking acronyms:
 * "EV chargers" → "EV chargers", "Knob & tube rewire" → "knob & tube rewire".
 */
export function inSentence(label: string) {
  return label
    .split(" ")
    .map((w, i) => (w.length > 1 && w === w.toUpperCase() ? w : i === 0 ? w.charAt(0).toLowerCase() + w.slice(1) : w))
    .join(" ");
}
