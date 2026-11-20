"use client";

/**
 * Enquiry form that sends to WhatsApp: on submit it turns the filled-in fields into one chat message
 * and opens wa.me with it (new tab on desktop, the WhatsApp app on phones). No server or email needed.
 */
export default function WaForm({
  number, greeting, labels, className, children, ...rest
}: {
  number: string;
  greeting: string;
  labels: Record<string, string>;
  className?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <form
      className={className}
      action={`https://wa.me/${number}`}
      {...rest}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const lines = Object.entries(labels)
          .map(([k, label]) => [label, String(data.get(k) ?? "").trim()])
          .filter(([, v]) => v)
          .map(([label, v]) => `${label}: ${v}`);
        const text = [greeting, "", ...lines].join("\n");
        window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      }}
    >
      {children}
    </form>
  );
}
