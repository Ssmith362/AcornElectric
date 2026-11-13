/**
 * POST a FormData body and report upload progress. fetch() can't report
 * upload progress, so this uses XMLHttpRequest. Resolves with the HTTP status
 * and parsed JSON (or {}); status 0 means the request never completed
 * (offline, blocked, or dropped by the host).
 */
export function postForm(
  url: string,
  body: FormData,
  onProgress?: (fraction: number) => void,
): Promise<{ status: number; data: Record<string, unknown> }> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.responseType = "text";
    xhr.timeout = 90_000;
    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && e.total > 0) onProgress(e.loaded / e.total);
      };
    }
    xhr.onload = () => {
      let data: Record<string, unknown> = {};
      try {
        data = JSON.parse(xhr.responseText || "{}");
      } catch {
        /* host error pages aren't JSON */
      }
      resolve({ status: xhr.status, data });
    };
    xhr.onerror = () => resolve({ status: 0, data: {} });
    xhr.ontimeout = () => resolve({ status: 0, data: {} });
    xhr.send(body);
  });
}
