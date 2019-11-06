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
import DataTypeFactory from './DataTypeFactory';

export default class PHPReflectionFactory implements IReflectionFactory {
    public createInterface(name: string, methods?: IReflectionMethod[]): IReflectionInterface {
        return new ReflectionInterface(name, methods);
    }

    public createMethod(name: string, returnTypes?: IDataType[], args?: IReflectionArgument[]): IReflectionMethod {
        return new ReflectionMethod(name, returnTypes, args);
    }

    public createArgument(name: string, types?: IDataType[], defaultValue?: string): IReflectionArgument {
        return new ReflectionArgument(name, types, defaultValue);
    }

    public createGeneric(_name: string): IReflectionGeneric | null {
        return null;
    }

    public createDataTypeFactory(): IDataTypeFactory {
        return new DataTypeFactory();
    }
}
