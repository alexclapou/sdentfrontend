function computeStatsPred(statToShow, equipment) {
  const date = new Date()
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
    return equipments.slice(0, date.getMonth() + 1)
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
    return [
      instruments.slice(0, date.getMonth() + 1),
      materials.slice(0, date.getMonth() + 1)
    ]
  }
}
export default computeStatsPred
