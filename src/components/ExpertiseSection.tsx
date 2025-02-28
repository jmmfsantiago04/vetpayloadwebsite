export default function ExpertiseSection() {
  const expertiseItems = [
    {
      title: 'Experiência Clínica',
      description:
        'Décadas de experiência prática no tratamento de diversas condições e emergências de pets.',
      icon: '🏥',
    },
    {
      title: 'Abordagem Moderna',
      description:
        'Combinando conhecimento veterinário tradicional com recursos modernos de telemedicina.',
      icon: '💻',
    },
    {
      title: 'Educação Continuada',
      description:
        'Participação regular em congressos veterinários e desenvolvimento profissional contínuo.',
      icon: '📚',
    },
  ]

  return (
    <section className="py-16 bg-[var(--accent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
          Nossa Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertiseItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                {item.title}
              </h3>
              <p className="text-[var(--text-secondary)]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 