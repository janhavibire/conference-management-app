import { LightningElement, api, track } from 'lwc';
import getSessionsByDate from '@salesforce/apex/SpeakerController.getSessionsByDate';
import createAssignment from '@salesforce/apex/SpeakerController.createAssignment';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookSession extends LightningElement {

    @api speaker;
    selectedDate;
    selectedSessionId;

    @track sessionOptions = [];
    disableButton = true;

    // check speaker
    get hasSpeaker() {
        return this.speaker != null;
    }

    // 📅 Date selected
    handleDateChange(event) {
        this.selectedDate = event.target.value;
        this.disableButton = true;

        getSessionsByDate({ sessionDate: this.selectedDate })
            .then(result => {
                console.log('Sessions from Apex:', result);

                this.sessionOptions = result.map(sess => ({
                    label: `${sess.Name} (${sess.Start_Time__c} - ${sess.End_Time__c})`,
                    value: sess.Id
                }));
            })
            .catch(error => {
                console.error('Apex error:', error);
            });
    }

    // 📌 Session selected
    handleSessionChange(event) {
        this.selectedSessionId = event.detail.value;
        console.log('Selected Session Id:', this.selectedSessionId);

        if (!this.selectedSessionId) {
            this.disableButton = true;
            return;
        }

        // enable button
        this.disableButton = false;
    }

    // ✅ Create Assignment
    handleCreate() {

        console.log('Creating assignment...');
        console.log('Speaker:', this.speaker?.Id);
        console.log('Session:', this.selectedSessionId);

        if (!this.speaker || !this.speaker.Id) {
            this.showToast('Error', 'Speaker not selected', 'error');
            return;
        }

        if (!this.selectedSessionId) {
            this.showToast('Error', 'Please select a session', 'error');
            return;
        }

        createAssignment({
            speakerId: this.speaker.Id,
            sessionId: this.selectedSessionId
        })
        .then(() => {
            this.showToast(
                'Success',
                'Speaker assigned successfully',
                'success'
            );

            // reset state
            this.disableButton = true;
            this.selectedSessionId = null;
        })
        .catch(error => {
            console.error('Full Apex Error:', JSON.stringify(error));

            let message = 'Failed to create assignment';

            if (error.body?.pageErrors?.length) {
                message = error.body.pageErrors[0].message;
            } else if (error.body?.message) {
                message = error.body.message;
            }

            this.showToast('Error', message, 'error');
        });
    }

    // 🔔 Toast helper (MUST be inside class)
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}
