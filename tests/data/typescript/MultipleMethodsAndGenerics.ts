export interface MultipleMethodsAndGenerics<T1, T2> {
    foo<TA, TB>(a: boolean | number, b: any): string;
    faz(): string;
}
