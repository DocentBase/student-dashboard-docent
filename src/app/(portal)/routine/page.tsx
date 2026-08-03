import { Card } from '@/components/ui/Card';

export default function RoutinePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Class Routine</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Your weekly schedule</p>
      </div>
      <Card>
        <div className="p-4 text-center" style={{ color: 'var(--text-secondary)' }}>
          Routine schedule will be displayed here.
        </div>
      </Card>
    </div>
  );
}
