import IDataType from "../../contracts/IDataType";

export default class DoubleDataType implements IDataType {
    public toCode(): string {
        return 'double';
    }
}
