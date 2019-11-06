# Interface Builder

Build interfaces via JSON schema for multiple languages.

## Usage
```ts
const schema: ISchema = {
    name: 'InterfaceName',
    methods: [
        {
            name: 'foo',
            generics: [],
            args: [],
            returnValue: ['string'],
        },
        {
            name: 'faz',
            generics: ['T'],
            args: [{ name: 'baz', types: ['string'] }],
            returnValue: ['string', 'boolean'],
        },
    ],
    generics: [],
};

const parser = new Parser();
const ts = parser.parse(schema, 'TypeScript');
const php = parser.parse(schema, 'PHP');

console.log(ts.toCode());
console.log(php.toCode());
```

TypeScript Generated:

```ts
export interface InterfaceName {
    foo(): string;
    faz<T>(baz: string): string | boolean;
}
```

PHP Generated:

```php
interface InterfaceName {
    public foo(): string;
    public faz(string $baz);
}
```

## TODO List
- [X] TypeScript Tests
- TypeScript
  - [X] Arguments
  - [X] Methods
  - [X] Generics
  - [X] Interfaces
  - [ ] Namespaces
  - [ ] Custom Types
  - [ ] Custom Format Configuration
- [X] PHP Tests
- PHP
  - [X] Arguments
  - [X] Methods
  - [X] Interfaces
  - [ ] Namespaces
  - [ ] Custom Types
  - [ ] Custom Format Configuration
- [ ] Code Review / Refactor
- Documentation
  - [ ] DocBlocks
  - [X] README Docs
