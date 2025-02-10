export class TransformHelper {
  public static toLowerCase({ value }: { value: string }): string {
    return value ? value.toString().toLowerCase() : value;
  }

  public static trim({ value }: { value: string }): string {
    return value ? value.toString().trim() : value;
  }
  public static uniqueItems({ value }) {
    return value ? Array.from(new Set(value)) : value;
  }
}
