# Nexos Frontend Documentation

## Overview

Nexos is a static, mobile-first banking and digital-wallet frontend. It is built with plain HTML, CSS, and JavaScript—there is no framework, package manager, compilation step, or backend integration in this project.

The experience is designed around a compact phone layout. Each primary feature has its own folder containing an `index.html`, a stylesheet, and (where needed) a JavaScript file. Navigation is handled with normal relative HTML links.

## Running the project

Open `index.html` in a browser. The main dashboard is the entry point and links to the feature pages.

Because this is a static frontend, all balances, transactions, messages, and completion states are demonstration data. Button interactions are handled in the browser only and do not send or save financial data.

## Technology

| Area | Implementation |
| --- | --- |
| Markup | Semantic HTML5 |
| Styling | Feature-level CSS files with CSS custom properties |
| Interaction | Vanilla JavaScript using DOM events |
| Icons | Inline SVG and text symbols |
| Typography | `Inter` system-font stack |
| Layout | Mobile-first, max-width 430px app screens |

## Project structure

```text
FRONTEND/
├── index.html                         # Main wallet dashboard
├── homepage/
│   ├── styles.css                     # Dashboard styles
│   └── app.js                         # Dashboard interactions/toasts
├── auth/                              # Login and registration
├── pin/                               # PIN setup/verification
├── add funds/                         # Add USD funds flow
├── deposite/                          # Deposit flow and processing screen
├── withdraw/                          # Send/withdraw flow
├── transact/                          # Payment/transaction flow
├── convert/                           # BTC to USD conversion flow
├── saving/                            # Detailed USD savings experience
├── save/                              # Existing compact wealth/savings landing page
├── invest/                            # Investment experience
├── loan/                              # Loan request and processing flow
├── membership/                        # Membership plan screen
├── profile/                           # User profile and settings
├── more/                              # More features menu
├── support/                           # Help centre and support chat
├── status-screens/                    # Successful, pending, failed, and account-created states
└── IMG/                               # Local image assets
```

## Main dashboard

**File:** `index.html`  
**Styles and interactions:** `homepage/styles.css`, `homepage/app.js`

The dashboard presents:

- A user greeting, QR, support, and notification controls.
- Total USD balance and BTC balance.
- A direct BTC conversion action.
- Quick links to Add Fund, Save, Loan, and Send.
- Recent transaction preview.
- Market, Bitcoin, Security, and Membership news cards.
- Bottom navigation for Home, Send, Pay, Save, and Borrow.

The **Save** quick action links to `saving/index.html`, the detailed USD savings page.

## Visual design system

The frontend uses a consistent dark banking visual language.

| Token | Value | Use |
| --- | --- | --- |
| Background | `#241D1D` | Main app background |
| Surface | `#292222` | Content areas and inputs |
| Raised surface | `#393333` | Cards and selectable rows |
| Border | `#403737` | Card, input, and divider borders |
| Primary text | `#F5F2F2` | Headings and key values |
| Secondary text | `#C7C0C0` | Support text |
| Muted text | `#918989` | Metadata |
| Brand orange | `#FF7A2F` | Main actions, focus, emphasis |
| Success green | `#55C98A` | Positive amounts and active states |
| Error red | `#E86D6D` | Withdrawal/error states |

Screens generally use a max width of 430px, dark gradients, compact rounded cards, orange call-to-action buttons, and small high-contrast labels. The CSS uses the `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` font stack.

## Feature pages

| Folder | Screen purpose | Main files |
| --- | --- | --- |
| `auth/` | Sign up and log in | `signup.html`, `login.html`, `auth.js` |
| `pin/` | PIN entry/setup | `index.html`, `style.css`, `app.js` |
| `add funds/` | Purchase/add USD funds | `index.html`, `styles.css`, `app.js` |
| `deposite/` | Deposit information form | `index.html`, `styles.css`, `app.js` |
| `deposite/processing form/` | Deposit processing state | `index.html`, `styles.css`, `app.js` |
| `withdraw/` | USD or BTC transfer/send experience | `index.html`, `styles.css`, `app.js` |
| `transact/` | Payment transaction screen | `index.html`, `styles.css`, `app.js` |
| `convert/` | Dedicated BTC-to-USD conversion | `index.html`, `styles.css`, `app.js` |
| `saving/` | Full USD savings plans and transactions | `index.html`, `styles.css`, `app.js` |
| `save/` | Compact wealth/savings overview | `index.html`, `styles.css`, `app.js` |
| `invest/` | Investment product screen | `index.html`, `styles.css`, `app.js` |
| `loan/` | Loan application | `index.html`, `styles.css`, `app.js` |
| `loan/processing/` | Loan application processing | `index.html`, `styles.css`, `app.js` |
| `membership/` | Membership plans | `index.html`, `styles.css`, `app.js` |
| `profile/` | Profile information/settings | `index.html`, `styles.css`, `app.js` |
| `more/` | Additional tools and navigation | `index.html`, `styles.css`, `icon-overrides.css`, `app.js` |
| `support/` | Support centre and chat | `index.html`, `chat.html`, `styles.css`, `app.js` |
| `status-screens/` | Transaction and registration outcomes | `account-created.html`, `transaction-successful.html`, `transaction-pending.html`, `transaction-failed.html`, `styles.css`, `app.js` |

