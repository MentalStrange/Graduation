```markdown
# Brain Stroke Detection and Patient Care System

This project aims to assist patients with brain strokes by connecting radiologists, radiology centers, doctors, and patients, streamlining the process of stroke detection and care.

## Technologies Used

- **Frontend:**
  - React
  - Chakra UI
  - CSS
  - HTML

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - JWT (JSON Web Tokens) for authentication

- **Real-time Communication:**
  - Socket.io for doctor-patient chat

- **File Uploads:**
  - Cloudinary for handling file and image uploads

- **Routing:**
  - React-router-dom for smooth navigation

- **Security:**
  - Comprehensive authorization and authentication mechanisms

## Features

- Real-time chat system between doctors and patients
- User-friendly and responsive interface
- Secure authentication and authorization
- Efficient data handling with MongoDB
- Reliable file and image uploads via Cloudinary

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account
- Python 3

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/MentalStrange/Graduation)
   cd your-repo-name
   ```

2. Install the dependencies for the backend:
   ```sh
   cd backend
   npm install
   ```

3. Install the dependencies for the frontend:
   ```sh
   cd frontend
   npm install
   ```

4. Install the dependencies for the machine learning component:
   ```sh
   cd ml
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   - Create a `.env` file in the backend directory and add the following:
     ```env
     MONGO_URI=your_mongo_db_connection_string
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     JWT_SECRET=your_jwt_secret
     ```

### Running the Project

1. Start the backend server:
   ```sh
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```sh
   cd frontend
   npm run dev
   ```

3. Start the machine learning component:
   ```sh
   cd ml
   python3 app.py
   ```

## Demo

Check out the https://drive.google.com/file/d/1DXPUx-h9QXBw6CpDgMONNuPBsPJHShnc/view to see the system in action.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
```

You can paste this directly into your README.md file on GitHub. If you need any more adjustments, let me know!
