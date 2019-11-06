import IReflectionMethod from '../../contracts/reflection/IReflectionMethod';
import IDataType from '../../contracts/IDataType';
import IReflectionArgument from '../../contracts/reflection/IReflectionArgument';
import VoidDataType from '../data-types/VoidDataType';
import IReflectionGeneric from '../../contracts/reflection/IReflectionGeneric';

export default class ReflectionMethod implements IReflectionMethod {
    protected name: string;

    protected arguments: IReflectionArgument[];

    protected returnTypes: IDataType[];

    public constructor(name: string, returnTypes?: IDataType[], args?: IReflectionArgument[]) {
        this.name = name;
        this.returnTypes = returnTypes || [];
        this.arguments = args || [];
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
        return [];
    }

    public toCode(): string {
        // Definition.
        let code = `public function ${this.getName()}`;

        code += '(';

        // Arguments.
        if (this.getArguments().length > 0) {
            code += this.getArgumentListString();
        }

        code += ')';

        // Return type.
        let returnType = this.getReturnTypeListString();
        if (returnType) {
            code += `: ${returnType}`;
        }

        return code;
    }

    protected getArgumentListString(): string {
        return this.getArguments()
            .map((arg: IReflectionArgument) => arg.toCode())
            .join(', ');
    }

    protected getReturnTypeListString(): string | null {
        // Can only have one return type.
        const types = this.getReturnTypes();
        const len = types.length;

        if (len > 1) {
            return null;
        }

        if (len === 0) {
            return new VoidDataType().toCode();
        }

        return types[0].toCode();
    }
}
