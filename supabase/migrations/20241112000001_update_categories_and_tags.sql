-- First, clear existing categories to avoid duplicates
DELETE FROM categories;

-- Insert Business Type Categories
INSERT INTO categories (id, name, slug, description, icon, created_at) VALUES
(gen_random_uuid(), 'Agriculture & Farming', 'agriculture-farming', 'Agricultural businesses and farming operations', 'Leaf', NOW()),
(gen_random_uuid(), 'Automotive', 'automotive', 'Car dealerships, repair shops, and automotive services', 'Car', NOW()),
(gen_random_uuid(), 'Construction & Trades', 'construction-trades', 'Construction companies and trade services', 'Hammer', NOW()),
(gen_random_uuid(), 'Education & Training', 'education-training', 'Educational institutions and training services', 'GraduationCap', NOW()),
(gen_random_uuid(), 'Financial Services', 'financial-services', 'Financial advisors, banks, and financial institutions', 'DollarSign', NOW()),
(gen_random_uuid(), 'Fitness & Wellness', 'fitness-wellness', 'Gyms, wellness centers, and health services', 'Dumbbell', NOW()),
(gen_random_uuid(), 'Food & Beverage', 'food-beverage', 'Restaurants, cafes, and food service businesses', 'Utensils', NOW()),
(gen_random_uuid(), 'Healthcare & Medical', 'healthcare-medical', 'Medical practices, clinics, and healthcare services', 'Stethoscope', NOW()),
(gen_random_uuid(), 'Home & Personal Services', 'home-personal-services', 'Home services and personal care businesses', 'Home', NOW()),
(gen_random_uuid(), 'Hospitality & Event Venues', 'hospitality-events', 'Hotels, event spaces, and hospitality services', 'Hotel', NOW()),
(gen_random_uuid(), 'Industrial & Manufacturing', 'industrial-manufacturing', 'Manufacturing businesses and industrial services', 'Factory', NOW()),
(gen_random_uuid(), 'IT & Software Services', 'it-software', 'IT consulting, software development, and tech services', 'Code', NOW()),
(gen_random_uuid(), 'Media & Entertainment', 'media-entertainment', 'Media production, entertainment venues, and related services', 'Film', NOW()),
(gen_random_uuid(), 'Pet Services & Supplies', 'pet-services', 'Pet care, veterinary services, and pet supply businesses', 'Paw', NOW()),
(gen_random_uuid(), 'Professional & Consulting Services', 'professional-consulting', 'Professional services and consulting businesses', 'Briefcase', NOW()),
(gen_random_uuid(), 'Real Estate & Property Management', 'real-estate', 'Real estate agencies and property management services', 'Building', NOW()),
(gen_random_uuid(), 'Retail & eCommerce', 'retail-ecommerce', 'Retail stores and eCommerce businesses', 'ShoppingBag', NOW()),
(gen_random_uuid(), 'SaaS & Technology', 'saas-technology', 'Software as a Service and technology businesses', 'Cloud', NOW()),
(gen_random_uuid(), 'Transportation & Logistics', 'transportation-logistics', 'Transportation services and logistics businesses', 'Truck', NOW()),
(gen_random_uuid(), 'Travel & Tourism', 'travel-tourism', 'Travel agencies, tourism services, and related businesses', 'Plane', NOW());

-- Clear existing tags to avoid duplicates
DELETE FROM tags;

-- Insert Business Size tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Micro Business (<$100K)', 'micro-business', 'Businesses with revenue under $100K', 'blue', NOW()),
(gen_random_uuid(), 'Small Business ($100K - $1M)', 'small-business', 'Businesses with revenue between $100K - $1M', 'blue', NOW()),
(gen_random_uuid(), 'Medium Business ($1M - $10M)', 'medium-business', 'Businesses with revenue between $1M - $10M', 'blue', NOW()),
(gen_random_uuid(), 'Large Business ($10M - $50M)', 'large-business', 'Businesses with revenue between $10M - $50M', 'blue', NOW()),
(gen_random_uuid(), 'Enterprise-Level ($50M+)', 'enterprise', 'Businesses with revenue over $50M', 'blue', NOW());

