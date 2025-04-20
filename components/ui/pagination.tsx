import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

/**
 * A component for rendering pagination navigation.
 *
 * @param {Object} props - The props object containing the following properties:
 *   @property {string} [className] - Additional CSS classes to apply to the pagination container.
 *   @property {...React.ComponentProps<"nav">} [props] - Remaining props that will be spread onto the `<nav>` element.
 *
 * @returns {JSX.Element} - The rendered Pagination component.
 */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

/**
 * A component representing a pagination link that can be active or inactive.
 *
 * @param {Object} props - The properties for the PaginationLink component.
 * @param {string} [props.className] - Additional class names to apply to the button.
 * @param {boolean} props.isActive - Indicates whether the link is currently active.
 * @param {string} [props.size="icon"] - Size of the pagination link, can be "icon" or other sizes defined in buttonVariants.
 * @returns {JSX.Element} - The rendered PaginationLink component.
 *
 * Example usage:
 * <PaginationLink
 *   isActive={true}
 *   size="large"
 *   className="custom-class"
 * />
 */
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

/**
 * A component that renders a pagination link for navigating to the previous page.
 *
 * @param {Object} props - The properties to pass down to the underlying PaginationLink component.
 * @param {string} [props.className] - Additional class names to apply to the pagination link.
 * @returns {JSX.Element} - The rendered PaginationPrevious component.
 *
 * @example
 * <PaginationPrevious onClick={() => console.log('Previous page clicked')} />
 */
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

/**
 * A component that renders the "Next" button in pagination.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional CSS class names for custom styling.
 * @returns {JSX.Element} - The rendered PaginationNext component.
 *
 * @example
 * <PaginationNext onClick={() => handleNextPage()} />
 */
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

/**
 * A component that renders an ellipsis for pagination, displaying a MoreHorizontal icon and the text "More pages".
 *
 * @param {Object} props - The props for the PaginationEllipsis component.
 * @param {string} [props.className] - Additional class names to apply to the root <span> element.
 * @returns {ReactElement} A React Element representing the PaginationEllipsis component.
 */
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
