# Conference Management App (Salesforce)

## Overview
This is a Salesforce-based Conference Management application built as part of a Junior Salesforce Developer assessment.

The application allows admins to manage speakers and sessions and prevents speakers from being assigned to overlapping sessions.

## Features
- Search speakers by name and speciality
- View sessions by date
- Assign speakers to sessions
- Prevent scheduling conflicts using Apex triggers
- Lightning Web Components based UI
- User-friendly error handling with toast messages

## Tech Stack
- Salesforce Lightning Web Components (LWC)
- Apex
- SOQL
- Salesforce DX

## Components
### Lightning Web Components
- speakerManager (container)
- speakerSearch
- speakerList
- bookSession

### Apex
- SpeakerController.cls
- SpeakerAssignmentTrigger.trigger

## Business Logic
- Trigger ensures a speaker cannot be booked for overlapping sessions
- UI communicates with Apex for data handling
- Proper validation and error feedback

## How to Run
1. Deploy the project to a Salesforce Developer Org
2. Open the Lightning App Page created for the Speaker Manager
3. Search speakers and assign them to sessions

## Author
Janhavi Bire
