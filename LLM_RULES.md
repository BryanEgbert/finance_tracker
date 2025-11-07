# FinTrack LLM Development Rules

## Project Overview
**FinTrack** is a React + TypeScript + Vite financial tracking application that helps users manage expenses and income through customizable routines. The app uses Wouter for routing, TailwindCSS for styling, and follows modern React patterns.

### Tech Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **Styling**: TailwindCSS
- **UI Components**: Custom components (Button, H1) with class-variance-authority
- **State Management**: React hooks (useState)

### Project Structure
```
src/
├── App.tsx                 # Main routing component
├── main.tsx               # Entry point
├── index.css              # Global styles
├── components/
│   └── ui/
│       ├── Button.tsx     # Reusable button component
│       └── H1.tsx         # Heading component
├── models/
│   ├── Routine.ts         # Routine interface
│   └── Entry.ts           # Entry interface
├── pages/
│   ├── HomePage.tsx
│   ├── SignInPage.tsx
│   ├── SignUpPage.tsx
│   ├── CreateRoutinePage.tsx
│   └── RoutinesPage.tsx
├── lib/
│   └── utils.ts           # Utility functions (cn)
└── assets/
```

---

## Core Data Models

### Model Architecture
All data models follow a consistent pattern:
- **Interface**: Defines the data structure
- **Class**: Implements the interface with business logic methods
- **Export**: Both interface and class are exported from `src/models/`
- **Index**: All models exported from `src/models/index.ts` for easy importing

### Model Classes

#### User Model (`src/models/User.ts`)
- Properties: id, email, passwordHash, timezone, currency, createdAt, updatedAt
- Methods: `isValid()`, `getDisplayName()`
- Usage: Represents authenticated user with preferences

#### Account Model (`src/models/Account.ts`)
- Properties: id, user, name, balance, createdAt, updatedAt
- Methods: `isValid()`, `updateBalance()`, `setBalance()`, `getFormattedBalance()`
- Usage: Represents user's financial account

#### Category Model (`src/models/Category.ts`)
- Properties: id, user, name, type ('income' | 'expense'), createdAt, updatedAt
- Methods: `isValid()`, `isIncome()`, `isExpense()`
- Usage: Categorizes transactions and entries

#### RoutineModel (`src/models/RoutineModel.ts`)
- Properties: id, user, name, isActive, entries[], createdAt, updatedAt
- Methods: `isValid()`, `addEntry()`, `removeEntry()`, `getTotalIncome()`, `getTotalExpense()`, `getNetTotal()`, `toggleActive()`, `getEntryCount()`
- Usage: Manages recurring financial patterns

#### EntryModel (`src/models/EntryModel.ts`)
- Properties: id, category, account, type, amount, description, frequency, daysOfWeek, dayOfMonth, startDate, endDate, isActive, createdAt, updatedAt
- Methods: `isValid()`, `isIncome()`, `isExpense()`, `isCurrentlyActive()`, `occursOnDayOfWeek()`, `occursOnDayOfMonth()`, `getFormattedAmount()`, `toggleActive()`
- Usage: Represents individual transaction entry in a routine

#### TransactionModel (`src/models/TransactionModel.ts`)
- Properties: id, user, account, category, patternId, type, amount, note, date, isFromPattern, createdAt, updatedAt
- Methods: `isValid()`, `isIncome()`, `isExpense()`, `getFormattedAmount()`, `getFormattedDate()`, `isAutomatic()`, `isToday()`, `isThisMonth()`
- Usage: Represents actual financial transaction

#### BudgetModel (`src/models/BudgetModel.ts`)
- Properties: id, user, name, allocationPercentage, targetAmount, currentAmount, createdAt, updatedAt
- Methods: `isValid()`, `getRemainingAmount()`, `getSpentPercentage()`, `isExceeded()`, `isNearLimit()`, `addSpending()`, `subtractSpending()`, `resetSpending()`, `getFormatted*()`
- Usage: Manages budget allocation and tracking

