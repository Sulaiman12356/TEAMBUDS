-- ============================================================================
-- TeamBud Relational Database Schema & Supabase Row Level Security (Section 14)
-- PostgreSQL / Supabase Migration Blueprint
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Institutions
CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  domain TEXT, -- e.g. 'unilag.edu.ng' for automatic institutional email detection
  country TEXT NOT NULL DEFAULT 'Nigeria',
  state TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Service Categories (Admin-managed)
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Admin Users (Separate Privileged Role Table)
CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  permission_level TEXT NOT NULL DEFAULT 'moderator' CHECK (permission_level IN ('super_admin', 'moderator', 'finance_auditor')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Student / User Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'client', 'admin')),
  username TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL,
  institution_name TEXT,
  department TEXT,
  academic_level TEXT,
  country TEXT NOT NULL DEFAULT 'Nigeria',
  state TEXT,
  headline TEXT,
  bio TEXT,
  about_me TEXT,
  experience_level TEXT,
  primary_category TEXT,
  availability TEXT NOT NULL DEFAULT 'unset',
  avatar_url TEXT,
  looking_for TEXT[] DEFAULT '{}',
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  profile_visibility TEXT NOT NULL DEFAULT 'public' CHECK (profile_visibility IN ('public', 'students_only', 'hidden')),
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  student_verification_status TEXT NOT NULL DEFAULT 'none' CHECK (student_verification_status IN ('none', 'pending', 'verified', 'rejected')),
  student_verification_note TEXT,
  is_suspended BOOLEAN NOT NULL DEFAULT FALSE,
  suspension_reason TEXT,
  is_deactivated BOOLEAN NOT NULL DEFAULT FALSE,
  onboarded BOOLEAN NOT NULL DEFAULT FALSE,
  blocked_user_ids UUID[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role_visibility ON profiles(role, profile_visibility) WHERE NOT is_suspended AND NOT is_deactivated;
CREATE INDEX IF NOT EXISTS idx_profiles_institution ON profiles(institution_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- 5. Clients (Business / Individual Accounts)
CREATE TABLE IF NOT EXISTS clients (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  organisation_name TEXT NOT NULL,
  account_type TEXT NOT NULL,
  contact_channel TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Nigeria',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Skills & Student Skills
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE SET NULL,
  skill_name TEXT NOT NULL,
  proficiency_level TEXT NOT NULL DEFAULT 'Intermediate',
  offer_professionally BOOLEAN NOT NULL DEFAULT TRUE,
  open_to_collaborate BOOLEAN NOT NULL DEFAULT TRUE,
  currently_learning BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, LOWER(skill_name))
);

CREATE INDEX IF NOT EXISTS idx_student_skills_student ON student_skills(student_id);

-- 7. Student Portfolios
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  agency_id UUID, -- populated via FK below after agencies table
  title TEXT NOT NULL,
  category TEXT,
  description TEXT NOT NULL,
  tools_used TEXT[] DEFAULT '{}',
  external_url TEXT,
  contribution TEXT,
  media_url TEXT,
  completed_date TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portfolios_student ON portfolios(student_id);

-- 8. Student Connections
CREATE TABLE IF NOT EXISTS connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  intro_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (sender_id <> receiver_id),
  UNIQUE (sender_id, receiver_id)
);

CREATE INDEX IF NOT EXISTS idx_connections_receiver ON connections(receiver_id, status);

-- 9. Agencies
CREATE TABLE IF NOT EXISTS agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_desc TEXT NOT NULL,
  full_desc TEXT NOT NULL,
  industry TEXT NOT NULL,
  main_category TEXT NOT NULL,
  additional_services TEXT[] DEFAULT '{}',
  institution_name TEXT NOT NULL,
  location TEXT NOT NULL,
  logo_url TEXT,
  availability TEXT NOT NULL DEFAULT 'available',
  status TEXT NOT NULL DEFAULT 'forming' CHECK (status IN ('forming', 'active', 'needs_members', 'suspended')),
  verification_status TEXT NOT NULL DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')),
  verification_note TEXT,
  is_suspended BOOLEAN NOT NULL DEFAULT FALSE,
  suspension_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE portfolios
  ADD CONSTRAINT fk_portfolios_agency FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_agencies_status ON agencies(status) WHERE NOT is_suspended;
