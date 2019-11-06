import IReflectionFactory from './IReflectionFactory';

export type LanguageType = 'TypeScript' | 'PHP';

export default interface ILanguageReflectionFactory {
    make(language: LanguageType): IReflectionFactory;
}
