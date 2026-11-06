'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ThreeBackground from '../components/ThreeBackground'
import ProjectIndex from '../components/ProjectIndex'
import { GithubIcon } from '../components/Icons'
import { ExternalLink, ArrowUpRight, FileText, Filter, List, Grid } from 'lucide-react'
import { PROJECTS } from '../../data/projects'

export default function WorksArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState('grid')

  const categories = ['All', 'Full-Stack', '3D & WebGL', 'Systems', 'Frontend', 'Motion']

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory)

  return (
    <div className="relative font-sans bg-[#14213d] text-[#f4ede0] min-h-screen selection:bg-[#f4ede0] selection:text-[#14213d]">
      <ThreeBackground />
      <Header />

      <main className="relative z-10 pt-36 pb-32 px-6 max-w-7xl mx-auto">
        {/* Page Top Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-slate-400 mb-3">
            <span>[ WORKS ARCHIVE ]</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-syne text-white mb-6 break-words">
            Selected Works &amp; Repositories
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed break-words">
            Everything I have shipped that is worth showing — client work, open-source repos and small experiments. Every GitHub link goes to a real repository you can read.
          </p>
        </div>

        {/* Filter Categories Bar & View Switcher */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-8 mb-12 border-b border-white/10">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mr-2">
              <Filter className="w-3.5 h-3.5 text-slate-300" />
              <span>Filter:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                data-cursor="FILTER"
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#ff6b5b] text-[#14213d] font-bold shadow-lg'
                    : 'bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-full text-xs font-mono">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'list' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
              title="Editorial Index View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Projects View */}
        {viewMode === 'list' ? (
          <ProjectIndex limit={null} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((proj) => (
              <div
                key={proj.slug}
                className="group flex flex-col rounded-3xl glass-panel overflow-hidden shadow-xl hover:border-slate-300/50 transition-all duration-500"
              >
                {/* Card Visual with Link */}
                <Link
                  href={`/works/${proj.slug}`}
                  data-cursor="INSPECT"
                  className="relative aspect-16/10 w-full overflow-hidden bg-neutral-950 block"
                >
                  <Image
                    src={proj.imageSrc}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/70 backdrop-blur-md text-slate-200 border border-white/15">
                      {proj.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/70 backdrop-blur-md text-neutral-300 border border-white/10">
                      {proj.year}
                    </span>
                  </div>
                </Link>

                {/* Card Meta Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between min-w-0">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono tracking-widest text-neutral-400 uppercase mb-2">
                      <span className="text-slate-100">[ {proj.index} ]</span>
                      <span className="text-[10px]">{proj.tag}</span>
                    </div>

                    <Link href={`/works/${proj.slug}`} data-cursor="CASE STUDY">
                      <h3 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-white mb-3 group-hover:text-slate-200 transition-colors break-words">
                        {proj.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6 font-sans break-words">
                      {proj.shortDesc}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer action links */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono uppercase tracking-wider">
                    <Link
                      href={`/works/${proj.slug}`}
                      data-cursor="CASE STUDY"
                      className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>

                    <div className="flex items-center gap-3">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="GITHUB"
                        className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Repo</span>
                      </a>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="LIVE"
                          className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-slate-200 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
