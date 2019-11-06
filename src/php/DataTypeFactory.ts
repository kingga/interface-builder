import IDataType from '../contracts/IDataType';
import IDataTypeFactory from '../contracts/IDataTypeFactory';
import IntDataType from './data-types/IntDataType';
import StringDataType from './data-types/StringDataType';
import FloatDataType from './data-types/FloatDataType';
import DoubleDataType from './data-types/DoubleDataType';
import VoidDataType from './data-types/VoidDataType';
import BooleanDataType from './data-types/BooleanDataType';

interface DataTypeList {
    [key: string]: () => IDataType;
}

export default class DataTypeFactory implements IDataTypeFactory {
    protected types: DataTypeList = {
        string: () => new StringDataType(),
        int: () => new IntDataType(),
        number: () => new FloatDataType(),
        float: () => new FloatDataType(),
        double: () => new DoubleDataType(),
        boolean: () => new BooleanDataType(),
        void: () => new VoidDataType(),
    };

    make(type: string): IDataType | null {
        if (typeof this.types[type] === 'function') {
            return this.types[type]();
        }

        return null;
    }
}
