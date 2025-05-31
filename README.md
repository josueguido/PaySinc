# PaySinc

![React](https://img.shields.io/badge/React-18+-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6+-646cff?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-38bdf8?logo=tailwindcss&logoColor=white)
![Jest](https://img.shields.io/badge/tested%20with-jest-99424f?logo=jest)
![License](https://img.shields.io/badge/license-MIT-brightgreen)  

PaySinc is a React + TypeScript application built with Vite. It provides a simple and efficient way to manage expenses, featuring a responsive design and modern UI components.

## Features

-   **React + TypeScript**: Built with modern web technologies.
-   **Vite**: Fast development and build tool.
-   **TailwindCSS**: For styling and responsive design.
-   **React Router**: For navigation.
-   **Axios**: For API requests.
-   **React Hook Form**: For form handling.

---

## Prerequisites

Before running the project, ensure you have the following installed:

-   **Node.js**: Version `>=18.0.0`
-   **npm**: Version `>=9.0.0`

You can check your versions by running:

```bash
node -v
npm -v
```

---

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/paysinc.git
cd paysinc
```

### 2. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### 3. Start the Development Server

Start the development server with:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

---

## Scripts

Here are the available npm scripts: 

-   **`npm run dev`**: Starts the development server.
-   **`npm run build`**: Builds the application for production.
-   **`npm run preview`**: Previews the production build.
-   **`npm run lint`**: Runs ESLint to check for code quality issues.

---

## Project Structure

```
.
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries (e.g., Axios)
│   ├── assets/           # Static assets (e.g., images, icons)
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Public assets
├── package.json          # Project metadata and dependencies
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

---

## Environment Variables

The project uses environment variables for configuration. Create a `.env` file in the root directory and add the following:

```
Development Backend:
VITE_API_BASE_URL=http://localhost:3000/api 
```

---

## Dependencies

### Main Dependencies

-   **React**: ^19.0.0
-   **React Router**: ^7.3.0
-   **Axios**: ^1.8.4
-   **TailwindCSS**: ^3.1.4
-   **Zustand**: ^5.0.3

### Dev Dependencies

-   **Vite**: ^6.1.0
-   **TypeScript**: ~5.7.2
-   **ESLint**: ^9.19.0

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

### Commit Message Guidelines

This project uses [Semantic Release](https://github.com/semantic-release/semantic-release) to automate versioning and changelog generation. Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for your commit messages. Here are some examples:

-   **feat**: Introduce a new feature (e.g., `feat: add user authentication`).
-   **fix**: Fix a bug (e.g., `fix: resolve login issue`).
-   **docs**: Update documentation (e.g., `docs: update README`).
-   **style**: Code style changes (e.g., `style: format code`).
-   **refactor**: Code refactoring without changing functionality (e.g., `refactor: optimize API calls`).
-   **test**: Add or update tests (e.g., `test: add unit tests for login`).
-   **chore**: Maintenance tasks (e.g., `chore: update dependencies`).

### Steps to Contribute

1. Fork the repository.
2. Create a new branch for your feature or fix:
    ```bash
    git checkout -b feat/your-feature-name
    ```
3. Make your changes and commit them using the guidelines above.
4. Push your branch to your forked repository:
    ```bash
    git push origin feat/your-feature-name
    ```
5. Submit a pull request to the `development` branch of this repository.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or support, feel free to contact:

-   **Author**: Josue Guido
-   **Email**: josuguido@example.com
-   **GitHub**: [Josue Guido](https://github.com/josueguido)
