import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function MobilMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="p-2" variant="ghost">Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem asChild>
					<Link href="/">Home</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/prediction">Prediction</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/standings">Standings</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
