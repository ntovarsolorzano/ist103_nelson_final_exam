# JSville Courier Management System 🚚

## Overview
The JSville Courier Management System is a lightweight, browser-based application for managing package deliveries. Built with vanilla JavaScript, HTML, and CSS, it provides a simple yet effective solution for tracking and sorting packages.

## Features
- ✅ Package data entry with validation
- 📦 Real-time package tracking
- 🔄 Efficient sorting using Merge Sort algorithm
- 🎯 Unique tracking code generation
- 💻 Clean, responsive user interface

## Technical Details

### Validation Rules
- Package ID: Numeric values only
- Recipient Name: Alphabetic characters and spaces
- Delivery Address: Letters, spaces, and basic punctuation
- Weight: Positive numeric values (in kilograms)

### Sorting Algorithm
The system uses Merge Sort (O(n log n)) for efficient package sorting based on weight. This ensures optimal performance even with large datasets.

### Tracking Code Generation
Unique tracking codes are generated using bitwise operations combining package ID and weight:
```javascript
(packageId << 8 | weightInt).toString(2)
```

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone the repository:
```bash
git clone https://github.com/ntovarsolorzano/ist103_nelson_final_exam.git
```

2. Open `index.html` in your web browser

### Usage
1. Enter package details in the form
2. Click "Add Package" to register a new package
3. Use "Sort Packages" to organize packages by weight
4. View all packages in the table below

## Project Structure
```

ist103_nelson_final_exam/
│
├── index.html          # Main application file
├── styles.css          # Fancy css
├── scripts.js          # The actual core of the project
├── README.md           # Project documentation
└── (screenshots)       # Application screenshots (optional)
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Built as a solution for the JSville package delivery management challenge
- Uses efficient algorithms for optimal performance
- Designed with scalability in mind

## Contact
Your Name - [@ntovarsolorzano](https://github.com/ntovarsolorzano)

Project Link: See the AWS project
