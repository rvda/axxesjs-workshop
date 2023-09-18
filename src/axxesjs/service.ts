// Symbol used as a unique key to store and retrieve the singleton instance of the service.
export const SERVICE_KEY = Symbol();

/**
 * Defines the structure of a Service.
 *
 * A Service is a class enhanced with a special property that holds the singleton instance of the service.
 *
 * @template T A class type.
 *
 * @type {Object}
 */
export type Service<T extends new (...args: any[]) => any> = T & {
    [SERVICE_KEY]: T extends new (...args: any[]) => infer I ? I : never
};

/**
 * Creates a proxy around a class to ensure that it behaves as a singleton.
 *
 * This function uses the `Proxy` object to control and limit the instantiation of the class.
 * Only one instance of the class will be created, and any subsequent instantiation attempts will
 * return the previously created instance.
 *
 * @template T A class type.
 *
 * @param {T} type - The class to be made into a singleton.
 * @returns {Proxy} A proxy around the given class that ensures it behaves as a singleton.
 */
export const Service = <T extends new (...args: any[]) => any>(type: T) =>
    new Proxy(type, {
        // Hijack the constructor
        construct(target: Service<T>, argsList, newTarget) {
            // Skip the proxy for subclasses of our target class
            if (target.prototype !== newTarget.prototype) {
                return Reflect.construct(target, argsList, newTarget);
            }
            // If our target class does not have an instance, create one
            if (!target[SERVICE_KEY]) {
                target[SERVICE_KEY] = Reflect.construct(target, argsList, newTarget);
            }
            // Return the previously created instance
            return target[SERVICE_KEY];
        }
    });