#### NetWorthSnapshotModel (`src/models/NetWorthSnapshotModel.ts`)
- Properties: id, user, date, totalIncome, totalExpense, netWorth, calculatedFrom, createdAt, updatedAt
- Methods: `isValid()`, `isCalculationCorrect()`, `getFormatted*()`, `isToday()`, `isThisMonth()`, `isThisYear()`, `getSavingsRate()`, `getFormattedSavingsRate()`
- Usage: Tracks net worth over time

### Importing Models
```typescript
// Import from index for convenience
import { UserModel, AccountModel, BudgetModel } from '@/models';

// Or import specific model
import type { User } from '@/models/User';
import { UserModel } from '@/models/User';
```

### Legacy Interfaces (Frontend Only)
```typescript
interface Routine {
  id: number;
  name: string;
  entries: Entry[];
  checked: boolean;
}

interface Entry {
  name: string;
  type: 'income' | 'expense';
  frequency: 'daily' | 'weekly' | 'monthly';
  times: number;
  category: string;
  amount: number;
}
```
Note: These are used for frontend state management and will be replaced by model classes as backend integration progresses.

---

## Model Development Guidelines

### Creating New Models
1. **Define Interface**: Create interface with all properties
2. **Implement Class**: Create class that implements interface
3. **Add Methods**: Include validation, getters, and business logic
4. **Export Both**: Export interface and class from model file
5. **Update Index**: Add exports to `src/models/index.ts`
6. **Document**: Add JSDoc comments for all public methods

### Model Class Patterns

#### Validation Method
```typescript
isValid(): boolean {
  return (
    this.id.length > 0 &&
    this.name.length > 0 &&
    // Additional validation logic
  );
}
```

#### Type Checking Methods
```typescript
isIncome(): boolean {
  return this.type === 'income';
}

isExpense(): boolean {
  return this.type === 'expense';
}
```

#### Formatting Methods
```typescript
getFormattedAmount(): string {
  return `$${this.amount.toFixed(2)}`;
}

getFormattedDate(): string {
  return this.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
```

#### State Mutation Methods
```typescript
toggleActive(): void {
  this.isActive = !this.isActive;
  this.updatedAt = new Date();
}

addSpending(amount: number): void {
  this.currentAmount += amount;
  this.updatedAt = new Date();
}
```

### Model Usage in Components
```typescript
import { UserModel, BudgetModel } from '@/models';

const user = new UserModel({
  id: '123',
  email: 'user@example.com',
  // ... other properties
});

if (user.isValid()) {
  console.log(`Welcome, ${user.getDisplayName()}`);
}
```

### Model Validation
- Always call `isValid()` before using model data
- Validate data at component boundaries
- Use TypeScript strict mode to catch type errors
- Provide meaningful error messages for validation failures

---

## Code Quality & Style Rules

### TypeScript & Type Safety
- **Always export interfaces** when they need to be shared between files
- Use `type` imports for interfaces: `import type { Routine } from '@/models/Routine'`
- Avoid `any` types; use proper TypeScript interfaces
- Use `React.ReactNode` as return type for functional components
- Prefer explicit types over inference for component props

### React Patterns
- Use **functional components** exclusively
- Use **functional updates** when new state depends on previous state:
  ```typescript
  setRoutines(prevRoutines => 
    prevRoutines.map(routine => 
      routine.id === id ? { ...routine, checked: !routine.checked } : routine
    )
  );
  ```
- Prefer `useState` for local state management
- Use `useLocation` from Wouter for navigation
- Always provide `key` prop when rendering lists (use unique IDs, not indices)

### Component Structure
- Keep components focused and single-responsibility
- Extract reusable logic into utility functions
- Place UI components in `src/components/ui/`
- Place page components in `src/pages/`
- Use consistent naming: PascalCase for components, camelCase for functions/variables

### Imports & Exports
- Use absolute imports with `@/` alias
- Group imports: React first, then third-party, then local
- Always place imports at the top of files
- Export components as named exports

---

## Styling Rules

### TailwindCSS Guidelines
- Use TailwindCSS utility classes exclusively
- Prefer responsive classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Use consistent spacing: `mb-4`, `p-6`, `gap-6`
- Color palette:
  - Primary: `teal-500` / `teal-600`
  - Secondary: `slate-200` / `slate-300`
  - Success: `green-50` / `green-100` / `green-600` / `green-800`
  - Error: `red-50` / `red-100` / `red-600` / `red-800`
  - Neutral: `gray-50` / `gray-100` / `gray-200` / `gray-600` / `gray-900`

