/**
 * Customer reviews, copied word for word from Acorn's Google Business Profile
 * (read Oct 19, 2026; 5.0 stars, 71 reviews at that time). Names are exactly as
 * Google shows them.
 *
 * Rules: only add real reviews, never edit a review's meaning or wording, and
 * never add review or rating structured data for them (Google ignores
 * self-serving review markup on a business's own site and it can trigger a
 * manual action). No star rating or review count is printed on the site:
 * those live on the Google profile so they are always current there.
 *
 * To refresh: open the Google profile, copy new reviews in (expand "More"),
 * newest or most useful first.
 */
export type Review = { quote: string; name: string; source: "Google" };

export const reviews: Review[] = [
  {
    name: "Warren Smith",
    source: "Google",
    quote:
      "We recently had our kitchen remodeled and Eric with Acorn Electric was hired on to do all the electrical work.\nIf you are looking for a professional that will communicate clearly, complete the work exactly as you desire and provide a level of service rarely found these days, use Eric and Acorn Electric for your home needs. Eric is meticulous, hardworking and honest. He explained everything thoroughly and his forthrightness was much appreciated. We are very happy with Eric’s work and glad to see that there are professionals like him still around.\nThis was our first time using Acorn Electric services and I would hire him again in a minute. Fabulous job. Highly recommended.",
  },
  {
    name: "Mark Woolum",
    source: "Google",
    quote:
      "I had Acorn out to my property initially to put a sub panel in a detached garage. While the crew worked on that my wife came up with a few other items to look at in the house. Eric was happy to help and very flexible with us! The crew was polite, on time, very professional, clean, reasonably priced, nice to the dog, patient around our toddler etc. I Can’t say enough good things! Would recommend them without hesitation!",
  },
  {
    name: "Krista Reeder",
    source: "Google",
    quote:
      "Eric at Acorn Electric was kind, friendly, always on time and completed all the work as promised. He and his crew updated moved my electrical panel, installed an outdoor outlet and two ceiling lights. Electrical work is always expensive, but I felt confident that the work was needed and they did a quality job. Eric also met the inspector at my house when I wasn't able to get there from work. I am pleased with the work completed and will call them again if I need electrical work.",
  },
  {
    name: "Emiley Rios",
    source: "Google",
    quote:
      "I can't recommend Eric and Acorn Electric enough. I called him in a frantic. I was listing my house for sale and the lights in my basement went out, it was a bad connection. Eric prioritized my needs to ensure my lights were working for list day. His crew were professional, knowledgable, and will be my first call for any future electrical needs here in Spokane, Wa.",
  },
  {
    name: "Karin Herling",
    source: "Google",
    quote:
      "Eric at Acorn Electric is my go-to electrician in Spokane. Honest pricing, quality work, and no hassle. Eric showed up when he said he would and got the job done right the first time. Five stars — don’t hesitate to call him.",
  },
  {
    name: "Josh Grasse",
    source: "Google",
    quote:
      "Eric at Acorn Electric has done more work for me than I can count now. I’ve had him install fans, add outlets, wire my attic fan, and install a chandelier. He is always ready to help and does the job right the first time for a great price. Get him to do your work. You won’t regret it!",
  },
  {
    name: "Bryan Smith",
    source: "Google",
    quote:
      "Eric did an awesome job on my new electrical mast. Super easy to work with, did a great job, I'll be hiring him again for all of my home electrical maintenance.",
  },
  {
    name: "Chris Cooper",
    source: "Google",
    quote:
      "Eric came out after one of our outlets in our garage set on fire after we plugged in our shop vac. He fixed everything and gave us some really good recommendations for future projects. We will definitely be using Acorn again!",
  },
  {
    name: "Helen Adamietz",
    source: "Google",
    quote:
      "Acorn electric did a great job installing new attic fan and exterior light fixture, all done in a timely manner. Reasonable cost, too. Cleaned up after the job was done, I have nothing but praise for a job well done!",
  },
  {
    name: "Sandra Teal",
    source: "Google",
    quote: "Our experience with Eric’s work has been great! Great with our clients and wonderful to work with! Highly recommend.",
  },
];
