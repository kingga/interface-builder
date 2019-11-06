import IReflectionInterface from '../../contracts/reflection/IReflectionInterface';
import IReflectionMethod from '../../contracts/reflection/IReflectionMethod';
import ReflectionMethod from './ReflectionMethod';
import IReflectionGeneric from '../../contracts/reflection/IReflectionGeneric';

export default class ReflectionInterface implements IReflectionInterface {
    protected name: string;

    protected methods: IReflectionMethod[];

    public constructor(name: string, methods?: IReflectionMethod[]) {
        this.name = name;
        this.methods = methods || [];
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
        return [];
    }

    public toCode(): string {
        let tab = '    ';
        const nl = '\r\n';
        let code = `<?php${nl}${nl}`;

        code += `interface ${this.getName()}${nl}{${nl}`;

        // Methods.
        this.getMethods().forEach((method: IReflectionMethod) => {
            code += `${tab}${method.toCode()};${nl}`;
        });

        code += `}${nl}`;

        return code;
    }
}