### UI Patterns
- Use white backgrounds with card layouts and rounded corners
- Apply rounded corners: `rounded-lg` (small), `rounded-xl` (medium)
- Use shadows for depth: `shadow-lg`, `hover:shadow-xl`
- Add smooth transitions: `transition-all duration-200`
- Ensure interactive elements have sufficient size for touch targets (min 44x44px recommended)

### Button Component
- Use `<Button>` component from `src/components/ui/Button.tsx`
- Variants: `primary` (teal background), `secondary` (slate background), `danger` (red text)
- Sizes: `default` (py-2 px-4 h-10), `small` (py-1 px-2 text-sm), `icon` (py-1 px-1)
- All buttons include `cursor-pointer` and smooth transitions
- All buttons include focus ring styling for accessibility

### LinkButton Component
- Use `<LinkButton>` component from `src/components/ui/LinkButton.tsx` for link-styled buttons
- Variants: `primary` (teal text), `secondary` (slate text), `danger` (red text)
- Sizes: `default` (text-base), `small` (text-sm), `icon` (text-base)
- Renders as `<a>` element with `role="button"`
- Prevents default link behavior and calls onClick handler
- Use for "Add", "Remove", or other action links that need button styling
- Always include descriptive text or aria-label

---

## Accessibility Standards (WCAG 2.1 Level AA)

### Semantic HTML
- Use semantic elements: `<main>`, `<section>`, `<article>`, `<header>`, `<nav>`
- Use proper heading hierarchy: `<h1>` → `<h2>` → `<h3>` (never skip levels)
- Use `<label>` elements for form inputs with `htmlFor` attribute
- Use `<button>` for clickable actions, not `<div>` with click handlers

### ARIA Attributes
- **aria-label**: Provide descriptive labels for icon-only buttons and interactive elements
  ```typescript
  aria-label={`${routine.checked ? 'Deactivate' : 'Activate'} ${routine.name} routine`}
  ```
- **aria-labelledby**: Link sections to their headings
  ```typescript
  <section aria-labelledby="active-routines-heading">
    <h2 id="active-routines-heading">Active Routines</h2>
  </section>
  ```
- **aria-hidden**: Hide decorative elements from screen readers
  ```typescript
  <div aria-hidden="true">+</div>
  ```
- **role**: Specify element roles when semantic HTML isn't used
  ```typescript
  <div role="presentation" aria-hidden="true">...</div>
  ```

### Form Accessibility
- Always associate labels with inputs using `htmlFor` and `id`
- Use `sr-only` class for screen-reader-only text
- Provide clear, descriptive aria-labels for all form controls
- Include form validation messages accessible to screen readers

### Color & Contrast
- Ensure text contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- Don't rely on color alone to convey information (use icons, text, patterns)
- Use semantic colors: green for income/positive, red for expenses/negative

### Interactive Elements
- Ensure all interactive elements are keyboard accessible
- Use `:focus` styles for keyboard navigation visibility
- Minimum touch target size: 44x44px (TailwindCSS: `w-10 h-6` = 40x24px, acceptable with padding)
- Provide visual feedback on hover and focus states

### Images & Icons
- Provide `alt` text for meaningful images
- Use `aria-hidden="true"` for decorative icons
- Use semantic icons with descriptive labels when needed

### Motion & Animation
- Use `transition-all duration-200` for smooth, predictable animations
- Respect `prefers-reduced-motion` for users who prefer minimal animation
- Keep animations under 300ms for responsiveness

### Page Structure
- Every page should have a unique, descriptive `<title>`
- Use skip navigation links if needed (not required for single-page apps with good structure)
- Ensure logical tab order (use native HTML elements for natural tab order)
- Provide page landmarks: `<main>`, `<header>`, `<footer>`, `<nav>`

### Testing Accessibility
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Test keyboard navigation (Tab, Shift+Tab, Enter, Space)
- Use browser accessibility inspector
- Validate HTML with W3C validator
- Check color contrast with tools like WebAIM

