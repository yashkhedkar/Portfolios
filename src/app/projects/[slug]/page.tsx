
import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, Globe, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import ShaderBackground from "@/components/ShaderBackground";

// Force static generation for known projects
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ... (existing params logic)
  const { slug } = await params;
  
  // Normalize slug to handle potential encoding or case issues
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  
  // Try to find by slug first
  let project = projects.find((p) => p.slug.toLowerCase() === decodedSlug);

  if (!project) {
    // Fallback: Check if the slug is actually an ID (legacy support/stale link)
    // We check against the raw slug or decoded one, searching for ID
    project = projects.find((p) => p.id.toString() === decodedSlug);
  }

  if (!project) {
    // If still not found, trigger 404
    notFound();
  }

  return (
      <div 
        className="min-h-screen text-foreground transition-colors duration-700 bg-black relative"
      >
        <ShaderBackground />
        
        {/* Navigation Bar Placeholder or Back Button */}
        <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-background/50 backdrop-blur-md border-b border-white/10">
          <Link
            href="/"
            className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-widest">Back to Home</span>
          </Link>
          <div className="font-mono text-sm text-primary">{project.subtitle}</div>
        </div>

        <main className="pt-24 container mx-auto px-6 max-w-7xl relative z-10">
          {/* Header Section */}
          <div className="mb-16">
            <h1 className="font-display text-5xl md:text-8xl font-medium mb-6 leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center text-muted-foreground">
               <span className="shiny-edge-orange px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-mono tracking-wider">
                  {project.role || "Developer"}
               </span>
               <span className="shiny-edge-orange px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-mono tracking-wider">
                  {project.duration || "2024"}
               </span>
            </div>
          </div>

          {/* Main Image */}
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl shiny-edge-orange">
             <Image 
                src={project.image} 
                alt={project.title}
                fill
                className="object-cover"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
             {/* Left Column: Description & Links */}
             <div className="lg:col-span-2 space-y-12">
                <div>
                   <h3 className="text-2xl font-display mb-6 text-white">Overview</h3>
                   <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                      {project.longDescription || project.description}
                   </p>
                </div>

                {project.features && (
                  <div>
                    <h3 className="text-2xl font-display mb-6 text-white">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-8">
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="shiny-edge-orange px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <Globe className="w-5 h-5" />
                      Live Demo
                      <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="shiny-edge-orange px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                  )}
                </div>
             </div>

             {/* Right Column: Tech Stack & Stats */}
             <div className="space-y-12">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shiny-edge-orange">
                   <h3 className="text-xl font-display mb-6 text-white border-b border-white/10 pb-4">Tech Stack</h3>
                   <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, idx) => (
                         <span key={idx} className="px-3 py-1.5 bg-white/5 rounded-md text-sm text-primary/90 font-mono border border-primary/20">
                            {tech}
                         </span>
                      )) || project.stats.map((stat, idx) => (
                         <span key={idx} className="px-3 py-1.5 bg-white/5 rounded-md text-sm text-primary/90 font-mono border border-primary/20">
                            {stat.value}
                         </span>
                      ))}
                   </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shiny-edge-orange">
                   <h3 className="text-xl font-display mb-6 text-white border-b border-white/10 pb-4">Project Stats</h3>
                   <div className="space-y-4">
                      {project.stats.map((stat, idx) => (
                         <div key={idx} className="flex justify-between items-center">
                            <span className="text-muted-foreground">{stat.label}</span>
                            <span className="font-bold text-white">{stat.value}</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Gallery Section */}
          {project.gallery && project.gallery.length > 0 && (
             <div className="mt-24">
                <h3 className="text-3xl font-display mb-10 text-white">Project Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {project.gallery.map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 hover:scale-[1.02] transition-transform duration-500 cursor-pointer group shiny-edge-orange">
                         <Image 
                            src={img} 
                            alt={`${project.title} screenshot ${idx + 1}`} 
                            fill
                            className="object-cover"
                         />
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="shiny-edge-orange text-white font-mono tracking-widest uppercase text-sm border border-white/30 px-4 py-2 rounded-full">View Fullscreen</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}
        </main>
        
        <div className="mt-20 relative z-10">
          <Footer />
        </div>
      </div>
  );
}
