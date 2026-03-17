// School Feature Exports
export { default as SchoolCard } from './components/SchoolCard';
export { default as SchoolDetail } from './components/SchoolDetail';
export { default as SchoolHighlights } from './components/SchoolHighlights';
export { default as SchoolTab } from './components/SchoolTab';
export { default as SchoolDescription } from './components/SchoolDescription';
export { default as SchoolFeatures } from './components/SchoolFeatures';
export { default as InfiniteSchoolList } from './components/InfiniteSchoolList';
export { default as InfiniteSchoolFiltered } from './components/InfiniteSchoolFiltered';
export { default as Accommodation } from './components/Accommodation';
export { default as Certifications } from './components/Certifications';
export { default as Facilities } from './components/Facilities';
export { default as Location } from './components/Location';
export { default as OptionsCertification } from './components/OptionsCertification';
export { default as SchoolFilterModal } from './components/SchoolFilterModal';
export { default as SchoolInclusion } from './components/SchoolInclusion';
export { default as SchoolSearchList } from './components/SchoolSearchList';
export { default as SchoolStat } from './components/SchoolStat';
export { default as Section } from './components/Section';

// School Feature Hooks - re-exported from app/hooks
export { useSchoolById } from '@/app/hooks/useSchoolById';
export { useSchools } from '@/app/hooks/useSchools';
export { useSchoolDetails } from '@/app/hooks/useSchoolDetails';
export { useFilteredSchools } from '@/app/hooks/useSchoolsByCourse';
export { useSchoolSearch } from '@/app/hooks/useSchoolSearch';