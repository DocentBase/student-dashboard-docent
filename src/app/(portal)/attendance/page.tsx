import { Card } from '@/components/ui/Card';
import { ProgressRing } from '@/components/ui/ProgressRing';

export default function AttendancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Attendance</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Track your class presence</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <Card className="flex flex-col items-center justify-center p-8">
          <h3 className="font-semibold mb-6">Overall Attendance</h3>
          <div style={{ position: 'relative' }}>
            <ProgressRing radius={60} stroke={10} progress={85} color="var(--color-success)" />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '24px' }}>
              85%
            </div>
          </div>
          <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>164 Present · 36 Absent</p>
        </Card>
        <Card>
          <h3 className="font-semibold mb-4">Subject Breakdown</h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Math</span>
                <span>90%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--color-success)', width: '90%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Physics</span>
                <span>75%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--color-warning)', width: '75%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
