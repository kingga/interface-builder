import IReflectionArgument from '../../contracts/reflection/IReflectionArgument';
import IDataType from '../../contracts/IDataType';

export default class ReflectionArgument implements IReflectionArgument {
    protected name: string;

    protected types: IDataType[];

    protected defaultValue: string | null;

    public constructor(name: string, types?: IDataType[], defaultValue?: string) {
        this.name = name;
        this.types = types || [];
        this.defaultValue = defaultValue || null;

        // Some times the type can be null.
        this.types = this.types.filter((t: IDataType | null) => t !== null);
    }

    public getName(): string {
        return this.name;
    }

    public getDefaultValue(): string | null {
        return this.defaultValue;
    }

    public getAllowedTypes(): IDataType[] {
        return this.types;
    }

    public isNullable(): boolean {
        return this.defaultValue === 'null';
    }

    public toCode(): string {
        let code = '';
        const type = this.getTypeString();

        if (type) {
            code += `${type} `;
        }

        code += `$${this.getName()}`;

        if (this.getDefaultValue() !== null) {
            code += ` = ${this.getDefaultValue()}`;
        }

        return code;
    }

    protected getTypeString(): string {
        const len = this.types.length;

        // Cannot have multiple types.
        if (len !== 1) {
            return '';
        }

        return this.types[0].toCode();
    }
}
