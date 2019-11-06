import IParser from './contracts/IParser';
import IReflectionInterface from './contracts/reflection/IReflectionInterface';
import ISchema from './contracts/schema/ISchema';
import LanguageReflectionFactory from './LanguageReflectionFactory';
import { LanguageType } from './contracts/ILanguageReflectionFactory';
import IDataType from './contracts/IDataType';
import IReflectionGeneric from './contracts/reflection/IReflectionGeneric';

export default class Parser implements IParser {
    public parse(schema: ISchema, language: LanguageType): IReflectionInterface {
        const langFactory = new LanguageReflectionFactory();
        const factory = langFactory.make(language);
        const dataFactory = factory.createDataTypeFactory();

        // Create the generics and methods.
        const iGenerics = schema.generics.map((g: string) => factory.createGeneric(g));
        const methods = schema.methods.map((m) => {
            const returnTypes = m.returnValue.map((t: string) => dataFactory.make(t));
            const generics = m.generics.map((g: string) => factory.createGeneric(g)).filter((g: IReflectionGeneric | null) => g !== null);
            const args = m.args.map((arg) => {
                const types = arg.types.map((t: string) => dataFactory.make(t))
                    .filter((t: IDataType | null) => t !== null);

                return factory.createArgument(arg.name, types, arg.defaultValue);
            });

            return factory.createMethod(m.name, returnTypes, args, generics);
        });

        return factory.createInterface(schema.name, methods, iGenerics);
    }
}