## Detailed savings page

**Location:** `saving/`  
**Entry link:** `index.html` → `saving/index.html`

The savings page is part of the same mobile application experience. It uses the familiar back/title/help bar and the shared dark theme; it does not use a separate profile or product header.

### Savings dashboard

The initial screen includes:

- **USD Savings Balance:** `$2,450.00` with monthly growth.
- **Current plan:** Emergency Fund, `$2,450 of $5,000`, and a 49% progress bar.
- **Plan details:** remaining amount, next deposit, and expected completion date.
- **Plan actions:** Add Money, Manage Plan, Pause Auto-Save, and Withdraw.
- **BTC Wallet summary:** `0.0248 BTC`, displayed separately from USD savings.
- **Auto-Save summary:** deposit amount, schedule, wallet funding source, and next date.
- **Recent activity:** deposit, withdrawal, fee, and bonus states.
- **Savings rules:** clear USD/BTC separation and withdrawal disclosure notice.

### Create Savings Plan flow

The plan builder is an interactive five-step flow:

1. **Duration** — Custom, 30 Days, 60 Days, 90 Days, 180 Days, or 1 Year. Each option displays a suggested goal and estimated finish date.
2. **Savings Goal** — goal chips for Emergency Fund, New Laptop, Business, Travel, Education, Investment, and Custom Goal; plus a USD target input.
3. **Deposit Amount** — deposit amount, Daily/Weekly/Biweekly/Monthly/Manual selection, and live projected-total calculation.
4. **Auto-Save** — enable/disable toggle with amount, schedule, start date, USD Wallet funding source, and next-deposit date.
5. **Summary** — target, current balance, remaining amount, deposit, frequency, duration, dates, funding source, and Auto-Save status before creation.

The flow changes views entirely in the browser. On completion, it returns to the savings dashboard and shows a confirmation toast.

### Savings history

The history screen supports filters for:

- All
- Deposits
- Withdrawals
- Fees

Each row presents the transaction type, description, date, amount, and a color-coded icon. Bonus/interest entries use the positive deposit style.

### Withdrawal flow

The withdrawal modal shows:

- Available balance.
- A USD amount input.
- USD Wallet and Bank Account destinations.
- Withdrawal amount, fee, and final received amount.
- A required confirmation action before the demo processing message.

BTC is never selected as a savings funding source. BTC conversion remains a separate flow in `convert/`.

## JavaScript interaction patterns

The project uses small feature-specific JavaScript files. Common patterns include:

- `querySelector` / `querySelectorAll` for element selection.
- Click event listeners for buttons, filters, cards, and navigation states.
- CSS classes such as `active`, `selected`, `show`, and `hidden` to control visual state.
- Toast messages for lightweight action feedback.
- Basic live calculations for monetary input demonstrations.
- Modal overlays for reviews and confirmations.

The savings script keeps its own in-memory UI state for duration, goal, frequency, active step, and Auto-Save. Refreshing the browser resets all sample data.

## Navigation map

```text
Main Dashboard (index.html)
├── Profile → profile/index.html
├── Add Fund → add funds/index.html
├── Save → saving/index.html
├── Loan → loan/index.html
├── Send → withdraw/index.html
├── BTC Convert → convert/index.html
├── Pay → transact/index.html
└── Bottom navigation → Home / Send / Pay / Save / Borrow

Savings (saving/index.html)
├── Back → Main Dashboard
├── Create plan / Add money → Five-step plan builder
├── View all → Savings history
└── Withdraw → Withdrawal confirmation modal
```

## Notes for future development

- Connect forms and calculations to a backend/API before handling real money.
- Replace sample balances and dates with authenticated account data.
- Use a shared component system or design-token stylesheet if the app grows.
- Add form validation, accessible error messages, focus management, and keyboard handling for all modals.
- Protect all financial actions with authentication, transaction PIN verification, server-side validation, and audit logging.
- Ensure plan fees, interest, eligibility rules, and withdrawal terms come from a trusted backend rather than static UI text.

## Recommended backend architecture

The current frontend is a presentation prototype. For production, build a separate backend API that is the single source of truth for accounts, balances, transaction state, savings plans, verification, and provider webhooks. The frontend must never calculate or store an authoritative balance, exchange rate, transfer status, PIN, or transaction result.

