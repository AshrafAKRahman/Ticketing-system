# Helpdesk Ticketing System
This is a web-based helpdesk ticketing system created using React and styled with CSS. The app allows users to raise tickets, view current tickets and their details, and manage them.

## Features
#### Raise Tickets: 
Users can raise tickets by filling out a form with information about the issue they are experiencing.

#### View Current Tickets: 
Users can view the current tickets that have been raised, and toggle their visibility using the Collapsible component.

#### Manage Tickets: 
Users can view the details of a specific ticket and manage it accordingly.

## Getting Started
#### Deployed site
- [Helpdesk](https://frontend-ticketing.onrender.com/)

#### From IDE
To use the helpdesk ticketing system, follow these steps:

Clone the repository to your local machine.

Run npm install to install the necessary dependencies.

Run npm start to start the app.

The app will open in your web browser.

## Folder Structure
#### src: 
The main folder for the app's source code

#### assets: 
Folder containing the images used in the app

#### components: 
Folder containing React components used in the app
- App.js - main component that renders the app's pages and components
- Collapsible.js - component containing current tickets and displaying them when toggled
- Form.js - form containing Inputs and buttons, the main component of the page
- Heading.js - component containing the heading and title
- Input.js - component holding the props for the expected input into the form
- Navbar.js - component holding all elements for the navbar
- Textarea.js - component holding all the props for the area where the text is being handled
- TicketDetails.js - component holding a div with the details of the ticket raised

## API Integration
This helpdesk ticketing system is connected to a backend repository at https://github.com/AshrafAKRahman/Ticketing-System-Backend using a fetch request in the App.js file. The app fetches ticket data from the backend and displays it in the UI.



## Authors
- [Adie Nunn](https://github.com/cowtipping)
- [Ashraf Rahman](https://portfolio-bp1e.onrender.com/)
- [Callum Cheshire](https://github.com/callum-cheshire/callum-cheshire)
- [Shane Downes](https://github.com/shane-downes/shane-downes)

