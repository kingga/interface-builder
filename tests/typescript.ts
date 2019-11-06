import ReflectionArgument from '../src/typescript/reflection/ReflectionArgument';
import ReflectionMethod from '../src/typescript/reflection/ReflectionMethod';
import ReflectionInterface from '../src/typescript/reflection/ReflectionInterface';
import ReflectionGeneric from '../src/typescript/reflection/ReflectionGeneric';
import DataTypeFactory from '../src/typescript/DataTypeFactory';
import AnyDataType from '../src/typescript/data-types/AnyDataType';
import { strictEqual } from 'assert';
import VoidDataType from '../src/typescript/data-types/VoidDataType';
import { readFileSync } from 'fs';
import { resolve as resolvePath } from 'path';
import ISchema from '../src/contracts/schema/ISchema';
import Parser from '../src/Parser';

const factory = new DataTypeFactory();

const getInterfaceContents = (i: string): string => {
    return readFileSync(`${resolvePath(__dirname, './data/typescript', i)}.ts`).toString();
};

const getSchemaContents = (schemaPath: string): ISchema => {
    return require(`${resolvePath(__dirname, './data', schemaPath)}.json`);
};

describe('TypeScript', () => {
    describe('Factory', () => {
        it('can create an any data type from the factory', () => {
            strictEqual(factory.make('any') instanceof AnyDataType, true);
        });

        it('can fallback on a default type', () => {
            strictEqual(factory.make('UnkownType') instanceof AnyDataType, true);
        });

        it('can create a void type from the factory', () => {
            strictEqual(factory.make('void') instanceof VoidDataType, true);
        });
    });

    describe('Builder', () => {
        describe('Argument', () => {
            it('can generate an argument with a single type', () => {
                const arg = new ReflectionArgument('foo', [factory.make('string')]);

                strictEqual(arg.toCode(), 'foo: string');
            });

            it('can generate an argument with multiple types', () => {
                const arg = new ReflectionArgument('foo', [factory.make('string'), factory.make('number'), factory.make('null')]);

                strictEqual(arg.toCode(), 'foo: string | number | null');
            });

            it('can generate an argument with a default value', () => {
                const arg = new ReflectionArgument('foo', [factory.make('string')], "'bar'");

                strictEqual(arg.toCode(), "foo: string = 'bar'");
            });

            it('can set the default argument type if not defined', () => {
                const arg = new ReflectionArgument('foo');

                strictEqual(arg.toCode(), 'foo: any');
            });

            it('can include default values', () => {
                const arg = new ReflectionArgument('foo', [factory.make('number')], '5');

                strictEqual(arg.toCode(), 'foo: number = 5');
            });
        });

        describe('Method', () => {
            it('can generate a basic method', () => {
                const method = new ReflectionMethod('foo');

                strictEqual(method.toCode(), 'foo(): void');
            });

            it('can generate a method with a single argument', () => {
                const arg = new ReflectionArgument('bar', [factory.make('string')]);
                const method = new ReflectionMethod('foo', [], [arg]);

                strictEqual(method.toCode(), 'foo(bar: string): void');
            });

            it('can generate a method with some arguments', () => {
                const arg1 = new ReflectionArgument('bar', [factory.make('string')]);
                const arg2 = new ReflectionArgument('pi', [factory.make('number')], '3.14');
                const method = new ReflectionMethod('foo', [], [arg1, arg2]);

                strictEqual(method.toCode(), 'foo(bar: string, pi: number = 3.14): void');
            });

            it('can include a return type', () => {
                const method = new ReflectionMethod('foo', [factory.make('boolean')]);

                strictEqual(method.toCode(), 'foo(): boolean');
            });

            it('can include a generic in the method', () => {
                const generic = new ReflectionGeneric('T');
                const method = new ReflectionMethod('foo', [], [], [generic]);

                strictEqual(method.toCode(), 'foo<T>(): void');
            });

            it('can include multiple generics in the method', () => {
                const g1 = new ReflectionGeneric('T1');
                const g2 = new ReflectionGeneric('T2');
                const method = new ReflectionMethod('foo', [], [], [g1, g2]);

                strictEqual(method.toCode(), 'foo<T1, T2>(): void');
            });
        });

        describe('Interface', () => {
            it('can generate a simple interface with no methods', () => {
                const i = new ReflectionInterface('NoMethods');

                strictEqual(i.toCode(), getInterfaceContents('NoMethods'));
            });

            it('can generate an interface with a method', () => {
                const methods = [new ReflectionMethod('foo', [factory.make('string')])];
                const i = new ReflectionInterface('FooMethod', methods);

                strictEqual(i.toCode(), getInterfaceContents('FooMethod'));
            });

            it('can generate an interface with multiple methods and generics', () => {
                const methods = [
                    new ReflectionMethod(
                        'foo',
                        [factory.make('string')],
                        [
                            new ReflectionArgument('a', [factory.make('boolean'), factory.make('number')]),
                            new ReflectionArgument('b', [factory.make('any')]),
                        ],
                        [
                            new ReflectionGeneric('TA'),
                            new ReflectionGeneric('TB'),
                        ],
                    ),

                    new ReflectionMethod('faz', [factory.make('string')]),
                ];

                const generics = [
                    new ReflectionGeneric('T1'),
                    new ReflectionGeneric('T2'),
                ];

                const i = new ReflectionInterface('MultipleMethodsAndGenerics', methods, generics);

                strictEqual(i.toCode(), getInterfaceContents('MultipleMethodsAndGenerics'));
            });
        });
    });

    describe('Parser', () => {
        it('can parse the no methods interface', () => {
            const schema = getSchemaContents('NoMethods');
            const parser = new Parser();
            const i = parser.parse(schema, 'TypeScript');

            strictEqual(i.toCode(), getInterfaceContents('NoMethods'));
        });

        it('can parse the foo method interface', () => {
            const schema = getSchemaContents('FooMethod');
            const parser = new Parser();
            const i = parser.parse(schema, 'TypeScript');

            strictEqual(i.toCode(), getInterfaceContents('FooMethod'));
        });

        it('can parse the methods and generics interface', () => {
            const schema = getSchemaContents('MultipleMethodsAndGenerics');
            const parser = new Parser();
            const i = parser.parse(schema, 'TypeScript');

            strictEqual(i.toCode(), getInterfaceContents('MultipleMethodsAndGenerics'));
        });
    });
});