### Suggested stack

| Layer | Recommended choice | Responsibility |
| --- | --- | --- |
| API | Node.js with JavaScript, using Express, Fastify, or Next.js API routes | Authenticated REST API, business rules, provider adapters, and webhooks |
| Database | PostgreSQL | Users, wallets, immutable ledger entries, plans, transfers, verification, and audit data |
| Data access | Prisma, Drizzle, or TypeORM | Migrations, safe typed queries, and database transactions |
| Background jobs | AWS SQS + worker service, or BullMQ + Redis | Auto-Save deposits, scheduled plan processing, retries, notifications, reconciliation |
| Cache / rate limits | Redis / Amazon ElastiCache | Sessions, one-time codes, request rate limiting, and short-lived provider data |
| Files | Amazon S3 | Encrypted KYC documents, statements, and receipts |
| Secrets | AWS Secrets Manager or Parameter Store | API keys, database credentials, webhook secrets, and encryption keys |
| Hosting | AWS ECS Fargate or Lambda behind API Gateway / Application Load Balancer | Secure and scalable API deployment |
| Database hosting | Amazon RDS for PostgreSQL with Multi-AZ enabled | Managed, backed-up relational database |
| Monitoring | CloudWatch, CloudTrail, and an error tracker | Logs, alerting, audit evidence, and production error visibility |

Do not expose provider secrets, AWS credentials, database passwords, wallet keys, or private encryption keys in HTML, CSS, JavaScript, browser storage, or a public repository.

### AWS deployment layout

```text
Mobile/Web Frontend
        │ HTTPS + access token
        ▼
CloudFront / Static hosting ────────► Frontend files
        │
        ▼
API Gateway or Application Load Balancer
        │
        ▼
Node.js API service (ECS Fargate or Lambda)
        ├── Amazon RDS PostgreSQL
        ├── Redis / ElastiCache
        ├── SQS job queues and worker service
        ├── S3 encrypted document storage
        ├── Secrets Manager
        └── Bank, card, FX, BTC custody, notification, and identity providers
```

Place the API, workers, PostgreSQL database, and Redis in a private VPC network. Only the load balancer/API gateway should accept public API traffic. Configure HTTPS everywhere, restrictive security groups, database backups, alarms, log retention, and least-privilege IAM roles.

## Core backend domains

### Account and identity

The frontend currently includes sign-up, login, profile, support, and PIN screens. The backend should provide:

- User registration with email or phone verification.
- Secure login, access tokens, refresh-token rotation, device/session management, and logout.
- Password hashing using a modern password-hashing algorithm such as Argon2id or bcrypt.
- Transaction PIN setup and verification. Store only a slow hash of the PIN—never the PIN itself.
- Identity verification/KYC workflow, document status, sanctions screening, and account limits where required by the operating jurisdiction.
- Step-up verification for sensitive actions: adding a new bank recipient, changing security settings, BTC withdrawal, large transfers, and account recovery.

### Ledger and wallet model

Represent money with an append-only, double-entry ledger. Wallet display balances should be derived from posted ledger entries or carefully maintained as transactional projections.

Maintain distinct wallet/account domains:

| Wallet / account | Currency | Purpose |
| --- | --- | --- |
| USD Wallet | USD | Spendable dollar balance, card/bank funding, and transfer destination |
| USD Savings | USD | Savings-plan funds, deposits, withdrawals, bonuses, and fees |
| BTC Wallet | BTC | Separate Bitcoin balance and BTC transfers/custody |
| Provider clearing account | Provider currency | Settlement and reconciliation accounting |

Never mix BTC values with USD values in the ledger. A BTC-to-USD exchange must create explicit BTC debit and USD credit ledger entries using a stored quote, fee, provider reference, and conversion timestamp.

Store amounts in their smallest unit:

- USD: integer cents, for example `$250.00` is `25000`.
- BTC: integer satoshis, for example `0.0248 BTC` is `2480000` satoshis.

Avoid JavaScript floating-point arithmetic for money. Perform currency calculations with integers or an approved decimal library.

### Essential PostgreSQL tables

| Table | Purpose |
| --- | --- |
| `users` | Account identity, status, profile references, and KYC level |
| `sessions` | Refresh-token/session records, device details, expiry, revocation |
| `wallets` | One record per user per wallet/currency, such as USD Wallet and BTC Wallet |
| `ledger_accounts` | Internal debit/credit account chart |
| `ledger_entries` | Immutable monetary movements with currency, amount, status, and references |
| `transactions` | User-facing transaction records and lifecycle states |
| `savings_plans` | Goal, target, status, duration, funding source, and expected completion |
| `savings_deposits` | Scheduled/manual plan deposits and job/provider outcomes |
| `beneficiaries` | Verified bank destinations and their provider tokens/references |
| `funding_sources` | Tokenized card/bank funding sources; no raw card details |
| `exchange_quotes` | BTC/USD quote, expiry, rate, fee, and provider quote ID |
| `withdrawal_requests` | Withdrawal destination, review status, risk state, and settlement reference |
| `verification_challenges` | OTP, PIN, 2FA, and approval challenges with expiry and attempt count |
| `provider_events` | Idempotently stored bank/card/custody webhook events |
| `audit_logs` | Security and financial-action audit trail |

