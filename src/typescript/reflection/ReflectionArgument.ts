import IReflectionArgument from '../../contracts/reflection/IReflectionArgument';
import IDataType from '../../contracts/IDataType';
import NullDataType from '../data-types/NullDataType';
import AnyDataType from '../data-types/AnyDataType';

export default class ReflectionArgument implements IReflectionArgument {
    protected name: string;

    protected types: IDataType[];

    protected defaultValue: string | null;

    public constructor(name: string, types?: IDataType[], defaultValue?: string) {
        this.name = name;
        this.types = types || [];
        this.defaultValue = defaultValue || null;
    }

    public getName(): string {
        return this.name;
    }

    public getAllowedTypes(): IDataType[] {
        return this.types;
    }

    public isNullable(): boolean {
        return this.types.some((v: IDataType) => v instanceof NullDataType);
    }

    public getDefaultValue(): string | null {
        return this.defaultValue;
    }

    public toCode(): string {
        let code = `${this.getName()}: ${this.getTypeString()}`;

        if (this.getDefaultValue() !== null) {
            code += ` = ${this.getDefaultValue()}`;
        }

        return code;
    }

    protected getTypeString(): string {
        if (this.types.length < 1) {
            return new AnyDataType().toCode();
        }

        let str = '';
        const len = this.types.length;

        for (let i = 0; i < len; i++) {
            str += this.types[i].toCode();

            // Add a pipe between each type, except for the last one.
            if (i < len - 1) {
                str += ' | ';
            }
        }

        return str;
    }
}
