import {Component, Router} from "@axxesJS";

export class ContentComponent extends Component {
    template = `
        <h1>Content</h1>
        <h2>Intro</h2>
        <h2>Some boring theoretical stuff</h2>
        <h2>Lunch</h2>
        <h2>Exercises</h2>
        <h2>End</h2>
        <button>Back</button>
    `;

    router = new Router();

    afterRender() {
        const button = document.body.querySelector('button');
        button.addEventListener('click', () => {
            this.router.navigate('/');
        });
    }
}
