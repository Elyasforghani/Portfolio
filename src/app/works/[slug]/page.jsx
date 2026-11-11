import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ThreeBackground from '../../components/ThreeBackground'
import { GithubIcon } from '../../components/Icons'
import { ExternalLink, ArrowLeft, ArrowRight, CheckCircle, Cpu, Zap, Activity, Gauge, Server } from 'lucide-react'
import { PROJECTS } from '../../../data/projects'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.slug,
  }))
}

export default async function ProjectDetailPage(props) {
  const params = await props.params
  const { slug } = params

  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null

  return (
    <div className="relative font-sans bg-[#14213d] text-[#f4ede0] min-h-dvh selection:bg-[#f4ede0] selection:text-[#14213d]">
      <ThreeBackground />
      <Header />

      <main id="main-content" tabIndex={-1} className="relative z-10 pt-36 pb-32 px-6 max-w-6xl mx-auto">
        {/* Back navigation */}
        <div className="mb-10">
          <Link
            href="/works"
            data-cursor="BACK"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c4b7a1] hover:text-[#ff6b5b] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Works Directory</span>
          </Link>
        </div>

        {/* Project Header Title */}
        <div className="mb-12">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#ff6b5b] mb-4">
            <span className="font-bold">[ {project.index} ]</span>
            <span>&bull;</span>
            <span className="text-[#f4ede0]/80">{project.tag}</span>
            <span>&bull;</span>
            <span className="text-[#c4b7a1]">{project.year}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight font-syne text-[#f4ede0] mb-6 leading-[1.05] break-words">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#c4b7a1] font-light leading-relaxed max-w-3xl font-sans break-words">
            {project.longDesc}
          </p>

          {/* Action Links Bar */}
          <div className="flex items-center gap-4 mt-8 flex-wrap">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff6b5b] text-[#14213d] font-syne font-bold text-xs uppercase tracking-widest hover:bg-[#ff8577] transition-colors shadow-lg"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Inspect Source on GitHub</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-[#f4ede0]/15 text-[#c4b7a1] font-mono text-xs uppercase tracking-widest">
                <GithubIcon className="w-4 h-4" />
                <span>Client build — source not public</span>
              </span>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LIVE"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0f1a30] border border-[#f4ede0]/20 text-[#f4ede0] font-mono text-xs uppercase tracking-wider hover:bg-[#f4ede0]/10 hover:border-[#ff6b5b]/50 transition-colors shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Production Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Honest Project Facts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-16 p-4 sm:p-6 rounded-2xl bg-[#0f1a30]/80 border border-[#f4ede0]/15">
          <div className="p-2 sm:p-3 min-w-0">
            <span className="text-[10px] font-mono uppercase text-[#c4b7a1] block mb-1 truncate">
              Year
            </span>
            <div className="flex items-center gap-2 font-syne font-black text-xl sm:text-2xl text-[#f4ede0] truncate">
              <Gauge className="w-4 h-4 shrink-0 text-[#ff6b5b]" />
              <span>{project.year}</span>
            </div>
          </div>

          <div className="p-2 sm:p-3 min-w-0">
            <span className="text-[10px] font-mono uppercase text-[#c4b7a1] block mb-1 truncate">
              Type
            </span>
            <div className="flex items-center gap-2 font-syne font-black text-xl sm:text-2xl text-[#ff6b5b] truncate">
              <Zap className="w-4 h-4 shrink-0" />
              <span>{project.category}</span>
            </div>
          </div>

          <div className="p-2 sm:p-3 min-w-0">
            <span className="text-[10px] font-mono uppercase text-[#c4b7a1] block mb-1 truncate">
              Source
            </span>
            <div className="flex items-center gap-2 font-syne font-black text-xl sm:text-2xl text-[#f4ede0] truncate">
              <Server className="w-4 h-4 shrink-0 text-[#ff6b5b]" />
              <span>{project.githubUrl ? 'Open Source' : 'Client Build'}</span>
            </div>
          </div>

          <div className="p-2 sm:p-3 min-w-0">
            <span className="text-[10px] font-mono uppercase text-[#c4b7a1] block mb-1 truncate">
              Status
            </span>
            <div className="flex items-center gap-2 font-syne font-black text-xl sm:text-2xl text-[#ff6b5b] truncate">
              <Activity className="w-4 h-4 shrink-0" />
              <span>{project.liveUrl ? 'Live' : 'Code Only'}</span>
            </div>
          </div>
        </div>
        {/* Full Showcase Image Banner */}
        <div className="relative aspect-16/9 w-full overflow-hidden rounded-3xl border border-[#f4ede0]/15 bg-[#0c1527] shadow-2xl mb-16">
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            sizes="100vw"
            priority
            className="object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1527]/90 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#0c1527]/90 backdrop-blur-md text-[#f4ede0] border border-[#f4ede0]/15">
              {project.highlight}
            </span>
          </div>
        </div>

        {/* Technical Architecture Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ff6b5b] block mb-2">
              How It Works
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight font-syne text-[#f4ede0] mb-4">
              The Pieces &amp; How They Fit
            </h2>
            <p className="text-sm text-[#c4b7a1] font-light leading-relaxed mb-6 font-sans">
              The moving parts of this project, in the order you would meet them as a user.
            </p>

            <div className="p-6 rounded-2xl bg-[#0f1a30]/80 border border-[#f4ede0]/15 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#f4ede0] flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#ff6b5b]" />
                <span>Built With</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-[#f4ede0]/10 text-xs font-mono text-[#f4ede0]/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {project.architecture.map((arch, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0f1a30]/80 border border-[#f4ede0]/10 hover:border-[#ff6b5b]/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b5b] flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#ff6b5b]" />
                    {arch.layer}
                  </span>
                  <span className="text-[10px] font-mono text-[#c4b7a1]/60">
                    LAYER 0{i + 1}
                  </span>
                </div>
                <p className="text-sm text-[#c4b7a1] font-light leading-relaxed font-sans">
                  {arch.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Visual Gallery & Production Artifacts */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-20">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ff6b5b] block mb-2">
              Visual Showcase
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight font-syne text-[#f4ede0] mb-8">
              Screenshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#f4ede0]/15 bg-[#0f1a30]/60 overflow-hidden group hover:border-[#ff6b5b]/50 transition-all duration-300 shadow-xl"
                >
                  <div className="relative aspect-[3/4] w-full bg-[#0c1527]">
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1527]/90 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="p-4 border-t border-[#f4ede0]/15">
                    <span className="text-xs font-mono text-[#f4ede0]/80 block truncate">
                      {item.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next / Previous Project Pagination */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-12 border-t border-[#f4ede0]/15">
          {prevProject ? (
            <Link
              href={`/works/${prevProject.slug}`}
              data-cursor="PREV"
              className="group flex flex-col items-start gap-1 min-w-0"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c4b7a1] flex items-center gap-1 group-hover:text-[#ff6b5b]">
                <ArrowLeft className="w-3 h-3 shrink-0" /> Previous Case
              </span>
              <span className="font-syne font-black text-lg sm:text-xl text-[#f4ede0] group-hover:text-[#ff6b5b] transition-colors uppercase break-words">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/works/${nextProject.slug}`}
              data-cursor="NEXT"
              className="group flex flex-col items-start sm:items-end gap-1 text-left sm:text-right min-w-0"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c4b7a1] flex items-center gap-1 group-hover:text-[#ff6b5b]">
                Next Case <ArrowRight className="w-3 h-3 shrink-0" />
              </span>
              <span className="font-syne font-black text-lg sm:text-xl text-[#f4ede0] group-hover:text-[#ff6b5b] transition-colors uppercase break-words">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
