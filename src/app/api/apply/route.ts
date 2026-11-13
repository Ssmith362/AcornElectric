import { handleApplication } from "@/lib/forms/handlers";

/**
 * Careers application endpoint (multipart/form-data, for the optional
 * resume). All logic lives in src/lib/forms/handlers.ts.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = handleApplication;
