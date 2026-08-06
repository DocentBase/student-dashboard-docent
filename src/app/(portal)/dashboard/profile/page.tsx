import { Card } from '@/components/ui/Card';
import { UserProfile } from '@clerk/nextjs';

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Student Profile</h2>
        <p style={{ color: 'var(--text-secondary)' }}>View and manage your personal details</p>
      </div>
      
      <div className="flex justify-center w-full max-w-4xl mx-auto">
        {/* We use Clerk's UserProfile for the parts students can edit */}
        <UserProfile path="/profile" routing="path" />
      </div>

      <Card className="max-w-4xl mx-auto w-full">
        <h3 className="font-bold text-lg mb-4">Academic Details</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>These details are managed by your institution and cannot be changed here.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="text-xs uppercase" style={{ color: 'var(--text-muted)' }}>Student ID (USI)</p>
            <p className="font-medium">DC-2026-0894</p>
          </div>
          <div className="p-3 border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="text-xs uppercase" style={{ color: 'var(--text-muted)' }}>Class</p>
            <p className="font-medium">Class 10</p>
          </div>
          <div className="p-3 border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="text-xs uppercase" style={{ color: 'var(--text-muted)' }}>Roll</p>
            <p className="font-medium">12</p>
          </div>
          <div className="p-3 border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="text-xs uppercase" style={{ color: 'var(--text-muted)' }}>Section</p>
            <p className="font-medium">A (Science)</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