-- Insert Business Model tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'B2B', 'b2b', 'Business to Business model', 'green', NOW()),
(gen_random_uuid(), 'B2C', 'b2c', 'Business to Consumer model', 'green', NOW()),
(gen_random_uuid(), 'D2C', 'd2c', 'Direct to Consumer model', 'green', NOW()),
(gen_random_uuid(), 'Franchise', 'franchise', 'Franchise business model', 'green', NOW()),
(gen_random_uuid(), 'Licensing', 'licensing', 'Licensing business model', 'green', NOW()),
(gen_random_uuid(), 'Product-Based', 'product-based', 'Product-based business', 'green', NOW()),
(gen_random_uuid(), 'Service-Based', 'service-based', 'Service-based business', 'green', NOW()),
(gen_random_uuid(), 'Subscription Revenue', 'subscription', 'Subscription-based revenue model', 'green', NOW()),
(gen_random_uuid(), 'Hybrid Models', 'hybrid-model', 'Combination of multiple business models', 'green', NOW());

-- Insert Growth Stage tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Startup', 'startup', 'Early-stage startup business', 'purple', NOW()),
(gen_random_uuid(), 'Early-Stage', 'early-stage', 'Business in early development stage', 'purple', NOW()),
(gen_random_uuid(), 'Established', 'established', 'Well-established business', 'purple', NOW()),
(gen_random_uuid(), 'High-Growth', 'high-growth', 'Business experiencing rapid growth', 'purple', NOW()),
(gen_random_uuid(), 'Declining/Turnaround', 'declining-turnaround', 'Business in decline or turnaround phase', 'purple', NOW());

-- Insert Operational Characteristics tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Fully Remote', 'fully-remote', 'Business operates completely remotely', 'orange', NOW()),
(gen_random_uuid(), 'Brick & Mortar', 'brick-and-mortar', 'Physical location-based business', 'orange', NOW()),
(gen_random_uuid(), 'Hybrid Operations', 'hybrid-operations', 'Business with both physical and remote operations', 'orange', NOW()),
(gen_random_uuid(), 'Asset-Light', 'asset-light', 'Business with minimal physical assets', 'orange', NOW()),
(gen_random_uuid(), 'Inventory-Heavy', 'inventory-heavy', 'Business with significant inventory requirements', 'orange', NOW()),
(gen_random_uuid(), 'Highly Automated', 'highly-automated', 'Business with high level of automation', 'orange', NOW());

-- Insert Special Categories tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Niche Market', 'niche-market', 'Business serving a specialized market segment', 'red', NOW()),
(gen_random_uuid(), 'Eco-Friendly', 'eco-friendly', 'Environmentally conscious business', 'red', NOW()),
(gen_random_uuid(), 'Intellectual Property-Based', 'ip-based', 'Business based on intellectual property', 'red', NOW()),
(gen_random_uuid(), 'Family-Owned', 'family-owned', 'Family-owned and operated business', 'red', NOW()),
(gen_random_uuid(), 'VC/PE Backed', 'vc-pe-backed', 'Venture capital or private equity backed business', 'red', NOW()),
(gen_random_uuid(), 'Government Contract-Based', 'government-contracts', 'Business primarily serving government contracts', 'red', NOW());

-- Insert Financial & Profitability tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Profitable (3+ Years)', 'profitable-3plus', 'Business profitable for 3+ years', 'teal', NOW()),
(gen_random_uuid(), 'High Recurring Revenue', 'high-recurring-revenue', 'Business with significant recurring revenue', 'teal', NOW()),
(gen_random_uuid(), 'Consistent Cash Flow', 'consistent-cash-flow', 'Business with stable cash flow', 'teal', NOW()),
(gen_random_uuid(), 'Low Debt-to-Equity', 'low-debt', 'Business with low debt-to-equity ratio', 'teal', NOW()),
(gen_random_uuid(), 'Strong Margins', 'strong-margins', 'Business with above-average profit margins', 'teal', NOW()),
(gen_random_uuid(), 'Asset-Rich', 'asset-rich', 'Business with significant valuable assets', 'teal', NOW());

-- Insert Market Position tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Market Leader', 'market-leader', 'Leading business in its market segment', 'indigo', NOW()),
(gen_random_uuid(), 'Emerging Competitor', 'emerging-competitor', 'Up-and-coming business in competitive market', 'indigo', NOW()),
(gen_random_uuid(), 'Second-Mover Advantage', 'second-mover', 'Business benefiting from second-mover advantage', 'indigo', NOW()),
(gen_random_uuid(), 'Disruptive', 'disruptive', 'Business with disruptive business model or technology', 'indigo', NOW());

