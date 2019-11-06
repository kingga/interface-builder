import IReflectionMethod from './IReflectionMethod';
import IReflectionGeneric from './IReflectionGeneric';

export default interface IReflectionInterface {
    getName(): string;
    getConstructor(): IReflectionMethod;
    getMethod(name: string): IReflectionMethod | null;
    getMethods(): IReflectionMethod[];
    getGenerics(): IReflectionGeneric[];
    toCode(): string;
}
