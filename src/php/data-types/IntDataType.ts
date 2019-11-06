import IDataType from "../../contracts/IDataType";

export default class IntDataType implements IDataType {
    public toCode(): string {
        return 'int';
    }
}
