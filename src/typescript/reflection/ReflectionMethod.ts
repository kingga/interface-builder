import IReflectionMethod from '../../contracts/reflection/IReflectionMethod';
import IDataType from '../../contracts/IDataType';
import IReflectionArgument from '../../contracts/reflection/IReflectionArgument';
import IReflectionGeneric from '../../contracts/reflection/IReflectionGeneric';
import VoidDataType from '../data-types/VoidDataType';

export default class ReflectionMethod implements IReflectionMethod {
    protected name: string;

    protected arguments: IReflectionArgument[];

    protected returnTypes: IDataType[];

    protected generics: IReflectionGeneric[];

    public constructor(name: string, returnTypes?: IDataType[], args?: IReflectionArgument[], generics?: IReflectionGeneric[]) {
        this.name = name;
        this.returnTypes = returnTypes || [];
        this.arguments = args || [];
        this.generics = generics || [];
    }

    public getName(): string {
        return this.name;
    }

    public getArguments(): IReflectionArgument[] {
        return this.arguments;
    }

    public getReturnTypes(): IDataType[] {
        return this.returnTypes;
    }

    public getGenerics(): IReflectionGeneric[] {
        return this.generics;
    }

    public toCode(): string {
        let code = this.getName();

        // Generics.
        if (this.getGenerics().length > 0) {
            code += `<${this.getGenericsListString()}>`;
        }

        // Arguments.
        code += '(';

        if (this.getArguments().length > 0) {
            code += this.getArgumentListString();
        }

        // Return type.
        code += `): ${this.getReturnTypeListString()}`;

        return code;
    }

    protected getGenericsListString(): string {
        return this.getGenerics()
            .map((g: IReflectionGeneric) => g.toCode())
            .join(', ');
    }

    protected getArgumentListString(): string {
        return this.getArguments()
            .map((arg: IReflectionArgument) => arg.toCode())
            .join(', ');
    }

    protected getReturnTypeListString(): string {
        if (this.getReturnTypes().length < 1) {
            return new VoidDataType().toCode();
        }

        return this.getReturnTypes()
            .map((t: IDataType) => t.toCode())
            .join(' | ');
    }
}
