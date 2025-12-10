import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    title: string;
    subtitle?: string;
}

export function SectionTitle({ title, subtitle, className, ...props }: SectionTitleProps) {
    return (
        <div className={cn("flex flex-col gap-1 mb-6", className)} {...props}>
            <h2 className="text-2xl font-bold tracking-tight text-white font-heading">{title}</h2>
            {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
        </div>
    );
}