Use database transactions and row locking whenever changing balances or moving funds between wallets. Attach an idempotency key to every request that can create or move money.

## API design for this frontend

Version APIs, for example `/api/v1`, and require an access token for private routes. The API should return display-ready values plus raw monetary amounts where appropriate.

| Frontend area | Example API routes | Notes |
| --- | --- | --- |
| Authentication | `POST /auth/register`, `POST /auth/login`, `POST /auth/verify-otp`, `POST /auth/refresh`, `POST /auth/logout` | Rate limit every credential and OTP route |
| Profile and KYC | `GET /me`, `PATCH /me`, `POST /kyc/start`, `GET /kyc/status` | Keep sensitive KYC documents off the public frontend |
| Wallet dashboard | `GET /wallets`, `GET /wallets/:id/transactions` | Return USD and BTC separately |
| USD funding | `POST /funding-sources`, `POST /deposits/intent`, `POST /deposits/confirm` | Backend creates provider-specific payment intent/reference |
| Bank transfer | `POST /beneficiaries`, `POST /beneficiaries/:id/verify`, `POST /transfers`, `GET /transfers/:id` | Recipient verification and transfer state happen server-side |
| BTC | `GET /btc/wallet`, `POST /btc/withdrawals`, `POST /quotes/btc-usd`, `POST /conversions/btc-usd` | Require heightened verification for BTC movement |
| Savings | `GET /savings/overview`, `POST /savings/plans`, `PATCH /savings/plans/:id`, `POST /savings/plans/:id/deposits`, `POST /savings/withdrawals` | USD only; no BTC funding source |
| Savings activity | `GET /savings/transactions?type=deposit` | Supports the filters in the UI |
| Security | `POST /verification/challenges`, `POST /verification/confirm` | Supports PIN/OTP approval before processing |
| Provider webhooks | `POST /webhooks/bank`, `POST /webhooks/card`, `POST /webhooks/custody` | Verify provider signature and process idempotently |

## Verification and approval flows

### Registration and login

1. User submits sign-up information from `auth/signup.html`.
2. API validates input, creates a pending user, and sends an email or SMS one-time passcode.
3. User submits the code; the API marks the contact method verified.
4. After login, the API issues a short-lived access token and a securely stored refresh token/session.
5. The frontend requests `/me` and `/wallets` to render real account data.

### Transaction PIN

1. User creates a PIN from the PIN screen.
2. API validates complexity/attempt rules, hashes it, and saves the hash in a security credential record.
3. For a transfer, withdrawal, BTC conversion, or sensitive change, frontend requests a verification challenge.
4. User enters the PIN only over HTTPS; API compares the hash and records the approval.
5. The action is allowed only for the short approval window and specific transaction ID.

Apply PIN attempt limits, temporary lockouts, audit logging, and additional OTP/biometric verification for high-risk actions. Never use the PIN as a long-lived API credential.

### Bank account verification

Bank account details should be collected only on a secure form and sent to the backend. The server communicates with the selected regulated banking/payment provider.

Possible verification methods are:

- Account-name enquiry/confirmation supplied by the banking provider.
- Micro-deposits with a user-entered verification amount.
- Open-banking consent, where available and legally appropriate.
- Manual review for exceptional cases.

Flow:

1. User selects **Bank Account** in the frontend.
2. API creates a pending beneficiary and sends account details to the provider.
3. Provider returns verified account name/status or a verification requirement.
4. API records the verified beneficiary. The frontend displays a masked account number and verification status.
5. Transfers may only be made to an active, verified beneficiary.

### Card funding verification

Do not collect or store raw card numbers, CVV, or card PIN in this frontend or PostgreSQL database. Use a PCI-compliant payment provider's hosted fields, SDK, or hosted payment page to tokenize card details.

1. Frontend opens the provider's secure card-collection flow.
2. Provider returns a payment token/reference, not the card data.
3. Frontend sends the token to the Node.js API.
4. API creates and confirms a deposit/payment intent with the provider.
5. Provider webhook confirms success, failure, reversal, or chargeback.
6. Only after a confirmed/settled event does the API post corresponding USD ledger entries.

Use 3-D Secure or the provider's equivalent customer-authentication flow where required.

### USD bank transfer funding and payout