-- Insert Scalability & Expansion tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Highly Scalable', 'highly-scalable', 'Business with significant scaling potential', 'cyan', NOW()),
(gen_random_uuid(), 'Geographic Expansion', 'geographic-expansion', 'Business with potential for geographic expansion', 'cyan', NOW()),
(gen_random_uuid(), 'Franchisable', 'franchisable', 'Business with franchise potential', 'cyan', NOW()),
(gen_random_uuid(), 'International Potential', 'international-potential', 'Business with international expansion potential', 'cyan', NOW());

-- Insert Customer Base tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Diverse Customer Base', 'diverse-customers', 'Business with diverse customer demographics', 'pink', NOW()),
(gen_random_uuid(), 'High Retention', 'high-retention', 'Business with strong customer retention', 'pink', NOW()),
(gen_random_uuid(), 'Growing Customer Base', 'growing-customers', 'Business with expanding customer base', 'pink', NOW()),
(gen_random_uuid(), 'Low Acquisition Cost', 'low-cac', 'Business with low customer acquisition costs', 'pink', NOW());

-- Insert Risk & Stability tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Low Risk', 'low-risk', 'Business with minimal operational risks', 'yellow', NOW()),
(gen_random_uuid(), 'Medium Risk', 'medium-risk', 'Business with moderate operational risks', 'yellow', NOW()),
(gen_random_uuid(), 'High Risk', 'high-risk', 'Business with significant operational risks', 'yellow', NOW()),
(gen_random_uuid(), 'Economic Cycle Resistant', 'recession-resistant', 'Business resistant to economic downturns', 'yellow', NOW()),
(gen_random_uuid(), 'Pandemic Resilient', 'pandemic-resilient', 'Business proven resilient during pandemic conditions', 'yellow', NOW());

-- Insert Lifestyle & Owner Alignment tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Passive Ownership', 'passive-ownership', 'Business suitable for passive ownership', 'lime', NOW()),
(gen_random_uuid(), 'Hands-On Required', 'hands-on', 'Business requiring active owner involvement', 'lime', NOW()),
(gen_random_uuid(), 'Flexible Hours', 'flexible-hours', 'Business allowing flexible working hours', 'lime', NOW()),
(gen_random_uuid(), 'Low-Stress', 'low-stress', 'Business with relatively low stress levels', 'lime', NOW()),
(gen_random_uuid(), 'Retirement-Friendly', 'retirement-friendly', 'Business suitable for retirement income', 'lime', NOW());

-- Insert Mission & Values tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Sustainability Focus', 'sustainability', 'Business focused on sustainable practices', 'emerald', NOW()),
(gen_random_uuid(), 'Community-Oriented', 'community-oriented', 'Business with strong community involvement', 'emerald', NOW()),
(gen_random_uuid(), 'Employee-Centric', 'employee-centric', 'Business with strong employee focus', 'emerald', NOW()),
(gen_random_uuid(), 'Diversity & Inclusion', 'diversity-inclusion', 'Business promoting diversity and inclusion', 'emerald', NOW()),
(gen_random_uuid(), 'Ethical Operations', 'ethical-operations', 'Business with strong ethical standards', 'emerald', NOW());

-- Insert Technology & Innovation tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Technology-Driven', 'technology-driven', 'Business heavily reliant on technology', 'violet', NOW()),
(gen_random_uuid(), 'Automation-Enabled', 'automation-enabled', 'Business leveraging automation technologies', 'violet', NOW()),
(gen_random_uuid(), 'Proprietary IP', 'proprietary-ip', 'Business with valuable proprietary intellectual property', 'violet', NOW()),
(gen_random_uuid(), 'Cybersecurity-Strong', 'cybersecurity', 'Business with robust cybersecurity measures', 'violet', NOW()),
(gen_random_uuid(), 'Innovative Model', 'innovative-model', 'Business with innovative business model', 'violet', NOW());

-- Insert Advanced Metrics & Filters tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'High Revenue Growth', 'high-revenue-growth', 'Business with strong revenue growth', 'amber', NOW()),
(gen_random_uuid(), 'EBITDA Strong', 'strong-ebitda', 'Business with strong EBITDA performance', 'amber', NOW()),
(gen_random_uuid(), 'Low Operating Cost', 'low-operating-cost', 'Business with low operational costs', 'amber', NOW()),
(gen_random_uuid(), 'High Customer Loyalty', 'high-customer-loyalty', 'Business with strong customer loyalty', 'amber', NOW()),
(gen_random_uuid(), 'Strong Cash Flow', 'strong-cash-flow', 'Business with robust cash flow', 'amber', NOW());

