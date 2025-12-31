public with sharing class SpeakerController {

    // 🔍 Search Speakers
    @AuraEnabled(cacheable=true)
    public static List<Speaker_c__c> searchSpeakers(String name, String speciality) {

        String baseQuery = 'SELECT Id, Name, Email__c, Bio__c, Speciality__c FROM Speaker__c';
        List<String> conditions = new List<String>();

        if (name != null && name != '') {
            conditions.add('Name LIKE \'%' + String.escapeSingleQuotes(name) + '%\'');
        }

        if (speciality != null && speciality != '') {
            conditions.add('Speciality__c = \'' + String.escapeSingleQuotes(speciality) + '\'');
        }

        if (!conditions.isEmpty()) {
            baseQuery += ' WHERE ' + String.join(conditions, ' AND ');
        }

        return Database.query(baseQuery);
    }

    // ✅ Check Speaker Availability
    @AuraEnabled
    public static Boolean checkAvailability(Id speakerId, Date sessionDate) {

        Integer assignmentCount = [
            SELECT COUNT()
            FROM Speaker_Assignment__c
            WHERE Speaker_Name__c = :speakerId
            AND Session_Title__r.Session_Date__c = :sessionDate
        ];

        return assignmentCount == 0;
    }

    // ➕ Create Assignment
    @AuraEnabled
    public static void createAssignment(Id speakerId, Id sessionId) {

        Speaker_Assignment__c sa = new Speaker_Assignment__c(
            Speaker_Name__c = speakerId,
            Session_Title__c = sessionId
        );

        insert sa;
    }
}