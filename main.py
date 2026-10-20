
import pandas as pd
import matplotlib.pyplot as plt

# Load the employee dataset
df = pd.read_csv("WA_Fn-UseC_-HR-Employee-Attrition.csv")

# Display first 5 rows
print(df.head())

# Display dataset information
print("\nDataset Information:")
print(df.info())

# Check total rows and columns
print("\nDataset Shape:")
print(df.shape)


# Employee Attrition KPI Analysis

total_employees = len(df)

attrition_count = (df["Attrition"] == "Yes").sum()

attrition_rate = (attrition_count / total_employees) * 100

active_employees = total_employees - attrition_count

average_age = df["Age"].mean()

average_salary = df["MonthlyIncome"].mean()

print("\n--- EMPLOYEE ATTRITION KPI REPORT ---")
print("Total Employees:", total_employees)
print("Employees Left:", attrition_count)
print("Active Employees:", active_employees)
print("Attrition Rate:", round(attrition_rate, 2), "%")
print("Average Age:", round(average_age, 2))
print("Average Monthly Salary:", round(average_salary, 2))

# Department-wise Attrition Analysis

department_attrition = df[df["Attrition"] == "Yes"].groupby("Department").size()

print("\n--- DEPARTMENT-WISE ATTRITION ---")
print(department_attrition)
# Department-wise Attrition Rate

department_total = df.groupby("Department").size()

department_left = df[df["Attrition"] == "Yes"].groupby("Department").size()

department_rate = (department_left / department_total) * 100

print("\n--- DEPARTMENT ATTRITION RATE ---")
print(department_rate.round(2))
# Department Attrition Rate Chart

department_rate.sort_values().plot(
    kind="bar",
    color="steelblue",
    title="Employee Attrition Rate by Department"
)

plt.ylabel("Attrition Rate (%)")
plt.xlabel("Department")
plt.xticks(rotation=15)
plt.tight_layout()
plt.show()

# Attrition Count Analysis
attrition_count = df["Attrition"].value_counts()

print("\nEmployee Attrition Count:")
print(attrition_count)

# Attrition Percentage
total_employees = len(df)
employees_left = (df["Attrition"] == "Yes").sum()

attrition_percentage = (employees_left / total_employees) * 100

print("\nTotal Employees:", total_employees)
print("Employees Left:", employees_left)
print("Attrition Percentage:", round(attrition_percentage, 2), "%")


# Overtime vs Attrition Analysis
print("\n--- OVERTIME VS ATTRITION ---")

overtime_analysis = pd.crosstab(
    df["OverTime"],
    df["Attrition"]
)

print(overtime_analysis)

# Attrition percentage for each overtime group
overtime_rate = pd.crosstab(
    df["OverTime"],
    df["Attrition"],
    normalize="index"
) * 100

print("\nAttrition Rate by Overtime (%):")
print(overtime_rate["Yes"].round(2))


# Job Satisfaction vs Attrition
print("\n--- JOB SATISFACTION VS ATTRITION ---")

satisfaction_analysis = pd.crosstab(
    df["JobSatisfaction"],
    df["Attrition"],
    normalize="index"
) * 100

print(satisfaction_analysis.round(2))

# Plot attrition rate by job satisfaction
satisfaction_analysis["Yes"].plot(
    kind="bar",
    title="Attrition Rate by Job Satisfaction",
    xlabel="Job Satisfaction (1 = Low, 4 = Very High)",
    ylabel="Attrition Rate (%)"
)

plt.tight_layout()
plt.show()


# Age Group vs Attrition
print("\n--- AGE GROUP VS ATTRITION ---")

df["AgeGroup"] = pd.cut(
    df["Age"],
    bins=[18, 25, 35, 45, 55, 65],
    labels=["18-25", "26-35", "36-45", "46-55", "56-65"],
    include_lowest=True
)

age_attrition = pd.crosstab(
    df["AgeGroup"],
    df["Attrition"],
    normalize="index"
) * 100

print(age_attrition.round(2))

# Plot age-wise attrition rate
age_attrition["Yes"].plot(
    kind="bar",
    title="Attrition Rate by Age Group",
    xlabel="Age Group",
    ylabel="Attrition Rate (%)"
)

plt.tight_layout()
plt.show()


# FINAL BUSINESS INSIGHTS
print("\n========== FINAL BUSINESS INSIGHTS ==========")

# 1. Overall attrition
total_employees = len(df)
employees_left = (df["Attrition"] == "Yes").sum()
attrition_rate = employees_left / total_employees * 100

print(f"1. Overall Attrition Rate: {attrition_rate:.2f}%")

# 2. Department with highest attrition count
department_counts = df[df["Attrition"] == "Yes"]["Department"].value_counts()
print("2. Highest Attrition Count Department:",
      department_counts.idxmax())

# 3. Overtime comparison
overtime_rates = pd.crosstab(
    df["OverTime"], df["Attrition"], normalize="index"
) * 100

print("3. Attrition Without Overtime:",
      round(overtime_rates.loc["No", "Yes"], 2), "%")
print("4. Attrition With Overtime:",
      round(overtime_rates.loc["Yes", "Yes"], 2), "%")

# 4. Recommendations
print("\n========== RECOMMENDATIONS ==========")
print("- Monitor employee overtime and workload.")
print("- Improve employee satisfaction.")
print("- Review department-wise employee retention.")
print("- Conduct regular employee feedback surveys.")


# Correlation Heatmap
import seaborn as sns

print("\nCreating Correlation Heatmap...")

numeric_df = df.select_dtypes(include="number")

plt.figure(figsize=(16, 10))

sns.heatmap(
    numeric_df.corr(),
    cmap="coolwarm",
    annot=False
)

plt.title("HR Employee Dataset - Correlation Heatmap")
plt.tight_layout()
plt.savefig("correlation_heatmap.png", dpi=300, bbox_inches="tight")
plt.show()