-- Insert Deal & Transaction tags
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
(gen_random_uuid(), 'Asset Sale', 'asset-sale', 'Business available as asset sale', 'rose', NOW()),
(gen_random_uuid(), 'Stock Sale', 'stock-sale', 'Business available as stock sale', 'rose', NOW()),
(gen_random_uuid(), 'Joint Venture', 'joint-venture', 'Business seeking joint venture opportunities', 'rose', NOW()),
(gen_random_uuid(), 'Merger Opportunity', 'merger', 'Business open to merger opportunities', 'rose', NOW()),
(gen_random_uuid(), 'Full Ownership', 'full-ownership', 'Complete ownership transfer available', 'rose', NOW()),
(gen_random_uuid(), 'Partial Ownership', 'partial-ownership', 'Partial ownership opportunity available', 'rose', NOW()),
(gen_random_uuid(), 'Seller Financing', 'seller-financing', 'Seller financing available', 'rose', NOW()),
(gen_random_uuid(), 'SBA Eligible', 'sba-eligible', 'Business eligible for SBA financing', 'rose', NOW()),
(gen_random_uuid(), 'Earn-Out Available', 'earn-out', 'Earn-out structure available', 'rose', NOW());

-- Insert Expanded Tags for Enhanced Search
INSERT INTO tags (id, name, slug, description, color, created_at) VALUES
-- General tags
(gen_random_uuid(), '#Startup', 'tag-startup', 'Startup business', 'gray', NOW()),
(gen_random_uuid(), '#EarlyStage', 'tag-early-stage', 'Early stage business', 'gray', NOW()),
(gen_random_uuid(), '#Established', 'tag-established', 'Established business', 'gray', NOW()),
(gen_random_uuid(), '#HighGrowth', 'tag-high-growth', 'High growth business', 'gray', NOW()),
(gen_random_uuid(), '#Turnaround', 'tag-turnaround', 'Business in turnaround phase', 'gray', NOW()),
(gen_random_uuid(), '#Declining', 'tag-declining', 'Business in decline', 'gray', NOW()),
(gen_random_uuid(), '#GrowthPotential', 'tag-growth-potential', 'Business with growth potential', 'gray', NOW()),

-- Operational tags
(gen_random_uuid(), '#FullyRemote', 'tag-fully-remote', 'Fully remote operation', 'gray', NOW()),
(gen_random_uuid(), '#Hybrid', 'tag-hybrid', 'Hybrid operation model', 'gray', NOW()),
(gen_random_uuid(), '#AssetLight', 'tag-asset-light', 'Asset-light business', 'gray', NOW()),
(gen_random_uuid(), '#InventoryHeavy', 'tag-inventory-heavy', 'Inventory-heavy business', 'gray', NOW()),
(gen_random_uuid(), '#HighlyAutomated', 'tag-highly-automated', 'Highly automated business', 'gray', NOW()),
(gen_random_uuid(), '#SelfManaged', 'tag-self-managed', 'Self-managed business', 'gray', NOW()),
(gen_random_uuid(), '#OwnerManaged', 'tag-owner-managed', 'Owner-managed business', 'gray', NOW()),
(gen_random_uuid(), '#MinimalStaffing', 'tag-minimal-staffing', 'Business with minimal staffing needs', 'gray', NOW()),

-- Financial tags
(gen_random_uuid(), '#Profitable', 'tag-profitable', 'Profitable business', 'gray', NOW()),
(gen_random_uuid(), '#RecurringRevenue', 'tag-recurring-revenue', 'Business with recurring revenue', 'gray', NOW()),
(gen_random_uuid(), '#StrongCashFlow', 'tag-strong-cash-flow', 'Business with strong cash flow', 'gray', NOW()),
(gen_random_uuid(), '#DebtFree', 'tag-debt-free', 'Debt-free business', 'gray', NOW()),
(gen_random_uuid(), '#HighMargins', 'tag-high-margins', 'Business with high profit margins', 'gray', NOW()),
(gen_random_uuid(), '#AssetRich', 'tag-asset-rich', 'Asset-rich business', 'gray', NOW()),
(gen_random_uuid(), '#SteadyEBITDA', 'tag-steady-ebitda', 'Business with steady EBITDA', 'gray', NOW()),
(gen_random_uuid(), '#LowOperatingCost', 'tag-low-operating-cost', 'Business with low operating costs', 'gray', NOW()),

