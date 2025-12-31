import { LightningElement } from 'lwc';

export default class SpeakerSearch extends LightningElement {

    name;
    speciality;

    options = [
        { label: 'Apex', value: 'Apex' },
        { label: 'LWC', value: 'LWC' },
        { label: 'Integrations', value: 'Integrations' },
        { label: 'Architecture', value: 'Architecture' }
    ];

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleSpecialityChange(event) {
        this.speciality = event.target.value;
    }

    handleSearch() {
        this.dispatchEvent(new CustomEvent('search', {
            detail: {
                name: this.name,
                speciality: this.speciality
            }
        }));
    }
}