import { LightningElement } from 'lwc';

export default class SpeakerSearch extends LightningElement {

    name = '';
    speciality = '';

    specialityOptions = [
        { label: 'Apex', value: 'Apex' },
        { label: 'LWC', value: 'LWC' },
        { label: 'Integrations', value: 'Integrations' },
        { label: 'Architecture', value: 'Architecture' }
    ];

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleSpecialityChange(event) {
        this.speciality = event.detail.value; // ✅ MUST be event.detail.value
        console.log('Selected speciality:', this.speciality);
    }

   handleSearch() {
    console.log('Search button clicked'); // 👈 MUST appear
    this.dispatchEvent(new CustomEvent('search', {
        detail: {
            name: this.name,
            speciality: this.speciality
        }
    }));
}

}
