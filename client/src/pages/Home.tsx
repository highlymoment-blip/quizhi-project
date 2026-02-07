import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Palette, Download } from "lucide-react";
import { useLocation } from "wouter";

/**
 * Home Page - Quizhi Project
 * Design: Playful Creative Studio
 * 
 * This is the landing page that introduces users to the Agent Skills Creator
 * and provides navigation to the main creator interface.
 */

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e8e0f0]">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff6b6b] to-[#ff8fab] flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#2d2d2d]">Quizhi</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#7a6a9a] hover:text-[#2d2d2d] smooth-transition">
              Features
            </a>
            <a href="#how-it-works" className="text-[#7a6a9a] hover:text-[#2d2d2d] smooth-transition">
              How It Works
            </a>
            <Button
              onClick={() => setLocation("/creator")}
              className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8fab] text-white rounded-full px-6 hover:shadow-lg smooth-transition"
            >
              Start Creating
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-[#2d2d2d] mb-6 leading-tight">
            Create Agent Skills
            <span className="bg-gradient-to-r from-[#ff6b6b] via-[#4ecdc4] to-[#ffd93d] bg-clip-text text-transparent">
              {" "}Without Code
            </span>
          </h2>
          <p className="text-xl text-[#7a6a9a] mb-8 leading-relaxed">
            Design powerful AI workflows using our intuitive node-based interface. 
            No coding required. Export your skills as beautiful graphics or ready-to-use packages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation("/creator")}
              className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8fab] text-white rounded-full px-8 py-6 text-lg hover:shadow-lg smooth-transition"
            >
              Launch Creator
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-lg border-[#e8e0f0] hover:bg-[#f5f3f0]"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-20">
        <h3 className="text-3xl font-bold text-[#2d2d2d] text-center mb-12">
          Powerful Features
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: "Node-Based Design",
              description: "Drag and drop to create complex workflows. Visual design makes it intuitive.",
              color: "from-[#ff6b6b] to-[#ff8fab]"
            },
            {
              icon: Palette,
              title: "Visual Customization",
              description: "Customize colors, labels, and properties for each node in your skill.",
              color: "from-[#4ecdc4] to-[#6ee7de]"
            },
            {
              icon: Download,
              title: "Export & Share",
              description: "Export your skills as graphics, JSON, or ready-to-use packages.",
              color: "from-[#ffd93d] to-[#ffed4e]"
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="p-6 rounded-3xl border-0 playful-shadow hover:playful-shadow-hover smooth-transition"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-[#2d2d2d] mb-2">
                  {feature.title}
                </h4>
                <p className="text-[#7a6a9a]">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container py-20">
        <h3 className="text-3xl font-bold text-[#2d2d2d] text-center mb-12">
          How It Works
        </h3>
        <div className="max-w-2xl mx-auto space-y-6">
          {[
            {
              step: "1",
              title: "Create a Project",
              description: "Start by creating a new Agent Skills project. Give it a name and description."
            },
            {
              step: "2",
              title: "Design Your Workflow",
              description: "Use the node-based editor to design your skill workflow. Connect different node types."
            },
            {
              step: "3",
              title: "Configure Nodes",
              description: "Set properties, inputs, and outputs for each node in your workflow."
            },
            {
              step: "4",
              title: "Export & Deploy",
              description: "Export your skill as a graphic, JSON, or ready-to-use package."
            }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#d8b4fe] flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold">{item.step}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#2d2d2d] mb-2">
                  {item.title}
                </h4>
                <p className="text-[#7a6a9a]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="rounded-3xl bg-gradient-to-br from-[#ff6b6b] via-[#4ecdc4] to-[#ffd93d] p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Create?
          </h3>
          <p className="text-white/90 mb-8 text-lg">
            Start designing your Agent Skills today. No coding required.
          </p>
          <Button
            onClick={() => setLocation("/creator")}
            className="bg-white text-[#ff6b6b] rounded-full px-8 py-6 text-lg font-bold hover:bg-white/90 smooth-transition"
          >
            Launch Creator Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e0f0] py-8 mt-20">
        <div className="container text-center text-[#7a6a9a]">
          <p>© 2026 Quizhi Project. Built with creativity and code.</p>
        </div>
      </footer>
    </div>
  );
}
