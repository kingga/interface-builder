import IDataType from '../../contracts/IDataType';

export default class StringDataType implements IDataType {
    public toCode(): string {
        return 'string';
    }
}
