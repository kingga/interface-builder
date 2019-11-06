import IDataType from '../contracts/IDataType';
import AnyDataType from './data-types/AnyDataType';
import BooleanDataType from './data-types/BooleanDataType';
import NullDataType from './data-types/NullDataType';
import NumberDataType from './data-types/NumberDataType';
import StringDataType from './data-types/StringDataType';
import IDataTypeFactory from '../contracts/IDataTypeFactory';
import VoidDataType from './data-types/VoidDataType';

interface DataTypeList {
    [key: string]: () => IDataType;
}

export default class DataTypeFactory implements IDataTypeFactory {
    protected types: DataTypeList = {
        any: () => new AnyDataType,
        boolean: () => new BooleanDataType,
        null: () => new NullDataType,
        number: () => new NumberDataType,
        string: () => new StringDataType,
        void: () => new VoidDataType,
    };

    make(type: string): IDataType | null {
        if (typeof this.types[type] === 'function') {
            return this.types[type]();
        }

        return this.types.any();
    }
}
