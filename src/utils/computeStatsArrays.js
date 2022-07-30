function computeStatsArray(statToShow, equipment) {
  if (!statToShow) return []
  if (equipment) {
    const equipments = []
    Object.keys(statToShow).forEach((key, index) => {
      let equipment_count = 0
      Object.keys(statToShow[key]).forEach((kkey, iindex) => {
        if (kkey.includes(equipment.name)) {
          equipment_count += statToShow[key][kkey]
        }
      })
      equipments.push(equipment_count)
    })
    return equipments
  } else {
    const instruments = []
    const materials = []
    Object.keys(statToShow).forEach((key, index) => {
      let instrument_count = 0
      let material_count = 0
      Object.keys(statToShow[key]).forEach((kkey, iindex) => {
        if (kkey.includes('Material')) {
          material_count += statToShow[key][kkey]
        } else instrument_count += statToShow[key][kkey]
      })
      instruments.push(instrument_count)
      materials.push(material_count)
    })
    return [instruments, materials]
  }
}
export default computeStatsArray
