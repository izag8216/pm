# PM - Product Management Web Application

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## Overview

A simple PM (Product Management) web application built with HTML/CSS/JS.
Performs CRUD operations on product information stored in local `data.txt`.

## Features

- 🎯 **Simple Design** - Built with HTML/CSS/JS only
- 📄 **data.txt Management** - Stores product data line by line
- 📱 **Responsive** - Modern and user-friendly UI
- ⚡ **Lightweight & Fast** - No complex dependencies

## Usage

Simply open `index.html` in your browser.

```bash
# Clone the repository
git clone git@github.com:izag8216/pm.git
cd pm

# Open in browser
open index.html
```

## Features

### Product Management
- ✅ Create, edit, and delete products
- 📊 Status management (Planning, Active, Completed, On Hold)
- 🎯 Priority settings (High, Medium, Low)
- 👤 Assignee allocation
- 📅 Deadline setting
- 🏷️ Tag-based categorization

### Search & Filter
- 🔍 Real-time search
- 📊 Filter by status
- 🎯 Filter by priority

### Statistics Display
- 📈 Product count statistics
- 📊 Status-based count

## File Structure

```
pm/
├── index.html          # Main HTML file
├── styles.css          # CSS stylesheet
├── app.js             # JavaScript application
├── data.txt           # Data file (sample)
└── README.md          # Project documentation
```

## Data Structure

### data.txt Format
```
ID|Name|Description|Status|Priority|Owner|Deadline|Tags|CreatedAt|UpdatedAt
```

### Product Object
```javascript
{
  id: "unique_id",           // Unique ID
  name: "Product Name",      // Product name (required)
  description: "Description", // Detailed description
  status: "active",          // Status
  priority: "high",          // Priority
  owner: "Assignee Name",    // Assignee
  deadline: "2024-03-15",    // Deadline (YYYY-MM-DD)
  tags: ["tag1", "tag2"],    // Tag array
  createdAt: "ISO_DATE",     // Creation date
  updatedAt: "ISO_DATE"      // Update date
}
```

## Demo

- **URL**: https://izag8216.github.io/pm/

## Technical Specifications

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: LocalStorage
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Icons**: Font Awesome 6.4.0
- **Font**: Inter (Google Fonts)

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Keyboard Shortcuts

- `Ctrl + N` - Create new product
- `Esc` - Close modal

## License

MIT License

## Author

**izag8216**
- 🌐 GitHub: [https://github.com/izag8216](https://github.com/izag8216)
- 📦 Repository: [https://github.com/izag8216/pm](https://github.com/izag8216/pm)

---

Made with ❤️ and Claude AI