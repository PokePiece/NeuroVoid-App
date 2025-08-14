function Roadmap() {
  const items = [
    'Advanced gait algorithms for dynamic locomotion',
    'Inverse kinematics for precision writing',
    'AI integration for autonomous motion planning',
    'Sensor fusion for robust real-world deployment',
    'Unity-based visualization environment',
    'Hardware implementation of MechaPen'
  ]

  return (
    <section className="py-16 px-6 bg-gray-900">
      <h2 className="text-3xl font-semibold text-center mb-10">Project Roadmap</h2>
      <ul className="max-w-3xl mx-auto list-disc list-inside space-y-3 text-gray-300">
        {items.map((item, index) => (
          <li key={index} className="text-lg">{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default Roadmap