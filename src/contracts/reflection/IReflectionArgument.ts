import IDataType from '../IDataType';

export default interface IReflectionArgument {
    getName(): string;
    isNullable(): boolean;
    getAllowedTypes(): IDataType[];
    getDefaultValue(): any;
    toCode(): string;
}
