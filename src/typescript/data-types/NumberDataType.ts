import IDataType from '../../contracts/IDataType';

export default class NumberDataType implements IDataType {
    public toCode(): string {
        return 'number';
    }
}
