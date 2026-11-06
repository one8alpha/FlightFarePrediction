# Flight Fare Prediction System (Roll No. 17)
Third Year B.Tech Computer Science and Engineering - Machine Learning Project (2026-27)

## 1. Project Title & Problem Statement
* **Title:** Domestic Flight Fare Prediction using Supervised Regression
* **Roll Number:** 17
* **Task Type:** Supervised Regression (Target: Price in INR ₹)
* **Problem:** Predict flight ticket prices based on airline carrier, route, timing, layover stops, and journey dates to assist consumers and travel platforms.

## 2. Dataset Information
* **Source:** Indian Domestic Airline Benchmark Dataset (UCI ML / Kaggle)
* **Original Dimensions:** 10,683 rows × 11 features
* **Post-Cleaning Dimensions:** 10,462 rows (220 duplicates removed, 1 missing row purged)
* **Engineered Features:** 29 variables after temporal extraction and One-Hot Encoding

## 3. Machine Learning Pipeline
1. Data Ingestion & Preprocessing (duplicate purge, missing value drop)
2. Feature Engineering (Date_of_Journey → Journey_Day, Journey_Month; Duration → Duration_Mins)
3. Exploratory Data Analysis (5 statistical distribution plots & observations)
4. Train-Test Split (80% Train: 8,369 rows / 20% Test: 2,093 rows, random_state=42)
5. Algorithm Comparison (Linear Regression, Decision Tree, Random Forest, Gradient Boosting)
6. Hyperparameter Optimization via RandomizedSearchCV
7. Front-End Deployment (Streamlit / React web application)

## 4. Experimental Results Summary
| Model | MAE (₹) | RMSE (₹) | R² Score |
|---|---|---|---|
| Multiple Linear Regression | ₹1,938.45 | ₹2,800.37 | 0.6184 |
| Decision Tree Regressor | ₹1,365.12 | ₹2,328.08 | 0.7362 |
| Random Forest (Default) | ₹1,175.80 | ₹1,994.99 | 0.8063 |
| Gradient Boosting | ₹1,120.35 | ₹1,850.00 | 0.8334 |
| **Tuned Random Forest (Selected)** | **₹1,024.18** | **₹1,660.00** | **0.8659** |

## 5. Installation & Execution
```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Train and serialize model
python train.py

# 3. Launch interactive web front end
streamlit run app.py
```
