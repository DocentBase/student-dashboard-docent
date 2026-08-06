import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Trophy } from 'lucide-react';

export default function ResultsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Exam Results</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Your academic performance</p>
      </div>
      
      <div className="flex flex-col gap-4">
        <Card hoverable className="flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 rounded-full" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
            <Trophy size={48} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-xl mb-1">Physics Weekly Test</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Conducted on 02 Aug 2026</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold" style={{ color: 'var(--brand-primary)' }}>45<span className="text-xl text-gray-400">/50</span></div>
            <Badge variant="success" className="mt-2">A Grade</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
