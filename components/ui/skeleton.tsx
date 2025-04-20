import { cn } from "@/lib/utils"

/**
 * A component that renders a loading skeleton with customizable styles.
 *
 * @param {Object} props - The props for the Skeleton component.
 * @param {string} [props.className] - Additional class names to apply to the skeleton div.
 * @returns {JSX.Element} - The JSX element representing the Skeleton.
 *
 * @example
 * <Skeleton className="my-custom-skeleton" />
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