CREATE INDEX IF NOT EXISTS idx_agencies_slug ON agencies(slug);

-- 10. Agency Members (Strict max 10, no duplicate active memberships)
CREATE TABLE IF NOT EXISTS agency_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'Team Member',
  custom_role_desc TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'removed')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (agency_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_agency_members_user ON agency_members(user_id);

-- Enforce strict agency rules (<= 10 active members; >= 3 active members for 'active' status)
CREATE OR REPLACE FUNCTION enforce_agency_membership_rules()
RETURNS TRIGGER AS $$
DECLARE
  member_count INT;
BEGIN
  SELECT COUNT(*) INTO member_count
  FROM agency_members
  WHERE agency_id = COALESCE(NEW.agency_id, OLD.agency_id) AND status = 'active';

  IF TG_OP IN ('INSERT', 'UPDATE') AND member_count > 10 THEN
    RAISE EXCEPTION 'An agency cannot exceed 10 active members.';
  END IF;

  UPDATE agencies
  SET status = CASE
    WHEN is_suspended THEN 'suspended'
    WHEN member_count >= 3 THEN 'active'
    WHEN status = 'active' AND member_count < 3 THEN 'needs_members'
    ELSE 'forming'
  END,
  updated_at = NOW()
  WHERE id = COALESCE(NEW.agency_id, OLD.agency_id);

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_agency_membership_rules ON agency_members;
CREATE TRIGGER trg_agency_membership_rules
AFTER INSERT OR UPDATE OR DELETE ON agency_members
FOR EACH ROW EXECUTE FUNCTION enforce_agency_membership_rules();

-- 11. Agency Invitations (Acceptance Required)
CREATE TABLE IF NOT EXISTS agency_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  invitee_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  invite_code TEXT NOT NULL UNIQUE,
  proposed_role TEXT NOT NULL DEFAULT 'Team Member',
  custom_role_desc TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Agency Agreements
CREATE TABLE IF NOT EXISTS agency_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  agreement_version TEXT NOT NULL DEFAULT '1.0',
  acknowledged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (agency_id, member_id, agreement_version)
);

-- 13. Services Offered by Agencies
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  starting_price TEXT NOT NULL,
  estimated_timeline TEXT NOT NULL,
  required_info TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_agency ON services(agency_id);

