import slugify from "slugify";

const options: Parameters<typeof slugify>[1] = {
  lower: true,
  strict: true,
  remove: /[*+~.()'"!:@]/g,
};

export function generateSlug(title: string, id?: string): string {
  return id ? `${slugify(title, options)}-${id}` : slugify(title, options);
}
