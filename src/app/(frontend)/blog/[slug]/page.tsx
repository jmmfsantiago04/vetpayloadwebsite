import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'

const blogPosts = {
  'understanding-cat-body-language': {
    title: "Understanding Your Cat's Body Language",
    date: 'March 15, 2024',
    category: 'Cat Care',
    imageUrl: '/blog/cat-language.jpg',
    content: `
      Cats are masters of subtle communication, using their body language to express their emotions and intentions. Understanding these signals can help you build a stronger bond with your feline friend and ensure their well-being.

      Tail Position:
      • Tail straight up with a slight curve: Happy and confident
      • Tail puffed up: Frightened or agitated
      • Tail low and curved like a question mark: Playful and curious
      • Tail wrapped around you: Showing affection

      Ear Positions:
      • Ears forward: Alert and interested
      • Ears flattened: Fearful or aggressive
      • Ears relaxed and slightly to the side: Content and comfortable

      Eye Contact:
      • Slow blinks: Showing trust and affection
      • Dilated pupils: Excited or stimulated
      • Constricted pupils: Alert or aggressive

      Body Posture:
      • Arched back with fur standing up: Frightened or threatened
      • Rolling onto back: Showing trust (but may not want belly rubs!)
      • Rubbing against objects or people: Marking territory and showing affection

      Understanding these signals can help you:
      1. Recognize when your cat is stressed
      2. Know when they want to play
      3. Identify potential health issues
      4. Build a stronger bond through better communication

      Remember, every cat is unique, and it's important to observe and learn your individual cat's specific communication style. Pay attention to the context and combinations of different body language signals to better understand what your cat is trying to tell you.
    `,
  },
  'essential-puppy-vaccinations': {
    title: 'Essential Vaccinations for Puppies',
    date: 'March 12, 2024',
    category: 'Dog Health',
    imageUrl: '/blog/puppy-health.jpg',
    content: `
      Keeping your puppy healthy starts with proper vaccination. This guide will help you understand the essential vaccines your puppy needs and when they should receive them.

      Core Vaccines:
      1. Distemper (DAP)
      • First dose: 6-8 weeks
      • Boosters: Every 3-4 weeks until 16 weeks
      • Protects against: Distemper, Adenovirus, Parvovirus

      2. Rabies
      • First dose: 12-16 weeks
      • Required by law in most areas
      • Booster: 1 year later, then every 3 years

      Non-Core Vaccines (Based on Lifestyle):
      1. Bordetella (Kennel Cough)
      • Recommended for social dogs
      • Given before boarding or training classes

      2. Leptospirosis
      • Important for dogs in wet areas
      • Two initial doses, 2-4 weeks apart

      3. Lyme Disease
      • For dogs in tick-prone areas
      • Two initial doses, 2-4 weeks apart

      Vaccination Schedule Tips:
      • Start vaccines at 6-8 weeks of age
      • Complete core vaccines by 16 weeks
      • Follow your vet's recommended schedule
      • Keep records of all vaccinations
      • Watch for any adverse reactions

      Remember: Regular veterinary check-ups and following the recommended vaccination schedule are crucial for your puppy's health and development.
    `,
  },
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-blue-600 hover:text-blue-700">
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            ← Back to Blog
          </Link>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-[400px]">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>

            <div className="p-8">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-blue-600">{post.category}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>

              <div className="prose prose-lg max-w-none">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
