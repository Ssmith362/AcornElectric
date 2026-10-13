/**
 * Customer reviews. EMPTY ON PURPOSE.
 *
 * Only add reviews that are real, copied word-for-word from Google (or with
 * the customer's permission), with the name exactly as it appears there.
 * Never edit a review's meaning, never invent one, and never add review or
 * rating structured data for them (Google ignores self-serving review markup
 * on a business's own site, and it can trigger a manual action).
 *
 * The reviews section on the homepage stays hidden in production until at
 * least one review is added here.
 */
export type Review = { quote: string; name: string; service?: string; source: "Google" };

export const reviews: Review[] = [];
