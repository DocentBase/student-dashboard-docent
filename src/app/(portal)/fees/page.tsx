import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Wallet } from 'lucide-react';

export default function FeesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Fees & Payments</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your tuition payments</p>
      </div>
      
      <div className="flex flex-col gap-4">
        <Card>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full" style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>
                <Wallet size={32} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">August 2026 Tuition</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Due on 10 Aug 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold">৳ 5,500</div>
                <Badge variant="warning">Due</Badge>
              </div>
              <button className="btn btn-primary whitespace-nowrap">Pay Now</button>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-lg mb-4">Payment History</h3>
          <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <p className="font-medium">July 2026 Tuition</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Paid on 05 Jul 2026 via bKash</p>
            </div>
            <div className="text-right">
              <p className="font-bold">৳ 5,500</p>
              <Badge variant="paid">Paid</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