---

## Component Development Guidelines

### When to Extract Components
Extract code into a new component when:
- **Reusability**: The code is used in multiple places or will be reused
- **Complexity**: A component exceeds 100 lines or has multiple concerns
- **Readability**: Extracting improves code clarity and maintainability
- **Testing**: The component needs isolated unit tests
- **Props**: The component has clear, well-defined props interface

### Component Extraction Process
1. Identify the JSX block or logic to extract
2. Define a clear `Props` interface with descriptive prop names
3. Create a new file in `src/components/` with PascalCase naming
4. Export the component as a named export
5. Export the `Props` interface for type safety
6. Update parent component to import and use the new component
7. Pass necessary callbacks and data as props

### Button Component
- Always use semantic `<button>` element
- Include `role="button"` for clarity
- Support all standard button attributes via spread props
- Provide aria-label for icon-only buttons

### H1 Component
- Use for page titles only
- Accept className via props for flexibility
- Maintain consistent styling

### Page Components
- Return `React.ReactNode`
- Use `<main>` as root element
- Include proper heading hierarchy
- Separate concerns: data fetching, state, rendering
- Keep page components focused on layout and state management
- Delegate rendering to specialized components

### Routine-Related Components

#### RoutineCard
- Displays a single routine with all its information
- Props: `routine`, `onToggle`, `calculateTotals`
- Composes `RoutineToggle` and `FinancialSummary` components
- Use `<article>` semantic element
- Use `<h3>` for routine names

#### RoutineToggle
- Reusable toggle switch for routine activation/deactivation
- Props: `routineId`, `routineName`, `isChecked`, `onToggle`
- Handles all accessibility attributes (aria-label, sr-only input)
- Provides visual feedback with smooth transitions
- Can be reused for other toggle scenarios

#### FinancialSummary
- Displays income and expense totals
- Props: `totalIncome`, `totalExpense`
- Shows income (green) and expenses (red) with icons
- Includes aria-labels for screen readers
- Reusable for any financial summary display

#### Navbar
- Global navigation component placed in `App.tsx`
- Props: `title` (optional, default "FinTrack"), `links` (array of NavLink objects)
- NavLink interface: `{ label: string; path: string }`
- Features:
  - Responsive design with flexbox
  - Active link highlighting using `aria-current="page"`
  - Uses semantic `<nav>` and `<ul>` elements
  - Accessible link styling with hover states
  - Logo/title links to home page
- Usage: Wrap all routes with Navbar for consistent navigation
- Styling: White background with shadow, teal highlight for active links

---

## Navigation Guidelines

### Navbar Implementation
- Place Navbar at the top level in `App.tsx` before `<Switch>`
- Define all navigation links as a constant array in `App.tsx`
- Use semantic `<nav>` element for accessibility
- Implement active link detection using `useLocation()` hook
- Use `aria-current="page"` for active navigation links (WCAG requirement)

### Link Accessibility
- Use semantic `<a>` elements for navigation (not buttons)
- Provide descriptive link text (avoid "click here")
- Use `aria-label` for logo/icon-only links
- Ensure sufficient color contrast between link states
- Provide visual feedback on hover and focus states

### Navigation Structure
- Keep navigation links concise and organized
- Group related links logically
- Limit top-level links to 5-7 items for usability
- Use kebab-case for URL paths: `/routine/create`, `/routines`
- Maintain consistent path naming conventions

### Mobile Considerations
- Navbar should be responsive (future: hamburger menu for mobile)
- Ensure touch targets are at least 44x44px
- Stack navigation vertically on small screens (future enhancement)

---

## State Management Rules

### useState Patterns
- Use functional updates for dependent state:
  ```typescript
  setRoutines(prevRoutines => 
    prevRoutines.map(routine => 
      routine.id === id ? { ...routine, checked: !routine.checked } : routine
    )
  );
  ```
- Initialize state with proper types
- Keep state as close to where it's used as possible

### Data Flow
- Pass data down via props
- Pass callbacks up via props
- Use React Context only for truly global state (not implemented yet)

---

## Routing Rules

