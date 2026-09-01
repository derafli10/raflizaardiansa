'use client';

import { type SkillCategory } from '@/types/skill';
import { cn } from '@/lib/utils';

export type CategoryFilter = 'all' | SkillCategory;

export interface SkillCategoryTabsProps {
  /** Active category filter */
  activeCategory: CategoryFilter;
  /** Callback fired when category tab is selected */
  onSelectCategory: (category: CategoryFilter) => void;
  /** Skill counts per category */
  counts?: Record<CategoryFilter, number>;
  /** Additional CSS classes */
  className?: string;
}

const TABS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Domains' },
  { id: 'networking', label: 'Networking' },
  { id: 'security', label: 'Cyber Security' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'software', label: 'Software' },
];

/**
 * SkillCategoryTabs — Domain Filter Bar for the Skills Network.
 *
 * Filters the skill topology graph by engineering domain.
 *
 * **Requirements: 15.6**
 */
export function SkillCategoryTabs({
  activeCategory,
  onSelectCategory,
  counts,
  className,
}: SkillCategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Skill Categories"
      className={cn(
        'border-trace/60 bg-substrate-raised/40 flex flex-wrap items-center gap-2 rounded-xl border p-1.5 select-none',
        className
      )}
    >
      {TABS.map((tab) => {
        const isActive = activeCategory === tab.id;
        const count = counts?.[tab.id];

        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onSelectCategory(tab.id)}
            className={cn(
              'group relative flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-xs tracking-wider transition-all duration-200',
              'focus-visible:ring-copper focus-visible:ring-offset-substrate focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              isActive
                ? 'bg-copper text-substrate shadow-copper-glow font-bold'
                : 'text-text-secondary hover:bg-substrate-raised/60 hover:text-text-primary'
            )}
          >
            <span>{tab.label}</span>
            {count !== undefined && (
              <span
                className={cn(
                  'rounded px-1.5 py-0.5 text-[10px] font-semibold',
                  isActive
                    ? 'bg-substrate text-copper-bright'
                    : 'bg-substrate-raised text-text-tertiary group-hover:text-copper'
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

SkillCategoryTabs.displayName = 'SkillCategoryTabs';
