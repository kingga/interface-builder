import IReflectionArgument from './IReflectionArgument';
import IDataType from '../IDataType';
import IReflectionGeneric from './IReflectionGeneric';

export default interface IReflectionMethod {
    getName(): string;
    getReturnTypes(): IDataType[];
    getArguments(): IReflectionArgument[];
    getGenerics(): IReflectionGeneric[];
    toCode(): string;
}
