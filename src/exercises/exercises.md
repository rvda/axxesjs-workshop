# AxxesJS Workshop - Exercises

## Component

### Exercise 1:
    - Make sure the WorkshopComponent is rendered to the body of the document.
    - Take a look at the tag property of the Component class and the getElementName function.
    - Only make changes in the render function in renderer.ts

## Template

### Exercise 2:
    - Now make sure the template inside of the WorkshopComponent is rendered to the body of the document.
    - Only make changes in the processTemplate function in renderer.ts
### Exercise 3:
    - Render the date of the workshop to the template.
    - You can make your changes in the processTemplateVariables function in renderer.ts.
    - Make sure to call that function from the processTemplate function.
### Exercise 4
    - Render the list of participants to the template.
    - Check the processTemplateForLoops function in renderer.ts and what it does.
    - Make sure to call that function at the correct place.
### Exercise 5
    - Notice the [if] attribute on the ol element in the template.
    - The list should only be rendered if showParticipants is true
    - Check the processTemplateIfStatements function in renderer.ts and add your code there so that the renderer correctly handles if statements.
    - Make sure to call that function at the correct place.
### Exercise 6
    - You'll notice that there is also an add-participants element in the template.
    - Make sure this component is also rendered.
    - expand the processCustomElements function in renderer.ts to handle custom elements.
    - Make sure to call that function at the correct place.

## Life Cycle Methods

### Exercise 7
    - Notice the WorkshopComponent has some functions it inherits from the Component class: beforeRender, afterRender.
    - Make sure these functions are called at the correct time in renderer.ts.
    - The beforeRender function should set an interval that updates the time every second. Check your console to see if it works. (you can remove the console.log afterwards to stop it from spamming)
    - The afterRender function adds a participant. Check your console to see if it works

## Data binding / Change Detection

### Exercise 8
    - We already can display data from the component in the template, but when we make changes (for example the time and the participants, it doesn't update the data in the dom.
    - Make sure the data is updated in the dom when the data changes by updating the WatchProperties decorator function in observe.ts.

## State Management

### Exercise 9
    - We want to be able to add participants to the list.
    - To do this we can use the WorkshopService to be the owner of the data
    - Both components have an instance of the WorkshopService and listen to changes in the participants data.
    - Update the state function so that it keeps track of the latest value, any functions that listen to that value and make sure those functions are called whenever the value is updated

### Exercise 10
    - However, we notice the list of participants is not updated when we add a participant.
    - This is because both components have a different instance of the WorkshopService.
    - Update the Service decorator function so that it makes sure the WorkshopService is a singleton.
    - When you now add a participant, it should immediately appear in the list.

## Routing

### Exercise 11
    - We want to be able to navigate to the content component by clicking the anchor element.
    - Update the Router class so that it can handle url changes.
    - Make sure the correct component is rendered when you navigate to the content route.

### Exercise 12
    - We want to be able to navigate back to the home component now.
    - The content component has a button that should navigate back to the home component. Update the navigate function in the router.

### Exercise 13
    - Now we want to be able to navigate to the participant component by clicking the anchor element.
    - Notice that the participant component has a parameter in the url.
    - Update the extractRouteParams function in the Router class so that it can handle url changes with parameters.
    - Make sure the correct component is rendered when you navigate to the content route.
    - Now update the beforeRender function in the participant component so that it displays the correct participant based on the id in the url.

### Exercise 14
    - The participant component should also be able to handle query parameters. We want to add a message parameter to the url so that we can display a message on the page.
    - Update the get queryParams function in the Router class so that it can handle url changes with query parameters.
    - Now update the beforeRender function in the participant component so that it displays the correct message based on the message query parameter in the url.
