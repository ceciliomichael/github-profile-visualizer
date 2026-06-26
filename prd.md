# Product Requirements Document (PRD)

## 1. Product Name
**GitHub Live Developer Stats Dashboard**

## 2. Objective
Create a mini dashboard that pulls public data from the GitHub REST API to display a developer's key statistics (user data, public repositories, follower count, recent activity, and languages used). The data will be presented in a clean, modern profile card layout, demonstrating a strong grasp of developer tools, API integration, and premium UI design.

## 3. Target Audience
- **Developers** looking to showcase their stats.
- **Recruiters and Engineering Managers** evaluating candidates.
- **Hiring Teams** assessing a candidate's technical background and frontend skills.

## 4. Key Features
- **Dynamic Search**: An input field to search for any valid GitHub username.
- **Profile Overview**: Display the user's avatar, name, bio, follower count, following count, and total public repositories.
- **Language Breakdown**: Visualize the most frequently used programming languages across the user's public repositories.
- **Recent Activity Summary**: Display a feed or summary of the user's recent commits and public events.
- **Clean Profile Card Layout**: A premium, high-impact flat UI design that cleanly organizes the data without clutter.

## 5. Data Sources (GitHub REST API - Public, No Auth Required)
- **User Profile**: `GET https://api.github.com/users/{username}`
- **User Repositories**: `GET https://api.github.com/users/{username}/repos` (used for language calculation and repo stats)
- **User Events**: `GET https://api.github.com/users/{username}/events/public` (used for recent commit history and activity)

## 6. Technical Specifications
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **Architecture**:
  - API Routes (`app/api/github/route.ts`) to handle fetching data from GitHub API and formatting the payload.
  - Server Components for initial load and structure.
  - Client Components (with `"use client"`) strictly for the search input and interactive state.
  - Modular structure (separate files for orchestration, domain logic, API calls, and UI components).
- **Design Guidelines**: 
  - High-impact, visually striking flat UI.
  - Bold typography and strategic color blocking.
  - Light mode default (or sleek dark mode if preferred).
  - No gradients or glassmorphism.
  - Mobile-responsive layout.

## 7. Error Handling & Edge Cases
- **Rate Limiting**: GitHub's unauthenticated API has a rate limit (60 requests/hour). The app must handle HTTP 403 (Rate Limit Exceeded) gracefully and inform the user.
- **Invalid Usernames**: Handle 404s when a user searches for a username that does not exist.
- **Empty States**: Display friendly UI when a user has no public repositories or recent activity.

## 8. Out of Scope (For V1)
- Authenticated GitHub login (OAuth) to bypass rate limits.
- Extremely deep repository analysis (e.g., cloning repos to analyze code).
- Historical contribution graphs (GitHub contribution calendar graph).
