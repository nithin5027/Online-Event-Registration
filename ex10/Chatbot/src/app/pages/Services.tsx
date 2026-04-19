import { MessageSquare, FileText, Code, Languages, Search, Lightbulb, BookOpen, Calculator } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: MessageSquare,
      title: 'Conversational AI',
      description: 'Engage in natural, human-like conversations on any topic. Get answers, discuss ideas, and explore concepts.',
      features: ['Context-aware responses', 'Multi-turn conversations', 'Follow-up questions'],
    },
    {
      icon: FileText,
      title: 'Content Generation',
      description: 'Create high-quality content for blogs, articles, emails, and more with AI assistance.',
      features: ['Blog posts & articles', 'Email drafting', 'Social media content'],
    },
    {
      icon: Code,
      title: 'Code Assistant',
      description: 'Get help with programming tasks, debugging, and understanding code across multiple languages.',
      features: ['Code explanation', 'Bug fixing', 'Algorithm design'],
    },
    {
      icon: Languages,
      title: 'Translation',
      description: 'Translate text between multiple languages while preserving context and nuance.',
      features: ['100+ languages', 'Cultural context', 'Idiomatic expressions'],
    },
    {
      icon: Search,
      title: 'Research Assistant',
      description: 'Help with research tasks, summarizing information, and organizing knowledge.',
      features: ['Information synthesis', 'Fact checking', 'Citation help'],
    },
    {
      icon: Lightbulb,
      title: 'Creative Ideation',
      description: 'Brainstorm ideas, generate creative concepts, and explore innovative solutions.',
      features: ['Idea generation', 'Creative writing', 'Problem solving'],
    },
    {
      icon: BookOpen,
      title: 'Learning & Education',
      description: 'Get explanations, learn new concepts, and receive personalized tutoring assistance.',
      features: ['Concept explanations', 'Study guides', 'Practice problems'],
    },
    {
      icon: Calculator,
      title: 'Data Analysis',
      description: 'Analyze data, perform calculations, and gain insights from complex information.',
      features: ['Statistical analysis', 'Data interpretation', 'Visualization suggestions'],
    },
  ];

  return (
    <div className="bg-[#343541] min-h-full">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Our Services & Features</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the wide range of capabilities our AI assistant offers to help you accomplish your goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-[#444654] rounded-lg p-6 hover:bg-[#4a4b5a] transition-all duration-300 border border-transparent hover:border-[#10a37f]"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#10a37f] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-[#10a37f] rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#10a37f] to-[#0d8b6b] rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Start chatting with our AI assistant today and experience the power of advanced language models.
          </p>
          <button className="bg-white text-[#10a37f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Chatting Now
          </button>
        </div>

        {/* Pricing Tiers */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#444654] rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
              <div className="text-4xl font-bold text-white mb-4">$0</div>
              <p className="text-gray-400 text-sm mb-6">Perfect for getting started</p>
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-[#10a37f] rounded-full" />
                  Limited messages per day
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-[#10a37f] rounded-full" />
                  Standard response time
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-[#10a37f] rounded-full" />
                  Basic features
                </li>
              </ul>
              <button className="w-full bg-[#343541] hover:bg-[#2f3038] text-white py-2 rounded-lg transition-colors">
                Get Started
              </button>
            </div>

            <div className="bg-[#10a37f] rounded-lg p-6 text-center relative">
              <div className="absolute top-0 right-0 bg-white text-[#10a37f] text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-4">$20</div>
              <p className="text-white/80 text-sm mb-6">For power users</p>
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-center gap-2 text-sm text-white">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  Unlimited messages
                </li>
                <li className="flex items-center gap-2 text-sm text-white">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  Priority response time
                </li>
                <li className="flex items-center gap-2 text-sm text-white">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  Advanced features
                </li>
                <li className="flex items-center gap-2 text-sm text-white">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  API access
                </li>
              </ul>
              <button className="w-full bg-white text-[#10a37f] py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Upgrade Now
              </button>
            </div>

            <div className="bg-[#444654] rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-4">Custom</div>
              <p className="text-gray-400 text-sm mb-6">For large organizations</p>
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-[#10a37f] rounded-full" />
                  Custom solutions
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-[#10a37f] rounded-full" />
                  Dedicated support
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-[#10a37f] rounded-full" />
                  Custom integrations
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-[#10a37f] rounded-full" />
                  SLA guarantee
                </li>
              </ul>
              <button className="w-full bg-[#343541] hover:bg-[#2f3038] text-white py-2 rounded-lg transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
