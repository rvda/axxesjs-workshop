import {Component, Router, ObservableComponent} from "@axxesJS";
import {Participant, WorkshopService} from "./workshop.service";

@ObservableComponent
export class ParticipantComponent extends Component {
    template = `
        <h1>{{participant?.firstName}}</h1>
        <h2>{{participant?.lastName}}</h2>
        <div>{{message}}</div>
        <button>Back</button>
    `;

    participant: Participant;
    message = 'Hello';

    workshopService = new WorkshopService();
    router = new Router();

    beforeRender() {
        this.participant = this.workshopService.getParticipant(this.router.routeParams.get('id'));
        this.message = this.router.queryParams.get('message') || 'Hello'
    }

    afterRender() {
        const button = document.body.querySelector('button');
        button.addEventListener('click', () => {
            this.router.navigate('/');
        });
    }
}