-- 14. Client Project Requests & Quotations
CREATE TABLE IF NOT EXISTS project_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  agency_id UUID REFERENCES agencies(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'quoted', 'active', 'declined', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES project_requests(id) ON DELETE CASCADE,
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  amount_ngn NUMERIC(12,2) NOT NULL CHECK (amount_ngn > 0),
  scope TEXT NOT NULL,
  estimated_delivery TEXT NOT NULL,
  terms TEXT,
  milestones JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'accepted', 'declined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. Agency Projects & Tasks
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  request_id UUID REFERENCES project_requests(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  deadline DATE,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Planning', 'In Progress', 'Under Review', 'Completed', 'Cancelled')),
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  assignee_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. Direct & Agency Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  body TEXT NOT NULL,
  attachment JSONB,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (recipient_id IS NOT NULL OR agency_id IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_agency ON messages(agency_id, created_at);

-- 17. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  notif_type TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);

-- 18. Opportunities & Saved Items
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  organisation TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  deadline DATE NOT NULL,
  application_link TEXT,
  allow_in_app_apply BOOLEAN NOT NULL DEFAULT TRUE,
  reward_or_value TEXT,
  location TEXT NOT NULL DEFAULT 'Nigeria',
  verification_status TEXT NOT NULL DEFAULT 'community' CHECK (verification_status IN ('verified', 'community')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS saved_opportunities (
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (student_id, opportunity_id)
);

CREATE TABLE IF NOT EXISTS saved_agencies (
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (client_id, agency_id)
);

-- 19. Payments & Agreed Revenue Allocations (Paystack + Manual Distribution Ledger)
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  request_id UUID REFERENCES project_requests(id) ON DELETE SET NULL,
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE RESTRICT,
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  quotation_amount NUMERIC(12,2) NOT NULL,
  agreed_project_fee NUMERIC(12,2) NOT NULL,
  amount_paid NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'NGN',
  status TEXT NOT NULL DEFAULT 'Awaiting Payment' CHECK (status IN ('Awaiting Payment', 'Processing', 'Paid', 'Failed', 'Refunded', 'Disputed')),
  internal_reference TEXT NOT NULL UNIQUE,
  paystack_reference TEXT UNIQUE,
  payment_date TIMESTAMPTZ,
  dispute_status TEXT,
  dispute_reason TEXT,
  refund_status TEXT,
  transaction_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS revenue_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  member_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  member_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  percentage NUMERIC(5,2) NOT NULL,
  allocated_amount NUMERIC(12,2) NOT NULL,
  payout_status TEXT NOT NULL DEFAULT 'pending' CHECK (payout_status IN ('pending', 'confirmed')),
  payout_method TEXT NOT NULL,
  transfer_reference TEXT,
  payout_confirmed_at TIMESTAMPTZ,
  UNIQUE (payment_id, member_id)
);

-- 20. Client Reviews (Gated to Completed Projects & Moderated)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  moderation_status TEXT NOT NULL DEFAULT 'approved' CHECK (moderation_status IN ('pending', 'approved', 'hidden')),
  moderated_by UUID REFERENCES admin_users(user_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_id, project_id)
);

-- 21. Reports & Moderation
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('student', 'agency', 'opportunity', 'payment')),
  target_id UUID NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN (
    'Fake agency',
    'Misleading service listing',
    'Fraudulent activity',
    'Harassment',
    'Inappropriate content',
    'Payment dispute',
    'Other safety concern'
  )),
  details TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'dismissed')),
  admin_notes TEXT,
  action_taken TEXT,
  resolved_by UUID REFERENCES admin_users(user_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 22. Platform Settings & Contact Inquiries
CREATE TABLE IF NOT EXISTS platform_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  platform_name TEXT NOT NULL DEFAULT 'TeamBud',
  tagline TEXT NOT NULL DEFAULT 'Find Your People. Build Your Future.',
  support_email TEXT NOT NULL DEFAULT '',
  announcement_text TEXT NOT NULL DEFAULT '',
  announcement_active BOOLEAN NOT NULL DEFAULT FALSE,
  email_templates JSONB NOT NULL DEFAULT '{}'::jsonb,
  payment_config JSONB NOT NULL DEFAULT '{"currency":"NGN","paystackMode":"test"}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles: respect public / students_only / hidden & never allow cross-user writes
CREATE POLICY profiles_select_policy ON profiles FOR SELECT USING (
  auth.uid() = id
  OR is_admin()
  OR (
    NOT is_suspended AND NOT is_deactivated AND (
      profile_visibility = 'public'
      OR (profile_visibility = 'students_only' AND auth.uid() IS NOT NULL)
    )
  )
);
CREATE POLICY profiles_update_self ON profiles FOR UPDATE USING (auth.uid() = id OR is_admin());

-- Student Skills & Portfolios: students only edit their own entries
CREATE POLICY student_skills_read ON student_skills FOR SELECT USING (TRUE);
CREATE POLICY student_skills_write ON student_skills FOR ALL USING (auth.uid() = student_id OR is_admin());

CREATE POLICY portfolios_read ON portfolios FOR SELECT USING (TRUE);
CREATE POLICY portfolios_write ON portfolios FOR ALL USING (
  auth.uid() = student_id
  OR is_admin()
  OR (agency_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM agency_members m WHERE m.agency_id = portfolios.agency_id AND m.user_id = auth.uid() AND m.status = 'active'
  ))
);

