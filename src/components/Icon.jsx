// Explicit icon registry so bundlers can tree-shake lucide-react.
// (Importing the whole library via `import *` would ship ~1500 icons.)
// Add a name here if a new data-driven icon is referenced.
import {
  Circle,
  Home, Building2, Building, Wallet, Briefcase, Factory, GraduationCap, Car, Cog,
  LayoutTemplate, RefreshCw, CalendarClock, CreditCard, LineChart, PiggyBank,
  TrendingUp, ShieldCheck, FileText, School, Laptop, MonitorSmartphone,
  Stethoscope, HeartPulse, BedDouble, Pill, Microscope, Lightbulb, Plane,
  Zap, Users, Landmark, Headset,
} from 'lucide-react'

const registry = {
  Home, Building2, Building, Wallet, Briefcase, Factory, GraduationCap, Car, Cog,
  LayoutTemplate, RefreshCw, CalendarClock, CreditCard, LineChart, PiggyBank,
  TrendingUp, ShieldCheck, FileText, School, Laptop, MonitorSmartphone,
  Stethoscope, HeartPulse, BedDouble, Pill, Microscope, Lightbulb, Plane,
  Zap, Users, Landmark, Headset,
}

// Renders a lucide-react icon by name, e.g. <Icon name="Home" />.
export default function Icon({ name, className = 'h-6 w-6', ...props }) {
  const LucideIcon = registry[name] || Circle
  return <LucideIcon className={className} strokeWidth={1.75} {...props} />
}
