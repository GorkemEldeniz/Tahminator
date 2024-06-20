import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function MobileNavBar() {
	const styles =
		"group inline-flex h-9 w-full items-center justify-start rounded-md bg-background px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50";

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Menu</NavigationMenuTrigger>
					<NavigationMenuContent>
						<NavigationMenuLink href='/' className={styles}>
							Home
						</NavigationMenuLink>
						<NavigationMenuLink href='/prediction' className={styles}>
							Prediction
						</NavigationMenuLink>
						<NavigationMenuLink href='/standings' className={styles}>
							Standings
						</NavigationMenuLink>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
