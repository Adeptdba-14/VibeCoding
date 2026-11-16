import { Cloud, Database, GraduationCap, Workflow } from "lucide-react";
import type { Service } from "@/lib/services";

const map = { database: Database, cloud: Cloud, workflow: Workflow, graduation: GraduationCap };

export function ServiceIcon({ icon, className }: { icon: Service["icon"]; className?: string }) {
  const Icon = map[icon];
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
