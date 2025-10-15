import { XIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

interface PromoBannerProps {
    show: boolean;
    onClose: () => void;
}

const PromoBanner = ({ show, onClose }: PromoBannerProps) => {
    if (!show) return null;

    return (
        <div className="w-full border-b border-white/10 bg-gray-950/80 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <div className="flex flex-1 flex-row items-center justify-center gap-2 text-center md:gap-4">
                    <p className="text-xs font-semibold text-white md:text-sm">
                        <span className="md:hidden">50% OFF for STEM Link Students!</span>
                        <span className="hidden md:inline">
                            Get 50% OFF if you&apos;re a STEM Link Student!
                        </span>
                    </p>
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                    >
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <span className="text-xs md:hidden">Claim</span>
                            <span className="hidden md:inline">Claim Discount</span>
                        </a>
                    </Button>
                </div>
                <button
                    onClick={onClose}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Close banner"
                >
                    <XIcon className="size-3" />
                </button>
            </div>
        </div>
    );
};

export default PromoBanner;
