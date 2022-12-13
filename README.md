# InvBuddy
InvBuddy is a simple Inventory App with basic CRUD functions made using Python (Flask) and React.

## Features
#### Dashboard
InvBuddy has a dashboard with charts and statistics about the current inventory. The charts are rendered using react-chartJS, an open-source library used to render and style charts. Whereas, the statistics are fetched directly from the Flask API.

#### View Inventory
The view inventory page displays all information about all the items in the inventory in a tabular format. Each row in the table consists of a Edit and Delete button that trigger pop-up boxes (modals) that provide users information to delete and/or edit information for the row. The changes are reflected on the View Inventory page and the Dashboard. 

#### Add Items
The add items page consists of a simple form that records data and sends it to the API. The API inserts the form data into the database.

## Tech Stack Used

### Python
### AWS RDS (for hosting MySQL Database)
### MySQL
### React
