import IDataType from "../../contracts/IDataType";

export default class FloatDataType implements IDataType {
    public toCode(): string {
        return 'float';
    }
}
