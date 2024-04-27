# Robust-Online-Note-Taker

## Description

Express Note Taking Web Application
This Note Taking application that allows users to write, save, view, and delete notes. This application is useful for users who need to keep track of a lot of information. The application uses Express.js backend and saves and retrieves note data from a JSON file.

### Link to deployed application


## Features

- **Create Notes**: Users can create new notes with a title and body text.
- **View Notes**: Users can view all saved notes listed in the sidebar.
- **Delete Notes**: Users can delete notes that are no longer needed.

## Installation

To get started with this project, you'll need Node.js installed on your computer. Once you have Node.js installed, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yahm0/Robust-Online-Note-Taker
   cd note-taker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

   This will start the Express server on `localhost:3001`.

## Usage

Once the server is running, you can access the application by navigating to `http://localhost:3001` in your web browser.

### Creating a Note

- Navigate to the Notes page via the navigation link.
- Enter a title and the note's text in the provided fields.
- Click the "Save Note" button to save your note. The note will appear in the left sidebar.

### Viewing Notes

- Click on any note title listed in the sidebar. The note will be displayed, allowing you to read the full content.

### Deleting Notes

- Click the delete icon (trash can) next to the note you wish to delete in the sidebar.

## Technical Details

### Back End

- **Node.js** and **Express.js**: The server and routing logic is handled by Express.
- **File System Module**: Notes are stored in and retrieved from a file (`db/database.json`) using the Node.js file system module.

### Front End

- **HTML/CSS**: The front end uses basic HTML for structure and CSS for styling.
- **JavaScript**: Vanilla JavaScript is used for handling user interactions and AJAX requests to the server.

## Screenshot of application
![Screenshot of Note Taker App](./Assets/Images/)
![Screenshot of Note Taker App](./Assets/Images/)

## Development

- **Nodemon**: During development, you can use Nodemon to automatically restart the server after changes to the code.
  ```bash
  npm run dev
  ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or create an issue for bugs, features, or other concerns.

## License

This project is open source and available under the [MIT License](LICENSE.md).