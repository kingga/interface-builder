import IReflectionFactory from '../contracts/IReflectionFactory';
import IReflectionMethod from '../contracts/reflection/IReflectionMethod';
import IReflectionGeneric from '../contracts/reflection/IReflectionGeneric';
import IReflectionInterface from '../contracts/reflection/IReflectionInterface';
import IReflectionArgument from '../contracts/reflection/IReflectionArgument';
import IDataType from '../contracts/IDataType';
import IDataTypeFactory from '../contracts/IDataTypeFactory';
import ReflectionInterface from './reflection/ReflectionInterface';
import ReflectionMethod from './reflection/ReflectionMethod';
import ReflectionArgument from './reflection/ReflectionArgument';
import ReflectionGeneric from './reflection/ReflectionGeneric';
import DataTypeFactory from './DataTypeFactory';

export default class TypeScriptReflectionFactory implements IReflectionFactory {
    public createInterface(name: string, methods?: IReflectionMethod[], generics?: IReflectionGeneric[]): IReflectionInterface {
        return new ReflectionInterface(name, methods, generics);
    }

    public createMethod(name: string, returnTypes?: IDataType[], args?: IReflectionArgument[], generics?: IReflectionGeneric[]): IReflectionMethod {
        return new ReflectionMethod(name, returnTypes, args, generics);
    }

    public createArgument(name: string, types?: IDataType[], defaultValue?: string): IReflectionArgument {
        return new ReflectionArgument(name, types, defaultValue);
    }

    public createGeneric(name: string): IReflectionGeneric | null {
        return new ReflectionGeneric(name);
    }

    public createDataTypeFactory(): IDataTypeFactory {
        return new DataTypeFactory();
    }
}
