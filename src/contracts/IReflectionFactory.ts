import IReflectionMethod from './reflection/IReflectionMethod';
import IReflectionGeneric from './reflection/IReflectionGeneric';
import IReflectionInterface from './reflection/IReflectionInterface';
import IReflectionArgument from './reflection/IReflectionArgument';
import IDataType from './IDataType';
import IDataTypeFactory from './IDataTypeFactory';

export default interface IReflectionFactory {
    createInterface(name: string, methods?: IReflectionMethod[], generics?: IReflectionGeneric[]): IReflectionInterface;
    createMethod(name: string, returnTypes?: IDataType[], args?: IReflectionArgument[], generics?: IReflectionGeneric[]): IReflectionMethod;
    createArgument(name: string, types?: IDataType[], defaultValue?: string): IReflectionArgument;
    createGeneric(name: string): IReflectionGeneric | null;
    createDataTypeFactory(): IDataTypeFactory;
}
