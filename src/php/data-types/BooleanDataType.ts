import IDataType from "../../contracts/IDataType";

export default class BooleanDataType implements IDataType {
    public toCode(): string {
        return 'bool';
    }
}
