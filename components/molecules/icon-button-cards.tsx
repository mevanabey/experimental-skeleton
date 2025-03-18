import { Children, cloneElement, useMemo, isValidElement, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDashedIcon, LucideProps, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type IconButtonCard = {
  icon?: React.ReactElement<LucideProps>;
  title: string;
  link: string;
};

interface IconButtonCardsProps {
  cards: IconButtonCard[];
  iconClassName?: string;
  iconSize?: number;
  iconStrokeWidth?: number;
  className?: string;
}

export const IconButtonCards = ({
  cards,
  iconClassName,
  iconSize = 36,
  iconStrokeWidth = 1.5,
  className,
}: IconButtonCardsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const defaultIconProps = useMemo(() => ({
    className: cn(`w-${iconSize} h-${iconSize}`, iconClassName),
    strokeWidth: iconStrokeWidth,
  }), [iconSize, iconStrokeWidth, iconClassName]);

  const renderIcon = (icon?: React.ReactElement<LucideProps>) => {
    if (!icon) {
      return <CircleDashedIcon {...defaultIconProps} />;
    }

    return Children.map(icon, (child) => {
      if (!isValidElement(child)) return child;
      return cloneElement(child, {
        ...defaultIconProps,
        ...child.props,
        className: cn(defaultIconProps.className, child.props.className),
      });
    });
  };

  const displayedCards = isExpanded ? cards : cards.slice(0, 6); // Show only 6 items when not expanded (2 rows × 3 columns)
  const hasMoreItems = cards.length > 6;

  return (
    <div className="space-y-4">
      <div className={cn(
        "grid grid-cols-3 sm:grid-cols-4 gap-2",
        className
      )}>
        {displayedCards.map((card, index) => (
          <Link href={card.link} key={index}>
            <Card className="px-2 py-6 gap-4 flex flex-col items-center justify-center text-center hover:bg-accent/50 transition-colors">
              <CardContent className="flex flex-col items-center justify-center text-center p-0 space-y-2">
                {renderIcon(card.icon)}
                <p className="text-sm">{card.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {hasMoreItems && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUpIcon className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-4 h-4 mr-2" />
                Show More
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default IconButtonCards;