-- Connections: participants or admins only
CREATE POLICY connections_rw ON connections FOR ALL USING (auth.uid() = sender_id OR auth.uid() = receiver_id OR is_admin());

-- Agencies & Members: public can view active non-suspended agencies; members access private workspace; owners/managers update settings
CREATE POLICY agencies_read ON agencies FOR SELECT USING (
  (status = 'active' AND NOT is_suspended)
  OR owner_id = auth.uid()
  OR is_admin()
  OR EXISTS (SELECT 1 FROM agency_members m WHERE m.agency_id = agencies.id AND m.user_id = auth.uid() AND m.status = 'active')
);
CREATE POLICY agencies_update ON agencies FOR UPDATE USING (
  is_admin()
  OR owner_id = auth.uid()
  OR EXISTS (SELECT 1 FROM agency_members m WHERE m.agency_id = agencies.id AND m.user_id = auth.uid() AND m.role IN ('Team Owner', 'Agency Manager') AND m.status = 'active')
);

CREATE POLICY agency_members_read ON agency_members FOR SELECT USING (
  is_admin()
  OR user_id = auth.uid()
  OR EXISTS (SELECT 1 FROM agencies a WHERE a.id = agency_members.agency_id AND a.status = 'active' AND NOT a.is_suspended)
  OR EXISTS (SELECT 1 FROM agency_members m WHERE m.agency_id = agency_members.agency_id AND m.user_id = auth.uid() AND m.status = 'active')
);

-- Projects & Requests: strictly scoped to participating client, agency members, or admin
CREATE POLICY project_requests_rw ON project_requests FOR ALL USING (
  client_id = auth.uid()
  OR is_admin()
  OR EXISTS (SELECT 1 FROM agency_members m WHERE m.agency_id = project_requests.agency_id AND m.user_id = auth.uid() AND m.status = 'active')
);
CREATE POLICY projects_rw ON projects FOR ALL USING (
  client_id = auth.uid()
  OR is_admin()
  OR EXISTS (SELECT 1 FROM agency_members m WHERE m.agency_id = projects.agency_id AND m.user_id = auth.uid() AND m.status = 'active')
);

-- Payments & Allocations: client, participating agency members, or admin only
CREATE POLICY payments_rw ON payments FOR ALL USING (
  client_id = auth.uid()
  OR is_admin()
  OR EXISTS (SELECT 1 FROM agency_members m WHERE m.agency_id = payments.agency_id AND m.user_id = auth.uid() AND m.status = 'active')
);

-- Reviews: public read on approved, clients can insert only if they have a completed project with the agency
CREATE POLICY reviews_read ON reviews FOR SELECT USING (moderation_status = 'approved' OR client_id = auth.uid() OR is_admin());
CREATE POLICY reviews_insert ON reviews FOR INSERT WITH CHECK (
  client_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM projects p WHERE p.id = reviews.project_id AND p.client_id = auth.uid() AND p.agency_id = reviews.agency_id AND p.status = 'Completed'
  )
);

-- Saved Bookmarks & Notifications: strictly owner
CREATE POLICY saved_agencies_rw ON saved_agencies FOR ALL USING (client_id = auth.uid());
CREATE POLICY saved_opps_rw ON saved_opportunities FOR ALL USING (student_id = auth.uid());
CREATE POLICY notifications_rw ON notifications FOR ALL USING (user_id = auth.uid() OR is_admin());

-- Reports: reporter can insert & view own reports; admins have full moderation access
CREATE POLICY reports_insert ON reports FOR INSERT WITH CHECK (reporter_id = auth.uid());
CREATE POLICY reports_select_update ON reports FOR SELECT USING (reporter_id = auth.uid() OR is_admin());
CREATE POLICY reports_admin_update ON reports FOR UPDATE USING (is_admin());