-- Market & Growth tags
(gen_random_uuid(), '#MarketLeader', 'tag-market-leader', 'Market leading business', 'gray', NOW()),
(gen_random_uuid(), '#EmergingCompetitor', 'tag-emerging-competitor', 'Emerging competitor', 'gray', NOW()),
(gen_random_uuid(), '#Disruptor', 'tag-disruptor', 'Market disruptor', 'gray', NOW()),
(gen_random_uuid(), '#SecondMover', 'tag-second-mover', 'Second-mover advantage', 'gray', NOW()),
(gen_random_uuid(), '#Scalable', 'tag-scalable', 'Scalable business model', 'gray', NOW()),
(gen_random_uuid(), '#ExpansionReady', 'tag-expansion-ready', 'Ready for expansion', 'gray', NOW()),
(gen_random_uuid(), '#Franchisable', 'tag-franchisable', 'Franchisable business', 'gray', NOW()),
(gen_random_uuid(), '#GlobalExpansion', 'tag-global-expansion', 'Global expansion potential', 'gray', NOW()),
(gen_random_uuid(), '#HighMarketShare', 'tag-high-market-share', 'Business with high market share', 'gray', NOW()),
(gen_random_uuid(), '#NicheMarket', 'tag-niche-market', 'Niche market business', 'gray', NOW()),

-- Customer & Community tags
(gen_random_uuid(), '#DiverseClients', 'tag-diverse-clients', 'Business with diverse client base', 'gray', NOW()),
(gen_random_uuid(), '#HighRetention', 'tag-high-retention', 'High customer retention', 'gray', NOW()),
(gen_random_uuid(), '#LowCAC', 'tag-low-cac', 'Low customer acquisition cost', 'gray', NOW()),
(gen_random_uuid(), '#CommunityFocused', 'tag-community-focused', 'Community-focused business', 'gray', NOW()),
(gen_random_uuid(), '#EmployeeCentric', 'tag-employee-centric', 'Employee-centric business', 'gray', NOW()),
(gen_random_uuid(), '#EcoFriendly', 'tag-eco-friendly', 'Eco-friendly business', 'gray', NOW()),
(gen_random_uuid(), '#EthicalOperations', 'tag-ethical-operations', 'Business with ethical operations', 'gray', NOW()),
(gen_random_uuid(), '#InclusiveHiring', 'tag-inclusive-hiring', 'Inclusive hiring practices', 'gray', NOW()),
(gen_random_uuid(), '#CharityDriven', 'tag-charity-driven', 'Charity-driven business', 'gray', NOW()),

-- Lifestyle & Ownership tags
(gen_random_uuid(), '#PassiveOwnership', 'tag-passive-ownership', 'Passive ownership opportunity', 'gray', NOW()),
(gen_random_uuid(), '#FlexibleHours', 'tag-flexible-hours', 'Flexible working hours', 'gray', NOW()),
(gen_random_uuid(), '#LowStress', 'tag-low-stress', 'Low-stress business', 'gray', NOW()),
(gen_random_uuid(), '#RetirementFriendly', 'tag-retirement-friendly', 'Retirement-friendly business', 'gray', NOW()),
(gen_random_uuid(), '#HandsOn', 'tag-hands-on', 'Hands-on business', 'gray', NOW()),
(gen_random_uuid(), '#MinimalOwnerInvolvement', 'tag-minimal-owner', 'Minimal owner involvement needed', 'gray', NOW()),
(gen_random_uuid(), '#PartTimeCommitment', 'tag-part-time', 'Part-time commitment possible', 'gray', NOW()),

-- Technology & IP tags
(gen_random_uuid(), '#TechDriven', 'tag-tech-driven', 'Technology-driven business', 'gray', NOW()),
(gen_random_uuid(), '#ProprietaryIP', 'tag-proprietary-ip', 'Business with proprietary IP', 'gray', NOW()),
(gen_random_uuid(), '#AutomationReady', 'tag-automation-ready', 'Automation-ready business', 'gray', NOW()),
(gen_random_uuid(), '#CyberSecure', 'tag-cyber-secure', 'Cyber-secure business', 'gray', NOW()),
(gen_random_uuid(), '#Innovative', 'tag-innovative', 'Innovative business', 'gray', NOW()),
(gen_random_uuid(), '#R&DDriven', 'tag-rd-driven', 'R&D-driven business', 'gray', NOW()),
(gen_random_uuid(), '#PatentProtected', 'tag-patent-protected', 'Patent-protected business', 'gray', NOW()),
(gen_random_uuid(), '#TechIntegration', 'tag-tech-integration', 'Strong technology integration', 'gray', NOW()),

