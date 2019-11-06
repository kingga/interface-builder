import IDataType from '../../contracts/IDataType';

export default class VoidDataType implements IDataType {
    public toCode(): string {
        return 'void';
    }
}
