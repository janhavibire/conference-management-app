trigger SpeakerAssignmentTrigger on Speaker_Assignment__c (before insert, before update) {

    Set<Id> speakerIds = new Set<Id>();
    Set<Id> sessionIds = new Set<Id>();

    for (Speaker_Assignment__c sa : Trigger.new) {
        if (sa.Speaker_Name__c != null && sa.Session_Title__c != null) {
            speakerIds.add(sa.Speaker_Name__c);
            sessionIds.add(sa.Session_Title__c);
        }
    }

    if (speakerIds.isEmpty()) return;

    // Fetch new Session data
    Map<Id, Session__c> sessionMap = new Map<Id, Session__c>(
        [SELECT Id, Session_Date__c, Start_Time__c, End_Time__c
         FROM Session__c
         WHERE Id IN :sessionIds]
    );

    // Fetch existing assignments
    List<Speaker_Assignment__c> existingAssignments = [
        SELECT Id, Speaker_Name__c,
               Session_Title__r.Session_Date__c,
               Session_Title__r.Start_Time__c,
               Session_Title__r.End_Time__c
        FROM Speaker_Assignment__c
        WHERE Speaker_Name__c IN :speakerIds
    ];

    for (Speaker_Assignment__c newSA : Trigger.new) {

        Session__c newSession = sessionMap.get(newSA.Session_Title__c);
        if (newSession == null) continue;

        for (Speaker_Assignment__c oldSA : existingAssignments) {

            // Skip same record during update
            if (Trigger.isUpdate && oldSA.Id == newSA.Id) continue;

            if (newSA.Speaker_Name__c == oldSA.Speaker_Name__c &&
                newSession.Session_Date__c == oldSA.Session_Title__r.Session_Date__c) {

                Time newStart = newSession.Start_Time__c;
                Time newEnd   = newSession.End_Time__c;
                Time oldStart = oldSA.Session_Title__r.Start_Time__c;
                Time oldEnd   = oldSA.Session_Title__r.End_Time__c;

                if (newStart < oldEnd && newEnd > oldStart) {
                    newSA.addError('Speaker is already booked for this time.');
                    break;
                }
            }
        }
    }
}