# Feature Importance Analysis Summary

## Why SHAP for the Neural Network

SHAP provides model-agnostic additive explanations and is suitable for neural networks because it can estimate each feature's contribution to a prediction. It offers both global importance and local explanation, which is ideal for a regression model like MLPRegressor.

## Top 20 Features

### Random Forest
|                           |          0 |
|:--------------------------|-----------:|
| Sensor_9_cumulative_delta | 0.551159   |
| Sensor_4_rolling_mean_5   | 0.0993201  |
| Sensor_3_rolling_mean_10  | 0.0832605  |
| Sensor_9_rolling_mean_5   | 0.0327334  |
| Sensor_6_cumulative_delta | 0.0322253  |
| Sensor_8_rolling_mean_5   | 0.0166127  |
| Sensor_17_rolling_mean_10 | 0.0165271  |
| Sensor_14_rolling_std_10  | 0.00738165 |
| Sensor_12_rolling_std_10  | 0.00660177 |
| Sensor_15_rolling_std_10  | 0.00625493 |
| Sensor_7_rolling_std_10   | 0.0060091  |
| Sensor_11_rolling_std_10  | 0.00576051 |
| Sensor_21_rolling_std_10  | 0.00548492 |
| Sensor_17_rolling_std_10  | 0.00541419 |
| Sensor_3_rolling_std_10   | 0.00534862 |
| Sensor_2_rolling_std_10   | 0.00463202 |
| Sensor_20_rolling_std_10  | 0.00460489 |
| Sensor_9_rolling_std_10   | 0.00454235 |
| Sensor_8_rolling_std_10   | 0.00425837 |
| Sensor_13_rolling_std_10  | 0.0042088  |

### XGBoost
|                           |          0 |
|:--------------------------|-----------:|
| Sensor_9_cumulative_delta | 0.176516   |
| Sensor_4_rolling_mean_5   | 0.135277   |
| Sensor_3_rolling_mean_10  | 0.0819861  |
| Sensor_17_rolling_mean_10 | 0.0523896  |
| Sensor_6_cumulative_delta | 0.0268803  |
| Sensor_8_rolling_mean_5   | 0.0177968  |
| Sensor_11_lag_1           | 0.0175871  |
| Sensor_9_rolling_mean_5   | 0.016339   |
| Sensor_11_lag_2           | 0.0127166  |
| Sensor_6_rolling_mean_10  | 0.0121366  |
| Sensor_6_rolling_std_10   | 0.0119736  |
| Sensor_14_rolling_std_10  | 0.00776126 |
| Sensor_11_lag_3           | 0.00769738 |
| Sensor_12_rolling_std_10  | 0.00744295 |
| Sensor_9_rolling_std_10   | 0.00710239 |
| Sensor_11_rolling_std_10  | 0.00696198 |
| Sensor_15_rolling_std_10  | 0.00686669 |
| Sensor_7_rolling_std_10   | 0.00675405 |
| Sensor_17_rolling_std_10  | 0.00638272 |
| Sensor_6_rolling_std_5    | 0.00636025 |

### Neural Network SHAP
|                           |        0 |
|:--------------------------|---------:|
| Sensor_6_cumulative_delta | 14.886   |
| Sensor_9_cumulative_delta | 14.5466  |
| Sensor_9_rolling_mean_5   | 14.1832  |
| Sensor_4_rolling_mean_5   |  4.38461 |
| Sensor_11_lag_1           |  4.19334 |
| Sensor_12                 |  3.76646 |
| Sensor_13                 |  2.93933 |
| Sensor_3_lag_1            |  2.49644 |
| Sensor_8                  |  2.31247 |
| Sensor_3_delta            |  2.28189 |
| Sensor_3_rolling_mean_10  |  2.24655 |
| Sensor_13_delta           |  2.21162 |
| Sensor_3                  |  2.16932 |
| Sensor_12_lag_5           |  2.12937 |
| Sensor_21                 |  2.04548 |
| Sensor_13_lag_1           |  1.93337 |
| Sensor_17_lag_1           |  1.93058 |
| Sensor_12_lag_2           |  1.90884 |
| Sensor_15_lag_1           |  1.88513 |
| Sensor_8_rolling_mean_5   |  1.84848 |

## Consistently Important Sensors

- Sensor_9
- Sensor_6
- Sensor_3
- Sensor_12
- Sensor_4
- Sensor_13
- Sensor_11
- Sensor_8
- Sensor_17
- Sensor_21

These sensors show consistent importance across models and likely capture degradation-related changes such as wear, vibration, temperature drift, and efficiency loss.

## Results Discussion

The tree-based models highlighted a similar group of sensor-derived features, especially lag, rolling, and cumulative-degradation features. The neural network SHAP results reinforced the same pattern, indicating that the engineered time-series features capture the most informative degradation signatures. The consistency across model families suggests the identified sensors are robust indicators of RUL.

## Research Question 3

The most influential measurements are the sensor channels that reflect degradation trends over time rather than single-cycle snapshots. Because FD001 has a single operating condition, operating-setting variables were removed during preprocessing, so the dominant signal comes from sensor behavior.
