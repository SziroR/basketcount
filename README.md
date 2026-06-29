# BasketCount RSVP Dashboard

A lightweight, mobile-friendly web application designed for sports teams to coordinate match invitations and track player RSVPs in real time.

The application utilizes an elegant, serverless architecture that hooks a frontend web dashboard directly into a Google Spreadsheet backend, combined with real-time browser push notifications.

---

## Description

BasketCount simplifies team attendance tracking by providing a clean user interface where players can instantly view upcoming match details and state whether they are attending. Instead of forcing users to navigate bloated messaging threads or download native applications, it runs natively in any standard mobile browser.

The application features an automated administrative notification workflow. Administrators can compose and broadcast push notifications to the entire squad directly from their event tracking spreadsheet.

---

## Technology Used

* Frontend Hosting: GitHub Pages
* Database & Core Logic: Google Sheets & Google Apps Script (Web App Engine)
* Push Notifications Engine: Firebase Cloud Messaging (FCM) utilizing the modern HTTP v1 API protocol
* Service Workers: Native JavaScript Service Worker API for continuous background message handling and progressive web capabilities

---

## Admin Setup

To deploy your own instance of BasketCount, follow these steps to configure your database and messaging pipeline:

### 1. Google Sheets Configuration

Create a Google Spreadsheet with exactly three tabs named as follows:

* **Events**: This sheet acts as your primary schedule. The columns must follow this exact order:
1. ID (Unique identifier)
2. Title (Match or practice name)
3. Date & Time
4. Location Name
5. Google Maps Link
6. Status (Controls dashboard visibility. Valid states: planned, announced, error in invite sending, all rsvp in, event expired)
7. System Status/Timestamp
8. Number of notifications sent


* **Tokens**: Stores registered player device IDs. Structure: Timestamp, Token, Active.
* **RSVPs**: Logs submitted responses. Structure: Timestamp, Event Title, Player Name, Status.

### 2. Apps Script Environment

1. In your sheet, navigate to Extensions > Apps Script.
2. Paste the backend script code into your editor.
3. Replace the placeholder values at the top of the file with your own values:
* SECRET_KEY: A secure string used to validate incoming requests.
* NOTIFICATION_URL: The live URL where your frontend is hosted.
* FCM_PROJECT_ID: Your Firebase project identifier.


4. Click Deploy > New Deployment. Choose Web App, set Execute as to Me, and set Who has access to Anyone.
5. Authorize permissions and copy the generated Web App URL.

### 3. Firebase Project Setup

1. Create a project in the Firebase Console.
2. Register a Web App within the project settings and obtain your Web App Configuration object.
3. Navigate to Project Settings > Cloud Messaging. Under Web Configuration, generate a VAPID Key.

### 4. Frontend Code Configuration

1. Open index.html and populate the firebaseConfig object and the vapidKey string with your Firebase keys.
2. Update the WEB_APP_URL constant with your Google Web App URL, and ensure your SECURITY_KEY matches the SECRET_KEY you wrote in your Apps Script file.
3. Update the matching Firebase credentials inside firebase-messaging-sw.js.
4. Commit the files to your GitHub repository and enable GitHub Pages.

---

## Admin Use Cases

Once set up, team managers can handle all operations directly from the Google Sheet spreadsheet:

* Announce a Match: Select an event row in the Events sheet and navigate to the custom menu toolbar option Notifications > Announce selected event. The script dynamically formats the match text, updates the row status to announced, logs a timestamp, and pushes a real-time notification out to all active subscribers.
* Testing Communication Channels: Select Notifications > Send test notification from the toolbar menu to dispatch a safe test ping across your subscriber list to verify that configurations are working.
* Dynamic Dashboard Updates: Manually changing an event's status cell to error in invite sending or all rsvp in lets the administrator update what players see on the dashboard without sending out an entire new wave of alerts.

---

## User Setup

For players joining the platform, getting connected and installing the dashboard takes only a few seconds:

### 1. Access the App

Open the team's dashboard directly via your mobile phone: [https://sziror.github.io/basketcount/](https://sziror.github.io/basketcount/)

### 2. Install to Home Screen (PWA)

For the best experience (making it run like a real app without browser bars), add it to your home screen:

* iPhone / iOS (Safari): Tap the Share button (square icon with an up arrow) at the bottom of the screen, scroll down, and select Add to Home Screen.
* Android (Chrome / Edge): Tap the three vertical dots in the top-right corner, and select Add to Home Screen or Install app.

### 3. Permissions & Tokens

1. Open the newly installed app from your home screen.
2. When prompted, select Allow to grant push notification permissions so you never miss a match invite.
3. If automated registration is restricted by your mobile browser configuration (e.g., certain strict privacy settings on Safari or Brave), click the COPY button next to the token field and paste that key directly to your team administrator to be registered manually.

---

## User Use Cases

* Real-Time RSVP Submission: Enter your full name in the input field and click I'M IN or CANT MAKE IT. Your attendance choice is immediately written back to the central manager log sheet.
* Persistent Name Memory: The app remembers who you are. After your first submission, your browser securely caches your name locally so you do not have to type it again for future match invites.
* One-Click Venue Navigation: If a Google Maps location was included in the invitation announcement, tapping the Open in Google Maps action button launches your navigation app directly to the court.