import slugify from "slugify";

const options: Parameters<typeof slugify>[1] = {
  lower: true,
  strict: true,
  remove: /[*+~.()'"!:@]/g,
};

export function generateSlug(title: string, id?: string): string {
  if (typeof title !== "string") {
    return id ? `${slugify(title, options)}-${id}` : slugify(title, options);
  } else {
    return id
      ? `${slugify("product", options)}-${id}`
      : slugify("product", options);
  }
}
