import {Component, ObservableComponent, Router} from "@axxesJS";
import {Participant, WorkshopService} from "./workshop.service";
import {ParticipantComponent} from "./participant";
import {ContentComponent} from "./content";

@ObservableComponent
class WorkshopComponent extends Component {
    template = `
        <h1>Workshop {{date}}</h1>
        <span>{{time}}</span>
        
        <ol [if]="showParticipants">
            <li [for]="participant in participants"><a href="/{{participant.id}}">{{participant.firstName}} {{participant.lastName}}</a></li>
        </ol>
        
        <add-participant-component></add-participant-component>
        
        <a href="/content">Content</a>
    `;

    workshopService = new WorkshopService();
    participants: Participant[] = [];
    showParticipants = true;

    date = this.getToday();

    interval;
    time: string = new Date().toLocaleTimeString();

    getToday(): string {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();

        return dd + '/' + mm + '/' + yyyy;
    }

    updateTime() {
        this.interval = setInterval(() => {
            this.time = new Date().toLocaleTimeString();
            //console.log(this.time);
        }, 1000);
    }

    beforeRender() {
        this.workshopService.participants.listen((value) => {
            this.participants = value;
        });

        //this.updateTime();
    }

    afterRender() {
/*        this.participants = [
            ...this.participants,
            {
                id: this.participants.length.toString(),
                firstName: 'Gerard',
                lastName: 'De Smidt'
            }];
        console.log(this.participants);*/
    }


    /*    participants: Participant[] = [
        {
            id: '0',
            firstName: 'Joske',
            lastName: 'Vermeulen'
        },
        {
            id: '1',
            firstName: 'Jantje',
            lastName: 'De Clerck'
        },
        {
            id: '2',
            firstName: 'Jefke',
            lastName: 'Van de Velde'
        }
        ]*/

}

@ObservableComponent
export class AddParticipantComponent extends Component {
    template = `
        <h1>Add participant</h1>
        <div id="addForm">
            <label for="firstName">First name</label>
            <input type="text" id="firstName" name="firstName" required>
            <label for="lastName">Last name</label>
            <input type="text" id="lastName" name="lastName" required>
            <button>Add</button>
        </div>
    `;

    workshopService = new WorkshopService();

    afterRender() {
        const form = document.body.querySelector('#addForm');
        const button = form.querySelector('button');
        button.onclick = (event) => {
            event.preventDefault();
            const firstName = form.querySelector('#firstName').value;
            const lastName = form.querySelector('#lastName').value;
            this.addParticipant(firstName, lastName);
        };
    }

    addParticipant(firstName: string, lastName: string) {
        console.log(firstName, lastName);
        this.workshopService.addParticipant(firstName, lastName);
    }
}

const router = new Router().withRouteComponent('/', WorkshopComponent);
router.withRouteComponent('/content', ContentComponent);
router.withRouteComponent('/:id', ParticipantComponent);
