import { Bot, Zap, Shield, Globe } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Bot,
      title: 'Advanced AI',
      description: 'Powered by cutting-edge language models for intelligent conversations.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant responses to your queries with minimal latency.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your conversations are encrypted and protected with industry-standard security.',
    },
    {
      icon: Globe,
      title: 'Always Available',
      description: '24/7 availability to assist you whenever you need help.',
    },
  ];

  return (
    <div className="bg-[#343541] min-h-full">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">About Our AI Assistant</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We're building the future of conversational AI to help you work smarter, learn faster, and achieve more.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-[#444654] rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Our mission is to make advanced AI accessible to everyone. We believe that artificial intelligence should be a tool that empowers people, not replaces them.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Through continuous innovation and improvement, we're creating an AI assistant that understands context, learns from interactions, and provides meaningful assistance across a wide range of tasks.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-[#444654] rounded-lg p-6 hover:bg-[#4a4b5a] transition-colors"
              >
                <div className="w-12 h-12 bg-[#10a37f] rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
        <div className="bg-[#444654] rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Team</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We're a diverse team of engineers, researchers, and designers passionate about pushing the boundaries of what's possible with AI.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Our team combines expertise in machine learning, natural language processing, user experience design, and software engineering to create a product that's both powerful and intuitive.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#10a37f] mb-2">1M+</div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#10a37f] mb-2">99.9%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#10a37f] mb-2">24/7</div>
            <div className="text-sm text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
