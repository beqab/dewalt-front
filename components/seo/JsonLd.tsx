type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Schema.org structured data (Google rich results). */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // `<` escape - რომ კონტენტმა script tag ვერ დახუროს
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
