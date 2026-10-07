import { useState, useMemo } from "react"

// ==========================================
// Types
// ==========================================
interface TaskItem {
  id: string
  title: string
  description: string
  timeEst: string
}

interface PhaseData {
  phaseNumber: number
  title: string
  subtitle: string
  fileName: string
  codeSnippet: string
  expectedOutcome: {
    headline: string
    deliverable: string
    businessValue: string
  }
  metrics: {
    label: string
    value: string
    change?: string
    isGood?: boolean
  }[]
  datasetTelemetry: {
    title: string
    rows: { key: string; value: string }[]
    logMessage: string
  }
  tasks: TaskItem[]
}

interface ProjectData {
  id: string
  title: string
  subtitle: string
  paradigm: string
  paradigmBadge: {
    bg: string
    border: string
    text: string
  }
  techStack: string[]
  datasetName: string
  datasetStats: string
  rankedGap: string
  evidenceArtifact: string
  expectedTime: string
  whyThisProject: string
  phases: PhaseData[]
}

// ==========================================
// Embedded Data Science Projects Data
// ==========================================
const DATA_SCIENCE_PROJECTS: ProjectData[] = [
  {
    id: "churn-predictor",
    title: "Customer Churn Predictor",
    subtitle: "Predict subscriber churn before termination with calibrated probability scoring",
    paradigm: "Supervised Classification",
    paradigmBadge: {
      bg: "bg-emerald-950/70",
      border: "border-emerald-600/50",
      text: "text-emerald-400",
    },
    techStack: ["Python", "Scikit-Learn", "Pandas", "Seaborn"],
    datasetName: "telecom_customer_churn_cohort.csv",
    datasetStats: "12,450 records • 24 attributes • 26.6% churn baseline",
    rankedGap: "Imbalanced Classification & Decision Threshold Calibration",
    evidenceArtifact: "churn_inference_pipeline.joblib + AUC-ROC 0.892 validation report",
    expectedTime: "6–8 hours",
    whyThisProject:
      "Isolates class imbalance and cost-sensitive classification trade-offs to produce verifiable evidence of business retention optimization.",
    phases: [
      {
        phaseNumber: 1,
        title: "Data Ingestion & Hygiene",
        subtitle: "Handling nulls, parsing numerical types, and domain constraint audits",
        fileName: "01_data_ingest_hygiene.py",
        codeSnippet: `import pandas as pd
import numpy as np

# 1. Ingest customer retention records
df = pd.read_csv('data/telecom_customer_churn_cohort.csv')
print(f"[INGEST] Raw records: {df.shape[0]:,} rows x {df.shape[1]} columns")

# 2. Parse TotalCharges to numeric & median-impute missing values
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
null_charges_count = df['TotalCharges'].isnull().sum()
df['TotalCharges'] = df['TotalCharges'].fillna(df['TotalCharges'].median())

# 3. Enforce valid domain bounds & cast categorical types
df = df[df['tenure'] >= 0]
df['SeniorCitizen'] = df['SeniorCitizen'].astype('category')
df['ChurnBinary'] = df['Churn'].map({'No': 0, 'Yes': 1})

print(f"[CLEAN] Imputed {null_charges_count} nulls. Zero missing values remaining.")
print(f"[BALANCE] Target distribution: {df['ChurnBinary'].mean():.1%} churned")`,
        expectedOutcome: {
          headline: "Type-Sanitized & Audited Base DataFrame",
          deliverable: "Cleaned tabular dataset with zero null entries, verified positive tenure values, and explicit categorical schema.",
          businessValue: "Eliminates downstream pipeline breaks caused by silent type coercion and string-formatted numeric fields.",
        },
        metrics: [
          { label: "Missing Values", value: "0", change: "-348 imputed", isGood: true },
          { label: "Dataset Shape", value: "12,450 x 24", change: "100% verified", isGood: true },
          { label: "Churn Rate", value: "26.6%", change: "Imbalanced class", isGood: false },
          { label: "Memory Footprint", value: "2.1 MB", change: "-28% optimized", isGood: true },
        ],
        datasetTelemetry: {
          title: "Schema Inspection & Null Audit",
          rows: [
            { key: "TotalRecords", value: "12,450 rows" },
            { key: "TotalCharges Nulls", value: "0 (348 median-imputed)" },
            { key: "Negative Tenure Outliers", value: "0 detected" },
            { key: "Target Class Ratio", value: "73.4% Retained / 26.6% Churned" },
            { key: "Memory Usage", value: "2,142 KB (reduced from 2,980 KB)" },
          ],
          logMessage: "[SUCCESS] Ingestion & hygiene stage passed. 24 columns parsed with 0 invalid records.",
        },
        tasks: [
          {
            id: "cp-t1",
            title: "Ingest CSV and inspect column schema types",
            description: "Load dataset, verify column datatypes, and run df.info() summary",
            timeEst: "45 mins",
          },
          {
            id: "cp-t2",
            title: "Handle and impute missing numerical values",
            description: "Coerce TotalCharges strings to float and impute with median",
            timeEst: "60 mins",
          },
          {
            id: "cp-t3",
            title: "Enforce domain constraints & filter anomalies",
            description: "Ensure tenure >= 0 and convert binary indicators into categories",
            timeEst: "45 mins",
          },
        ],
      },
      {
        phaseNumber: 2,
        title: "Feature Engineering",
        subtitle: "Scaling, one-hot encoding, and customer tenure interaction features",
        fileName: "02_feature_pipeline.py",
        codeSnippet: `from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer

# 1. Synthesize domain behavioral interaction features
df['ChargePerTenure'] = df['MonthlyCharges'] / (df['tenure'] + 1)
df['HasMultipleServices'] = ((df['PhoneService'] == 'Yes') & 
                             (df['InternetService'] != 'No')).astype(int)

# 2. Define orthogonal transformation pipeline
numeric_features = ['tenure', 'MonthlyCharges', 'TotalCharges', 'ChargePerTenure']
categorical_features = ['Contract', 'PaymentMethod', 'InternetService', 'TechSupport']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(drop='first', sparse_output=False), categorical_features)
    ]
)

X = preprocessor.fit_transform(df)
y = df['ChurnBinary'].values
print(f"[TRANSFORM] Matrix generated: {X.shape[1]} engineered features")`,
        expectedOutcome: {
          headline: "Standardized & Encoded Feature Matrix",
          deliverable: "Preprocessed numerical array with scaled continuous attributes and dummy-encoded categorical indicators.",
          businessValue: "Surfaces strong retention signals like contract term duration and billing velocity before model fitting.",
        },
        metrics: [
          { label: "Engineered Features", value: "28", change: "+8 from raw", isGood: true },
          { label: "Max Correlation", value: "-0.42", change: "Contract_TwoYear", isGood: true },
          { label: "Max VIF Index", value: "3.8", change: "No collinearity", isGood: true },
          { label: "Encoding Sparsity", value: "14.2%", change: "Dense format", isGood: true },
        ],
        datasetTelemetry: {
          title: "Feature Transformation Matrix",
          rows: [
            { key: "Continuous Scaler", value: "StandardScaler (Mean=0, Std=1)" },
            { key: "Categorical Encoding", value: "OneHotEncoder (drop='first')" },
            { key: "Interaction Features", value: "ChargePerTenure, HasMultipleServices" },
            { key: "Top Negative Correlator", value: "Contract_TwoYear (r = -0.42)" },
            { key: "Top Positive Correlator", value: "TechSupport_No (r = +0.34)" },
          ],
          logMessage: "[SUCCESS] Feature pipeline fitted. 28 orthogonal columns ready for stratified cross-validation.",
        },
        tasks: [
          {
            id: "cp-t4",
            title: "Synthesize domain interaction features",
            description: "Compute ChargePerTenure ratio and multi-service adoption flag",
            timeEst: "60 mins",
          },
          {
            id: "cp-t5",
            title: "Standardize continuous numerical variables",
            description: "Apply StandardScaler across tenure and billing metrics",
            timeEst: "45 mins",
          },
          {
            id: "cp-t6",
            title: "Apply One-Hot Encoding to categorical variables",
            description: "Transform Contract, PaymentMethod, and Support tiers without dummy trap",
            timeEst: "60 mins",
          },
        ],
      },
      {
        phaseNumber: 3,
        title: "Model Training & Cross-Validation",
        subtitle: "Stratified 5-fold CV, class-weight balancing, and hyperparameter tuning",
        fileName: "03_model_train_cv.py",
        codeSnippet: `from sklearn.model_selection import StratifiedKFold, cross_validate
from sklearn.ensemble import GradientBoostingClassifier

# 1. Preserve 26.6% churn distribution across all 5 evaluation splits
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# 2. Gradient Boosting estimator with regularization
model = GradientBoostingClassifier(
    n_estimators=180,
    learning_rate=0.08,
    max_depth=4,
    subsample=0.85,
    random_state=42
)

# 3. Multi-metric cross-validation audit
scoring = ['roc_auc', 'recall', 'precision', 'f1']
cv_results = cross_validate(model, X, y, cv=cv, scoring=scoring, n_jobs=-1)

print(f"[CV 5-FOLD] Mean ROC-AUC : {cv_results['test_roc_auc'].mean():.4f} (+/- {cv_results['test_roc_auc'].std():.3f})")
print(f"[CV 5-FOLD] Mean Recall  : {cv_results['test_recall'].mean():.4f}")
print(f"[CV 5-FOLD] Mean F1 Score: {cv_results['test_f1'].mean():.4f}")`,
        expectedOutcome: {
          headline: "Validated Gradient Boosting Classifier",
          deliverable: "Generalizable ensemble model proven across 5 unseen folds without lookahead bias or data leakage.",
          businessValue: "Accurately ranks subscribers by churn vulnerability so retention teams target high-risk clients first.",
        },
        metrics: [
          { label: "Mean ROC-AUC", value: "0.892", change: "±0.012 std", isGood: true },
          { label: "Recall Rate", value: "82.6%", change: "+14.2% vs baseline", isGood: true },
          { label: "Precision Rate", value: "79.4%", change: "Calibrated", isGood: true },
          { label: "Mean F1 Score", value: "0.810", change: "Balanced", isGood: true },
        ],
        datasetTelemetry: {
          title: "5-Fold Stratified Cross-Validation Summary",
          rows: [
            { key: "Estimator", value: "GradientBoostingClassifier (n=180, depth=4)" },
            { key: "Fold 1 ROC-AUC", value: "0.895" },
            { key: "Fold 2 ROC-AUC", value: "0.888" },
            { key: "Fold 3 ROC-AUC", value: "0.899" },
            { key: "Fold 4 ROC-AUC", value: "0.887" },
            { key: "Fold 5 ROC-AUC", value: "0.891" },
          ],
          logMessage: "[SUCCESS] 5-Fold cross-validation completed. Model demonstrates low variance across partitions.",
        },
        tasks: [
          {
            id: "cp-t7",
            title: "Configure StratifiedKFold split generator",
            description: "Guarantee consistent 26.6% class representation across all 5 test partitions",
            timeEst: "45 mins",
          },
          {
            id: "cp-t8",
            title: "Fit Gradient Boosting with hyperparameter grid",
            description: "Tune learning rate (0.08) and tree depth (4) to prevent overfitting",
            timeEst: "90 mins",
          },
          {
            id: "cp-t9",
            title: "Compute multi-metric cross-validation scores",
            description: "Record ROC-AUC, Precision, Recall, and F1 variance across folds",
            timeEst: "60 mins",
          },
        ],
      },
      {
        phaseNumber: 4,
        title: "Evaluation & Deployment",
        subtitle: "Decision threshold optimization (0.38), SHAP interpretability, and pipeline bundle",
        fileName: "04_evaluate_and_deploy.py",
        codeSnippet: `import joblib
from sklearn.metrics import classification_report, roc_auc_score

# 1. Cost-sensitive decision threshold optimization
# Setting threshold to 0.38 optimizes customer retention intervention ROI
y_probs = model.predict_proba(X)[:, 1]
optimal_threshold = 0.38
y_pred_calibrated = (y_probs >= optimal_threshold).astype(int)

print(classification_report(y, y_pred_calibrated, target_names=['Retain', 'Churn']))
print(f"[HOLDOUT] Final AUC-ROC Score: {roc_auc_score(y, y_probs):.4f}")

# 2. Package unified production bundle for automated inference
deployment_payload = {
    'preprocessor': preprocessor,
    'model': model,
    'optimal_threshold': optimal_threshold,
    'version': '1.0.0-prod',
    'input_features': numeric_features + categorical_features
}

joblib.dump(deployment_payload, 'models/churn_inference_pipeline.joblib')
print("[DEPLOY] Saved serial bundle: models/churn_inference_pipeline.joblib")`,
        expectedOutcome: {
          headline: "Serialized Production Inference Artifact",
          deliverable: "Joblib bundle containing preprocessor, calibrated model, and 0.38 decision threshold wrapper.",
          businessValue: "Reduces false negatives by 65%, preventing $120k in projected annual recurring revenue loss.",
        },
        metrics: [
          { label: "Optimal Threshold", value: "0.38", change: "Cost-sensitive", isGood: true },
          { label: "False Negative Drop", value: "-65.8%", change: "High capture", isGood: true },
          { label: "Inference Latency", value: "11.4 ms", change: "Per prediction", isGood: true },
          { label: "Projected ARR Save", value: "$124,000", change: "Annualized", isGood: true },
        ],
        datasetTelemetry: {
          title: "Production Deployment Telemetry",
          rows: [
            { key: "Bundle Path", value: "models/churn_inference_pipeline.joblib" },
            { key: "Artifact Size", value: "4.8 MB" },
            { key: "Decision Threshold", value: "0.38 (vs default 0.50)" },
            { key: "Single-sample Latency", value: "11.4 ms" },
            { key: "Batch Throughput", value: "4,200 inferences/sec" },
          ],
          logMessage: "[SUCCESS] Artifact serialized and verified. Pipeline ready for automated daily CRM scoring.",
        },
        tasks: [
          {
            id: "cp-t10",
            title: "Plot precision-recall curve & calibrate threshold",
            description: "Shift decision boundary from 0.50 to 0.38 to maximize recall for high-value clients",
            timeEst: "60 mins",
          },
          {
            id: "cp-t11",
            title: "Generate feature importance ranking",
            description: "Extract Gini importance to prove key drivers behind churn predictions",
            timeEst: "45 mins",
          },
          {
            id: "cp-t12",
            title: "Serialize complete joblib inference pipeline",
            description: "Export preprocessor, tuned model, and metadata as single deployable bundle",
            timeEst: "45 mins",
          },
        ],
      },
    ],
  },
  {
    id: "sales-forecasting",
    title: "Retail Sales Forecasting",
    subtitle: "Forecast multi-store demand with autoregressive lags, seasonality, and XGBoost",
    paradigm: "Time Series & Regression",
    paradigmBadge: {
      bg: "bg-amber-950/70",
      border: "border-amber-600/50",
      text: "text-amber-400",
    },
    techStack: ["Statsmodels", "XGBoost", "SQL", "Pandas"],
    datasetName: "retail_weekly_sales_multistore.csv",
    datasetStats: "421,570 weekly observations • 140 store clusters • 156 consecutive weeks",
    rankedGap: "Lag Feature Engineering & Seasonality Decomposition",
    evidenceArtifact: "retail_demand_forecaster.py + MAPE 5.82% validation benchmark",
    expectedTime: "7–9 hours",
    whyThisProject:
      "Bridges traditional SQL queries and modern gradient boosting for temporal forecasting without future-data leakage.",
    phases: [
      {
        phaseNumber: 1,
        title: "Data Ingestion & Hygiene",
        subtitle: "Parsing datetime indexes, temporal continuity audit, and ADF stationarity tests",
        fileName: "01_timeseries_ingest.py",
        codeSnippet: `import pandas as pd
from statsmodels.tsa.stattools import adfuller

# 1. Ingest multi-store sales data with datetime indexing
df = pd.read_csv('data/retail_weekly_sales_multistore.csv', parse_dates=['Date'])
df = df.sort_values(['Store', 'Dept', 'Date']).set_index('Date')
print(f"[INGEST] Records loaded: {len(df):,} weekly time points")

# 2. Audit temporal gaps and apply time-spline interpolation
df['Weekly_Sales'] = df.groupby(['Store', 'Dept'])['Weekly_Sales'].transform(
    lambda s: s.interpolate(method='time')
)

# 3. Augmented Dickey-Fuller stationarity check
adf_test = adfuller(df['Weekly_Sales'].dropna().sample(20000, random_state=42))
print(f"[STATIONARITY] ADF Statistic: {adf_test[0]:.4f}")
print(f"[STATIONARITY] p-value      : {adf_test[1]:.4e} (Stationary: p < 0.05)")`,
        expectedOutcome: {
          headline: "Gap-Free Stationary Time Series Index",
          deliverable: "Regularized weekly sales series indexed chronologically with interpolated missing dates.",
          businessValue: "Guarantees rolling window algorithms have strictly continuous temporal step sizes.",
        },
        metrics: [
          { label: "Total Observations", value: "421,570", change: "156 weeks", isGood: true },
          { label: "Temporal Gaps", value: "0", change: "42 interpolated", isGood: true },
          { label: "ADF p-value", value: "0.00018", change: "p < 0.05 pass", isGood: true },
          { label: "Store Clusters", value: "140", change: "Analyzed", isGood: true },
        ],
        datasetTelemetry: {
          title: "Temporal Series Audit",
          rows: [
            { key: "Date Span", value: "2022-01-07 to 2024-12-28 (156 weeks)" },
            { key: "Sampling Frequency", value: "Weekly (W-FRI)" },
            { key: "Missing Timestamps Filled", value: "42 records (Linear Spline)" },
            { key: "ADF Test Result", value: "Stationary (Reject Unit Root Null)" },
            { key: "Total Store Units", value: "140 Store Units across 45 Depts" },
          ],
          logMessage: "[SUCCESS] Time series index regularized with zero temporal gaps. Stationarity confirmed.",
        },
        tasks: [
          {
            id: "rf-t1",
            title: "Parse datetime timestamps and set temporal index",
            description: "Load dataset with parse_dates=['Date'] and verify chronologic sorting",
            timeEst: "45 mins",
          },
          {
            id: "rf-t2",
            title: "Interpolate missing holiday weekly intervals",
            description: "Use time-based spline interpolation for missing promotional sales data",
            timeEst: "60 mins",
          },
          {
            id: "rf-t3",
            title: "Execute Augmented Dickey-Fuller (ADF) test",
            description: "Evaluate p-value to confirm series stationarity before building lag features",
            timeEst: "45 mins",
          },
        ],
      },
      {
        phaseNumber: 2,
        title: "Feature Engineering",
        subtitle: "Multi-period autoregressive lags (1, 4, 52), rolling EMAs, and cyclical encoding",
        fileName: "02_lag_feature_engineering.py",
        codeSnippet: `import numpy as np

# 1. Cyclical calendar encodings (Sine/Cosine for week of year)
week_nums = df.index.isocalendar().week
df['week_sin'] = np.sin(2 * np.pi * week_nums / 52)
df['week_cos'] = np.cos(2 * np.pi * week_nums / 52)

# 2. Autoregressive lags (prior week, prior month, prior year)
for lag in [1, 2, 4, 12, 52]:
    df[f'sales_lag_{lag}'] = df.groupby(['Store', 'Dept'])['Weekly_Sales'].shift(lag)

# 3. Rolling window summary statistics (Exponential Moving Average)
df['rolling_mean_4w'] = df.groupby(['Store', 'Dept'])['Weekly_Sales'].transform(
    lambda s: s.shift(1).rolling(4).mean()
)
df['rolling_std_4w'] = df.groupby(['Store', 'Dept'])['Weekly_Sales'].transform(
    lambda s: s.shift(1).rolling(4).std()
)

# Drop initial 52-week lag warmup rows
df_features = df.dropna()
print(f"[FEATURES] Extracted {df_features.shape[1]} engineered features without lookahead")`,
        expectedOutcome: {
          headline: "Autoregressive Lag & Seasonality Matrix",
          deliverable: "Enriched tabular matrix containing historical lag shifts, rolling momentum, and cyclical week features.",
          businessValue: "Captures annual holiday surges and seasonal trends without future data leakage.",
        },
        metrics: [
          { label: "Lag Features", value: "34", change: "1 to 52 weeks", isGood: true },
          { label: "Annual Autocorr", value: "+0.76", change: "Strong 52w lag", isGood: true },
          { label: "Lookahead Leakage", value: "0.0%", change: "Shifted t-1", isGood: true },
          { label: "Rolling Windows", value: "4w & 12w", change: "Trend/EMA", isGood: true },
        ],
        datasetTelemetry: {
          title: "Lag Correlation & Autoregressive Signals",
          rows: [
            { key: "Lag 1 Autocorrelation", value: "+0.84 (High weekly inertia)" },
            { key: "Lag 52 Autocorrelation", value: "+0.76 (Clear annual seasonality)" },
            { key: "Rolling Windows", value: "4-week EMA, 12-week SMA" },
            { key: "Cyclical Features", value: "week_sin, week_cos (52-week cycle)" },
            { key: "Exogenous Variables", value: "FuelPrice, CPI, UnemploymentRate" },
          ],
          logMessage: "[SUCCESS] 34 temporal feature vectors engineered with strict shift(1) isolation.",
        },
        tasks: [
          {
            id: "rf-t4",
            title: "Synthesize cyclical calendar sine/cosine features",
            description: "Map 52-week calendar cycle onto continuous harmonic circle",
            timeEst: "45 mins",
          },
          {
            id: "rf-t5",
            title: "Construct multi-period lag variables (1, 4, 52)",
            description: "Apply grouped shifts to isolate weekly, monthly, and yearly autoregression",
            timeEst: "60 mins",
          },
          {
            id: "rf-t6",
            title: "Compute rolling exponential moving averages",
            description: "Calculate 4-week and 12-week rolling volatility with strictly lagged windows",
            timeEst: "60 mins",
          },
        ],
      },
      {
        phaseNumber: 3,
        title: "Model Training & Cross-Validation",
        subtitle: "Expanding-window TimeSeriesSplit, XGBoost Tweedie regression, and hyperparameter tuning",
        fileName: "03_xgboost_timeseries_cv.py",
        codeSnippet: `from sklearn.model_selection import TimeSeriesSplit
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_percentage_error, mean_squared_error

# 1. Forward-chaining temporal cross-validation (5 expanding splits)
tscv = TimeSeriesSplit(n_splits=5, test_size=12) # 12-week forecast horizon

# 2. Configured XGBoost with Huber objective for outlier resistance
model = XGBRegressor(
    n_estimators=320,
    learning_rate=0.04,
    max_depth=6,
    subsample=0.85,
    colsample_bytree=0.80,
    random_state=42
)

# 3. Expanding window validation loop
mape_scores = []
for split_idx, (train_idx, test_idx) in enumerate(tscv.split(X)):
    model.fit(X.iloc[train_idx], y.iloc[train_idx])
    preds = model.predict(X.iloc[test_idx])
    split_mape = mean_absolute_percentage_error(y.iloc[test_idx], preds)
    mape_scores.append(split_mape)
    print(f"[SPLIT {split_idx+1}] 12-week Forecast MAPE: {split_mape*100:.2f}%")

print(f"[MEAN CV MAPE] {np.mean(mape_scores)*100:.2f}% across all forward folds")`,
        expectedOutcome: {
          headline: "Validated Expanding-Window XGBoost Regressor",
          deliverable: "Gradient boosted tree model evaluated on 5 successive temporal test windows.",
          businessValue: "Outperforms legacy moving average methods by 42%, maintaining under 6% forecast error.",
        },
        metrics: [
          { label: "Mean CV MAPE", value: "5.82%", change: "< 10% benchmark", isGood: true },
          { label: "Holdout R² Score", value: "0.941", change: "+0.28 vs baseline", isGood: true },
          { label: "RMSE Reduction", value: "-62.4%", change: "vs Moving Avg", isGood: true },
          { label: "Training Time", value: "14.2s", change: "GPU accelerated", isGood: true },
        ],
        datasetTelemetry: {
          title: "Expanding-Window Cross-Validation Folds",
          rows: [
            { key: "Split 1 (Weeks 1-108 -> 109-120)", value: "MAPE: 6.14%" },
            { key: "Split 2 (Weeks 1-120 -> 121-132)", value: "MAPE: 5.72%" },
            { key: "Split 3 (Weeks 1-132 -> 133-144)", value: "MAPE: 5.91%" },
            { key: "Split 4 (Weeks 1-144 -> 145-156)", value: "MAPE: 5.51%" },
            { key: "Overall 5-Split Mean", value: "MAPE: 5.82% (R² = 0.941)" },
          ],
          logMessage: "[SUCCESS] Forward-chaining validation passed. Zero temporal leakage confirmed.",
        },
        tasks: [
          {
            id: "rf-t7",
            title: "Implement TimeSeriesSplit forward-chaining generator",
            description: "Set up 5 expanding window partitions with 12-week testing horizon",
            timeEst: "60 mins",
          },
          {
            id: "rf-t8",
            title: "Configure and train XGBoost Regressor",
            description: "Tune subsample (0.85) and colsample (0.80) to handle weekly demand volatility",
            timeEst: "90 mins",
          },
          {
            id: "rf-t9",
            title: "Compute MAPE and RMSE across all splits",
            description: "Record Mean Absolute Percentage Error benchmark against naive forecasting",
            timeEst: "60 mins",
          },
        ],
      },
      {
        phaseNumber: 4,
        title: "Evaluation & Deployment",
        subtitle: "12-week recursive forecasting, 90% confidence bands, and SQL batch inference export",
        fileName: "04_deploy_forecaster.py",
        codeSnippet: `import joblib

# 1. Generate 12-week rolling forecast with 90% prediction intervals
# Quantile regression bounds for supply chain safety stock buffer
q_low = XGBRegressor(objective='reg:quantileerror', quantile_alpha=0.10).fit(X, y)
q_high = XGBRegressor(objective='reg:quantileerror', quantile_alpha=0.90).fit(X, y)

future_p50 = model.predict(X_future_12w)
future_p10 = q_low.predict(X_future_12w)
future_p90 = q_high.predict(X_future_12w)

print(f"[FORECAST] Projected Q1 demand: USD {future_p50.sum():,.2f}")
print(f"[BOUNDS] 90% Safety Stock Interval: [USD {future_p10.sum():,.2f} - USD {future_p90.sum():,.2f}]")

# 2. Export deployable prediction engine
joblib.dump({
    'model': model,
    'q_low': q_low,
    'q_high': q_high,
    'mape_benchmark': 0.0582
}, 'models/retail_demand_forecaster.joblib')
print("[DEPLOY] Exported models/retail_demand_forecaster.joblib")`,
        expectedOutcome: {
          headline: "Automated 12-Week Demand Planning Pipeline",
          deliverable: "Model artifact with quantile prediction bands generating automated weekly order forecasts.",
          businessValue: "Reduces inventory holding costs by 14.2% while decreasing out-of-stock events by 28%.",
        },
        metrics: [
          { label: "Inventory Cost Save", value: "-14.2%", change: "Optimized buffer", isGood: true },
          { label: "Stockout Reduction", value: "-28.0%", change: "Safety stock", isGood: true },
          { label: "Batch Scoring Time", value: "3.2s", change: "140 store clusters", isGood: true },
          { label: "Prediction Interval", value: "90%", change: "Quantile bounds", isGood: true },
        ],
        datasetTelemetry: {
          title: "Operational Logistics Forecast",
          rows: [
            { key: "Pipeline Model", value: "retail_demand_forecaster.joblib" },
            { key: "Prediction Horizon", value: "12 weeks forward (Recursive)" },
            { key: "Safety Stock Margin", value: "P90 - P50 Demand Buffer" },
            { key: "Weekly Batch Execution", value: "Every Sunday 02:00 AM via cron" },
            { key: "Output Target", value: "PostgreSQL warehouse / ERP table" },
          ],
          logMessage: "[SUCCESS] Forecaster deployed. Production supply chain batches scheduled.",
        },
        tasks: [
          {
            id: "rf-t10",
            title: "Construct quantile regression models (P10 and P90)",
            description: "Train upper and lower prediction interval bounds for safety stock calculation",
            timeEst: "60 mins",
          },
          {
            id: "rf-t11",
            title: "Simulate 12-week recursive forward rollout",
            description: "Generate recursive multistep forecasts feeding t-1 predictions into next lag",
            timeEst: "75 mins",
          },
          {
            id: "rf-t12",
            title: "Package batch inference execution script",
            description: "Build command-line runner that outputs weekly store demand CSVs",
            timeEst: "45 mins",
          },
        ],
      },
    ],
  },
  {
    id: "nlp-sentiment",
    title: "NLP Customer Sentiment Analyzer",
    subtitle: "Classify feedback text with RoBERTa transformers, tokenization, and ONNX quantization",
    paradigm: "Natural Language Processing",
    paradigmBadge: {
      bg: "bg-cyan-950/70",
      border: "border-cyan-600/50",
      text: "text-cyan-400",
    },
    techStack: ["NLTK", "Transformers", "PyTorch", "Scikit-Learn"],
    datasetName: "customer_reviews_sentiment_corpus.csv",
    datasetStats: "45,000 text reviews • 3 sentiment tiers • 18.4k vocabulary lemmas",
    rankedGap: "Subword Tokenization & Transformer Fine-Tuning",
    evidenceArtifact: "sentiment_roberta_pipeline.onnx + Macro F1 0.914 benchmark",
    expectedTime: "8–10 hours",
    whyThisProject:
      "Modernizes traditional NLP with deep transformer fine-tuning, attention masks, and edge ONNX runtime export.",
    phases: [
      {
        phaseNumber: 1,
        title: "Data Ingestion & Hygiene",
        subtitle: "Stripping HTML, contraction expansion, negation preservation, and emoji decoding",
        fileName: "01_text_hygiene.py",
        codeSnippet: `import re
import pandas as pd

# 1. Ingest multi-channel customer review texts
df = pd.read_csv('data/customer_reviews_sentiment_corpus.csv')
print(f"[INGEST] Loaded {len(df):,} customer reviews")

# 2. Sanitize raw text while preserving sentiment negations
def clean_sentiment_text(text):
    text = re.sub(r'<.*?>|http\\S+', '', str(text)) # Strip tags & URLs
    text = re.sub(r"won\'t", "will not", text)
    text = re.sub(r"can\'t", "cannot", text)
    text = re.sub(r"n\'t", " not", text)            # Preserve negation context
    text = re.sub(r'[^\\w\\s\\.\\?!]', '', text)     # Strip non-alphanumeric noise
    return re.sub(r'\\s+', ' ', text).strip()

df['cleaned_text'] = df['raw_text'].apply(clean_sentiment_text)
df = df.drop_duplicates(subset=['cleaned_text'])

print(f"[HYGIENE] De-duplicated corpus: {len(df):,} unique reviews")
print(f"[SAMPLE] {df['cleaned_text'].iloc[0][:90]}...")`,
        expectedOutcome: {
          headline: "Sanitized Sentiment Text Corpus",
          deliverable: "De-duplicated text dataframe with clean contractions, stripped HTML, and preserved negation tokens.",
          businessValue: "Prevents false positive sentiment misclassifications by preserving critical negations like 'not good'.",
        },
        metrics: [
          { label: "Unique Reviews", value: "43,820", change: "-1,180 duplicates", isGood: true },
          { label: "Avg Word Count", value: "46 words", change: "268 chars", isGood: true },
          { label: "Positive Class", value: "58.2%", change: "Dominant tier", isGood: false },
          { label: "Negative Class", value: "24.1%", change: "Target signal", isGood: true },
        ],
        datasetTelemetry: {
          title: "Corpus Text Statistics",
          rows: [
            { key: "Raw Ingested Records", value: "45,000 reviews" },
            { key: "Duplicates Removed", value: "1,180 records" },
            { key: "Negation Preserved", value: "100% ('cannot', 'not', 'never')" },
            { key: "Class Split", value: "58% Positive / 18% Neutral / 24% Negative" },
            { key: "Avg Tokens per Sample", value: "46.2 words" },
          ],
          logMessage: "[SUCCESS] Text sanitization completed. Contractions normalized and negations protected.",
        },
        tasks: [
          {
            id: "nlp-t1",
            title: "Strip HTML tags, URLs, and escape artifacts",
            description: "Use regular expressions to cleanse text without altering punctuation rhythm",
            timeEst: "45 mins",
          },
          {
            id: "nlp-t2",
            title: "Standardize contractions while retaining negations",
            description: "Map can't -> cannot and won't -> will not so sentiment cues are clear",
            timeEst: "60 mins",
          },
          {
            id: "nlp-t3",
            title: "Filter duplicate posts and compute word distribution",
            description: "Remove duplicate submissions and verify sentence length stats",
            timeEst: "45 mins",
          },
        ],
      },
      {
        phaseNumber: 2,
        title: "Feature Engineering",
        subtitle: "Subword Byte-Pair Encoding tokenization, attention masks, and PyTorch dataset batching",
        fileName: "02_roberta_tokenization.py",
        codeSnippet: `import torch
from transformers import AutoTokenizer

# 1. Load domain-tuned RoBERTa tokenizer
checkpoint = "cardiffnlp/twitter-roberta-base-sentiment-latest"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)

# 2. Tokenize text into subwords with dynamic padding & truncation
encoded_batch = tokenizer(
    df['cleaned_text'].tolist()[:10000],
    padding="max_length",
    truncation=True,
    max_length=128,
    return_tensors="pt"
)

input_ids = encoded_batch['input_ids']
attention_mask = encoded_batch['attention_mask']

print(f"[TOKENIZER] Input IDs shape     : {input_ids.shape}")
print(f"[TOKENIZER] Attention Mask shape: {attention_mask.shape}")
print(f"[VOCABULARY] WordPiece Vocab size: {tokenizer.vocab_size:,} subwords")`,
        expectedOutcome: {
          headline: "PyTorch Subword Tensor Pipeline",
          deliverable: "Fixed-width 128-token tensor tensors with boolean attention masks ready for GPU forward pass.",
          businessValue: "Eliminates out-of-vocabulary words using subword Byte-Pair Encoding for slang and misspellings.",
        },
        metrics: [
          { label: "Token Max Length", value: "128", change: "Subword limit", isGood: true },
          { label: "Vocabulary Size", value: "50,265", change: "BPE subwords", isGood: true },
          { label: "Truncated Ratio", value: "< 1.8%", change: "Zero signal loss", isGood: true },
          { label: "Batch Memory", value: "1.1 GB", change: "FP16 optimized", isGood: true },
        ],
        datasetTelemetry: {
          title: "Transformer Tokenizer Telemetry",
          rows: [
            { key: "Architecture", value: "RoBERTa (Byte-Pair Encoding)" },
            { key: "Max Sequence Length", value: "128 subwords" },
            { key: "Embedding Dimension", value: "768 latent dimensions" },
            { key: "Truncated Reviews", value: "1.8% of long multi-paragraph texts" },
            { key: "PyTorch Tensor Type", value: "torch.int64 (input_ids, attention_mask)" },
          ],
          logMessage: "[SUCCESS] Subword tokenization batching fitted. 128-token tensors constructed.",
        },
        tasks: [
          {
            id: "nlp-t4",
            title: "Initialize RoBERTa pre-trained tokenizer",
            description: "Load AutoTokenizer and inspect Byte-Pair Encoding subword dictionary",
            timeEst: "45 mins",
          },
          {
            id: "nlp-t5",
            title: "Construct padded batches with attention masks",
            description: "Enforce max_length=128 with zero-padding and 1/0 attention tensors",
            timeEst: "60 mins",
          },
          {
            id: "nlp-t6",
            title: "Wrap into PyTorch TensorDataset & DataLoader",
            description: "Package input IDs, attention masks, and target labels into mini-batches of 32",
            timeEst: "60 mins",
          },
        ],
      },
      {
        phaseNumber: 3,
        title: "Model Training & Cross-Validation",
        subtitle: "Fine-tuning 3-class RoBERTa, AdamW optimizer with warmup, and Macro-F1 evaluation",
        fileName: "03_train_roberta_transformer.py",
        codeSnippet: `from transformers import AutoModelForSequenceClassification, TrainingArguments, Trainer
from sklearn.metrics import f1_score, accuracy_score
import numpy as np

# 1. Instantiate 3-class sentiment head (Negative, Neutral, Positive)
model = AutoModelForSequenceClassification.from_pretrained(
    checkpoint, num_labels=3
)

# 2. Multi-class metric computer
def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return {
        "accuracy": accuracy_score(labels, preds),
        "macro_f1": f1_score(labels, preds, average="macro")
    }

# 3. Fine-tuning arguments with weight decay
training_args = TrainingArguments(
    output_dir="./roberta_sentiment_out",
    num_train_epochs=3,
    per_device_train_batch_size=32,
    learning_rate=2e-5,
    weight_decay=0.01,
    evaluation_strategy="epoch",
    fp16=True
)

print("[TRAIN] Fine-tuning 3 epochs. Target Macro-F1 > 0.90 across all sentiment classes.")`,
        expectedOutcome: {
          headline: "Fine-Tuned RoBERTa Sentiment Classifier",
          deliverable: "Trained neural weights achieving 0.914 Macro-F1 across nuanced sentiment categories.",
          businessValue: "Recognizes sarcastic customer praise and subtle urgency that traditional n-gram models miss.",
        },
        metrics: [
          { label: "Macro F1 Score", value: "0.914", change: "+0.142 vs TF-IDF", isGood: true },
          { label: "Negative F1", value: "0.898", change: "Critical triage", isGood: true },
          { label: "Overall Accuracy", value: "92.3%", change: "Validated", isGood: true },
          { label: "Training Loss", value: "0.228", change: "Down from 1.042", isGood: true },
        ],
        datasetTelemetry: {
          title: "Epoch Validation & Performance Metrics",
          rows: [
            { key: "Epoch 1 Loss / Macro-F1", value: "Loss: 0.512 | Macro-F1: 0.864" },
            { key: "Epoch 2 Loss / Macro-F1", value: "Loss: 0.324 | Macro-F1: 0.898" },
            { key: "Epoch 3 Loss / Macro-F1", value: "Loss: 0.228 | Macro-F1: 0.914" },
            { key: "Baseline Comparison", value: "TF-IDF + Logistic Regression was 0.772" },
            { key: "Hardware Profile", value: "T4 GPU / 42s per epoch" },
          ],
          logMessage: "[SUCCESS] Fine-tuning converged. 0.914 Macro-F1 achieved with high negative recall.",
        },
        tasks: [
          {
            id: "nlp-t7",
            title: "Configure AdamW optimizer with linear decay",
            description: "Set learning rate to 2e-5 with 500-step warmup to prevent catastrophic forgetting",
            timeEst: "60 mins",
          },
          {
            id: "nlp-t8",
            title: "Execute 3-epoch fine-tuning loop on GPU",
            description: "Monitor cross-entropy loss and validation accuracy per epoch",
            timeEst: "90 mins",
          },
          {
            id: "nlp-t9",
            title: "Compute per-class Precision, Recall, and Macro-F1",
            description: "Evaluate holdout performance specifically on difficult negative reviews",
            timeEst: "60 mins",
          },
        ],
      },
      {
        phaseNumber: 4,
        title: "Evaluation & Deployment",
        subtitle: "ONNX Runtime INT8 quantization (4x compression) and sub-10ms REST inference handler",
        fileName: "04_onnx_quantization_deploy.py",
        codeSnippet: `import onnxruntime as ort
import numpy as np

# 1. Load INT8 quantized ONNX inference session
# Reduces model size from 498 MB down to 124 MB for microsecond latency
session = ort.InferenceSession("models/sentiment_roberta_quantized.onnx")

def predict_sentiment_live(review_text: str):
    tokens = tokenizer(
        review_text, return_tensors="np", truncation=True, max_length=128
    )
    ort_inputs = {k: v for k, v in tokens.items()}
    logits = session.run(None, ort_inputs)[0]
    
    # Softmax probabilities
    exp_logits = np.exp(logits)
    probs = exp_logits / np.sum(exp_logits, axis=-1, keepdims=True)
    labels = ["Negative", "Neutral", "Positive"]
    
    predicted_idx = int(np.argmax(probs))
    return {
        "sentiment": labels[predicted_idx],
        "confidence": float(probs[0][predicted_idx]),
        "negative_risk": float(probs[0][0])
    }

print("[LIVE TEST] 'The order arrived damaged and support was unresponsive'")
print(predict_sentiment_live("The order arrived damaged and support was unresponsive"))`,
        expectedOutcome: {
          headline: "Quantized ONNX High-Throughput Engine",
          deliverable: "INT8 compressed ONNX graph running on CPU with 8.4ms latency per text request.",
          businessValue: "Auto-routes urgent negative tickets directly to senior support within seconds of posting.",
        },
        metrics: [
          { label: "Model Size", value: "124 MB", change: "4x compressed", isGood: true },
          { label: "Inference Latency", value: "8.4 ms", change: "Sub-10ms edge", isGood: true },
          { label: "Escalation Recall", value: "96.2%", change: "Catches angry tickets", isGood: true },
          { label: "Throughput", value: "120 req/s", change: "Single vCPU", isGood: true },
        ],
        datasetTelemetry: {
          title: "Production Serving Benchmark",
          rows: [
            { key: "Runtime Engine", value: "ONNX Runtime (CPU INT8 Execution)" },
            { key: "Model Artifact", value: "sentiment_roberta_quantized.onnx" },
            { key: "Memory Resident", value: "148 MB RAM" },
            { key: "P99 Latency", value: "11.2 ms" },
            { key: "Triage Trigger", value: "Auto-escalate if negative_risk >= 0.70" },
          ],
          logMessage: "[SUCCESS] ONNX pipeline packaged. Sub-10ms inference ready for Zendesk webhooks.",
        },
        tasks: [
          {
            id: "nlp-t10",
            title: "Convert PyTorch model graph into ONNX format",
            description: "Export computational graph with dynamic batch and sequence axes",
            timeEst: "60 mins",
          },
          {
            id: "nlp-t11",
            title: "Apply INT8 dynamic quantization",
            description: "Compress model footprint from 498MB to 124MB with < 0.3% accuracy loss",
            timeEst: "45 mins",
          },
          {
            id: "nlp-t12",
            title: "Implement FastAPI REST prediction endpoint",
            description: "Build clean request handler with input validation and confidence reporting",
            timeEst: "45 mins",
          },
        ],
      },
    ],
  },
  {
    id: "employee-attrition",
    title: "Enterprise Employee Attrition & At-Risk Clustering",
    subtitle: "Identify retention flight risk segments via PCA reduction, K-Means++, and SAS Viya",
    paradigm: "Unsupervised Learning",
    paradigmBadge: {
      bg: "bg-purple-950/70",
      border: "border-purple-600/50",
      text: "text-purple-400",
    },
    techStack: ["K-Means", "PCA", "SAS Viya", "Scikit-Learn"],
    datasetName: "workforce_retention_telemetry.csv",
    datasetStats: "8,200 employee profiles • 38 behavioral vectors • 7 enterprise divisions",
    rankedGap: "Dimensionality Reduction & Silhouette Score Optimization",
    evidenceArtifact: "employee_cluster_segmentation.py + 4 Retention Personas Playbook",
    expectedTime: "7–9 hours",
    whyThisProject:
      "Combines multi-vector PCA dimensionality reduction with k-means clustering to turn HR telemetry into actionable retention archetypes.",
    phases: [
      {
        phaseNumber: 1,
        title: "Data Ingestion & Hygiene",
        subtitle: "PII anonymization, log-transforming compensation skew, and KNN missing survey imputation",
        fileName: "01_workforce_hygiene.py",
        codeSnippet: `import pandas as pd
import numpy as np
from sklearn.impute import KNNImputer

# 1. Ingest employee organization data
df = pd.read_csv('data/workforce_retention_telemetry.csv')
print(f"[INGEST] Loaded {len(df):,} workforce records across 38 features")

# 2. Anonymize PII identifiers for data privacy compliance
df = df.drop(columns=['EmployeeName', 'SSN', 'PersonalEmail', 'StreetAddress'], errors='ignore')

# 3. Correct extreme right-skew in compensation and bonus metrics
df['log_MonthlyIncome'] = np.log1p(df['MonthlyIncome'])

# 4. KNN Imputation for incomplete annual engagement survey fields
survey_cols = ['JobSatisfaction', 'WorkLifeBalance', 'ManagerRelationship']
imputer = KNNImputer(n_neighbors=5)
df[survey_cols] = imputer.fit_transform(df[survey_cols])

print(f"[CLEAN] PII stripped. Compensation skew corrected (from 2.41 to 0.18).")
print(f"[IMPUTE] Reconstructed {df[survey_cols].isnull().sum().sum()} missing survey scores.")`,
        expectedOutcome: {
          headline: "PII-Compliant Anonymized Workforce Matrix",
          deliverable: "Privacy-safe workforce dataset with log-normalized compensation and imputed survey scores.",
          businessValue: "Meets enterprise privacy compliance while repairing survey drop-off gaps.",
        },
        metrics: [
          { label: "Anonymized Profiles", value: "8,200", change: "100% compliant", isGood: true },
          { label: "Income Skewness", value: "+0.18", change: "Down from +2.41", isGood: true },
          { label: "Imputed Surveys", value: "142", change: "KNN 5-neighbors", isGood: true },
          { label: "Enterprise Divisions", value: "7", change: "Covered", isGood: true },
        ],
        datasetTelemetry: {
          title: "Talent Telemetry & Anonymization Audit",
          rows: [
            { key: "Total Employee Profiles", value: "8,200 workforce members" },
            { key: "PII Fields Scrubbed", value: "Name, SSN, PersonalEmail, Address" },
            { key: "Compensation Skewness", value: "Reduced from +2.41 to +0.18" },
            { key: "KNN Imputation Neighbors", value: "k = 5 (Satisfaction & WorkLifeBalance)" },
            { key: "Active Enterprise Units", value: "Engineering, Sales, R&D, Support, Finance, HR, Ops" },
          ],
          logMessage: "[SUCCESS] Workforce telemetry sanitized and anonymized. Ready for PCA compression.",
        },
        tasks: [
          {
            id: "ea-t1",
            title: "Strip PII identifiers and audit compliance",
            description: "Remove names, contact info, and IDs to guarantee workforce data privacy",
            timeEst: "45 mins",
          },
          {
            id: "ea-t2",
            title: "Apply log1p transform on skewed salary data",
            description: "Normalize long-tail executive compensation distributions with log transform",
            timeEst: "45 mins",
          },
          {
            id: "ea-t3",
            title: "Impute missing satisfaction scores with KNN",
            description: "Reconstruct incomplete survey records using k-Nearest Neighbors fidelity",
            timeEst: "60 mins",
          },
        ],
      },
      {
        phaseNumber: 2,
        title: "Feature Engineering",
        subtitle: "Promotion stagnation indices, RobustScaler standardization, and PCA 85% variance extraction",
        fileName: "02_pca_feature_reduction.py",
        codeSnippet: `from sklearn.preprocessing import RobustScaler
from sklearn.decomposition import PCA

# 1. Synthesize flight-risk composite ratios
df['PromotionStagnationIndex'] = df['YearsSinceLastPromotion'] / (df['YearsAtCompany'] + 1)
df['OvertimeToTenureRatio'] = df['OvertimeHours'] / (df['TotalWorkingYears'] + 1)

# 2. Outlier-resistant standardization
num_cols = df.select_dtypes(include=[np.number]).columns
scaler = RobustScaler()
X_scaled = scaler.fit_transform(df[num_cols])

# 3. PCA Dimensionality Reduction retaining 85% explained variance
pca = PCA(n_components=0.85, random_state=42)
X_pca = pca.fit_transform(X_scaled)

print(f"[PCA] Compressed {X_scaled.shape[1]} raw vectors into {X_pca.shape[1]} principal components")
print(f"[VARIANCE] Cumulative explained variance: {pca.explained_variance_ratio_.sum():.1%}")`,
        expectedOutcome: {
          headline: "Orthogonal Principal Component Space",
          deliverable: "Low-dimensional latent space capturing 86.4% of total workforce variance in 6 orthogonal axes.",
          businessValue: "Eliminates multicollinearity and noise, preventing distance distortion in cluster mapping.",
        },
        metrics: [
          { label: "Principal Axes", value: "6", change: "Down from 38", isGood: true },
          { label: "Explained Variance", value: "86.4%", change: "> 85% goal", isGood: true },
          { label: "PC1 Key Driver", value: "Career Velocity", change: "Promotions", isGood: true },
          { label: "PC2 Key Driver", value: "Burnout Index", change: "Overtime/Stress", isGood: true },
        ],
        datasetTelemetry: {
          title: "Principal Component Variance Analysis",
          rows: [
            { key: "Initial Feature Count", value: "38 behavioral dimensions" },
            { key: "Reduced Component Count", value: "6 orthogonal axes" },
            { key: "PC1 Variance Explained", value: "34.2% (Career Velocity & Compensation)" },
            { key: "PC2 Variance Explained", value: "22.6% (Overtime & Burnout Load)" },
            { key: "PC3 Variance Explained", value: "14.1% (Manager Stability & Tenured Trust)" },
          ],
          logMessage: "[SUCCESS] PCA reduction complete. 86.4% variance retained in 6 compact axes.",
        },
        tasks: [
          {
            id: "ea-t4",
            title: "Synthesize Promotion Stagnation Index",
            description: "Compute YearsSinceLastPromotion / (YearsAtCompany + 1) to isolate career plateaus",
            timeEst: "45 mins",
          },
          {
            id: "ea-t5",
            title: "Standardize multidimensional metrics via RobustScaler",
            description: "Scale metrics based on median and IQR to neutralize extreme executive outliers",
            timeEst: "60 mins",
          },
          {
            id: "ea-t6",
            title: "Fit PCA retaining 85% explained variance",
            description: "Condense 38 correlated features into 6 orthogonal principal components",
            timeEst: "60 mins",
          },
        ],
      },
      {
        phaseNumber: 3,
        title: "Model Training & Cross-Validation",
        subtitle: "Silhouette score optimization, K-Means++ convergence (k=4), and stability evaluation",
        fileName: "03_kmeans_silhouette_clustering.py",
        codeSnippet: `from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, silhouette_samples

# 1. Evaluate silhouette coefficients across k = 2 to 7 clusters
sil_scores = {}
for k in range(2, 8):
    km = KMeans(n_clusters=k, init='k-means++', n_init=50, random_state=42)
    labels = km.fit_predict(X_pca)
    sil_scores[k] = silhouette_score(X_pca, labels)
    print(f"[EVALUATION] k = {k} -> Silhouette Score: {sil_scores[k]:.4f}")

# 2. Optimal clustering selection (k=4 delivers best separation)
optimal_k = 4
kmeans_final = KMeans(n_clusters=optimal_k, init='k-means++', n_init=100, random_state=42)
df['Cluster'] = kmeans_final.fit_predict(X_pca)

print(f"[FIT] Selected k={optimal_k} with peak silhouette score: {sil_scores[optimal_k]:.4f}")
print("[CLUSTER COUNTS]:")
print(df['Cluster'].value_counts().sort_index())`,
        expectedOutcome: {
          headline: "4 Distinct Employee Retention Segments",
          deliverable: "Mathematically separated cluster assignments verified by high silhouette separation.",
          businessValue: "Replaces one-size-fits-all retention policies with 4 targeted talent management playbooks.",
        },
        metrics: [
          { label: "Optimal Clusters", value: "k = 4", change: "Peak silhouette", isGood: true },
          { label: "Silhouette Score", value: "0.648", change: "Strong separation", isGood: true },
          { label: "At-Risk Cohort", value: "1,840", change: "22.4% of staff", isGood: false },
          { label: "Cluster Stability", value: "0.912", change: "Adjusted Rand Index", isGood: true },
        ],
        datasetTelemetry: {
          title: "K-Means++ Cluster Segmentation Results",
          rows: [
            { key: "Cluster 0 (3,420 staff)", value: "Core Anchors (High Satisfaction, Low Overtime)" },
            { key: "Cluster 1 (1,840 staff)", value: "Burnout Risk (High Overtime, Stagnant Comp)" },
            { key: "Cluster 2 (1,690 staff)", value: "Plateaued Seniors (No Promotion > 4 Years)" },
            { key: "Cluster 3 (1,250 staff)", value: "New Hires in Onboarding Transition" },
            { key: "Silhouette Coefficient", value: "0.648 (k=4 peak)" },
          ],
          logMessage: "[SUCCESS] 4 mathematically distinct clusters synthesized with ARI stability of 0.912.",
        },
        tasks: [
          {
            id: "ea-t7",
            title: "Compute silhouette scores across k = 2 to 7",
            description: "Determine mathematical cluster separation and plot elbow curve",
            timeEst: "60 mins",
          },
          {
            id: "ea-t8",
            title: "Fit K-Means++ with 100 random restarts",
            description: "Execute k=4 clustering to avoid local minima and isolate stable centroids",
            timeEst: "60 mins",
          },
          {
            id: "ea-t9",
            title: "Validate cluster stability via bootstrap resampling",
            description: "Test cluster assignment consistency using Adjusted Rand Index across splits",
            timeEst: "60 mins",
          },
        ],
      },
      {
        phaseNumber: 4,
        title: "Evaluation & Deployment",
        subtitle: "Persona centroid profiling, SAS Viya dashboard feed, and automated retention playbook",
        fileName: "04_deploy_retention_playbook.py",
        codeSnippet: `import json

# 1. Profile cluster centroids into human-readable talent personas
cluster_map = {
    0: {"name": "Core Anchors", "risk": "Low", "action": "Leadership mentorship tracks"},
    1: {"name": "Burnout Flight Risk", "risk": "Critical", "action": "Workload rebalance + bonus equity"},
    2: {"name": "Plateaued Veterans", "risk": "Moderate", "action": "Internal mobility & project rotation"},
    3: {"name": "Onboarding Cohort", "risk": "Low-Medium", "action": "30-60-90 day manager checkpoints"}
}

df['PersonaName'] = df['Cluster'].map(lambda c: cluster_map[c]['name'])
df['RiskTier'] = df['Cluster'].map(lambda c: cluster_map[c]['risk'])

# 2. Export automated SAS Viya / Tableau HR dashboard data feed
output_export = {
    "total_workforce": len(df),
    "critical_risk_headcount": int((df['RiskTier'] == 'Critical').sum()),
    "cluster_distribution": df['PersonaName'].value_counts().to_dict(),
    "pipeline_timestamp": "2026-Q1-Live"
}

with open("models/employee_cluster_segmentation.json", "w") as f:
    json.dump(output_export, f, indent=2)

print(f"[EXPORT] Identified {output_export['critical_risk_headcount']} staff in Critical Burnout tier")
print("[DEPLOY] models/employee_cluster_segmentation.json written successfully.")`,
        expectedOutcome: {
          headline: "Executive HR Retention & At-Risk Playbook",
          deliverable: "Centroid profiling rules and automated SAS Viya dashboard export flagging 1,840 critical retention candidates.",
          businessValue: "Enables proactive 1-on-1 career interventions, reducing unprompted talent departures by 22%.",
        },
        metrics: [
          { label: "Turnover Reduction", value: "-22.0%", change: "Projected annual", isGood: true },
          { label: "Critical Flagged", value: "1,840", change: "Burnout tier", isGood: false },
          { label: "Intervention Window", value: "60 days", change: "Before resignation", isGood: true },
          { label: "Replacement Cost Save", value: "$410,000", change: "Recruiting fees", isGood: true },
        ],
        datasetTelemetry: {
          title: "Executive Retention Playbook Telemetry",
          rows: [
            { key: "Dashboard Integration", value: "SAS Viya / Tableau Live Connector" },
            { key: "High Risk Headcount", value: "1,840 staff in Burnout tier (Cluster 1)" },
            { key: "Recommended Action", value: "Comp adjustment + workload capping" },
            { key: "Estimated Savings", value: "$410k in rehiring & ramp costs" },
            { key: "Update Cadence", value: "Bi-weekly HR telemetry sync" },
          ],
          logMessage: "[SUCCESS] Retention archetypes deployed. Automated executive alert triggers enabled.",
        },
        tasks: [
          {
            id: "ea-t10",
            title: "Synthesize centroid profiles into HR personas",
            description: "Map 6-dimensional cluster centroids back to business metrics and assign personas",
            timeEst: "60 mins",
          },
          {
            id: "ea-t11",
            title: "Calculate Euclidean proximity to high-risk centroids",
            description: "Compute distance score to quantify individual flight risk probability",
            timeEst: "45 mins",
          },
          {
            id: "ea-t12",
            title: "Export SAS Viya & Tableau telemetry pipeline",
            description: "Generate structured JSON/CSV data feed for executive human capital dashboard",
            timeEst: "45 mins",
          },
        ],
      },
    ],
  },
]

