export interface Student {
  id: string;
  organization_id: string;
  clerk_user_id?: string;
  first_name: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  blood_group?: string;
  profile_photo_url?: string;
  student_id?: string;
  class?: string;
  section?: string;
  roll?: string;
  guardian_name?: string;
  guardian_relation?: string;
  guardian_phone?: string;
  guardian_email?: string;
  guardian_address?: string;
  phone?: string;
  email?: string;
  address?: string;
  is_phone_editable: boolean;
  is_email_editable: boolean;
  status: 'active' | 'archived' | 'graduated';
  enrolled_at: string;
  created_at: string;
  updated_at: string;
}

export interface Batch {
  id: string;
  organization_id: string;
  name: string;
  timing?: string;
  capacity?: number;
  assigned_teacher?: string;
  monthly_fee?: number;
  batch_code?: string;
  coaching_center_id?: string;
  coaching_center_name?: string;
  subject?: string;
  class_level?: string;
  days_schedule?: string[];
  room_number?: string;
  teacher_avatar?: string;
  teacher_phone?: string;
  progress_percentage?: number;
  total_students?: number;
  enrolled_date?: string;
  status?: 'active' | 'upcoming' | 'completed';
}

export interface CoachingCenter {
  id: string;
  name: string;
  code: string;
  branch: string;
  address: string;
  contact_phone: string;
  contact_email: string;
  head_teacher: string;
  logo_url?: string;
  enrolled_batches_count: number;
  total_subjects: number;
  established_year?: string;
}

export interface StudentBatchEnrollment {
  id: string;
  student_id: string;
  batch_id: string;
  organization_id: string;
  enrolled_at: string;
  status: 'active' | 'dropped' | 'completed';
}

export interface Attendance {
  id: string;
  organization_id: string;
  batch_id: string;
  student_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'holiday';
  subject?: string;
  marked_by?: string;
  marked_at: string;
  homework_rating?: number;
  created_at: string;
}

export interface Fee {
  id: string;
  organization_id: string;
  batch_id: string;
  student_id: string;
  month: string;
  amount: number;
  currency: string;
  status: 'paid' | 'due' | 'overdue' | 'waived';
  due_date?: string;
  paid_date?: string;
  paid_amount?: number;
  late_fee: number;
  payment_method?: string;
  transaction_id?: string;
  receipt_url?: string;
  recorded_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Exam {
  id: string;
  organization_id: string;
  batch_id: string;
  name: string;
  exam_type: 'midterm' | 'final' | 'quiz' | 'class-test' | 'model-test';
  subject: string;
  date: string;
  start_time?: string;
  duration_minutes?: number;
  venue?: string;
  instructions?: string;
  syllabus_topics?: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Result {
  id: string;
  organization_id: string;
  exam_id: string;
  student_id: string;
  batch_id: string;
  obtained_marks?: number;
  total_marks: number;
  grade?: string;
  gpa?: number;
  is_passed?: boolean;
  position?: number;
  teacher_remarks?: string;
  remarks_by?: string;
  published: boolean;
  published_at?: string;
  created_at: string;
}

export interface Routine {
  id: string;
  organization_id: string;
  batch_id: string;
  day_of_week: number;
  subject: string;
  teacher_name?: string;
  room?: string;
  start_time: string;
  end_time: string;
  is_break: boolean;
  subject_color?: string;
  created_at: string;
  updated_at: string;
}

export interface Notice {
  id: string;
  organization_id: string;
  title: string;
  body: string;
  category: 'important' | 'academic' | 'holiday' | 'exam';
  target_type: 'all' | 'batch' | 'class';
  target_batch_ids?: string[];
  attachments?: any;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  organization_id: string;
  batch_id: string;
  title: string;
  subject: string;
  description?: string;
  file_type: string;
  file_url: string;
  file_size?: string;
  uploaded_by?: string;
  teacher_name?: string;
  created_at: string;
}
