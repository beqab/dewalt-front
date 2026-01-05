import slugify from "slugify";

const options: Parameters<typeof slugify>[1] = {
  lower: true,
  strict: true,
  remove: /[*+~.()'"!:@]/g,
};

export function generateHybridSlug(title: string, id: string): string {
  return `${slugify(title, options)}-${id}`;
}
