import { Card } from '@/components/ui/Card';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p style={{ color: 'var(--text-secondary)' }}>App preferences and notifications</p>
      </div>
      
      <Card className="max-w-4xl">
        <h3 className="font-bold text-lg mb-4">Preferences</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Receive important updates via SMS</p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <p className="font-medium">Email Reports</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Receive monthly progress reports via email</p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
        </div>
      </Card>
    </div>
  );
}