// ==========================================
// Embedded Clean SVG Icon Components
// ==========================================
function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function PlayIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function CopyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}

function SparkleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  )
}

function CodeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  )
}

function DatabaseIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    </svg>
  )
}

function ChartIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  )
}

function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function RefreshIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  )
}

// ==========================================
// Main MicroProject Component
// ==========================================
export default function MicroProject() {
  // 1. State Management: Local React useState as specified
  const [selectedProjectId, setSelectedProjectId] = useState<string>("churn-predictor")
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0)
  const [workspaceTab, setWorkspaceTab] = useState<"code" | "telemetry" | "outcome">("code")
  const [isSimulating, setIsSimulating] = useState<boolean>(false)
  const [copiedCode, setCopiedCode] = useState<boolean>(false)

  // Interactive Checklist State: key is `${projectId}:${taskId}`
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    "churn-predictor:cp-t1": true,
    "churn-predictor:cp-t2": true,
    "sales-forecasting:rf-t1": true,
    "nlp-sentiment:nlp-t1": true,
    "employee-attrition:ea-t1": true,
  })

  // Selected Project Resolution
  const selectedProject = useMemo(() => {
    return (
      DATA_SCIENCE_PROJECTS.find((p) => p.id === selectedProjectId) ||
      DATA_SCIENCE_PROJECTS[0]
    )
  }, [selectedProjectId])

  const activePhase = selectedProject.phases[activePhaseIndex] || selectedProject.phases[0]

  // All Tasks across all 4 phases of selected project
  const allProjectTasks = useMemo(() => {
    return selectedProject.phases.flatMap((ph) => ph.tasks)
  }, [selectedProject])

  // Overall Project Progress Calculation
  const projectCompletedTaskCount = useMemo(() => {
    return allProjectTasks.filter((t) => completedTasks[`${selectedProject.id}:${t.id}`]).length
  }, [allProjectTasks, completedTasks, selectedProject.id])

  const projectTotalTaskCount = allProjectTasks.length
  const projectProgressPercent = Math.round(
    (projectCompletedTaskCount / (projectTotalTaskCount || 1)) * 100
  )

  // Current Phase Progress Calculation
  const phaseCompletedTaskCount = useMemo(() => {
    return activePhase.tasks.filter((t) => completedTasks[`${selectedProject.id}:${t.id}`]).length
  }, [activePhase.tasks, completedTasks, selectedProject.id])

  const phaseTotalTaskCount = activePhase.tasks.length
  const phaseProgressPercent = Math.round(
    (phaseCompletedTaskCount / (phaseTotalTaskCount || 1)) * 100
  )

  // Toggle individual task
  const toggleTask = (taskId: string) => {
    const key = `${selectedProject.id}:${taskId}`
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Mark all tasks in current phase as completed
  const markPhaseComplete = () => {
    const updates: Record<string, boolean> = {}
    activePhase.tasks.forEach((t) => {
      updates[`${selectedProject.id}:${t.id}`] = true
    })
    setCompletedTasks((prev) => ({
      ...prev,
      ...updates,
    }))
  }

  // Reset tasks for the selected project
  const resetProjectTasks = () => {
    const next = { ...completedTasks }
    allProjectTasks.forEach((t) => {
      delete next[`${selectedProject.id}:${t.id}`]
    })
    setCompletedTasks(next)
  }

  // Simulate pipeline execution
  const handleRunSimulation = () => {
    setIsSimulating(true)
    setTimeout(() => {
      setIsSimulating(false)
      markPhaseComplete()
    }, 1300)
  }

  // Copy code snippet to clipboard
  const handleCopyCode = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(activePhase.codeSnippet)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  return (
    <section
      id="micro-project"
      className="builder-feature-section relative text-[#eeeadf]"
      style={{ scrollMarginTop: "135px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Context Heading                             */}
      {/* ======================================================== */}
      <div className="builder-section-heading mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#2d674f]/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#20503d]/70 text-[#d8ed8b] border border-[#2d674f]">
              <SparkleIcon className="w-3 h-3 text-[#b7db43]" />
              03 · Close Ranked Gap · Live DS Sandbox
            </span>
            <span className="text-xs text-[#819c87]">|</span>
            <span className="text-[11px] text-[#b8c8b8] font-medium tracking-wide">
              Hackathon Data Science Hub
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-normal text-gray-900 tracking-tight">
            Data Science Micro-Project Hub
          </h2>
          <p className="text-sm text-[#b8c8b8] mt-1.5 max-w-2xl leading-relaxed">
            Select a project derived from our hackathon datasets, execute 4 real-world data science phases, and verify code comprehension with live progress tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider text-[#819c87]">Global Proof-of-Work</span>
            <span className="text-xs font-semibold text-[#d8ed8b]">
              {projectCompletedTaskCount} of {projectTotalTaskCount} tasks verified ({projectProgressPercent}%)
            </span>
          </div>
          <span className="builder-demo-label light inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-[#e8b77f] border border-[#c58c53]/40 bg-[#163c2e]/60">
            Self-Contained Workspace
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Project Selection Grid (4 Real-World Projects)       */}
      {/* ======================================================== */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#819c87]">
            Select Data Science Project ({DATA_SCIENCE_PROJECTS.length} Datasets Available)
          </span>
          <span className="text-[11px] text-[#819c87]">
            Click any project to switch interactive roadmap
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {DATA_SCIENCE_PROJECTS.map((proj) => {
            const isSelected = proj.id === selectedProjectId
            const projTasks = proj.phases.flatMap((p) => p.tasks)
            const completedCount = projTasks.filter(
              (t) => completedTasks[`${proj.id}:${t.id}`]
            ).length
            const totalCount = projTasks.length
            const percent = Math.round((completedCount / (totalCount || 1)) * 100)

            return (
              <button
                type="button"
                key={proj.id}
                onClick={() => {
                  setSelectedProjectId(proj.id)
                  setActivePhaseIndex(0)
                }}
                className={`group relative text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#163c2e] border-[#b7db43] shadow-lg shadow-[#102b22]/70 ring-1 ring-[#b7db43]/40"
                    : "bg-[#102b22]/90 border-[#2d674f]/50 hover:bg-[#163c2e]/70 hover:border-[#819c87]/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${proj.paradigmBadge.bg} ${proj.paradigmBadge.border} ${proj.paradigmBadge.text}`}
                    >
                      {proj.paradigm}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#b7db43] animate-pulse" />
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-white group-hover:text-[#d8ed8b] transition-colors leading-snug line-clamp-2">
                    {proj.title}
                  </h3>
                  <p className="text-[11px] text-[#819c87] mt-1 line-clamp-2 leading-relaxed">
                    {proj.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2d674f]/40">
                  <div className="flex items-center justify-between text-[10px] text-[#b8c8b8] mb-1.5">
                    <span>Progress</span>
                    <span className="font-semibold text-white">
                      {completedCount}/{totalCount} ({percent}%)
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-[#0a1713] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        percent === 100
                          ? "bg-[#b7db43]"
                          : isSelected
                          ? "bg-[#c58c53]"
                          : "bg-[#2d674f]"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {proj.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-[#20503d]/60 text-[#b8c8b8] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.techStack.length > 3 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#20503d]/40 text-[#819c87] font-mono">
                        +{proj.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Active Project Brief & Metadata Strip                 */}
      {/* ======================================================== */}
      <div className="mb-6 p-5 rounded-2xl bg-[#102b22] border border-[#2d674f]/70 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#2d674f]/40">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#c58c53]/20 text-[#e8b77f] border border-[#c58c53]/40">
                Primary Gap Focus
              </span>
              <span className="text-xs font-semibold text-white">
                {selectedProject.rankedGap}
              </span>
            </div>
            <h3 className="text-xl font-serif text-white flex items-center gap-2">
              {selectedProject.title}
              <span className="text-xs font-sans font-normal text-[#819c87]">
                ({selectedProject.datasetStats})
              </span>
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-[#163c2e] border border-[#2d674f] text-left">
              <span className="block text-[9px] uppercase tracking-wider text-[#819c87]">Est. Commitment</span>
              <strong className="text-xs font-semibold text-white">{selectedProject.expectedTime}</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#163c2e] border border-[#2d674f] text-left">
              <span className="block text-[9px] uppercase tracking-wider text-[#819c87]">Deliverable</span>
              <strong className="text-xs font-semibold text-[#d8ed8b]">{selectedProject.evidenceArtifact.split("+")[0].trim()}</strong>
            </div>
          </div>
        </div>

        {/* Tech Stack Chips & Why this project */}
        <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#819c87] text-[11px] font-medium">Stack:</span>
            {selectedProject.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-[#20503d] text-[#d8ed8b] text-[10px] font-mono border border-[#2d674f]"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#b8c8b8] max-w-xl">
            <SparkleIcon className="w-3.5 h-3.5 text-[#e8b77f] shrink-0" />
            <span>{selectedProject.whyThisProject}</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. Interactive 4-Phase Roadmap Timeline                  */}
      {/* ======================================================== */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#819c87]">
            Interactive DS Pipeline Roadmap (4 Phases)
          </span>
          <span className="text-[11px] text-[#b8c8b8]">
            Phase {activePhaseIndex + 1} of 4: <strong className="text-white">{activePhase.title}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {selectedProject.phases.map((ph, idx) => {
            const isActive = idx === activePhaseIndex
            const completedCount = ph.tasks.filter(
              (t) => completedTasks[`${selectedProject.id}:${t.id}`]
            ).length
            const isPhaseDone = completedCount === ph.tasks.length

            return (
              <button
                type="button"
                key={ph.phaseNumber}
                onClick={() => setActivePhaseIndex(idx)}
                className={`relative text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "bg-[#1c4938] border-[#b7db43] ring-1 ring-[#b7db43]/40 shadow-md"
                    : isPhaseDone
                    ? "bg-[#163c2e]/90 border-[#2d674f] hover:bg-[#1c4938]/60"
                    : "bg-[#102b22] border-[#2d674f]/50 hover:bg-[#163c2e]/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded ${
                        isActive
                          ? "bg-[#b7db43] text-[#102b22]"
                          : isPhaseDone
                          ? "bg-[#20503d] text-[#b7db43]"
                          : "bg-[#20503d]/60 text-[#819c87]"
                      }`}
                    >
                      PHASE 0{ph.phaseNumber}
                    </span>

                    {isPhaseDone ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#b7db43] font-semibold">
                        <CheckIcon className="w-3.5 h-3.5" />
                        Done
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#819c87]">
                        {completedCount}/{ph.tasks.length} tasks
                      </span>
                    )}
                  </div>

                  <strong
                    className={`block text-xs font-semibold leading-snug ${
                      isActive ? "text-white" : "text-[#d5dfd3]"
                    }`}
                  >
                    {ph.title}
                  </strong>
                  <p className="text-[10px] text-[#819c87] mt-1 line-clamp-1">
                    {ph.subtitle}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#2d674f]/40">
                  <span className="text-[9px] font-mono text-[#b8c8b8] truncate">
                    {ph.fileName}
                  </span>
                  {isActive && (
                    <ArrowRightIcon className="w-3.5 h-3.5 text-[#b7db43] shrink-0" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. Main Workspace Layout (Workspace + Task Checklist)    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side (8 cols): Workspace (Code, Telemetry, Outcome) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Workspace Tabs Header */}
          <div className="p-3.5 rounded-2xl bg-[#102b22] border border-[#2d674f] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 bg-[#0a1713] p-1 rounded-xl border border-[#2d674f]/40">
              <button
                type="button"
                onClick={() => setWorkspaceTab("code")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  workspaceTab === "code"
                    ? "bg-[#20503d] text-white shadow-sm"
                    : "text-[#819c87] hover:text-[#eeeadf]"
                }`}
              >
                <CodeIcon className="w-3.5 h-3.5 text-[#b7db43]" />
                Simulated Code Pipeline
              </button>
              <button
                type="button"
                onClick={() => setWorkspaceTab("telemetry")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  workspaceTab === "telemetry"
                    ? "bg-[#20503d] text-white shadow-sm"
                    : "text-[#819c87] hover:text-[#eeeadf]"
                }`}
              >
                <DatabaseIcon className="w-3.5 h-3.5 text-[#e8b77f]" />
                Dataset Telemetry & Outputs
              </button>
              <button
                type="button"
                onClick={() => setWorkspaceTab("outcome")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  workspaceTab === "outcome"
                    ? "bg-[#20503d] text-white shadow-sm"
                    : "text-[#819c87] hover:text-[#eeeadf]"
                }`}
              >
                <ChartIcon className="w-3.5 h-3.5 text-[#d8ed8b]" />
                Deliverable & Artifact
              </button>
            </div>

            {/* Quick Actions (Run Simulation & Copy) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#163c2e] hover:bg-[#20503d] text-[#d5dfd3] border border-[#2d674f] transition-all cursor-pointer"
                title="Copy current phase Python script"
              >
                {copiedCode ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 text-[#b7db43]" />
                    <span className="text-[#b7db43]">Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#b7db43] hover:bg-[#c6ea4d] text-[#102b22] shadow-sm transition-all cursor-pointer disabled:opacity-60"
              >
                {isSimulating ? (
                  <>
                    <RefreshIcon className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-3.5 h-3.5" />
                    <span>Run Simulation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tab 1: Simulated Code Pipeline */}
          {workspaceTab === "code" && (
            <div className="rounded-2xl bg-[#0a1713] border border-[#2d674f] overflow-hidden shadow-xl">
              {/* Terminal Window Header */}
              <div className="px-4 py-2.5 bg-[#102b22] border-b border-[#2d674f]/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#e06c75]/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#e5c07b]/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#98c379]/80 inline-block" />
                  </div>
                  <span className="text-xs font-mono text-[#b8c8b8] ml-2 font-medium">
                    {activePhase.fileName}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-[#819c87]">
                  <span className="font-mono">Python 3.11</span>
                  <span>•</span>
                  <span>Phase {activePhase.phaseNumber} / 4</span>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-[#d5dfd3] bg-[#0c1c16]">
                <pre className="m-0 whitespace-pre">
                  <code>{activePhase.codeSnippet}</code>
                </pre>
              </div>

              {/* Bottom Execution Status Banner */}
              <div className="px-4 py-2.5 bg-[#102b22]/90 border-t border-[#2d674f]/50 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-[#819c87]">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#b7db43]" />
                  <span>Interactive simulation ready. Run simulation or check tasks to track verification.</span>
                </div>
                <span className="text-[10px] text-[#d8ed8b] font-mono">
                  Target: {activePhase.title}
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Dataset Telemetry & Outputs */}
          {workspaceTab === "telemetry" && (
            <div className="flex flex-col gap-4">
              {/* Metrics Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activePhase.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3.5 rounded-xl bg-[#102b22] border border-[#2d674f] flex flex-col justify-between"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-[#819c87]">
                      {m.label}
                    </span>
                    <strong className="text-lg font-serif text-white my-1">
                      {m.value}
                    </strong>
                    {m.change && (
                      <span
                        className={`text-[10px] font-medium ${
                          m.isGood ? "text-[#b7db43]" : "text-[#e8b77f]"
                        }`}
                      >
                        {m.change}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Data Table / Schema Inspector */}
              <div className="rounded-2xl bg-[#102b22] border border-[#2d674f] p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <DatabaseIcon className="w-4 h-4 text-[#e8b77f]" />
                    {activePhase.datasetTelemetry.title}
                  </h4>
                  <span className="text-[11px] text-[#819c87] font-mono">
                    {selectedProject.datasetName}
                  </span>
                </div>

                <div className="divide-y divide-[#2d674f]/40 border border-[#2d674f]/60 rounded-xl overflow-hidden bg-[#0c1c16]">
                  {activePhase.datasetTelemetry.rows.map((row) => (
                    <div
                      key={row.key}
                      className="px-3.5 py-2.5 flex items-center justify-between text-xs"
                    >
                      <span className="font-mono text-[#b8c8b8]">{row.key}</span>
                      <strong className="font-mono text-[#d8ed8b]">{row.value}</strong>
                    </div>
                  ))}
                </div>

                {/* Simulated Pipeline Log */}
                <div className="mt-3.5 p-3 rounded-xl bg-[#0a1713] border border-[#2d674f]/60 font-mono text-[11px] text-[#819c87] flex items-start gap-2">
                  <span className="text-[#b7db43] font-bold">➜</span>
                  <span className="text-[#d5dfd3]">
                    {activePhase.datasetTelemetry.logMessage}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Deliverable & Expected Outcome */}
          {workspaceTab === "outcome" && (
            <div className="rounded-2xl bg-[#102b22] border border-[#2d674f] p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2d674f]/50">
                <span className="p-2 rounded-xl bg-[#20503d] text-[#b7db43]">
                  <SparkleIcon className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#819c87]">
                    Phase {activePhase.phaseNumber} Proof-of-Work Target
                  </span>
                  <h4 className="text-lg font-serif text-white">
                    {activePhase.expectedOutcome.headline}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#163c2e] border border-[#2d674f]">
                  <strong className="block text-xs uppercase tracking-wider text-[#e8b77f] mb-1.5">
                    Engineering Deliverable
                  </strong>
                  <p className="text-xs text-[#d5dfd3] leading-relaxed">
                    {activePhase.expectedOutcome.deliverable}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#163c2e] border border-[#2d674f]">
                  <strong className="block text-xs uppercase tracking-wider text-[#b7db43] mb-1.5">
                    Industry Business Value
                  </strong>
                  <p className="text-xs text-[#d5dfd3] leading-relaxed">
                    {activePhase.expectedOutcome.businessValue}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0c1c16] border border-[#2d674f] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#819c87]">Full Evidence Artifact</span>
                  <strong className="block text-white font-mono mt-0.5">
                    {selectedProject.evidenceArtifact}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={markPhaseComplete}
                  className="px-3.5 py-1.5 rounded-lg bg-[#20503d] hover:bg-[#2d674f] text-[#d8ed8b] border border-[#2d674f] font-semibold text-xs transition-colors cursor-pointer shrink-0"
                >
                  Confirm Phase Completion
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side (4 cols): Interactive Task Checklist & Progress Tracking */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-[#102b22] border border-[#2d674f] shadow-lg flex flex-col gap-4">
            {/* Checklist Header & Progress */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#819c87]">
                  Phase {activePhase.phaseNumber} Verification
                </span>
                <span className="text-xs font-mono font-bold text-[#b7db43]">
                  {phaseProgressPercent}%
                </span>
              </div>
              <h4 className="text-base font-serif text-white">
                Task Checklist ({phaseCompletedTaskCount}/{phaseTotalTaskCount})
              </h4>

              {/* Animated Progress Bar */}
              <div className="w-full h-2 bg-[#0a1713] rounded-full overflow-hidden mt-3">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    phaseProgressPercent === 100 ? "bg-[#b7db43]" : "bg-[#c58c53]"
                  }`}
                  style={{ width: `${phaseProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#2d674f]/40">
              {activePhase.tasks.map((task) => {
                const isChecked = Boolean(
                  completedTasks[`${selectedProject.id}:${task.id}`]
                )

                return (
                  <button
                    type="button"
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-150 cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? "bg-[#163c2e] border-[#b7db43]/60 shadow-sm"
                        : "bg-[#0c1c16] border-[#2d674f]/40 hover:bg-[#163c2e]/60 hover:border-[#819c87]/50"
                    }`}
                  >
                    {/* Custom Checkbox circle */}
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? "bg-[#b7db43] border-[#b7db43] text-[#102b22]"
                          : "border-[#819c87] bg-transparent"
                      }`}
                    >
                      {isChecked && <CheckIcon className="w-3.5 h-3.5 stroke-[2]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <strong
                          className={`text-xs font-semibold leading-snug ${
                            isChecked ? "text-white line-through opacity-80" : "text-[#eeeadf]"
                          }`}
                        >
                          {task.title}
                        </strong>
                        <span className="text-[9px] font-mono text-[#819c87] shrink-0">
                          {task.timeEst}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#819c87] mt-0.5 leading-relaxed">
                        {task.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Quick Batch Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#2d674f]/40 text-xs">
              <button
                type="button"
                onClick={markPhaseComplete}
                className="text-[11px] text-[#b7db43] hover:underline font-semibold cursor-pointer"
              >
                Mark phase done
              </button>
              <button
                type="button"
                onClick={resetProjectTasks}
                className="text-[11px] text-[#819c87] hover:text-[#e8b77f] cursor-pointer"
              >
                Reset project tasks
              </button>
            </div>

            {/* Why This Project Insight Pill */}
            <div className="p-3.5 rounded-xl bg-[#163c2e] border border-[#2d674f] flex items-start gap-2.5 text-xs text-[#b8c8b8]">
              <SparkleIcon className="w-4 h-4 text-[#e8b77f] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white text-[11px] font-semibold mb-0.5">
                  Verified Evidence Outcome
                </strong>
                <span>
                  Completing all 4 phases verifies {selectedProject.rankedGap.toLowerCase()} and produces tangible Proof-of-Work telemetry.
                </span>
              </div>
            </div>

            {/* Overall Project Completion Badge */}
            {projectProgressPercent === 100 && (
              <div className="p-3.5 rounded-xl bg-[#b7db43]/10 border border-[#b7db43] text-center animate-fade-in">
                <span className="text-xs font-semibold text-[#b7db43] block">
                  🎉 All 4 Phases Verified!
                </span>
                <span className="text-[10px] text-[#d5dfd3] mt-0.5 block">
                  Your evidence artifact is ready for hiring and college telemetry audit.
                </span>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
