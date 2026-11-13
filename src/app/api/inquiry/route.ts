import { handleInquiry } from "@/lib/forms/handlers";

/**
 * Service request endpoint (multipart/form-data, for optional photos and
 * PDFs). All logic lives in src/lib/forms/handlers.ts.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = handleInquiry;
