import IReflectionInterface from '../../contracts/reflection/IReflectionInterface';
import IReflectionMethod from '../../contracts/reflection/IReflectionMethod';
import ReflectionMethod from './ReflectionMethod';
import IReflectionGeneric from '../../contracts/reflection/IReflectionGeneric';

export default class ReflectionInterface implements IReflectionInterface {
    protected name: string;

    protected methods: IReflectionMethod[];

    protected generics: IReflectionGeneric[];

    public constructor(name: string, methods?: IReflectionMethod[], generics?: IReflectionGeneric[]) {
        this.name = name;
        this.methods = methods || [];
        this.generics = generics || [];
    }

    public getName(): string {
        return this.name;
    }

    public getMethods(): IReflectionMethod[] {
        return this.methods;
    }

    public getMethod(name: string): IReflectionMethod | null {
        return this.getMethods().find((m: IReflectionMethod) => m.getName() === name) || null;
    }

    public getConstructor(): IReflectionMethod {
        return new ReflectionMethod('constructor');
    }

    public getGenerics(): IReflectionGeneric[] {
        return this.generics;
    }

    public toCode(): string {
        let code = '';
        let tab = '    ';
        const nl = '\r\n';

        code += `export interface ${this.getName()}`;

        // Generics.
        if (this.getGenerics().length > 0) {
            code += `<${this.getGenericsListString()}>`;
        }

        code += ` {${nl}`;

        // Methods.
        const len = this.getMethods().length;
        this.getMethods().forEach((method: IReflectionMethod, index: number) => {
            code += `${tab}${method.toCode()};${nl}`;

            // NOTE: Uncomment this if you want a gap between each method.
            // // Newline unless it is the last method.
            // if (index < len - 1) {
            //     code += nl;
            // }
        });

        code += `}${nl}`;

        return code;
    }

    protected getGenericsListString(): string {
        return this.getGenerics()
            .map((g: IReflectionGeneric) => g.toCode())
            .join(', ');
    }
}
