# 💧 Water Tracker Backend (Node.js + Sequelize)

This backend service powers the **Water Tracker App**, which helps users monitor, manage, and improve their daily water intake.  
It allows users to set hydration goals, log beverages, and track their progress toward better hydration habits.

---

## 🚀 Features
- **Hydration Goals**
  - Set personalized daily water intake targets (`goalMl`).
  - Track progress percentage (`progress`).
  - Support for start and end dates (active goal periods).

- **Intake Logging**
  - Record drinks with `volumeMl` (in milliliters).
  - Support `hydrationPct` (e.g., water = 100%, coffee = 90%).
  - Automatically calculate `effectiveMl` = `volumeMl × hydrationPct/100`.

- **Progress Tracking**
  - Compare total intake to goal.
  - Update and store `progress` percentage.
  - Mark goals as achieved once 100% is reached.

- **Extensible Design**
  - Future support for drink types table (water, coffee, tea, juice).
  - Extendable for streaks, analytics, reminders, and gamification.

---

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **ORM**: Sequelize
- **Database**: PostgreSQL (or MySQL/SQLite, configurable)
- **Language**: ES Modules (JavaScript)

---

## 📂 Project Structure

- **/models**
- ├── drinks.Model.js 
- ├── hydration_goals.Model.js
- ├── intake_logs.Model.js
- **/Repository**
- ├── drinks.Repository.js
- ├── hydration_goals.Repository.js
- ├── intake_logs.Repository.js
- **/Controllers**
- ├── drinks.Controller.js 
- ├── hydration_goals.Controller.js
- ├── intake_logs.Controller.js
- **/Routes**
- ├── drinks.Routes.js 
- ├── hydration_goals.Routes.js
- ├── intake_logs.Routes.js
- **/Middleware**
- **/utils**
- └── db.js # Sequelize connection
- └── logger.js # Sequelize connection
- └── logs.js # Sequelize connection
- └── sync.js # Sequelize connection


## Setup & Installation

1. Clone repository
- `git clone https://github.com/TapAndGo/WaterTracker.git`
- `cd WaterTracker`

2. Install dependencies
- `npm install`

3. Configure environment variables (.env)

- DB_HOST=localhost
- DB_PORT=5432
- DB_NAME=water_tracker
- DB_USER=postgres
- DB_PASS=yourpassword

4. Run database migrations (if any) and start server

- `npm run dev`

- **🛡️ License**

- MIT License © 2025

- **✨ Author**

- `Built with 💧 by ordo-chao.`


