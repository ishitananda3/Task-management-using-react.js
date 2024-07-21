# Task Management Application

## Overview

Welcome to the Task Management Application! This React-based web application helps you organize and manage your tasks efficiently. It features a sleek user interface and robust functionality to keep track of your tasks, priorities, and deadlines.

## Features

- **Add and Edit Tasks**: Create and update tasks with titles, descriptions, due dates, and priorities.
- **Task Prioritization**: Assign priorities (High, Medium, Low) to tasks with visual indicators.
- **Task Filtering**: View tasks by priority or completion status using tabs.
- **Search Functionality**: Find tasks quickly with a search bar.
- **Virtualized Task List**: Smoothly handle large numbers of tasks using virtualization.
- **Error Boundaries**: Gracefully handle errors with user-friendly messages.
- **Local Storage**: Persist tasks across page reloads.
- **Snooze Feature**: Postpone due dates for tasks.
- **Priority Sorting**: Sort tasks by priority and due date.

## Getting Started

### Installation

1. Clone the repository:

    ```bash
    git clone  https://github.com/ishitananda3/Task-management-using-react.js.git
    ```

2. Navigate to the project directory:

    ```bash
    cd task-management
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

### Usage

- **Add Task**: Click on the "Add Task" button to open the task creation modal. Fill in the task details and save.
- **Edit Task**: Click on the "Edit" button in the task details to update task information.
- **Delete Task**: Click on the "Delete" button to remove a task.
- **Mark as Done**: Click on the "Mark as Done" button to complete a task.
- **Change Priority**: Select a new priority from the dropdown menu in the task details.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **react-window**: Virtualization library for rendering large lists efficiently.
- **react-datepicker**: Date picker component for selecting due dates.
- **localStorage**: For persisting tasks across page reloads.
- **Tailwind CSS**: Utility-first CSS framework for styling.