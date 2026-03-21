// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormContent = any;

/** Safely parse form content (handles both string JSON and object) */
export function parseFormContent(content: unknown): FormContent {
  if (typeof content !== "object" || content === null) {
    try {
      return JSON.parse(content as string);
    } catch {
      return {};
    }
  }
  return content;
}

/** Extract form title from parsed content */
export function getFormTitle(content: FormContent, fallback = "Untitled Form"): string {
  return (
    content?.formTitle ||
    (Array.isArray(content) ? content[0]?.formTitle : "") ||
    fallback
  );
}

/** Count form fields from parsed content */
export function getFormFieldCount(content: FormContent): number {
  if (Array.isArray(content?.formFields)) return content.formFields.length;
  if (Array.isArray(content)) return content[0]?.formFields?.length ?? 0;
  return 0;
}

/** Format a date to a human-readable string */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }
): string {
  return new Date(date).toLocaleDateString("en-IN", options);
}

/** Format a date with time */
export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
