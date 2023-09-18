import { processTemplate } from "./renderer";

/**
 * Base abstract class representing a UI component.
 *
 * This class provides foundational functionality and structure for UI components,
 * such as a template, node representation, lifecycle hooks, and utility methods.
 */
export abstract class Component {

    /** Component's tag name derived from the constructor's name, used for rendering. */
    readonly tag = this.getElementName(this.constructor.name);

    /** Template string of the component's content. */
    template: string;

    /** DOM node representation of the component. */
    node: HTMLElement;

    /** Children components nested within this component. */
    children: Component[] = [];

    /**
     * Derives an element name from the provided class name by converting camelCase to kebab-case.
     * For example, 'SomeComponent' becomes 'some-component'.
     *
     * @param {string} name - The class name to convert.
     * @returns {string} The derived element name in kebab-case.
     */
    private getElementName(name: string): string {
        return name.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
    }

    /**
     * Rerenders the component by processing its template.
     */
    onUpdate(): void {
        processTemplate(this);
    }

    /**
     * Lifecycle hook that's called before the component is rendered.
     */
    public beforeRender(): void {};

    /**
     * Lifecycle hook that's called after the component has been rendered.
     */
    public afterRender(): void {};

    /**
     * Lifecycle hook that's called when the component is being destroyed.
     */
    public onDestroy(): void {};
}
