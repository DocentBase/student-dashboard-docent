import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Megaphone } from 'lucide-react';

export default function NoticesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Notice Board</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Important updates and announcements</p>
      </div>
      
      <div className="flex flex-col gap-4">
        <Card hoverable>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">Holiday on 15 Aug</h3>
            <Badge variant="info">Holiday</Badge>
          </div>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>The institution will remain closed on 15 August for National Mourning Day. Classes will resume as per regular schedule from 16 August.</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Posted on 10 Aug 2026</p>
        </Card>

        <Card hoverable>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">Mid-Term Exam Schedule Published</h3>
            <Badge variant="warning">Exam</Badge>
          </div>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>The schedule for the upcoming mid-term examinations is now available on the portal. Please check the Exams tab.</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Posted on 05 Aug 2026</p>
        </Card>
      </div>
    </div>
  );
}
