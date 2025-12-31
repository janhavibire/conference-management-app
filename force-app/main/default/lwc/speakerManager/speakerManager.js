import { LightningElement, track } from 'lwc';
import searchSpeakers from '@salesforce/apex/SpeakerController.searchSpeakers';

export default class SpeakerManager extends LightningElement {

    @track speakers = [];
    @track selectedSpeaker;

    handleSearch(event) {
        const { name, speciality } = event.detail;

        searchSpeakers({ name, speciality })
            .then(result => {
                this.speakers = result;
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleSpeakerSelect(event) {
        this.selectedSpeaker = event.detail;
    }
}
