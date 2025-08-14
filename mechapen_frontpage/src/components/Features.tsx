const features = [
  { title: 'Rust-Powered Core', desc: 'High-performance, memory-safe control foundation.' },
  { title: '2D Kinematics Solver', desc: 'Precise pen placement through dynamic leg control.' },
  { title: 'Gait Simulation', desc: 'Controlled motion path for locomotion and writing.' },
  { title: 'ROS Integration', desc: 'Modular robotics communication and tooling.' },
  { title: 'RViz + Gazebo Simulation', desc: 'Full visualization of motor and joint articulation.' },
]

function Features() {
  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-semibold text-center mb-10">Core Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((f) => (
          <div key={f.title} className="bg-gray-800 p-6 rounded shadow-sm">
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features