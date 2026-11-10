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

  const categories = ['All', ...new Set(PROJECTS.map((p) => p.category))]

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
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-syne text-[#f4ede0] mb-4 break-words">
            Real Samples &amp; <span className="text-[#ff6b5b]">Repositories</span>
          </h1>
          <p className="text-base sm:text-lg text-[#c4b7a1] max-w-2xl font-light leading-relaxed break-words">
            High-impact production builds and open-source repositories. Every GitHub link points to real code you can inspect.
          </p>
        </div>

        {/* Filter Categories Bar & View Switcher */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-8 mb-12 border-b border-[#f4ede0]/10">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c4b7a1] uppercase tracking-widest mr-2">
              <Filter className="w-3.5 h-3.5 text-[#ff6b5b]" />
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
                    : 'bg-[#0f1a30]/80 border border-[#f4ede0]/15 text-[#c4b7a1] hover:text-[#f4ede0] hover:border-[#ff6b5b]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-[#0f1a30]/80 border border-[#f4ede0]/15 p-1 rounded-full text-xs font-mono">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#ff6b5b] text-[#14213d]' : 'text-[#c4b7a1] hover:text-[#f4ede0]'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-[#ff6b5b] text-[#14213d]' : 'text-[#c4b7a1] hover:text-[#f4ede0]'
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
                className="group flex flex-col rounded-3xl bg-[#0f1a30]/85 border border-[#f4ede0]/15 overflow-hidden shadow-xl hover:border-[#ff6b5b]/50 transition-all duration-500"
              >
                {/* Card Visual with Link */}
                <Link
                  href={`/works/${proj.slug}`}
                  data-cursor="INSPECT"
                  className="relative aspect-16/10 w-full overflow-hidden bg-[#0c1527] block"
                >
                  <Image
                    src={proj.imageSrc}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1527]/85 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#0c1527]/85 backdrop-blur-md text-[#f4ede0] border border-[#f4ede0]/15">
                      {proj.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#0c1527]/85 backdrop-blur-md text-[#c4b7a1] border border-[#f4ede0]/15">
                      {proj.year}
                    </span>
                  </div>
                </Link>

                {/* Card Meta Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between min-w-0">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#c4b7a1] uppercase mb-2">
                      <span className="text-[#ff6b5b] font-bold">[ {proj.index} ]</span>
                      <span className="text-[10px]">{proj.tag}</span>
                    </div>

                    <Link href={`/works/${proj.slug}`} data-cursor="CASE STUDY">
                      <h3 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-[#f4ede0] mb-3 group-hover:text-[#ff6b5b] transition-colors break-words">
                        {proj.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-[#c4b7a1] font-light leading-relaxed mb-6 font-sans break-words">
                      {proj.shortDesc}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded bg-white/5 border border-[#f4ede0]/10 text-[11px] font-mono text-[#f4ede0]/85"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer action links */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#f4ede0]/10 text-xs font-mono uppercase tracking-wider">
                    <Link
                      href={`/works/${proj.slug}`}
                      data-cursor="CASE STUDY"
                      className="inline-flex items-center gap-1.5 text-[#ff6b5b] hover:text-[#f4ede0] transition-colors font-semibold"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>

                    <div className="flex items-center gap-3">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="GITHUB"
                          className="inline-flex items-center gap-1.5 text-[#c4b7a1] hover:text-[#f4ede0] transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Repo</span>
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="LIVE"
                          className="inline-flex items-center gap-1.5 text-[#c4b7a1] hover:text-[#ff6b5b] transition-colors"
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
