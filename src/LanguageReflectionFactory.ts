import ILanguageReflectionFactory, { LanguageType } from './contracts/ILanguageReflectionFactory';
import IReflectionFactory from './contracts/IReflectionFactory';
import TypeScriptReflectionFactory from './typescript/TypeScriptReflectionFactory';
import PHPReflectionFactory from './php/PHPReflectionFactory';

export default class LanguageReflectionFactory implements ILanguageReflectionFactory {
    make(language: LanguageType): IReflectionFactory {
        switch (language) {
            case 'TypeScript':
                return new TypeScriptReflectionFactory();
            case 'PHP':
                return new PHPReflectionFactory();
            default:
                return new TypeScriptReflectionFactory();
        }
    }
}
