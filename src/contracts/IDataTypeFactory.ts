import IDataType from './IDataType';

export default interface IDataTypeFactory {
    make(type: string): IDataType | null;
}
