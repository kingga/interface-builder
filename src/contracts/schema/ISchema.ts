interface IArgumentSchema {
    name: string;
    types: string[];
    defaultValue?: string;
}

interface IMethodSchema {
    name: string;
    generics: string[];
    args: IArgumentSchema[];
    returnValue: string[];
}

export default interface ISchema {
    name: string;
    generics: string[];
    methods: IMethodSchema[];
}