For inbound USD funding, the backend can issue a unique virtual account/reference or initiate a bank-transfer payment request through a licensed provider. For withdrawal, the backend creates a payout request to a verified beneficiary.

```text
User starts deposit/withdrawal
        │
        ▼
Node.js API validates session, limits, compliance, and PIN approval
        │
        ▼
Creates pending internal transaction + idempotency key
        │
        ▼
Bank/payment provider processes transfer
        │
        ▼
Signed provider webhook reaches API
        │
        ▼
API verifies event, updates transaction, posts ledger entries, notifies user
```

Never mark a transfer successful solely because the browser received a success response. The provider webhook and reconciliation status determine final settlement.

### BTC custody, deposits, withdrawals, and conversion

BTC support should use a regulated custody/exchange provider or an internally operated, professionally secured custody system. Do not keep private keys in the frontend, API environment variables, or general PostgreSQL tables.

**BTC deposit:** Generate or retrieve a user deposit address from the custody provider; wait for the configured number of blockchain confirmations; then credit the BTC wallet ledger.

**BTC withdrawal:** Require recipient-address validation, PIN/OTP step-up verification, risk checks, withdrawal limits, travel-rule/compliance checks where applicable, and manual review thresholds. Create a pending BTC withdrawal and update only from the custody provider/webhook lifecycle.

**BTC to USD conversion:**

1. Frontend requests a short-lived quote with the BTC amount.
2. API obtains/creates a provider quote, including exchange rate, fee, expiry, and USD proceeds.
3. User reviews and confirms before expiry with PIN/OTP if needed.
4. API executes the conversion with the provider using an idempotency key.
5. API posts a BTC debit and USD Wallet credit in separate ledger entries after confirmed execution.

The savings frontend must request only USD Wallet, Bank Account, or Debit Card funding sources. BTC must never be silently converted or used to fund USD savings.

## Savings backend implementation

### Create a plan

When the user completes the five savings screens, the frontend sends one request such as `POST /api/v1/savings/plans` with:

```json
{
  "goalName": "Emergency Fund",
  "targetAmountCents": 500000,
  "depositAmountCents": 25000,
  "frequency": "MONTHLY",
  "durationDays": 365,
  "fundingSourceId": "usd_wallet_123",
  "autoSaveEnabled": true,
  "startDate": "2026-08-25"
}
```

The API must validate that the funding source is USD-compatible, calculate the official schedule and expected completion date, create the plan and schedule records in one database transaction, and return the saved plan. The UI should render the returned plan rather than assuming the requested values succeeded.

### Auto-Save jobs

Use a scheduler to enqueue due plan deposits. A worker should:

1. Load the due plan and lock it.
2. Confirm the plan is active and Auto-Save is enabled.
3. Check balance, plan limits, provider authorization, risk rules, and prior idempotency state.
4. Debit the approved USD funding source and credit the USD Savings wallet as a ledger transaction.
5. Mark the scheduled deposit as completed, failed, or requiring user action.
6. Calculate the next date and notify the user.

Do not run money movement solely inside an HTTP request or rely on the frontend remaining open. Retry provider/network failures safely with idempotency keys and a bounded retry policy.

### Savings withdrawals

The savings withdrawal modal should first call an API preview endpoint, for example `POST /savings/withdrawals/preview`, which returns availability, fee, restrictions, destination options, and required verification. After user confirmation and PIN approval, submit `POST /savings/withdrawals`.

The backend must check plan rules before it moves money: available savings balance, locked or pending amount, allowed withdrawal status, fees, cooling-off periods, minimum balance, user limits, and destination verification. It should then debit USD Savings and credit USD Wallet or create a bank-payout transaction. BTC is not a savings withdrawal destination.

## Provider integration boundaries

Select providers based on the countries served, your licensing model, currencies, customer type, and compliance requirements. Keep every provider behind an internal adapter interface so the rest of the product is not tied to one vendor.

```text
Node.js domain service
        │
        ├── BankTransferProvider adapter
        ├── CardPaymentProvider adapter
        ├── IdentityVerificationProvider adapter
        ├── BtcCustodyProvider adapter
        ├── FxQuoteProvider adapter
        └── NotificationProvider adapter
```

Each adapter should expose normalized methods such as `createTransfer`, `getTransferStatus`, `createPaymentIntent`, `createQuote`, `executeConversion`, `verifyBeneficiary`, and `verifyWebhook`. Store the provider name, external reference, raw event hash, normalized status, and timestamps for reconciliation.

## Security, operations, and compliance checklist

