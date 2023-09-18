/**
 * Reactive state class that represents a value and allows listeners to subscribe
 * to changes in that value.
 *
 * @template T The type of the state value.
 */
export class State<T> {

    /** The current value of the state. */
    private _value: T;

    /** An array of listener functions that will be called whenever the value changes. */
    private _listeners: Array<(v: T) => void> = [];

    /**
     * Constructs a new State object with the provided initial value.
     *
     * @param {T} initialValue - The initial value of the state.
     * @param {(v: T) => void} [listener] - An optional listener function to be added initially.
     */
    constructor(initialValue: T, listener?: (v: T) => void) {
        this._value = initialValue;
        if (listener) {
            this._listeners = [listener];
        }
    }

    /**
     * Gets the current value of the state.
     *
     * @returns {T} The current value.
     */
    get value():  T {
        return this._value;
    }

    /**
     * Sets a new value for the state and notifies all registered listeners
     * with the new value.
     *
     * @param {T} value - The new value to be set.
     */
    set value(value: T) {
        this._value = value;
        //TODO: Exercise 9
    }

    /**
     * Registers a listener function that will be called whenever the value changes.
     * The listener is also called immediately with the current value.
     *
     * @param {(v: T) => void} listener - The listener function.
     */
    listen(listener: (v: T) => void) {
        if (this._listeners.indexOf(listener) === -1) {
            //TODO: Exercise 9
        }
        listener(this._value);
    }
}
