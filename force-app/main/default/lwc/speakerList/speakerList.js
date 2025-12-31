import { LightningElement, api } from 'lwc';

export default class SpeakerList extends LightningElement {
    @api speakers;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email__c' },
        { label: 'Speciality', fieldName: 'Speciality__c' },
        {
            type: 'button',
            typeAttributes: {
                label: 'Book Session',
                name: 'book',
                variant: 'brand'
            }
        }
    ];

    handleRowAction(event) {
        const selectedSpeaker = event.detail.row;

        this.dispatchEvent(
            new CustomEvent('selectspeaker', {
                detail: selectedSpeaker,
                bubbles: true,
                composed: true
            })
        );
    }
}
