import IDataType from "../../contracts/IDataType";

export default class AnyDataType implements IDataType {
    public toCode(): string {
        return 'any';
    }
}
