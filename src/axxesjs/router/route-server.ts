import {State} from "../state/state";

/**
 * A singleton class responsible for managing routing mechanisms
 * in a single-page application environment.
 */
export class RouteServer {

    /** Reference to the browser's History API. */
    history: History;

    /** Reference to the browser's Location object. */
    location: Location;

    /** Base path for routing, defaults to root. */
    root: string;

    /** A map storing route parameters. */
    readonly routeParams = new Map<string, string>();

    /** Internal reactive state object representing the current path. */
    private _currentPath = new State('');

    /** Singleton instance of the `RouteServer`. */
    private static _instance: RouteServer;

    /**
     * Private constructor to ensure the singleton nature of the class.
     */
    private constructor() {
        this.history = window.history;
        this.location = window.location;
        this.root = '/';
        this._currentPath.value = this.currentPath;

        // Update the reactive state object `_currentPath` whenever
        // the browser's history state changes.
        const path = this._currentPath;
        window.addEventListener("popstate", function () {
            path.value = window.location.pathname;
        });
    }

    /**
     * Getter for the reactive state object representing the current path.
     *
     * @returns {State<string>} A reactive state object representing the current path.
     */
    get currentPath$() {
        return this._currentPath;
    }

    /**
     * Getter for the current browser path.
     *
     * @returns {string} The current browser's path.
     */
    get currentPath() {
        return window.location?.pathname;
    }

    /**
     * Static getter to access the singleton instance of the `RouteServer`.
     * If an instance doesn't exist, it creates one.
     *
     * @returns {RouteServer} The singleton instance of the `RouteServer`.
     */
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

