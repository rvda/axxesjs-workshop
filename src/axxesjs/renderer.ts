import {Component} from "./component";

/**
 * Renders a given component into the DOM, optionally within a specified parent HTML element.
 *
 * @param {Component} component - The component object to be rendered. It should have the following properties:
 *  - tag: The name of the HTML element (e.g., 'div', 'span').
 *  - beforeRender: A method that gets called before the rendering process begins.
 *  - node: A property where the created HTML element will be assigned.
 *  - children: An array of child components.
 *  - afterRender: A method that gets called after the component is appended to the parent.
 *
 * @param {HTMLElement} [parent] - Optional. The parent HTML element where the new component will be appended.
 *                                  If not provided, the component is created but not appended to the DOM.
 */
const render = (component: Component, parent?: HTMLElement) => {

    // Create a new HTML element based on the component's tag name
    //TODO: Exercise 1

    // Assign the created element to the component's node property
    //TODO: Exercise 1

    // Process any template/logic required for the component (assuming a helper function)
    processTemplate(component);

    // If a parent HTMLElement is provided
    if (parent) {
        // Append the newly created component node to the parent
        //TODO: Exercise 1
    }
}


const processTemplate = (component: Component): string =>  {
    let template = component.template;
    if (component?.node) {

        //TODO: Exercise 2
    }

    return template;
}

/**
 * Processes a template string, replacing 'for' loop structures with rendered content.
 *
 * This function searches for patterns like <tagName [for]="item in items">...</tagName>
 * and expands them based on the provided component's data.
 *
 * @param {string} template - The template string containing potential 'for' loop structures.
 * @param {Component} component - The component object which contains the data arrays referenced in the 'for' loops.
 *
 * @returns {string} The processed template with 'for' loop structures expanded.
 */
const processTemplateForLoops = (template: string, component: Component): string => {
    // Regular expression to identify the 'for' loop structures in the template
    const regex = /<(\w+?) \[for\]="(.*?) in (.*?)">([\s\S]*?)<\/\1>/g;

    let result = template;

    // Regular expression to identify and replace property bindings like {{propName}}
    const propRegex = /{{([^}]+)}}/g;

    let match;
    while ((match = regex.exec(template)) !== null) {
        // Destructure the matched elements for clarity
        const [fullMatch, tagName, iteratorVariable, arrayName, content] = match;

        // Retrieve the data array from the component using the arrayName
        const dataArray = component[arrayName];
        if (dataArray && Array.isArray(dataArray)) {
            // Map each item in the data array to the content within the loop structure
            const replacement = dataArray.map(item => {
                let replacedContent = content.replace(propRegex, (_, expression) => {
                    // Evaluate the expression using the current 'item' as the context
                    const value = new Function(iteratorVariable, `return ${expression}`)(item);
                    // Return the evaluated value, or an empty string if it's undefined
                    return value !== undefined ? value : '';
                });

                // Return the replaced content wrapped in the tagName
                return `<${tagName}>${replacedContent}</${tagName}>`;
            }).join('');

            // Replace the 'for' loop structure in the result with the expanded content
            result = result.replace(fullMatch, replacement);
        }
    }

    return result;
}


/**
 * Processes a template string, replacing '[if]' directive structures with the appropriate content.
 *
 * This function looks for patterns like <tagName [if]="condition">...</tagName>
 * and includes or excludes the content based on the evaluation of the provided condition.
 *
 * @param {string} template - The template string containing potential '[if]' directive structures.
 * @param {Component} component - The component object which provides the data context for evaluating conditions.
 *
 * @returns {string} The processed template with '[if]' directive structures handled.
 */
const processTemplateIfStatements = (template: string, component: Component): string => {
    // Regular expression to identify the '[if]' directive structures in the template
    const regex = /<(\w+?) \[if\]="(.*?)">([^]*?)<\/\1>/g;

    let result = template;
    let match;

    while ((match = regex.exec(template)) !== null) {
        // Destructure the matched elements for clarity
        const [fullMatch, tagName, condition, content] = match;

        // Evaluate the condition using the component's data as context
        const conditionResult = new Function('data', `with(data) { return ${condition} }`)(component);

        // If the condition evaluates to true, include the content, otherwise exclude it
        //TODO: Exercise 5

        // Replace the '[if]' directive structure in the result with the determined content
        //TODO: Exercise 5
    }

    return result;
}


/**
 * Processes a template string, replacing variable placeholders with their actual values.
 *
 * This function searches for patterns like {{variableName}} and replaces them
 * with the corresponding value from the provided component's data.
 *
 * @param {string} template - The template string containing potential variable placeholders.
 * @param {Component} component - The component object which provides the data context for the variables.
 *
 * @returns {string} The processed template with variable placeholders replaced by their actual values.
 */
const processTemplateVariables = (template: string, component: Component): string => {
    // Regular expression to identify variable placeholders in the template
    const regex = /{{(.*?)}}/g;

    let result = template;
    let match;

    while ((match = regex.exec(template)) !== null) {
        // Destructure the matched elements for clarity
        const [fullMatch, variableName] = match;

        // Retrieve the value of the variable using the component's data as context
        const replacementValue = new Function('data', `with(data) { return ${variableName} }`)(component);

        // Replace the variable placeholder in the result with its actual value
        //TODO: Exercise 3
    }

    return result;
}

/**
 * Processes a template string, handling custom HTML elements by rendering their content.
 *
 * This function identifies custom HTML element tags, instantiates the associated
 * component from a ComponentRegistry, renders the child component, and then replaces
 * the custom tag in the template with the child component's template content.
 *
 * @param {string} template - The template string potentially containing custom HTML element tags.
 * @param {Component} component - The parent component object in which child components will be instantiated and managed.
 *
 * @returns {string} The processed template with custom elements replaced by their rendered content.
 */
const processCustomElements = (template: string, component: Component): string => {
    // Reset the children array on the component
    component.children = [];

    // Regular expression to identify custom HTML element tags in the template
    const regex = /<([a-zA-Z0-9-]+)(?:\s|>)/g;

    let result = template;
    let match;

    while ((match = regex.exec(template)) !== null) {
        // Destructure the matched elements for clarity
        const [fullMatch, tagName] = match;

        // Check if the identified tag name exists in the ComponentRegistry (indicating it's a custom element)
        const isCustomElement = ComponentRegistry.hasOwnProperty(tagName);
        if (isCustomElement) {
            // Retrieve the associated component class from the ComponentRegistry
            const ChildComponentClass = ComponentRegistry[tagName];

            // Instantiate the child component
            //TODO: Exercise 6

            // Render the child component
            //TODO: Exercise 6

            // Replace the custom element tag in the result with the child component's node's outerHTML content
            //TODO: Exercise 6

            // Add the child component instance to the parent component's children array
            //TODO: Exercise 6

        }
    }

    return result;
}


/**
 * ComponentRegistry is an object that serves as a lookup table for custom component classes.
 * It maps a custom HTML element tag to its associated component class.
 */
const ComponentRegistry: { [key: string]: new () => Component } = {};

/**
 * Registers a component class in the ComponentRegistry.
 *
 * This function instantiates the provided component class to retrieve its custom tag name.
 * It then adds an entry to the ComponentRegistry, mapping the tag name to the component class.
 *
 * @param {new () => Component} componentClass - The component class to be registered.
 */
const registerComponent = (componentClass: new () => Component) => {
    // Instantiate the provided component class
    const instance = new componentClass();

    // Add the component class to the ComponentRegistry using its tag as the key
    ComponentRegistry[instance.tag] = componentClass;
}



export {render, processTemplate, registerComponent};