-- Transaction & Deal Structure tags
(gen_random_uuid(), '#AssetSale', 'tag-asset-sale', 'Asset sale opportunity', 'gray', NOW()),
(gen_random_uuid(), '#StockSale', 'tag-stock-sale', 'Stock sale opportunity', 'gray', NOW()),
(gen_random_uuid(), '#FullOwnership', 'tag-full-ownership', 'Full ownership transfer', 'gray', NOW()),
(gen_random_uuid(), '#PartialOwnership', 'tag-partial-ownership', 'Partial ownership opportunity', 'gray', NOW()),
(gen_random_uuid(), '#SellerFinancing', 'tag-seller-financing', 'Seller financing available', 'gray', NOW()),
(gen_random_uuid(), '#SBAEligible', 'tag-sba-eligible', 'SBA loan eligible', 'gray', NOW()),
(gen_random_uuid(), '#EarnOutAvailable', 'tag-earn-out', 'Earn-out structure available', 'gray', NOW()),
(gen_random_uuid(), '#JointVenture', 'tag-joint-venture', 'Joint venture opportunity', 'gray', NOW()),
(gen_random_uuid(), '#MergerOpportunity', 'tag-merger', 'Merger opportunity', 'gray', NOW()),
(gen_random_uuid(), '#FlexibleTerms', 'tag-flexible-terms', 'Flexible terms available', 'gray', NOW()),

-- Buyer & Seller Alignment tags
(gen_random_uuid(), '#RetirementSale', 'tag-retirement-sale', 'Business for sale due to retirement', 'gray', NOW()),
(gen_random_uuid(), '#QuickSale', 'tag-quick-sale', 'Quick sale opportunity', 'gray', NOW()),
(gen_random_uuid(), '#HealthMotivated', 'tag-health-motivated', 'Health-motivated sale', 'gray', NOW()),
(gen_random_uuid(), '#FamilyOwned', 'tag-family-owned', 'Family-owned business', 'gray', NOW()),
(gen_random_uuid(), '#ExperiencedBuyer', 'tag-experienced-buyer', 'Suitable for experienced buyers', 'gray', NOW()),
(gen_random_uuid(), '#StrategicAcquirer', 'tag-strategic-acquirer', 'Ideal for strategic acquirers', 'gray', NOW()),
(gen_random_uuid(), '#FirstTimeBuyer', 'tag-first-time-buyer', 'Suitable for first-time buyers', 'gray', NOW()),
(gen_random_uuid(), '#GrowthInvestor', 'tag-growth-investor', 'Ideal for growth investors', 'gray', NOW()),
(gen_random_uuid(), '#PassiveInvestor', 'tag-passive-investor', 'Suitable for passive investors', 'gray', NOW()),

-- Advanced Sorting & Popularity tags
(gen_random_uuid(), '#BuyerFavorite', 'tag-buyer-favorite', 'Buyer favorite listing', 'gray', NOW()),
(gen_random_uuid(), '#Trending', 'tag-trending', 'Trending listing', 'gray', NOW()),
(gen_random_uuid(), '#EditorsPick', 'tag-editors-pick', 'Editors pick', 'gray', NOW()),
(gen_random_uuid(), '#RecentlyUpdated', 'tag-recently-updated', 'Recently updated listing', 'gray', NOW()),
(gen_random_uuid(), '#HighMatch', 'tag-high-match', 'High match score', 'gray', NOW()),
(gen_random_uuid(), '#QuickClose', 'tag-quick-close', 'Quick closing potential', 'gray', NOW()),
(gen_random_uuid(), '#HighROI', 'tag-high-roi', 'High ROI potential', 'gray', NOW()),
(gen_random_uuid(), '#BelowMarketValue', 'tag-below-market', 'Priced below market value', 'gray', NOW()),
(gen_random_uuid(), '#MostViewed', 'tag-most-viewed', 'Most viewed listing', 'gray', NOW()),
(gen_random_uuid(), '#FrequentlyInquired', 'tag-frequently-inquired', 'Frequently inquired about', 'gray', NOW()),
(gen_random_uuid(), '#MostSaved', 'tag-most-saved', 'Most saved listing', 'gray', NOW());

-- Check if tables are already in the publication before adding them
DO $$
BEGIN
  -- Check if categories table is already in the publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'categories'
  ) THEN
    -- Add categories table to the publication if it's not already there
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE categories';
  END IF;

  -- Check if tags table is already in the publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'tags'
  ) THEN
    -- Add tags table to the publication if it's not already there
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE tags';
  END IF;
END
$$;