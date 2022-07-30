const getBadge = (color, content) => {
  return (
    <span
      className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50`}
      style={{
        color: color.text,
        backgroundColor: color.background
      }}
    >
      {content}
    </span>
  )
}
const getBadgeStyle = (type) => {
  const greenColor = {
      background: '#dcfce7',
      text: '#166534'
    },
    blueColor = {
      background: '#e0f2fe',
      text: '#075985'
    },
    redColor = {
      background: '#fee2e2',
      text: '#991b1b'
    },
    yellowColor = {
      background: '#fef9c3',
      text: '#854d0e'
    }
  switch (type) {
    case 'dentist':
    case 'requested':
      return getBadge(yellowColor, type)
    case 'patient':
    case 'completed':
      return getBadge(greenColor, type)
    case 'canceled':
      return getBadge(redColor, type)
    case 'assistant':
    case 'confirmed':
      return getBadge(blueColor, type)
    default:
      return
  }
}
export default getBadgeStyle
