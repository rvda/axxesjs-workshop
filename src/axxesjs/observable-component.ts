import 'reflect-metadata';
import { Component } from "./component";
import { registerComponent } from "./renderer";

/**
 * Decorator that enhances a Component class to watch for property changes.
 *
 * When any property (except for 'node') of a decorated Component instance is modified,
 * the component is re-rendered if the new value differs from the old value.
 *
 * @param {T} OriginalConstructor - The original Component class constructor.
 * @returns {T} A new constructor with property-watching capabilities.
 */
export function ObservableComponent<T extends { new(...args: any[]): Component }>(OriginalConstructor: T) {
    // New constructor that wraps instances of the original constructor with a proxy
    const NewConstructor: any = function (...args: any[]) {
        const instance = new OriginalConstructor(...args);
        return new Proxy(instance, {
            set: (target, property, value) => {
                const oldValue = target[property];

                const result = Reflect.set(target, property, value);
                // If the value has changed (and the property is not 'node'), trigger a re-render
                if (property !== 'node' && value !== oldValue) {
                    target.onUpdate();
                }
                return result;
            }
        });
    }

    // Register the new constructor with the renderer
    registerComponent(NewConstructor);

    // Ensure the new constructor retains the prototype of the original constructor
    NewConstructor.prototype = OriginalConstructor.prototype;

    return NewConstructor as any as T;
}
