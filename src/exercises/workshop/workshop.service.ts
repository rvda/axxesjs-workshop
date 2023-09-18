import {Service, State} from "@axxesJS";


export type Participant = {
    id: string;
    firstName: string;
    lastName: string;
}
@Service
export class WorkshopService {
    participants = new State<Participant[]>([
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
    ]);

    addParticipant(firstName: string, lastName: string) {
        this.participants.value = [...this.participants.value, {id: this.participants.value.length.toString(), firstName, lastName}];
    }

    getParticipant(id: string) {
        return this.participants.value.find(participant => participant.id === id);
    }
}
