import {RouteServer} from "./route-server";
import {Component} from "../component";
import {render} from "../renderer";
import {Service} from "../service";


/**
 * The Router class extends the basic Component to offer routing capabilities.
 * It manages navigation between different routes and handles rendering of
 * components based on the active route.
 *
 * The `@Service` decorator implies that this class is provided as a singleton
 * service throughout the application.
 */
@Service
export class Router extends Component {

    /** A reference to the route server instance which provides route management capabilities. */
    private routeServer: RouteServer;

    /** An array of route configurations, each containing a path and its corresponding component. */
    private routes: {path: string, component: FunctionConstructor}[] = [];

    /** The current active route. */
    private currentRoute: {path: string, component: any};

    constructor() {
        super();
        this.routeServer = RouteServer.Instance;
        this.listener();
    }

    /**
     * Registers a component with a specified path for routing.
     *
     * @param path - The URL path associated with the component.
     * @param component - The component to be rendered when the specified path is accessed.
     * @returns {Router} - Returns the Router instance to allow chaining.
     */
    withRouteComponent(path: string, component: any): Router {
        this.routes.push({ path, component});
        this.switchRoute(window.location?.pathname);
        return this;
    }

    /** Listens for changes in the current path and triggers route switching accordingly. */
    private listener() {
        this.routeServer.currentPath$.listen((path) => {
            //TODO: Exercise 11
        });
    }

    /**
     * Determines which route should be active based on the given path.
     * Renders the associated component if a matching route is found.
     *
     * @param path - The path to determine the route.
     */
    private switchRoute(path: string) {
        if (this.routes) {
            const route = this.routes.find((route) => this.comparePaths(path, route.path));
            if (route && route !== this.currentRoute) {
                this.currentRoute = route;
                const page = new route.component();
                if  (page instanceof Component) {
                    this.routeServer.routeParams.clear();
                    this.extractRouteParams(path, route.path);
                    //TODO: Exercise 11
                }
            }
        }
    }

    /**
     * Extracts route parameters based on the current path and the matched route.
     *
     * @param path - The current path.
     * @param route - The matched route path.
     */
    private extractRouteParams(path: string, route: string) {
        const pathParts = path.split('/');
        const routeParts = route.split('/');
        if (pathParts.length === routeParts.length) {
            for (let i = 0; i < pathParts.length; i++) {
                if (pathParts[i] !== routeParts[i]) {
                    //TODO: Exercise 13
                }
            }
        }
    }

    /**
     * Compares a given path to a route to determine if they match.
     *
     * @param path - The path to compare.
     * @param route - The route to compare against.
     * @returns {boolean} - Returns true if the path matches the route, otherwise false.
     */
    private comparePaths(path: string, route: string): boolean {
        const pathParts = path.split('/');
        const routeParts = route.split('/');
        if (pathParts.length === routeParts.length) {
            for (let i = 0; i < pathParts.length; i++) {
                if (pathParts[i] !== routeParts[i]) {
                    if (!routeParts[i].startsWith(':')) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }

    /** Getter for retrieving the query parameters of the current URL. */
    get queryParams(): URLSearchParams {
        //TODO: Exercise 14
    }

    /** Getter for retrieving the route parameters of the current URL. */
    get routeParams(): Map<string, string> {
        //TODO: Exercise 13
    }

    /**
     * Navigates to the given URL.
     *
     * @param url - The URL to navigate to.
     */
    navigate(url: string) {
        //TODO: Exercise 12
    }
}

