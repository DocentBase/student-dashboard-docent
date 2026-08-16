'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, Download, Search, Filter, BookOpen, ExternalLink, Bookmark } from 'lucide-react';

const mockNotes = [
  {
    id: 'res-01',
    title: 'Differential Calculus: Limits & Continuity',
    subject: 'Higher Mathematics',
    teacher: 'Prof. Tanvir Ahmed',
    fileSize: '3.4 MB',
    format: 'PDF',
    date: '12 Aug 2026',
    downloads: 142,
    description: 'Comprehensive formula sheets, graphical interpretations, and 25 practice problems with solutions.',
  },
  {
    id: 'res-02',
    title: 'Newtonian Mechanics & Planetary Motion',
    subject: 'Physics',
    teacher: 'Dr. Mahmudul Hasan',
    fileSize: '5.8 MB',
    format: 'PDF',
    date: '10 Aug 2026',
    downloads: 189,
    description: 'Lecture slides, derivation of planetary orbital laws, and sample BUET admission questions.',
  },
  {
    id: 'res-03',
    title: 'Organic Chemistry: Reaction Mechanisms',
    subject: 'Chemistry',
    teacher: 'Engr. Rafiqul Islam',
    fileSize: '4.2 MB',
    format: 'PDF',
    date: '08 Aug 2026',
    downloads: 110,
    description: 'Summary charts for SN1/SN2 mechanisms, electrophilic aromatic substitution, and synthesis pathways.',
  },
  {
    id: 'res-04',
    title: 'Cell Biology & Genetics Cheat Sheet',
    subject: 'Biology',
    teacher: 'Dr. Nusrat Jahan',
    fileSize: '2.1 MB',
    format: 'PDF',
    date: '04 Aug 2026',
    downloads: 95,
    description: 'High-yield diagrams of mitosis/meiosis, Mendelian genetics crosses, and short question notes.',
  },
];

export default function NotesPage() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const subjects = ['All', 'Higher Mathematics', 'Physics', 'Chemistry', 'Biology'];

  const filtered = mockNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="eyebrow">Academic Library</div>
        <h1 className="page-title">Study Notes & Resources</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Faculty lecture notes, problem sets, past papers, and reference handouts.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-80 h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs">
          <Search size={15} className="text-zinc-400" />
          <input
            type="text"
            placeholder="Search resources, topics, formulas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-xs text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubject === sub
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((note) => (
          <Card key={note.id} className="flex flex-col justify-between p-5 hover:border-zinc-300">
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {note.subject}
                    </span>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-snug">
                      {note.title}
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                  {note.format}
                </span>
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                {note.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <div className="text-[11px] text-zinc-400">
                <span>{note.teacher}</span> • <span className="font-mono">{note.fileSize}</span>
              </div>

              <button className="btn btn-secondary text-xs h-8 px-3">
                <Download size={13} />
                <span>Download</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
