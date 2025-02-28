<a name="readme"></a>

# Auction House - Norroff Semester Project 2025

### Project Overview:

Auction House is a user-driven auction platform where participants can list their items for sale or place bids on auctions created by others. The platform uses credits for transactions, with new users receiving an initial balance of 1000 credits to begin bidding.

### 🌐 <a href="https://ah-senbet.netlify.app/" target="_blank">Visit the live project on Netlify</a>

## Key Features

- 🆕 **Initial Credits**: New users start with 1000 credits to place their first bids.
- 💼 **Bidding and Selling**: Users can list items for bidding or place bids on others' auctions.
- 💳 **Credits System**: Transactions are handled using credits for seamless payments.
- 🔍 **Browse Auctions**: Non-registered users can explore and search auctions.

###

![Auction House Preview](/public/ah-preview2.png)
![Auction House Preview](/public/ah-preview.png)

###

## 📝 How to Set Up the Project

To get a copy of this project, you can clone the repository:

```bash
git clone https://github.com/senbet22/FED2-SP-Auction-House
```

Alternatively, you can download the ZIP file and extract it.

### Install Dependencies

```bash
npm install
```

### 🛠 Dev Dependencies

- **Vite**: Development server and build tool.
- **Tailwind CSS v4** (using Vite): for styling.
- **Rollup**: handles bundling.
- Multi-page app (MPA) with entry points for:
  /auth, /item, /profile, /create, /edit

#### 🏁 Run the Development Server

This generates optimized, production-ready files in the dist/ folder.

```bash
npm run dev
```

To start your project locally:

```bash
npm run build
```

## 🔑 Environment Variables

_This project requires an API key to access certain features._

1. Get your API key from the [Noroff API Key Tool](https://docs.noroff.dev/docs/v2/auth/api-key#api-key-tool).
2. Create a .env file in the project root.
3. Inside the .env file Add your key like this:
   `VITE_API_KEY=your_api_key`
4. Add .env in .gitignore for security.

## 📚 Documentation

**API Endpoints**: All the relevant API endpoints and their usage can be found in the `src/js/constants.mjs` file. This file holds the base URLs and paths for API requests used within the application.

<h3 align="left">Built with:</h3>

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" height="40" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=vite" height="40" alt="vite logo"  />
</div>

###

<h3 align="left">My tools:</h3>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" height="40" alt="figma logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=postman" height="40" alt="postman logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="40" alt="vscode logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/behance/behance-original.svg" height="40" alt="behance logo"  />
</div>

###

### 📞 Contact

[My GitHub Profile](https://github.com/senbet22)

###

[Back to Top](#readme)
