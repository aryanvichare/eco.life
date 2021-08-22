import matplotlib.pyplot as plt
import numpy as np
from sklearn import datasets, linear_model
from sklearn.metrics import mean_squared_error, r2_score

# Load the dataset
# emissions_X, emissions_y = datasets.load_emissions(return_X_y=True)

f = open("emissions.csv")
f.readline()  # skip the header
data = np.load(f)

emissions_X = data[:, 1:]
emissions_y = data[:, 0]



# Use only one feature
emissions_X = emissions_X[:, np.newaxis, 2]

# Split the data into training/testing sets
emissions_X_train = emissions_X[:-20]
emissions_X_test = emissions_X[-20:]

# Split the targets into training/testing sets
emissions_y_train = emissions_y[:-20]
emissions_y_test = emissions_y[-20:]

# Create linear regression object
regr = linear_model.LinearRegression()

# Train the model using the training sets
regr.fit(emissions_X_train, emissions_y_train)

# Make predictions using the testing set
emissions_y_pred = regr.predict(emissions_X_test)

# The coefficients
print('Coefficients: \n', regr.coef_)
# The mean squared error
print('Mean squared error: %.2f'
      % mean_squared_error(emissions_y_test, emissions_y_pred))
# The coefficient of determination: 1 is perfect prediction
print('Coefficient of determination: %.2f'
      % r2_score(emissions_y_test, emissions_y_pred))

# Plot outputs
plt.scatter(emissions_X_test, emissions_y_test,  color='black')
plt.plot(emissions_X_test, emissions_y_pred, color='blue', linewidth=3)

plt.xticks(())
plt.yticks(())

plt.show()