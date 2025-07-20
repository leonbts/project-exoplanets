# 🌌 Exoplanet Habitability Dashboard

An interactive Tableau dashboard that visualizes the habitability of known exoplanets — combining astronomy data with an intuitive star map, scoring system, and Earth/Sun reference metrics.

## 🚀 Overview

This dashboard allows users to:

- Explore exoplanets up to 1000 parsecs from Earth.
- Identify potentially habitable planets based on radius, temperature, and stellar flux.
- View star systems on an interactive scatter map (via D3.js and Tableau Extensions API).
- Compare planet data against Earth and Sun benchmarks.
- Understand the habitability scoring system directly from the UI.

Built using:
- **Tableau Public**
- **D3.js**
- **Tableau Extensions API**
- Public astronomy datasets (e.g., NASA Exoplanet Archive)

---

## 📊 Habitability Score

The **Habitability Score** ranges from 0 to 1 and reflects how "Earth-like" a planet is. It considers:

- 🌍 **Radius** (ideal: 1 Earth radius)
- 🌡️ **Equilibrium Temperature** (ideal: 288 K)
- ☀️ **Insolation Flux** (ideal: 1 Sₑ)

Scoring Interpretation:

| Score Range | Classification           |
|-------------|---------------------------|
| ≥ 0.9       | ✅ Very Likely Habitable  |
| ≥ 0.7       | ⚠️ Possibly Habitable     |
| < 0.7       | ❌ Unlikely Habitable     |

---

## 🌐 How It Works

The dashboard integrates:

- A custom **D3.js star map** embedded via Tableau's Extensions API.
- A scatter plot with zoom and pan capability.
- Toggleable reference info for **Earth** and the **Sun**.
- Floating metrics and score filters for user exploration.

---

## 🛠️ Installation (for local dev)

1. Clone this repository:
   ```bash
   git clone https://github.com/leonbts/project-exoplanets.git
   cd project-exoplanets
   ```
2. Start a simple local server:
   ```bash
   python -m http.server 8000
   ```
3. Open Tableau → Access your dashboard → Choose "Access Local Extensions" → Select the .trex file from this project.

---

## 📁 Project Structure
.<br>
├── output/<br>
│ └── exoplanets.csv                # Raw cleaned dataset exported from the NASA API<br>
├── star-map-extension/<br>
│ ├── csv_preparation.ipynb         # Notebook that adds habitability score and processes data<br>
│ ├── index.html                    # Main HTML file for the Tableau extension<br>
│ ├── manifest.trex                 # Tableau extension manifest file<br>
│ ├── star-map.js                   # D3.js logic to render the interactive map<br>
│ └── stars.csv                     # Final CSV used by the extension (with habitability scores)<br>
├── api.ipynb                       # Jupyter notebook that fetches raw exoplanet data from NASA API<br>
├── README.md                       # Project documentation (this file)

---

## 📬 Contact

Created with ❤️ by **[Leon Bittis]**

- 📧 Email: leon.bittis@gmail.com  
- 🌐 Website: [ironhack.com](https://ironhack.com)  
- 📊 Tableau Public: [tableau.com](https://public.tableau.com/app/profile/leon.bittis/vizzes)  
- 🪐 Passionate about data, science, and the cosmos.