- Use TLS/HTTPS, secure HTTP headers, CORS allowlists, CSRF protection where relevant, and strict input validation.
- Enforce authorization on every resource; never trust a wallet, plan, or transaction ID from the client without checking ownership.
- Implement API, login, PIN, OTP, and webhook rate limits.
- Verify webhook signatures, record incoming event IDs, and make processing idempotent.
- Encrypt sensitive data at rest and in transit. Tokenize payment credentials and minimize KYC data retention.
- Maintain immutable financial/audit logs and conduct daily provider-to-ledger reconciliation.
- Use database backups, point-in-time recovery, disaster-recovery procedures, monitoring, and incident alerts.
- Review AML, sanctions, KYC, consumer-protection, custody, money-transmission, PCI DSS, privacy, and tax obligations with qualified legal/compliance experts in every country served.
- Do not launch real USD transfers, cards, BTC custody, or exchange functions until the required licenses, regulated partners, and compliance controls are in place.

## Admin portal setup

Build the admin portal as a separate, protected web application—for example `admin.nexos.example`—rather than adding it to the customer mobile frontend. It can use the same Node.js API and PostgreSQL database, but it must have its own sign-in, permissions, audit trail, deployment, and stricter network access controls.

The customer frontend must never expose administrative routes, provider dashboards, internal user data, KYC documents, or control actions.

### Suggested admin frontend stack

The admin portal can be built entirely with the technologies already used in this project. React and TypeScript are **not required**. Use regular HTML, CSS, and JavaScript for the screens, Node.js for the protected server/API, PostgreSQL for data, and AWS for deployment. Next.js is optional; if you use it, write it in JavaScript and use it to serve pages and API routes—not because the portal requires React knowledge.

| Area | Recommendation | Purpose |
| --- | --- | --- |
| Admin pages | Plain HTML, CSS, and JavaScript | Tables, forms, filters, approval screens, and status controls |
| Server | Node.js with Express or Fastify | Serves the admin files, enforces permissions, and exposes admin APIs |
| Optional framework | Next.js using JavaScript | Optional routing, server-rendered pages, and API routes if preferred |
| Data access | JavaScript `fetch()` admin API client | Calls only the `/api/v1/admin/*` routes |
| Authentication | SSO or dedicated admin identity provider with MFA | Prevents ordinary customer credentials from accessing admin tools |
| Hosting | Separate CloudFront/static deployment or private internal application | Separates customer and administrative attack surfaces |

Do not reuse the customer app’s browser session for the admin portal. Require an administrator account, multi-factor authentication, short session lifetimes, and re-authentication before sensitive approval actions.

### Simple admin project structure

```text
NEXOS/
├── FRONTEND/                 # Existing customer HTML/CSS/JS application
├── ADMIN/
│   ├── public/
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   ├── customers.html
│   │   ├── savings.html
│   │   ├── transfers.html
│   │   ├── kyc.html
│   │   ├── styles.css
│   │   └── admin.js
│   ├── server.js             # Node.js Express/Fastify server
│   ├── routes/
│   │   ├── auth.js
│   │   ├── customers.js
│   │   ├── savings.js
│   │   ├── transfers.js
│   │   └── admin.js
│   └── middleware/
│       ├── requireAdmin.js
│       ├── requirePermission.js
│       └── auditLog.js
└── BACKEND/                  # Shared Node.js financial API/workers, if kept separately
```

The `ADMIN/public` files are ordinary pages: `dashboard.html` can use `fetch('/api/v1/admin/dashboard')` to load data, then JavaScript renders tables and status cards. The Node.js server protects every `/api/v1/admin/*` route and can serve those files with `express.static`. If you prefer Next.js later, this same structure can move into its `pages` or `app` folders without changing the backend rules.

### Administrative roles

Use role-based access control (RBAC) with narrow permissions. A person should receive the least access needed for their job.

| Role | Permitted work | Must not be allowed to do alone |
| --- | --- | --- |
| Support Agent | View masked customer account data, transactions, and support cases | View full KYC files, alter balances, approve withdrawals |
| KYC Reviewer | Review submitted identity checks and approve/reject verification | Move money or change account balances |
| Operations Analyst | Monitor transfer, deposit, Auto-Save, and reconciliation queues | Create arbitrary credits/debits without approval |
| Finance Administrator | Reconcile provider settlements and prepare controlled adjustments | Approve their own adjustment |
| Compliance Officer | Review sanctions/AML alerts, account restrictions, and reports | Process payments or edit ledger history |
| Treasury / Crypto Operator | Monitor liquidity and custody settlement status | Initiate and approve the same BTC movement |
| Admin Manager | Manage user roles and configurations | View secrets or bypass maker-checker controls |
| Platform Administrator | Deploy services and manage infrastructure | Approve financial transactions by default |

For high-risk actions, require **maker-checker** approval: one authorized staff member submits the request and a different authorized staff member reviews and approves it. This is required for manual balance adjustments, high-value payouts, disabling risk controls, customer account closure, and treasury/custody actions.

### Admin portal sections

