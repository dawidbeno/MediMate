# Medication Card View Implementation Plan

## Overview
Create a medication card component to display all stored medications on the main screen, replacing the current notification UI.

## User Requirements
- Display list of all medications on main screen
- Each medication shown as a card with: name, description, and all scheduled times
- Schedules displayed as badges
- Empty state message when no medications exist
- View-only (no interactions for now)

## Implementation Steps

### 1. Create MedicationCard Component

**File**: `/Users/saruman/codes/MediMate/medimate_app/components/MedicationCard.tsx` (new file)

**Component Structure**:
- Accept `medication` prop of type `MedicationType`
- Use existing `Card` component as wrapper
- Display medication name using `theme.typography.h3`
- Show optional description in lighter italic text
- Render schedule badges in a wrapping horizontal layout
- Each badge shows time and dosage (e.g., "08:00 - 500mg")

**Styling Approach**:
- Badge background: `theme.colors.primaryLight` (#a86565)
- Badge text: `theme.colors.white` with small typography
- Use `flexWrap: 'wrap'` for multiple schedules
- Spacing: consistent use of `theme.spacing` (xs, sm, md)
- Card margin bottom: `theme.spacing.md` for list spacing

**Key Imports**:
```typescript
import { Card } from './Card';
import { theme } from '@/theme';
import { MedicationType } from '@/store/medicationStore';
```

### 2. Update Main Screen

**File**: `/Users/saruman/codes/MediMate/medimate_app/app/(tabs)/index.tsx` (complete replacement)

**Changes**:
- Remove all notification-related code (DateTimePicker, scheduleNotification, AsyncStorage for notifications)
- Import medication store: `useMedicationStore`
- Import `MedicationCard` component
- Fetch medications: `const medications = useMedicationStore((state) => state.medications)`

**Layout Structure**:
```
Container (full screen)
  ├─ Header Section
  │   └─ Title: "My Medications" (h2 typography)
  │
  └─ ScrollView
      ├─ If medications.length === 0:
      │   └─ Empty State (centered)
      │       ├─ Icon (medical-outline, size 64)
      │       ├─ "No Medications Yet"
      │       └─ "Tap + button above to add your first medication"
      │
      └─ Else:
          └─ Map medications to MedicationCard components
```

**Empty State Design**:
- Centered vertically and horizontally
- Use `Ionicons` medical-outline icon in muted color
- Simple, encouraging message
- Padding: `theme.spacing.xxl * 2` for breathing room

**Key Imports to Add**:
```typescript
import { useMedicationStore } from '@/store/medicationStore';
import { MedicationCard } from '@/components/MedicationCard';
```

**Key Imports to Remove**:
- expo-notifications
- expo-device
- DateTimePicker
- AsyncStorage (notification-related)
- SegmentCard

**Header Note**: The tab layout already has a + button that navigates to `/new` modal, so no need to duplicate it in the screen content.

## Critical Files

- **Create**: `components/MedicationCard.tsx` - New component for medication display
- **Modify**: `app/(tabs)/index.tsx` - Replace notification UI with medication list
- **Reference**: `theme.ts` - All colors, spacing, typography values
- **Reference**: `store/medicationStore.ts` - Data model and store hook
- **Reference**: `components/Card.tsx` - Base card component pattern

## Design Decisions

1. **ScrollView over FlatList**: Medication lists are typically small (< 20 items), so ScrollView is simpler and sufficient
2. **Badge wrapping**: Horizontal layout with `flexWrap: 'wrap'` handles variable schedule counts gracefully
3. **Complete replacement**: Removing notification UI entirely since medication management is the primary feature
4. **Theme consistency**: Using existing theme tokens (primaryLight, spacing, typography) for visual coherence
5. **Simple empty state**: Just text and icon, no illustration needed for this MVP

## Testing Checklist

After implementation:
- [ ] Empty state displays when no medications exist
- [ ] Single medication displays correctly
- [ ] Multiple medications display in list
- [ ] Long medication names don't break layout
- [ ] Multiple schedules wrap properly in badges
- [ ] Description field shows/hides based on presence
- [ ] Scrolling works smoothly with many medications
- [ ] Theme colors and spacing are consistent
