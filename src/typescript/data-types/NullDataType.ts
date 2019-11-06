import IDataType from '../../contracts/IDataType';

export default class NullDataType implements IDataType {
    public toCode(): string {
        return 'null';
    }
}
