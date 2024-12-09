export default function(attr: string): string | undefined {
  return String(process.env.NODE_ENV) === "production" ? undefined : attr;
}
