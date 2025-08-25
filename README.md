# CODEALPHA_IMAGEGALLARY



# 📸 React Image Gallery

A modern, responsive, and interactive image gallery web application built with **React**. It allows users to browse a curated collection of high-quality images with a clean and intuitive user interface.

## ✨ Features

*   **Responsive Grid Layout:** Adapts seamlessly to all device screen sizes (desktop, tablet, mobile).
*   **Interactive Image Modal:** Click on any thumbnail to view a larger version of the image in a elegant lightbox modal.
*   **Category Filtering:** Dynamically filter displayed images by category (e.g., Nature, Cities, Animals) to quickly find what you're looking for.
*   **Search Functionality:** Search for images by their title or relevant keywords.
*   **Modern UI/UX:** Features a clean, minimalist design with smooth animations and transitions for an enhanced user experience.
*   **Active Navigation:** Visual feedback in the navigation bar shows the currently selected category.


##🌐 Live Demo
https://v0-image-gallery-design-puce.vercel.app/


## 🛠️ Built With

*   **React** - Frontend library for building user interfaces.
*   **CSS3** - For styling and creating the responsive grid and animations.
*   **JavaScript (ES6+)** - For application logic.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v14 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/YUET-944/CODEALPHA_IMAGEGALLARY.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd CODEALPHA_IMAGEGALLARY
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm start
    ```
5.  Open your browser and visit `http://localhost:3000` to view the application.

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.js       # Navigation bar with categories and search
│   ├── ImageItem.js    # Component for rendering individual image cards
│   └── Modal.js        # Modal component for enlarged image view
├── App.js              # Main application component
├── App.css             # Main stylesheet
└── data.js             # Module containing the array of image data
```

## 🌟 Future Enhancements

*   Integration with a backend API to fetch dynamic image data.
*   Lazy loading of images for improved performance.
*   "Like" or "Favorite" functionality for users.
*   Download full-resolution image option.

---

This project was developed as a task for **CodeAlpha** to demonstrate practical skills in React development, state management, and component-based architecture.
