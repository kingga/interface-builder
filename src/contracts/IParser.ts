import IReflectionInterface from './reflection/IReflectionInterface';
import ISchema from './schema/ISchema';
import { LanguageType } from './ILanguageReflectionFactory';

export default interface IParser {
    parse(schema: ISchema, language: LanguageType): IReflectionInterface;
}
