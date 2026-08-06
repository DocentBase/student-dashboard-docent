import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { FileText, Download } from 'lucide-react';

export default function NotesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Notes & Resources</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Study materials shared by teachers</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card hoverable className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg" style={{ background: 'var(--color-info-light)', color: 'var(--color-info)' }}>
              <FileText size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Calculus Chap 1</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Math · 2.4 MB PDF</p>
            </div>
          </div>
          <button className="btn btn-secondary w-full mt-auto">
            <Download size={16} className="mr-2" /> Download
          </button>
        </Card>

        <Card hoverable className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg" style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>
              <FileText size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Physics Mechanics Notes</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Physics · 5.1 MB PDF</p>
            </div>
          </div>
          <button className="btn btn-secondary w-full mt-auto">
            <Download size={16} className="mr-2" /> Download
          </button>
        </Card>
      </div>
    </div>
  );
}
