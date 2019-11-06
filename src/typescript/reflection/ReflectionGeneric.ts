import IReflectionGeneric from '../../contracts/reflection/IReflectionGeneric';

export default class ReflectionGeneric implements IReflectionGeneric {
    protected name: string;

    public constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public toCode(): string {
        return this.getName();
    }
}
