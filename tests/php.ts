import { strictEqual } from 'assert';
import DataTypeFactory from '../src/php/DataTypeFactory';
import IntDataType from '../src/php/data-types/IntDataType';
import ISchema from '../src/contracts/schema/ISchema';
import { readFileSync } from 'fs';
import { resolve as resolvePath } from 'path';
import Parser from '../src/Parser';
import StringDataType from '../src/php/data-types/StringDataType';
import FloatDataType from '../src/php/data-types/FloatDataType';
import DoubleDataType from '../src/php/data-types/DoubleDataType';
import ReflectionArgument from '../src/php/reflection/ReflectionArgument';
import ReflectionMethod from '../src/php/reflection/ReflectionMethod';
import ReflectionInterface from '../src/php/reflection/ReflectionInterface';

const factory = new DataTypeFactory();

const getInterfaceContents = (i: string): string => {
    return readFileSync(`${resolvePath(__dirname, './data/php', i)}.php`).toString();
};

const getSchemaContents = (schemaPath: string): ISchema => {
    return require(`${resolvePath(__dirname, './data', schemaPath)}.json`);
};

describe('PHP', () => {
    describe('Factory', () => {
        it('can create an integer', () => {
            strictEqual(factory.make('int') instanceof IntDataType, true);
        });

        it('can create a string', () => {
            strictEqual(factory.make('string') instanceof StringDataType, true);
        });

        it('can create a float', () => {
            strictEqual(factory.make('float') instanceof FloatDataType, true);
        });

        it('can create a double', () => {
            strictEqual(factory.make('double') instanceof DoubleDataType, true);
        });

        it('can create number', () => {
            strictEqual(factory.make('number') instanceof FloatDataType, true);
        });
    });

    describe('Builder', () => {
        describe('Argument', () => {
            it('can generate an argument with a single type', () => {
                const arg = new ReflectionArgument('foo', [factory.make('string')]);

                strictEqual(arg.toCode(), 'string $foo');
            });

            it('can generate an argument with multiple types', () => {
                const arg = new ReflectionArgument('foo', [factory.make('string'), factory.make('number'), factory.make('null')]);

                // No type, since it doesn't support multiple types.
                strictEqual(arg.toCode(), '$foo');
            });

            it('can generate an argument with a default value', () => {
                const arg = new ReflectionArgument('foo', [factory.make('number')], '5');

                strictEqual(arg.toCode(), 'float $foo = 5');
            });
        });

        describe('Method', () => {
            it('can generate a basic method', () => {
                const method = new ReflectionMethod('foo');

                strictEqual(method.toCode(), 'public function foo(): void');
            });

            it('can generate a method with a single argument', () => {
                const arg = new ReflectionArgument('bar', [factory.make('string')]);
                const method = new ReflectionMethod('foo', [], [arg]);

                strictEqual(method.toCode(), 'public function foo(string $bar): void');
            });

            it('can generate a method with some arguments', () => {
                const arg1 = new ReflectionArgument('bar', [factory.make('string')]);
                const arg2 = new ReflectionArgument('pi', [factory.make('float')], '3.14');
                const method = new ReflectionMethod('foo', [], [arg1, arg2]);

                strictEqual(method.toCode(), 'public function foo(string $bar, float $pi = 3.14): void');
            });

            it('can include a return type', () => {
                const method = new ReflectionMethod('foo', [factory.make('boolean')]);

                strictEqual(method.toCode(), 'public function foo(): bool');
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

            it('can generate an interface with multiple methods', () => {
                const methods = [
                    new ReflectionMethod(
                        'foo',
                        [factory.make('string')],
                        [
                            new ReflectionArgument('a', [factory.make('boolean'), factory.make('number')]),
                            new ReflectionArgument('b', [factory.make('any')]),
                        ],
                    ),
                    new ReflectionMethod('faz', [factory.make('string')]),
                ];

                const i = new ReflectionInterface('MultipleMethodsAndGenerics', methods);

                strictEqual(i.toCode(), getInterfaceContents('MultipleMethods'));
            });
        });

        describe('Parser', () => {
            it('can parse the no methods interface', () => {
                const schema = getSchemaContents('NoMethods');
                const parser = new Parser();
                const i = parser.parse(schema, 'PHP');

                strictEqual(i.toCode(), getInterfaceContents('NoMethods'));
            });

            it('can parse the foo method interface', () => {
                const schema = getSchemaContents('FooMethod');
                const parser = new Parser();
                const i = parser.parse(schema, 'PHP');

                strictEqual(i.toCode(), getInterfaceContents('FooMethod'));
            });

            it('can parse the methods and generics interface', () => {
                const schema = getSchemaContents('MultipleMethodsAndGenerics');
                const parser = new Parser();
                const i = parser.parse(schema, 'PHP');

                strictEqual(i.toCode(), getInterfaceContents('MultipleMethods'));
            });
        });
    });
});
