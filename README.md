# Developer Footprint (dev_stats.io)

A real-time public developer dashboard that retrieves and visualizes statistics, repository languages, and commit history from the GitHub REST API. This project is built using Next.js, Tailwind CSS v4, and TypeScript, executing under the Technical Precision design register.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Lucide React
- **API integration**: Native Fetch API caching layers

## Features

- **Dynamic Profile Routing**: Access any developer directly via domain.com/username (e.g., localhost:3000/torvalds) to load metrics instantly on page load.
- **Dynamic Search**: Instant client-side search query inputs alongside click-to-load preset suggestions.
- **State-based Visuals**: Custom skeleton loaders, error panels displaying rate-limits or invalid inputs, and an onboarding empty state.
- **Metrics Breakdown**: Displays total public repositories, followers, following, and a custom computed "Developer Impact Score" derived from their followers and repos.
- **Language Meter**: A horizontal segmented percentage bar displaying the primary coding languages across their 100 most active repositories.
- **Activity Timeline**: A real-time timeline displaying recent push commits, pull request status changes, and repository creation events with short hashes and commit logs.

## Setup and Installation

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn

### Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd developer-footprint
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   GitHub's public API is limited to 60 requests per hour for unauthenticated clients. To prevent rate-limiting, create a `.env.local` file in the root directory and add a Personal Access Token:
   ```env
   GITHUB_TOKEN=your_github_personal_access_token_here
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal output) to view the application.

5. **Build for Production**:
   ```bash
   npm run build
   ```

## Architecture and Code Quality

The codebase enforces a strict separation of concerns following the Single Responsibility Principle (SRP):
- **Types** (`src/types/github.ts`): Houses structured data interfaces.
- **Services** (`src/services/githubService.ts`): Handles all external calls to the GitHub API, computes metrics, and aggregates languages.
- **API Routes** (`src/app/api/github/route.ts`): Prevents browser-level token exposure and handles request validation.
- **Hooks** (`src/hooks/useDashboard.ts`): Encapsulates client-side search operations and state transitions.
- **Components** (`src/components/*`): Modular presentation components with zero embedded business logic.
