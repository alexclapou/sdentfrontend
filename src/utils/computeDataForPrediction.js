function computeDataForPrediction(data) {
  const prev_data = [0, 0, 0, 0, 0, 0]
  return prev_data.concat(data)
}
export default computeDataForPrediction
