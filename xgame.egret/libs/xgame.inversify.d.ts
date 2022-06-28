/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function tagParameter(annotationTarget: any, propertyName: string, parameterIndex: number, metadata: interfaces.Metadata): void;
    function tagProperty(annotationTarget: any, propertyName: string, metadata: interfaces.Metadata): void;
    function decorate(decorator: (ClassDecorator | ParameterDecorator | MethodDecorator), target: any, parameterIndex?: number | string): void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    type ServiceIdentifierOrFunc = interfaces.ServiceIdentifier<any> | LazyServiceIdentifer;
    class LazyServiceIdentifer<T = any> {
        private _cb;
        constructor(cb: () => interfaces.ServiceIdentifier<T>);
        unwrap(): string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>;
    }
    function inject(serviceIdentifier: ServiceIdentifierOrFunc): (target: any, targetKey: string, index?: number | PropertyDescriptor) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function injectable(): (target: any) => any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function multiInject(serviceIdentifier: interfaces.ServiceIdentifier<any>): (target: any, targetKey: string, index?: number) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function named(name: string | number | symbol): (target: any, targetKey: string, index?: number) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function optional(): (target: any, targetKey: string, index?: number) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function postConstruct(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function tagged(metadataKey: string | number | symbol, metadataValue: any): (target: any, targetKey: string, index?: number) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function targetName(name: string): (target: any, targetKey: string, index: number) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function unmanaged(): (target: any, targetKey: string, index: number) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    const BindingCount: {
        MultipleBindingsAvailable: number;
        NoBindingsAvailable: number;
        OnlyOneBindingAvailable: number;
    };
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class Binding<T> implements interfaces.Binding<T> {
        id: number;
        moduleId: string;
        activated: boolean;
        serviceIdentifier: interfaces.ServiceIdentifier<T>;
        implementationType: interfaces.Newable<T> | null;
        cache: T | null;
        dynamicValue: ((context: interfaces.Context) => T) | null;
        scope: interfaces.BindingScope;
        type: interfaces.BindingType;
        factory: interfaces.FactoryCreator<T> | null;
        provider: interfaces.ProviderCreator<T> | null;
        constraint: (request: interfaces.Request) => boolean;
        onActivation: ((context: interfaces.Context, injectable: T) => T) | null;
        constructor(serviceIdentifier: interfaces.ServiceIdentifier<T>, scope: interfaces.BindingScope);
        clone(): interfaces.Binding<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    const DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
    const DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
    const NULL_ARGUMENT = "NULL argument";
    const KEY_NOT_FOUND = "Key Not Found";
    const AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
    const CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
    const NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
    const MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
    const MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
    const UNDEFINED_INJECT_ANNOTATION: (name: string) => string;
    const CIRCULAR_DEPENDENCY = "Circular dependency found:";
    const NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
    const INVALID_BINDING_TYPE = "Invalid binding type:";
    const NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
    const INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
    const INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
    const INVALID_TO_SELF_VALUE: string;
    const INVALID_DECORATOR_OPERATION: string;
    const ARGUMENTS_LENGTH_MISMATCH: (...values: any[]) => string;
    const CONTAINER_OPTIONS_MUST_BE_AN_OBJECT: string;
    const CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE: string;
    const CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE: string;
    const CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK: string;
    const MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
    const POST_CONSTRUCT_ERROR: (...values: any[]) => string;
    const CIRCULAR_DEPENDENCY_IN_FACTORY: (...values: any[]) => string;
    const STACK_OVERFLOW = "Maximum call stack size exceeded";
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    const BindingScopeEnum: interfaces.BindingScopeEnum;
    const BindingTypeEnum: interfaces.BindingTypeEnum;
    const TargetTypeEnum: interfaces.TargetTypeEnum;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    const NAMED_TAG = "named";
    const NAME_TAG = "name";
    const UNMANAGED_TAG = "unmanaged";
    const OPTIONAL_TAG = "optional";
    const INJECT_TAG = "inject";
    const MULTI_INJECT_TAG = "multi_inject";
    const TAGGED = "inversify:tagged";
    const TAGGED_PROP = "inversify:tagged_props";
    const PARAM_TYPES = "inversify:paramtypes";
    const DESIGN_PARAM_TYPES = "design:paramtypes";
    const POST_CONSTRUCT = "post_construct";
    const NON_CUSTOM_TAG_KEYS: string[];
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class ContainerModule implements interfaces.ContainerModule {
        id: number;
        registry: interfaces.ContainerModuleCallBack;
        constructor(registry: interfaces.ContainerModuleCallBack);
    }
    class AsyncContainerModule implements interfaces.AsyncContainerModule {
        id: number;
        registry: interfaces.AsyncContainerModuleCallBack;
        constructor(registry: interfaces.AsyncContainerModuleCallBack);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class ContainerSnapshot implements interfaces.ContainerSnapshot {
        bindings: interfaces.Lookup<interfaces.Binding<any>>;
        middleware: interfaces.Next | null;
        static of(bindings: interfaces.Lookup<interfaces.Binding<any>>, middleware: interfaces.Next | null): ContainerSnapshot;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class Container implements interfaces.Container {
        id: number;
        parent: interfaces.Container | null;
        readonly options: interfaces.ContainerOptions;
        private _middleware;
        private _bindingDictionary;
        private _snapshots;
        private _metadataReader;
        private _appliedMiddleware;
        static merge(container1: interfaces.Container, container2: interfaces.Container, ...container3: interfaces.Container[]): interfaces.Container;
        constructor(containerOptions?: interfaces.ContainerOptions);
        load(...modules: interfaces.ContainerModule[]): void;
        loadAsync(...modules: interfaces.AsyncContainerModule[]): Promise<void>;
        unload(...modules: interfaces.ContainerModule[]): void;
        bind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T>;
        rebind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T>;
        unbind(serviceIdentifier: interfaces.ServiceIdentifier<any>): void;
        unbindAll(): void;
        isBound(serviceIdentifier: interfaces.ServiceIdentifier<any>): boolean;
        isBoundNamed(serviceIdentifier: interfaces.ServiceIdentifier<any>, named: string | number | symbol): boolean;
        isBoundTagged(serviceIdentifier: interfaces.ServiceIdentifier<any>, key: string | number | symbol, value: any): boolean;
        snapshot(): void;
        restore(): void;
        createChild(containerOptions?: interfaces.ContainerOptions): Container;
        applyMiddleware(...middlewares: interfaces.Middleware[]): void;
        applyCustomMetadataReader(metadataReader: interfaces.MetadataReader): void;
        get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T;
        getTagged<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, key: string | number | symbol, value: any): T;
        getNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T;
        getAll<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T[];
        getAllTagged<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, key: string | number | symbol, value: any): T[];
        getAllNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T[];
        resolve<T>(constructorFunction: interfaces.Newable<T>): T;
        private _getContainerModuleHelpersFactory();
        private _get<T>(avoidConstraints, isMultiInject, targetType, serviceIdentifier, key?, value?);
        private _planAndResolve<T>();
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class Lookup<T extends interfaces.Clonable<T>> implements interfaces.Lookup<T> {
        private _map;
        constructor();
        getMap(): Map<string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>, T[]>;
        add(serviceIdentifier: interfaces.ServiceIdentifier<any>, value: T): void;
        get(serviceIdentifier: interfaces.ServiceIdentifier<any>): T[];
        remove(serviceIdentifier: interfaces.ServiceIdentifier<any>): void;
        removeByCondition(condition: (item: T) => boolean): void;
        hasKey(serviceIdentifier: interfaces.ServiceIdentifier<any>): boolean;
        clone(): interfaces.Lookup<T>;
        traverse(func: (key: interfaces.ServiceIdentifier<any>, value: T[]) => void): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    type IteratorResult<T> = {
        value: T;
        done: false;
    } | {
        value: never;
        done: true;
    };
    interface Iterator<T> {
        next(value?: any): IteratorResult<T>;
        throw?(value: any): IteratorResult<T>;
        return?(value?: T): IteratorResult<T>;
    }
    interface Iterable<T> {
        "@@iterator"(): Iterator<T>;
    }
    interface IterableIterator<T> extends Iterator<T> {
        "@@iterator"(): IterableIterator<T>;
    }
    interface Map<K, V> extends Iterable<[K, V]> {
        size: number;
        has(key: K): boolean;
        get(key: K): V;
        set(key: K, value?: V): this;
        delete(key: K): boolean;
        clear(): void;
        keys(): IterableIterator<K>;
        values(): IterableIterator<V>;
        entries(): IterableIterator<[K, V]>;
        forEach(callback: (value: V, key: K, map: Map<K, V>) => any): void;
    }
    interface MapConstructor {
        new (): Map<any, any>;
        new <K, V>(): Map<K, V>;
        prototype: Map<any, any>;
    }
    let _Map: MapConstructor;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    namespace interfaces {
        type BindingScope = "Singleton" | "Transient" | "Request";
        type BindingType = "ConstantValue" | "Constructor" | "DynamicValue" | "Factory" | "Function" | "Instance" | "Invalid" | "Provider";
        type TargetType = "ConstructorArgument" | "ClassProperty" | "Variable";
        interface BindingScopeEnum {
            Request: interfaces.BindingScope;
            Singleton: interfaces.BindingScope;
            Transient: interfaces.BindingScope;
        }
        interface BindingTypeEnum {
            ConstantValue: interfaces.BindingType;
            Constructor: interfaces.BindingType;
            DynamicValue: interfaces.BindingType;
            Factory: interfaces.BindingType;
            Function: interfaces.BindingType;
            Instance: interfaces.BindingType;
            Invalid: interfaces.BindingType;
            Provider: interfaces.BindingType;
        }
        interface TargetTypeEnum {
            ConstructorArgument: interfaces.TargetType;
            ClassProperty: interfaces.TargetType;
            Variable: interfaces.TargetType;
        }
        type Newable<T> = new (...args: any[]) => T;
        interface Abstract<T> {
            prototype: T;
        }
        type ServiceIdentifier<T> = (string | symbol | Newable<T> | Abstract<T>);
        interface Clonable<T> {
            clone(): T;
        }
        interface Binding<T> extends Clonable<Binding<T>> {
            id: number;
            moduleId: string;
            activated: boolean;
            serviceIdentifier: ServiceIdentifier<T>;
            constraint: ConstraintFunction;
            dynamicValue: ((context: interfaces.Context) => T) | null;
            scope: BindingScope;
            type: BindingType;
            implementationType: Newable<T> | null;
            factory: FactoryCreator<any> | null;
            provider: ProviderCreator<any> | null;
            onActivation: ((context: interfaces.Context, injectable: T) => T) | null;
            cache: T | null;
        }
        type Factory<T> = (...args: any[]) => (((...args: any[]) => T) | T);
        type FactoryCreator<T> = (context: Context) => Factory<T>;
        type Provider<T> = (...args: any[]) => (((...args: any[]) => Promise<T>) | Promise<T>);
        type ProviderCreator<T> = (context: Context) => Provider<T>;
        interface NextArgs {
            avoidConstraints: boolean;
            contextInterceptor: ((contexts: Context) => Context);
            isMultiInject: boolean;
            targetType: TargetType;
            serviceIdentifier: interfaces.ServiceIdentifier<any>;
            key?: string | number | symbol;
            value?: any;
        }
        type Next = (args: NextArgs) => (any | any[]);
        type Middleware = (next: Next) => Next;
        type ContextInterceptor = (context: interfaces.Context) => interfaces.Context;
        interface Context {
            id: number;
            container: Container;
            plan: Plan;
            currentRequest: Request;
            addPlan(plan: Plan): void;
            setCurrentRequest(request: Request): void;
        }
        interface ReflectResult {
            [key: string]: Metadata[];
        }
        interface Metadata {
            key: string | number | symbol;
            value: any;
        }
        interface Plan {
            parentContext: Context;
            rootRequest: Request;
        }
        interface QueryableString {
            startsWith(searchString: string): boolean;
            endsWith(searchString: string): boolean;
            contains(searchString: string): boolean;
            equals(compareString: string): boolean;
            value(): string;
        }
        type ResolveRequestHandler = (request: interfaces.Request) => any;
        type RequestScope = Map<any, any> | null;
        interface Request {
            id: number;
            serviceIdentifier: ServiceIdentifier<any>;
            parentContext: Context;
            parentRequest: Request | null;
            childRequests: Request[];
            target: Target;
            bindings: Binding<any>[];
            requestScope: RequestScope;
            addChildRequest(serviceIdentifier: ServiceIdentifier<any>, bindings: (Binding<any> | Binding<any>[]), target: Target): Request;
        }
        interface Target {
            id: number;
            serviceIdentifier: ServiceIdentifier<any>;
            type: TargetType;
            name: QueryableString;
            metadata: Metadata[];
            getNamedTag(): interfaces.Metadata | null;
            getCustomTags(): interfaces.Metadata[] | null;
            hasTag(key: string | number | symbol): boolean;
            isArray(): boolean;
            matchesArray(name: interfaces.ServiceIdentifier<any>): boolean;
            isNamed(): boolean;
            isTagged(): boolean;
            isOptional(): boolean;
            matchesNamedTag(name: string): boolean;
            matchesTag(key: string | number | symbol): (value: any) => boolean;
        }
        interface ContainerOptions {
            autoBindInjectable?: boolean;
            defaultScope?: BindingScope;
            skipBaseClassChecks?: boolean;
        }
        interface Container {
            id: number;
            parent: Container | null;
            options: ContainerOptions;
            bind<T>(serviceIdentifier: ServiceIdentifier<T>): BindingToSyntax<T>;
            rebind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T>;
            unbind(serviceIdentifier: ServiceIdentifier<any>): void;
            unbindAll(): void;
            isBound(serviceIdentifier: ServiceIdentifier<any>): boolean;
            isBoundNamed(serviceIdentifier: ServiceIdentifier<any>, named: string | number | symbol): boolean;
            isBoundTagged(serviceIdentifier: ServiceIdentifier<any>, key: string | number | symbol, value: any): boolean;
            get<T>(serviceIdentifier: ServiceIdentifier<T>): T;
            getNamed<T>(serviceIdentifier: ServiceIdentifier<T>, named: string | number | symbol): T;
            getTagged<T>(serviceIdentifier: ServiceIdentifier<T>, key: string | number | symbol, value: any): T;
            getAll<T>(serviceIdentifier: ServiceIdentifier<T>): T[];
            getAllTagged<T>(serviceIdentifier: ServiceIdentifier<T>, key: string | number | symbol, value: any): T[];
            getAllNamed<T>(serviceIdentifier: ServiceIdentifier<T>, named: string | number | symbol): T[];
            resolve<T>(constructorFunction: interfaces.Newable<T>): T;
            load(...modules: ContainerModule[]): void;
            loadAsync(...modules: AsyncContainerModule[]): Promise<void>;
            unload(...modules: ContainerModule[]): void;
            applyCustomMetadataReader(metadataReader: MetadataReader): void;
            applyMiddleware(...middleware: Middleware[]): void;
            snapshot(): void;
            restore(): void;
            createChild(): Container;
        }
        type Bind = <T>(serviceIdentifier: ServiceIdentifier<T>) => BindingToSyntax<T>;
        type Rebind = <T>(serviceIdentifier: ServiceIdentifier<T>) => BindingToSyntax<T>;
        type Unbind = <T>(serviceIdentifier: ServiceIdentifier<T>) => void;
        type IsBound = <T>(serviceIdentifier: ServiceIdentifier<T>) => boolean;
        interface ContainerModule {
            id: number;
            registry: ContainerModuleCallBack;
        }
        interface AsyncContainerModule {
            id: number;
            registry: AsyncContainerModuleCallBack;
        }
        type ContainerModuleCallBack = (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => void;
        type AsyncContainerModuleCallBack = (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => Promise<void>;
        interface ContainerSnapshot {
            bindings: Lookup<Binding<any>>;
            middleware: Next | null;
        }
        interface Lookup<T> extends Clonable<Lookup<T>> {
            add(serviceIdentifier: ServiceIdentifier<any>, value: T): void;
            getMap(): Map<interfaces.ServiceIdentifier<any>, T[]>;
            get(serviceIdentifier: ServiceIdentifier<any>): T[];
            remove(serviceIdentifier: interfaces.ServiceIdentifier<any>): void;
            removeByCondition(condition: (item: T) => boolean): void;
            hasKey(serviceIdentifier: ServiceIdentifier<any>): boolean;
            clone(): Lookup<T>;
            traverse(func: (key: interfaces.ServiceIdentifier<any>, value: T[]) => void): void;
        }
        interface BindingOnSyntax<T> {
            onActivation(fn: (context: Context, injectable: T) => T): BindingWhenSyntax<T>;
        }
        interface BindingWhenSyntax<T> {
            when(constraint: (request: Request) => boolean): BindingOnSyntax<T>;
            whenTargetNamed(name: string | number | symbol): BindingOnSyntax<T>;
            whenTargetIsDefault(): BindingOnSyntax<T>;
            whenTargetTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>;
            whenInjectedInto(parent: (Function | string)): BindingOnSyntax<T>;
            whenParentNamed(name: string | number | symbol): BindingOnSyntax<T>;
            whenParentTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>;
            whenAnyAncestorIs(ancestor: (Function | string)): BindingOnSyntax<T>;
            whenNoAncestorIs(ancestor: (Function | string)): BindingOnSyntax<T>;
            whenAnyAncestorNamed(name: string | number | symbol): BindingOnSyntax<T>;
            whenAnyAncestorTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>;
            whenNoAncestorNamed(name: string | number | symbol): BindingOnSyntax<T>;
            whenNoAncestorTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>;
            whenAnyAncestorMatches(constraint: (request: Request) => boolean): BindingOnSyntax<T>;
            whenNoAncestorMatches(constraint: (request: Request) => boolean): BindingOnSyntax<T>;
        }
        interface BindingWhenOnSyntax<T> extends BindingWhenSyntax<T>, BindingOnSyntax<T> {
        }
        interface BindingInSyntax<T> {
            inSingletonScope(): BindingWhenOnSyntax<T>;
            inTransientScope(): BindingWhenOnSyntax<T>;
            inRequestScope(): BindingWhenOnSyntax<T>;
        }
        interface BindingInWhenOnSyntax<T> extends BindingInSyntax<T>, BindingWhenOnSyntax<T> {
        }
        interface BindingToSyntax<T> {
            to(constructor: new (...args: any[]) => T): BindingInWhenOnSyntax<T>;
            toSelf(): BindingInWhenOnSyntax<T>;
            toConstantValue(value: T): BindingWhenOnSyntax<T>;
            toDynamicValue(func: (context: Context) => T): BindingInWhenOnSyntax<T>;
            toConstructor<T2>(constructor: Newable<T2>): BindingWhenOnSyntax<T>;
            toFactory<T2>(factory: FactoryCreator<T2>): BindingWhenOnSyntax<T>;
            toFunction(func: T): BindingWhenOnSyntax<T>;
            toAutoFactory<T2>(serviceIdentifier: ServiceIdentifier<T2>): BindingWhenOnSyntax<T>;
            toProvider<T2>(provider: ProviderCreator<T2>): BindingWhenOnSyntax<T>;
            toService(service: ServiceIdentifier<T>): void;
        }
        interface ConstraintFunction extends Function {
            metaData?: Metadata;
            (request: Request | null): boolean;
        }
        interface MetadataReader {
            getConstructorMetadata(constructorFunc: Function): ConstructorMetadata;
            getPropertiesMetadata(constructorFunc: Function): MetadataMap;
        }
        interface MetadataMap {
            [propertyNameOrArgumentIndex: string]: Metadata[];
        }
        interface ConstructorMetadata {
            compilerGeneratedMetadata: Function[] | undefined;
            userGeneratedMetadata: MetadataMap;
        }
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class Context implements interfaces.Context {
        id: number;
        container: interfaces.Container;
        plan: interfaces.Plan;
        currentRequest: interfaces.Request;
        constructor(container: interfaces.Container);
        addPlan(plan: interfaces.Plan): void;
        setCurrentRequest(currentRequest: interfaces.Request): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class MetadataReader implements interfaces.MetadataReader {
        getConstructorMetadata(constructorFunc: Function): interfaces.ConstructorMetadata;
        getPropertiesMetadata(constructorFunc: Function): interfaces.MetadataMap;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class Metadata implements interfaces.Metadata {
        key: string | number | symbol;
        value: any;
        constructor(key: string | number | symbol, value: any);
        toString(): string;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class Plan implements interfaces.Plan {
        parentContext: interfaces.Context;
        rootRequest: interfaces.Request;
        constructor(parentContext: interfaces.Context, rootRequest: interfaces.Request);
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function getBindingDictionary(cntnr: any): interfaces.Lookup<interfaces.Binding<any>>;
    function plan(metadataReader: interfaces.MetadataReader, container: interfaces.Container, isMultiInject: boolean, targetType: interfaces.TargetType, serviceIdentifier: interfaces.ServiceIdentifier<any>, key?: string | number | symbol, value?: any, avoidConstraints?: boolean): interfaces.Context;
    function createMockRequest(container: interfaces.Container, serviceIdentifier: interfaces.ServiceIdentifier<any>, key: string | number | symbol, value: any): interfaces.Request;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class QueryableString implements interfaces.QueryableString {
        private str;
        constructor(str: string);
        startsWith(searchString: string): boolean;
        endsWith(searchString: string): boolean;
        contains(searchString: string): boolean;
        equals(compareString: string): boolean;
        value(): string;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function getDependencies(metadataReader: interfaces.MetadataReader, func: Function): interfaces.Target[];
    function getBaseClassDependencyCount(metadataReader: interfaces.MetadataReader, func: Function): number;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class Request implements interfaces.Request {
        id: number;
        serviceIdentifier: interfaces.ServiceIdentifier<any>;
        parentContext: interfaces.Context;
        parentRequest: interfaces.Request | null;
        bindings: interfaces.Binding<any>[];
        childRequests: interfaces.Request[];
        target: interfaces.Target;
        requestScope: interfaces.RequestScope;
        constructor(serviceIdentifier: interfaces.ServiceIdentifier<any>, parentContext: interfaces.Context, parentRequest: interfaces.Request | null, bindings: (interfaces.Binding<any> | interfaces.Binding<any>[]), target: interfaces.Target);
        addChildRequest(serviceIdentifier: interfaces.ServiceIdentifier<any>, bindings: (interfaces.Binding<any> | interfaces.Binding<any>[]), target: interfaces.Target): interfaces.Request;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class Target implements interfaces.Target {
        id: number;
        type: interfaces.TargetType;
        serviceIdentifier: interfaces.ServiceIdentifier<any>;
        name: interfaces.QueryableString;
        metadata: Metadata[];
        constructor(type: interfaces.TargetType, name: string, serviceIdentifier: interfaces.ServiceIdentifier<any>, namedOrTagged?: (string | Metadata));
        hasTag(key: string): boolean;
        isArray(): boolean;
        matchesArray(name: interfaces.ServiceIdentifier<any>): boolean;
        isNamed(): boolean;
        isTagged(): boolean;
        isOptional(): boolean;
        getNamedTag(): interfaces.Metadata | null;
        getCustomTags(): interfaces.Metadata[] | null;
        matchesNamedTag(name: string): boolean;
        matchesTag(key: string): (value: any) => boolean;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function resolveInstance(constr: interfaces.Newable<any>, childRequests: interfaces.Request[], resolveRequest: interfaces.ResolveRequestHandler): any;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function resolve<T>(context: interfaces.Context): T;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class BindingInSyntax<T> implements interfaces.BindingInSyntax<T> {
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        inRequestScope(): interfaces.BindingWhenOnSyntax<T>;
        inSingletonScope(): interfaces.BindingWhenOnSyntax<T>;
        inTransientScope(): interfaces.BindingWhenOnSyntax<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class BindingInWhenOnSyntax<T> implements interfaces.BindingInSyntax<T>, interfaces.BindingWhenSyntax<T>, interfaces.BindingOnSyntax<T> {
        private _bindingInSyntax;
        private _bindingWhenSyntax;
        private _bindingOnSyntax;
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        inRequestScope(): interfaces.BindingWhenOnSyntax<T>;
        inSingletonScope(): interfaces.BindingWhenOnSyntax<T>;
        inTransientScope(): interfaces.BindingWhenOnSyntax<T>;
        when(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenTargetNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenTargetIsDefault(): interfaces.BindingOnSyntax<T>;
        whenTargetTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenInjectedInto(parent: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenParentNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenParentTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenNoAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenNoAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenNoAncestorTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenNoAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        onActivation(handler: (context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class BindingOnSyntax<T> implements interfaces.BindingOnSyntax<T> {
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        onActivation(handler: (context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class BindingToSyntax<T> implements interfaces.BindingToSyntax<T> {
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        to(constructor: new (...args: any[]) => T): interfaces.BindingInWhenOnSyntax<T>;
        toSelf(): interfaces.BindingInWhenOnSyntax<T>;
        toConstantValue(value: T): interfaces.BindingWhenOnSyntax<T>;
        toDynamicValue(func: (context: interfaces.Context) => T): interfaces.BindingInWhenOnSyntax<T>;
        toConstructor<T2>(constructor: interfaces.Newable<T2>): interfaces.BindingWhenOnSyntax<T>;
        toFactory<T2>(factory: interfaces.FactoryCreator<T2>): interfaces.BindingWhenOnSyntax<T>;
        toFunction(func: T): interfaces.BindingWhenOnSyntax<T>;
        toAutoFactory<T2>(serviceIdentifier: interfaces.ServiceIdentifier<T2>): interfaces.BindingWhenOnSyntax<T>;
        toProvider<T2>(provider: interfaces.ProviderCreator<T2>): interfaces.BindingWhenOnSyntax<T>;
        toService(service: string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>): void;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class BindingWhenOnSyntax<T> implements interfaces.BindingWhenSyntax<T>, interfaces.BindingOnSyntax<T> {
        private _bindingWhenSyntax;
        private _bindingOnSyntax;
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        when(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenTargetNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenTargetIsDefault(): interfaces.BindingOnSyntax<T>;
        whenTargetTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenInjectedInto(parent: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenParentNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenParentTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenNoAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenNoAncestorNamed(name: string): interfaces.BindingOnSyntax<T>;
        whenNoAncestorTagged(tag: string, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenNoAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        onActivation(handler: (context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    class BindingWhenSyntax<T> implements interfaces.BindingWhenSyntax<T> {
        private _binding;
        constructor(binding: interfaces.Binding<T>);
        when(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenTargetNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;
        whenTargetIsDefault(): interfaces.BindingOnSyntax<T>;
        whenTargetTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;
        whenInjectedInto(parent: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenParentNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;
        whenParentTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenNoAncestorIs(ancestor: (Function | string)): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;
        whenNoAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;
        whenNoAncestorTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;
        whenAnyAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
        whenNoAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
    }
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    const traverseAncerstors: (request: interfaces.Request, constraint: interfaces.ConstraintFunction) => boolean;
    const taggedConstraint: (key: PropertyKey) => (value: any) => interfaces.ConstraintFunction;
    const namedConstraint: (value: any) => interfaces.ConstraintFunction;
    const typeConstraint: (type: string | Function) => (request: interfaces.Request) => boolean;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    const multiBindToService: (container: interfaces.Container) => (service: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>) => (...types: (string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>)[]) => void;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function isStackOverflowExeption(error: Error): boolean;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function id(): number;
}
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-16
*************************************************/
declare namespace inversify {
    function getServiceIdentifierAsString(serviceIdentifier: interfaces.ServiceIdentifier<any>): string;
    function listRegisteredBindingsForServiceIdentifier(container: interfaces.Container, serviceIdentifier: string, getBindings: <T>(container: interfaces.Container, serviceIdentifier: interfaces.ServiceIdentifier<T>) => interfaces.Binding<T>[]): string;
    function circularDependencyToException(request: interfaces.Request): void;
    function listMetadataForTarget(serviceIdentifierString: string, target: interfaces.Target): string;
    function getFunctionName(v: any): string;
}
