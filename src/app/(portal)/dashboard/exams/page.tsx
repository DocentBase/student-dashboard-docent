import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function ExamsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Upcoming Exams</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Your examination schedule</p>
      </div>
      
      <div className="flex flex-col gap-4">
        <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg">Math Mid-Term</h3>
              <Badge variant="warning">Upcoming</Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div className="flex items-center gap-1"><Calendar size={16} /> 10 Aug 2026</div>
              <div className="flex items-center gap-1"><Clock size={16} /> 10:00 AM (120 mins)</div>
              <div className="flex items-center gap-1"><MapPin size={16} /> Main Hall</div>
            </div>
          </div>
          <button className="btn btn-primary whitespace-nowrap">View Syllabus</button>
        </Card>
      </div>
    </div>
  );
}