| Section | Admin capabilities | Customer frontend effect |
| --- | --- | --- |
| Dashboard | Operational totals, failed jobs, provider/webhook health, pending reviews | No direct customer UI change |
| Customer accounts | Search users, view masked profile, session state, wallet summaries, plan status | Support can investigate account issues |
| KYC and compliance | Review identity status, sanctions alerts, limits, restrictions | Customer sees verified/pending/rejected status and available limits |
| USD transfers | Monitor pending, completed, failed, returned, and disputed transfers | Customer transfer history receives authoritative status |
| Savings plans | View plans, scheduled Auto-Save runs, failed payments, withdrawal eligibility | Customer savings overview/history refreshes from API state |
| BTC operations | Monitor deposits, confirmations, withdrawals, AML/risk status, conversions | Customer BTC wallet and conversion history update from confirmed state |
| Funding sources | View token references, account verification status, payment outcomes | Customer can use only verified sources |
| Fees and limits | Configure approved fee tables, tier limits, plan rules, and feature flags | API returns current rules, fees, and eligibility before confirmation |
| Content and support | Manage support articles, notice banners, and customer support cases | Frontend fetches approved content or notices |
| Reconciliation | Compare provider settlement files/events with internal ledger | Exceptions are resolved before customer balances are changed |
| Audit and security | Search immutable audit logs, MFA events, admin sessions, approvals | No direct customer UI change |

### Admin database records

Add dedicated tables or equivalent models, separate from customer credentials:

| Table | Purpose |
| --- | --- |
| `admin_users` | Administrator identity, status, MFA configuration, and SSO subject |
| `admin_roles` | Named roles such as Support, KYC Reviewer, Finance, and Compliance |
| `admin_permissions` | Fine-grained permissions, such as `withdrawal.review` or `kyc.approve` |
| `admin_role_permissions` | Role-to-permission assignments |
| `admin_sessions` | Short-lived admin sessions, device metadata, expiry, and revocation |
| `admin_actions` | Immutable audit log of every view/export/change/approval with reason |
| `approval_requests` | Maker-checker requests, reviewer, outcome, timestamps, and references |
| `account_restrictions` | Compliance/security restrictions applied to a customer account |
| `risk_cases` | AML, fraud, sanctions, or unusual-activity cases and decision history |
| `fee_schedules` | Versioned fee configuration with effective dates and approver |
| `limit_policies` | Versioned transaction, wallet, and KYC-tier limits |
| `feature_flags` | Safely scoped customer/admin feature availability settings |

Keep `admin_actions` append-only. Capture the admin user, role, source IP/device, timestamp, reason, target resource, before/after values for changes, and the related approval request. Never allow an admin tool to edit or delete historical ledger entries; corrections must be new compensating ledger entries.

### Admin API routes

Expose administrative APIs under a separate namespace and authorization guard. Examples:

| Area | Example routes |
| --- | --- |
| Admin authentication | `POST /api/v1/admin/auth/login`, `POST /api/v1/admin/auth/mfa/verify`, `POST /api/v1/admin/auth/logout` |
| Customer search | `GET /api/v1/admin/customers`, `GET /api/v1/admin/customers/:id` |
| KYC | `GET /api/v1/admin/kyc/cases`, `POST /api/v1/admin/kyc/cases/:id/decision` |
| Transfers | `GET /api/v1/admin/transfers`, `POST /api/v1/admin/transfers/:id/review` |
| Savings | `GET /api/v1/admin/savings/plans`, `POST /api/v1/admin/savings/plans/:id/pause` |
| BTC | `GET /api/v1/admin/btc/withdrawals`, `POST /api/v1/admin/btc/withdrawals/:id/review` |
| Restrictions | `POST /api/v1/admin/customers/:id/restrictions`, `DELETE /api/v1/admin/customers/:id/restrictions/:restrictionId` |
| Approvals | `POST /api/v1/admin/approvals`, `POST /api/v1/admin/approvals/:id/approve` |
| Configuration | `GET /api/v1/admin/fees`, `POST /api/v1/admin/fees`, `GET /api/v1/admin/limits` |
| Audit | `GET /api/v1/admin/audit-logs` |

Every admin route must check both authentication and a precise permission. Log both successful and denied sensitive attempts. Avoid endpoints that perform generic, unrestricted database updates.

## How frontend and backend stay updated

### Customer frontend data flow

The current static screens should be converted from sample values to API-driven views. After the customer signs in, the frontend calls authenticated endpoints and renders the returned data.

```text
Customer action in frontend
        │
        ▼
Authenticated Node.js API request
        │
        ├── Validates input, ownership, limits, verification, and risk policy
        ├── Writes transaction/plan state in PostgreSQL
        ├── Calls external provider when required
        └── Returns pending/confirmed state
        │
        ▼
Frontend refreshes from API or receives a safe real-time event
```