### Wouter Integration
- Use `useLocation()` hook for navigation
- Define routes in `App.tsx` using `<Route>` and `<Switch>`
- Path naming: lowercase, kebab-case (`/routine/create`, `/routines`)
- Always provide `component` prop to routes

### Navigation
- Use `navigate()` function from `useLocation()`
- Provide user feedback for navigation actions
- Maintain browser history (Wouter handles this automatically)

---

## Performance Guidelines

### Optimization
- Avoid unnecessary re-renders with proper key usage in lists
- Memoize expensive calculations
- Use lazy loading for large lists (future enhancement)
- Minimize bundle size by using tree-shaking compatible imports

### Best Practices
- Don't create functions inside render (define outside or use useCallback)
- Avoid inline object/array literals in props
- Use const for static data

---

## Testing Guidelines

### Unit Tests
- Test component rendering
- Test state updates and callbacks
- Test accessibility attributes
- Test keyboard interactions

### Integration Tests
- Test navigation between pages
- Test form submissions
- Test data flow between components

### Accessibility Tests
- Verify semantic HTML
- Test keyboard navigation
- Test screen reader compatibility
- Verify color contrast

---

## Common Patterns & Examples

### Toggle Switch Pattern
```typescript
<label htmlFor={`routine-${routine.id}`} className="relative cursor-pointer">
  <input
    type="checkbox"
    checked={routine.checked}
    onChange={() => toggleRoutine(routine.id)}
    className="sr-only"
    id={`routine-${routine.id}`}
    aria-label={`${routine.checked ? 'Deactivate' : 'Activate'} ${routine.name} routine`}
  />
  <div className={`w-10 h-6 rounded-full transition-all ${routine.checked ? 'bg-teal-600' : 'bg-gray-200'}`}>
    <div className={`w-5 h-5 rounded-full bg-white absolute top-[2px] transition-all ${routine.checked ? 'left-[22px]' : 'left-[2px]'}`}></div>
  </div>
</label>
```

### Section with Heading Pattern
```typescript
<section aria-labelledby="active-routines-heading" className="mb-12">
  <h2 id="active-routines-heading" className="text-2xl font-bold text-gray-900 mb-6">
    Active Routines
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Content */}
  </div>
</section>
```

### Utility Function Pattern
```typescript
const calculateTotals = (entries: Routine['entries']) => {
  let totalIncome = 0;
  let totalExpense = 0;
  
  entries.forEach(entry => {
    if (entry.type === 'income') {
      totalIncome += entry.amount;
    } else {
      totalExpense += entry.amount;
    }
  });
  
  return { totalIncome, totalExpense };
};
```

---

## Terminology & Naming Conventions

### Domain Terms
- **Routine**: A set of recurring financial entries (income/expenses)
- **Entry**: A single financial transaction within a routine
- **Active/Inactive**: Routine checked/unchecked status (not "enabled/disabled")
- **Toggle**: Switch control for routine status

### File Naming
- Components: PascalCase (e.g., `RoutinesPage.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Models: PascalCase (e.g., `Routine.ts`)
- Interfaces: PascalCase (e.g., `ButtonProps`)

---

## Error Handling & Validation

### Input Validation
- Validate routine names are non-empty
- Validate amounts are positive numbers
- Validate frequency is one of: 'daily', 'weekly', 'monthly'
- Validate entry types are 'income' or 'expense'

### Error Messages
- Provide clear, actionable error messages
- Display errors near the problematic field
- Use accessible error announcements

---

## Documentation Standards

### Code Comments
- Comment complex logic, not obvious code
- Use JSDoc for exported functions and components
- Keep comments up-to-date with code changes

### Commit Messages
- Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `a11y:`
- Include issue references when applicable
- Write descriptive, imperative messages

---

## Before Submitting Code

- [ ] TypeScript compiles without errors
- [ ] All interfaces are properly exported
- [ ] Semantic HTML is used throughout
- [ ] ARIA attributes are properly applied
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA standards
- [ ] Touch targets are ≥44x44px
- [ ] No console errors or warnings
- [ ] Code follows all style guidelines
- [ ] Components are reusable and focused
- [ ] State management uses functional updates
- [ ] All imports use absolute paths with `@/`
