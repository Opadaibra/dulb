export abstract class GenericComponent<T> {
  data: T[] = [];

  abstract loadData(): void;
}