Use REST polling for simple status updates, or authenticated WebSocket/server-sent events for real-time status changes. Real-time events should only notify the frontend to refetch a resource; they must not be trusted as the sole financial record.

### Mapping the existing frontend to backend data

| Current UI element | Replace sample data with | Refresh trigger |
| --- | --- | --- |
| Main dashboard balance | `GET /wallets` | Login, app focus, completed transaction, balance event |
| Recent transactions | `GET /wallets/:id/transactions` | Screen open, filter change, transaction event |
| BTC balance | `GET /btc/wallet` | Screen open and confirmed custody event |
| BTC conversion | Quote and conversion endpoints | Quote expiry, confirmation, provider settlement |
| Savings overview | `GET /savings/overview` | Screen open, plan/deposit/withdrawal event |
| Savings plan wizard | `POST /savings/plans` | Create-plan confirmation |
| Auto-Save settings | `PATCH /savings/plans/:id` | Setting change and scheduled-job outcome |
| Savings history filters | `GET /savings/transactions?type=...` | Filter selection and pagination |
| Savings withdrawal modal | Preview + create withdrawal endpoints | Amount/destination change, PIN confirmation, final provider state |
| Profile | `GET/PATCH /me` | Save confirmation |
| Support screen | `GET /support/articles`, support case endpoints | Article/case update |

### Administrative updates to customer experience

Most admin actions should update the backend first; customers see the result on their next safe API refresh or a permitted status event.

| Admin change | Backend action | Customer-visible result |
| --- | --- | --- |
| KYC approved/rejected | Updates verification record and account limits | Profile and available actions show new verification state |
| Bank beneficiary approved | Activates verified beneficiary | Bank transfer/withdrawal destination becomes selectable |
| Auto-Save payment fails | Savings worker marks deposit failed and creates notification | Savings plan shows issue and a retry/add-money option |
| Account restricted | Adds restriction policy and invalidates affected sessions/actions | Customer receives an appropriate safe message; restricted actions are blocked |
| Fee/limit policy changes | Publishes versioned policy with effective date | API preview shows the new fee/limit before user confirmation |
| Transfer manually reviewed | Changes the transaction lifecycle state | Transaction history status updates |
| Support notice published | Stores a safe, approved notice/content item | Dashboard/support page displays notice on next refresh |
| Feature flag enabled | Updates scoped feature-flag rule | Eligible customers see the feature after frontend refresh/deployment |

An admin cannot directly change the HTML/CSS/JavaScript running on a customer device. Code changes must follow the deployment process below. Admin configuration should be delivered through controlled APIs or feature flags, not by editing production files manually.

### Safe release process

1. Developer creates a change in source control and opens a code review.
2. Automated checks run: JavaScript linting, unit tests, API tests, component tests, dependency/security scanning, and database migration checks.
3. Deploy to a staging environment with non-production providers or sandbox credentials.
4. Test the customer frontend, admin portal, API, worker jobs, webhooks, and key money-movement flows together.
5. Obtain required engineering, security, compliance, and product approvals.
6. Deploy backend/API and database migrations using an approved rollback plan.
7. Deploy frontend/admin static builds through the CDN; use versioned assets and gradual rollout/feature flags when possible.
8. Monitor errors, queue depth, failed webhook rate, provider discrepancies, and customer-impact metrics.
9. Roll back the feature flag or release if monitoring shows a material issue.

### Configuration versus code changes

| Change type | Managed by | Delivery method |
| --- | --- | --- |
| New screen, UI behavior, validation, API contract | Engineering | Source-controlled frontend/backend release |
| New savings fee, limit, plan rule | Authorized operations/compliance + approval | Versioned admin configuration API |
| KYC decision, account restriction, transfer approval | Authorized reviewer + audit/maker-checker | Admin portal action and API |
| Provider credentials/webhook secret | Platform/security team | AWS Secrets Manager, never admin page or frontend |
| Feature availability by country/user tier | Product/engineering + approval | Scoped feature flag |

## Audit performed on this frontend

The following local checks were completed for the current static project:

| Check | Result |
| --- | --- |
| JavaScript syntax check | Passed for all 19 JavaScript files |
| Local HTML references | Passed for all 24 HTML pages; referenced local stylesheets, scripts, links, and assets resolve |
| Savings page integration | Main dashboard links to `saving/index.html`; savings page uses the same dark mobile app theme and back navigation |
| Documentation | `FRONTEND_DOCUMENTATION.md` exists in the project root |

These checks confirm local file integrity, not production readiness. They do not replace browser/device testing, accessibility testing, security testing, API integration tests, payment-provider certification, legal review, or compliance approval.

## Assets

The `IMG/` folder contains local image files used by the frontend. Most interface icons are embedded inline as SVG, which keeps the pages self-contained and avoids extra icon dependencies.
